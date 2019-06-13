import { dispatch } from 'utils/store'
import { Question } from 'common/models'
import { QuestionConditionTypes } from 'utils/enums'

export const questionService = {
    change(
        { target }: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
        property: string,
        question: Question
    ) {
        const questionObject: Question = {
            ...question,
            children: undefined,
        }
        questionObject[property] = target.value
        dispatch.form.updateQuestion(questionObject)
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

        dispatch.form.updateQuestion({
            ...question,
            type: target.value,
            children: undefined,
        })
    },
    delete({ id, children }: Question) {
        if (children) {
            children.forEach((child: Question) => {
                this.delete(child)
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
