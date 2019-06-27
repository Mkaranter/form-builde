import { init } from '@rematch/core'
import 'fake-indexeddb/auto'

import * as models from 'models'
import { Store } from 'utils/store'
import { questionsMock, updatedQuestion } from 'common/__mocks__/questionsMock'

describe('form model', () => {
    let store: Store

    beforeEach(() => {
        store = init({
            models,
        })
    })

    it('should update store with initial values', () => {
        store.dispatch.form.initList(questionsMock)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: questionsMock })
    })

    it('should add data to store', () => {
        store.dispatch.form.add(questionsMock[0])
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [questionsMock[0]] })
    })

    it('should update data in store', () => {
        store.dispatch.form.add(questionsMock[0])
        store.dispatch.form.update(updatedQuestion)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [updatedQuestion] })
    })

    it('should delete data from store', () => {
        store.dispatch.form.add(questionsMock[0])
        store.dispatch.form.delete(questionsMock[0].id)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [] })
    })
})
