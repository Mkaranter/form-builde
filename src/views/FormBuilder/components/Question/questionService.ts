import { dispatch } from 'utils/store'
import { QuestionConditionTypes } from 'utils/enums'
import { Question } from 'common/models'

// create factory function with injected dispatch, move to common/services
export const questionService = {
    changeValue(
        { target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        property: string,
        { children, ...question }: Question
    ) {
        question[property] = target.value
        dispatch.form.updateQuestion(question)
    },

    changeType(
        { target }: React.ChangeEvent<HTMLSelectElement>,
        { children, ...question }: Question
    ) {
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
    },

    remove({ id, children }: Question) {
        if (children) {
            children.forEach((child: Question) => {
                this.remove(child)
            })
        }

        dispatch.form.deleteQuestion(id)
    },
    addSubQuestion({ level, id }: Question) {
        dispatch.form.addQuestion({
            parentId: id,
            text: '',
            type: 'text',
            conditionType: QuestionConditionTypes.Equals,
            conditionValue: '',
            level: level + 1,
        })
    },
}
