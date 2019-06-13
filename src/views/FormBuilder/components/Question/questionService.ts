import { RematchDispatch } from '@rematch/core'

import { dispatch } from 'utils/store'
import { QuestionConditionTypes } from 'utils/enums'
import { Question } from 'common/models'
import * as models from 'models'

const QuestionServiceFactory = (dispatchEffect: RematchDispatch<typeof models>) => {
    const change = (
        { target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        property: string,
        question: Question
    ) => {
        const questionObject: Question = {
            ...question,
            children: undefined,
        }
        questionObject[property] = target.value
        dispatchEffect.form.updateQuestion(questionObject)
    }

    const changeType = ({ target }: React.ChangeEvent<HTMLSelectElement>, question: Question) => {
        if (question.children) {
            question.children.forEach(element => {
                dispatchEffect.form.updateQuestion({
                    ...element,
                    conditionType: QuestionConditionTypes.Equals,
                    conditionValue: '',
                })
            })
        }

        dispatchEffect.form.updateQuestion({
            ...question,
            type: target.value,
            children: undefined,
        })
    }

    const remove = ({ id, children }: Question) => {
        if (children) {
            children.forEach((child: Question) => {
                remove(child)
            })
        }
        dispatchEffect.form.deleteQuestion(id)
    }

    const addSub = ({ level, id }: Question) => {
        dispatchEffect.form.addQuestion({
            parentId: id,
            text: '',
            type: 'text',
            conditionType: QuestionConditionTypes.Equals,
            conditionValue: '',
            level: level + 1,
        })
    }

    return Object.freeze({ change, changeType, remove, addSub })
}

export const questionService = new (QuestionServiceFactory as any)(dispatch)
