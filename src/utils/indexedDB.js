import { openDb } from 'idb'
import { dispatch } from '../index'

const dbPromise = openDb('form-db', 1, upgradeDB => {
    upgradeDB.createObjectStore('formStore', {
        keyPath: 'id',
        autoIncrement: true,
    })
})

export const idbEvents = {
    async getAllQuestions() {
        const db = await dbPromise
        return db
            .transaction('formStore')
            .objectStore('formStore')
            .getAll()
            .then(res => {
                dispatch.form.initQuestionList(res)
            })
    },

    async updateQuestion(updatedQuestion) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore')
            .put(updatedQuestion)
            .then(res => {
                updatedQuestion.id = res
                dispatch.form.updateQuestion(updatedQuestion)
            })
        return tx.complete
    },

    async addQuestion(newQuestion) {
        if (newQuestion.children) delete newQuestion.children
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore')
            .put(newQuestion)
            .then(res => {
                newQuestion.id = res
                dispatch.form.addQuestion(newQuestion)
            })
        return tx.complete
    },

    async deleteQuestion(key) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore')
            .delete(key)
            .then(() => dispatch.form.deleteQuestion(key))
        return tx.complete
    },
}
