import { openDb } from 'idb'
import { Question } from 'common/models'

const dbPromise = openDb('form-db', 1, upgradeDB => {
    upgradeDB.createObjectStore(IdbHelper.FormStore, {
        keyPath: 'id',
        autoIncrement: true,
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
            .transaction(IdbHelper.FormStore)
            .objectStore(IdbHelper.FormStore)
            .getAll()
    },

    async updateQuestion(updatedQuestion: Question) {
        const db = await dbPromise
        const tx = db.transaction(IdbHelper.FormStore, IdbHelper.ReadWrite)
        return tx.objectStore(IdbHelper.FormStore).put(updatedQuestion)
    },

    async addQuestion(newQuestion: Omit<Question, 'id'>) {
        if (newQuestion.children) delete newQuestion.children
        const db = await dbPromise
        const tx = db.transaction(IdbHelper.FormStore, IdbHelper.ReadWrite)
        return tx.objectStore(IdbHelper.FormStore).put(newQuestion)
    },

    async deleteQuestion(key: number) {
        const db = await dbPromise
        const tx = db.transaction(IdbHelper.FormStore, IdbHelper.ReadWrite)
        return tx
            .objectStore(IdbHelper.FormStore)
            .delete(key)
            .then(() => {
                return key
            })
    },
}
