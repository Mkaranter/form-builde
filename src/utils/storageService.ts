import { openDb } from 'idb'
import { Question } from 'common/models'

const dbPromise = openDb('form-db', 1, upgradeDB => {
    upgradeDB.createObjectStore('formStore', {
        keyPath: 'id',
        autoIncrement: true,
    })
})

export const storageService = {
    async getAllQuestions() {
        const db = await dbPromise
        return db
            .transaction('formStore')
            .objectStore('formStore')
            .getAll()
            .then(res => res)
    },

    async updateQuestion(updatedQuestion: Question) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        return tx.objectStore('formStore').put(updatedQuestion)
    },

    async addQuestion(newQuestion: Omit<Question, 'id'>) {
        if (newQuestion.children) delete newQuestion.children
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        return tx
            .objectStore('formStore')
            .put(newQuestion)
            .then(res => res)
    },

    async deleteQuestion(key: number) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        return tx
            .objectStore('formStore')
            .delete(key)
            .then(() => {
                return key
            })
    },
}
