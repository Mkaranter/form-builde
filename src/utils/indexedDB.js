import { openDb } from 'idb'
import { dispatch } from '../index'

const dbPromise = openDb('form-db', 1, upgradeDB => {
    upgradeDB.createObjectStore('formStore', {
        keyPath: 'id',
        autoIncrement: true,
    })
})

export const idbEvents = {
    async getAllRedux() {
        const db = await dbPromise
        return db
            .transaction('formStore')
            .objectStore('formStore')
            .getAll()
            .then(res => {
                dispatch.form.initQuestionList(res)
            })
    },

    async getOne(key) {
        const db = await dbPromise
        return db
            .transaction('formStore')
            .objectStore('formStore')
            .get(key)
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

    async addNewQuestion(newQuestion) {
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

    async addSubQuestion(newSubQuestion) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore')
            .put(newSubQuestion)
            .then(res => {
                newSubQuestion.id = res
                dispatch.form.addSubQuestion(newSubQuestion)
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
