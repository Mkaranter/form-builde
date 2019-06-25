import { QuestionConditionTypes } from 'utils/enums'
import { Question } from 'common/models'

export const questionServiceFactory = (dispatch: any) => {
    const changeValue = (
        { target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        property: string,
        { children, ...question }: Question
    ) => {
        question[property] = target.value
        dispatch.form.updateQuestion(question)
    }

    const changeType = (
        { target }: React.ChangeEvent<HTMLSelectElement>,
        { children, ...question }: Question
    ) => {
        if (Array.isArray(question.children)) {
            question.children.forEach((element: Question) => {
                dispatch.form.updateQuestion({
                    ...element,
                    conditionType: QuestionConditionTypes.Equals,
                    conditionValue: '',
                })
            })
        }

        dispatch.form.updateQuestion({
            ...question,
            type: target.value,
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
