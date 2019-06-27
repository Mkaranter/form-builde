import { QuestionConditionTypes } from 'utils/enums'
import { Question } from 'common/models'
import { Dispatch } from 'utils/store'

export const questionServiceFactory = (dispatch: Dispatch) => {
    const changeValue = (value: string, property: string, { children, ...question }: Question) => {
        question[property] = value
        dispatch.form.updateQuestion(question)
    }

    const changeType = (value: string, { children, ...question }: Question) => {
        if (Array.isArray(children)) {
            children.forEach((element: Question) => {
                dispatch.form.updateQuestion({
                    ...element,
                    conditionType: QuestionConditionTypes.Equals,
                    conditionValue: '',
                })
            })
        }

        dispatch.form.updateQuestion({
            ...question,
            type: value,
        })
    }

    const remove = ({ id, children }: Question) => {
        if (children) {
            children.forEach((child: Question) => {
                remove(child)
            })
        }

        dispatch.form.deleteQuestion(id)
    }

    const addSubQuestion = ({ level, id }: Question) => {
        dispatch.form.addQuestion({
            parentId: id,
            text: '',
            type: 'text',
            conditionType: QuestionConditionTypes.Equals,
            conditionValue: '',
            level: level + 1,
        })
    }

    return Object.freeze({ changeValue, changeType, remove, addSubQuestion })
}

export type QuestionServiceFactory = ReturnType<typeof questionServiceFactory>
