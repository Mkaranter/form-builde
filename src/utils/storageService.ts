import { openDb } from 'idb'
import { Question } from 'common/models'

<<<<<<< HEAD
const dbPromise = openDb('form-db', 1, upgradeDB => {
    upgradeDB.createObjectStore(IdbHelper.FormStore, {
        keyPath: 'id',
        autoIncrement: true,
=======
const StorageServiceFactory = (accessDB: any) => {
    const formStore = 'formStore'
    const dbPromise = accessDB('form-db', 1, (upgradeDB: any) => {
        upgradeDB.createObjectStore(formStore, {
            keyPath: 'id',
            autoIncrement: true,
        })
>>>>>>> 16f3c58106a2ef4bced5a753438a4a0ef1b55291
    })
})

enum IdbHelper {
    FormStore = 'formStore',
    ReadWrite = 'readwrite',
}

export const storageService = {
    async getAllQuestions() {
        const db = await dbPromise
        return db
<<<<<<< HEAD
            .transaction(IdbHelper.FormStore)
            .objectStore(IdbHelper.FormStore)
=======
            .transaction(formStore)
            .objectStore(formStore)
>>>>>>> 16f3c58106a2ef4bced5a753438a4a0ef1b55291
            .getAll()
    },

    async updateQuestion(updatedQuestion: Question) {
        const db = await dbPromise
<<<<<<< HEAD
        const tx = db.transaction(IdbHelper.FormStore, IdbHelper.ReadWrite)
        return tx.objectStore(IdbHelper.FormStore).put(updatedQuestion)
    },
=======
        const tx = db.transaction(formStore, 'readwrite')
        return tx.objectStore(formStore).put(updatedQuestion)
    }
>>>>>>> 16f3c58106a2ef4bced5a753438a4a0ef1b55291

    async addQuestion(newQuestion: Omit<Question, 'id'>) {
        if (newQuestion.children) delete newQuestion.children
        const db = await dbPromise
<<<<<<< HEAD
        const tx = db.transaction(IdbHelper.FormStore, IdbHelper.ReadWrite)
        return tx.objectStore(IdbHelper.FormStore).put(newQuestion)
    },
=======
        const tx = db.transaction(formStore, 'readwrite')
        return tx.objectStore(formStore).put(newQuestion)
    }
>>>>>>> 16f3c58106a2ef4bced5a753438a4a0ef1b55291

    async deleteQuestion(key: number) {
        const db = await dbPromise
<<<<<<< HEAD
        const tx = db.transaction(IdbHelper.FormStore, IdbHelper.ReadWrite)
        return tx
            .objectStore(IdbHelper.FormStore)
=======
        const tx = db.transaction(formStore, 'readwrite')
        return tx
            .objectStore(formStore)
>>>>>>> 16f3c58106a2ef4bced5a753438a4a0ef1b55291
            .delete(key)
            .then(() => {
                return key
            })
    },
}
