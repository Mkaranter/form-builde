import { init } from '@rematch/core'

import * as models from 'models'
import { Store } from 'utils/store'
import { questions, updatedQuestion } from 'common/__mocks__/questions'

describe('form model', () => {
    let store: Store

    beforeEach(() => {
        store = init({
            models,
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
