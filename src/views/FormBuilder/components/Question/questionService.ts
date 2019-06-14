import { dispatch } from 'utils/store'
import { QuestionConditionTypes } from 'utils/enums'
import { Question } from 'common/models'

export const questionService = {
    change(
        { target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        property: string,
        question: Question
    ) {
        delete question.children
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

        delete question.children
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
