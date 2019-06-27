import 'fake-indexeddb/auto'
import { dispatch } from 'utils/store'
import { QuestionConditionTypes, QuestionTypes } from 'utils/enums'

import { questionServiceFactory, QuestionServiceFactory } from '../questionServiceFactory'

const mockedQuestion = {
    text: 'test',
    type: 'number',
    level: 1,
    id: 2,
}

describe('should methods for Question Service Factory', () => {
    let questionService: QuestionServiceFactory
    beforeEach(() => {
        questionService = questionServiceFactory(dispatch)
    })

    it('changeValue', () => {
        const spy = jest.spyOn(dispatch.form, 'updateQuestion')
        const params = {
            value: 'text',
            property: 'conditionValue',
            question: mockedQuestion,
        }

        questionService.changeValue(params.value, params.property, params.question)

        expect(spy).toHaveBeenCalledWith({
            text: 'test',
            type: QuestionTypes.Number,
            conditionValue: params.value,
            level: 1,
            id: 2,
        })
    })

    it('changeType', () => {
        const spy = jest.spyOn(dispatch.form, 'updateQuestion')
        const params = { type: 'boolean', question: mockedQuestion }

        questionService.changeType(params.type, params.question)

        expect(spy).toHaveBeenCalledWith({
            text: 'test',
            type: params.type,
            level: 1,
            id: 2,
        })
    })

    it('remove', () => {
        const spy = jest.spyOn(dispatch.form, 'deleteQuestion')
        const params = {
            text: 'test',
            type: 'number',
            level: 1,
            id: 2,
        }

        questionService.remove(params)

        expect(spy).toHaveBeenCalledWith(params.id)
    })

    it('addSubQuestion', () => {
        const spy = jest.spyOn(dispatch.form, 'addQuestion')
        const params = { level: 1, id: 2, text: '', type: QuestionTypes.Text }

        questionService.addSubQuestion(params)

        expect(spy).toHaveBeenCalledWith({
            parentId: params.id,
            text: params.text,
            type: QuestionTypes.Text,
            conditionType: QuestionConditionTypes.Equals,
            conditionValue: '',
            level: params.level + 1,
        })
    })
})
