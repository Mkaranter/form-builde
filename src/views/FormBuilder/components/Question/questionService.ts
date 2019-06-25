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
        // delete question.children
        question[property] = target.value
        dispatch.form.updateQuestion(question)
    },

    changeType({ target }: React.ChangeEvent<HTMLSelectElement>, question: Question) {
        if (question.children) {
            question.children.forEach(element => {
                dispatch.form.updateQuestion({
                    ...element,
                    conditionType: QuestionConditionTypes.Equals,
                    conditionValue: '',
                })
            })
        }

        delete question.children // as above
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
    // addSubQuestion
    addSub({ level, id }: Question) {
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
