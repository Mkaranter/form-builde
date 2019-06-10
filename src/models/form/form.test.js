import { init } from '@rematch/core'
import { form } from './form'

const mockedQuestion1 = {
    text: 'Test question',
    type: 'number',
    level: 3,
    id: 1,
}

const mockedQuestionUpdated1 = {
    text: 'Test question changed',
    type: 'boolean',
    level: 2,
    id: 1,
}

const mockedQuestion2 = {
    text: 'Another question',
    type: 'text',
    level: 2,
    id: 2,
}

describe('form model', () => {
    it('should update store with array of questions', () => {
        const store = init({
            models: { form },
        })

        store.dispatch.form.initQuestionList([mockedQuestion1, mockedQuestion2])
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [mockedQuestion1, mockedQuestion2] })
    })

    it('should add question to store', () => {
        const store = init({
            models: { form },
        })

        store.dispatch.form.addQuestion(mockedQuestion1)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [mockedQuestion1] })
    })

    it('should update question', () => {
        const store = init({
            models: { form },
        })

        store.dispatch.form.addQuestion(mockedQuestion1)
        store.dispatch.form.updateQuestion(mockedQuestionUpdated1)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [mockedQuestionUpdated1] })
    })

    it('should delete question from store', () => {
        const store = init({
            models: { form },
        })

        store.dispatch.form.deleteQuestion(mockedQuestion1)
        const formData = store.getState().form

        expect(formData).toStrictEqual({ questionList: [] })
    })
})
