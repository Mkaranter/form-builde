import { init } from '@rematch/core'
import { form } from './form'

const mockedQuestion = {
    text: 'Test question',
    type: 'number',
    level: 3,
    id: 1,
}

describe('form model', () => {
    it('should add question to question list', () => {
        const store = init({
            models: { form },
        })

        store.dispatch.form.addQuestion(mockedQuestion)

        const formData = store.getState().form
        expect(formData).toStrictEqual({ questionList: [mockedQuestion] })
    })

    it('should delete question from question list', () => {
        const store = init({
            models: { form },
        })

        store.dispatch.form.deleteQuestion(mockedQuestion)

        const formData = store.getState().form
        expect(formData).toStrictEqual({ questionList: [] })
    })
})
