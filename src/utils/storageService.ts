import { openDb } from 'idb'
import { Question } from 'common/models'

const StorageServiceFactory = () => {
    const dbPromise = openDb('form-db', 1, upgradeDB => {
        upgradeDB.createObjectStore('formStore', {
            keyPath: 'id',
            autoIncrement: true,
        })
    })

    const getAllQuestions = async () => {
        const db = await dbPromise
        return db
            .transaction('formStore')
            .objectStore('formStore')
            .getAll()
            .then(res => res)
    }

    const updateQuestion = async (updatedQuestion: Question) => {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        return tx.objectStore('formStore').put(updatedQuestion)
    }

    const addQuestion = async (newQuestion: Omit<Question, 'id'>) => {
        if (newQuestion.children) delete newQuestion.children
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        return tx
            .objectStore('formStore')
            .put(newQuestion)
            .then(res => res)
    }

    const deleteQuestion = async (key: number) => {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        return tx
            .objectStore('formStore')
            .delete(key)
            .then(() => {
                return key
            })
    }

    return Object.freeze({
        getAllQuestions,
        updateQuestion,
        addQuestion,
        deleteQuestion,
    })
}

export const storageService = new (StorageServiceFactory as any)()
