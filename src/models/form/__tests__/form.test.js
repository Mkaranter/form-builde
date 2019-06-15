import { init } from '@rematch/core'
import { form } from '../form/'

import { questions, updatedQuestion } from '../__mocks__/questions'

describe('form model', () => {
    let store

    beforeEach(() => {
        store = init({
            models: { form },
        })
    })

    it('should update store with initial values', () => {
        store.dispatch.form.initList(questions)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: questions })
    })

    it('should add data to store', () => {
        store.dispatch.form.add(questions[0])
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [questions[0]] })
    })

    it('should update data in store', () => {
        store.dispatch.form.add(questions[0])
        store.dispatch.form.update(updatedQuestion)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [updatedQuestion] })
    })

    it('should delete data from store', () => {
        store.dispatch.form.add(questions[0])
        store.dispatch.form.delete(questions[0].id)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [] })
    })
})
