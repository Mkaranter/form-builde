import { openDb } from 'idb'
import { dispatch } from 'index'

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
            .then(res => {
                dispatch.form.initQuestionList(res)
            })
    },

    async updateQuestion(updatedQuestion: Question) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore')
            .put(updatedQuestion)
            .then(res => {
                updatedQuestion.id = parseInt(res.toString(), 10)
                dispatch.form.updateQuestion(updatedQuestion)
            })
        return tx.complete
    },

    async addQuestion(newQuestion: Omit<Question, 'id'>) {
        if (newQuestion.children) delete newQuestion.children
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore')
            .put(newQuestion)
            .then(res => {
                newQuestion.id = parseInt(res.toString(), 10)
                dispatch.form.addQuestion(newQuestion)
            })
        return tx.complete
    },

    async deleteQuestion(key: number) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore')
            .delete(key)
            .then(() => dispatch.form.deleteQuestion(key))
        return tx.complete
    },
}
