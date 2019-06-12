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
        dispatch.form.updateQ(questionObject)
    },
    changeType({ target }: React.ChangeEvent<HTMLSelectElement>, question: Question) {
        if (question.children) {
            question.children.forEach(element => {
                dispatch.form.updateQ({
                    ...element,
                    conditionType: QuestionConditionTypes.Equals,
                    conditionValue: '',
                })
            })
        }

        dispatch.form.updateQ({
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
        dispatch.form.deleteQ(id)
    },
    addSub({ level, id }: Question) {
        dispatch.form.addQ({
            parentId: id,
            text: '',
            type: 'text',
            conditionType: QuestionConditionTypes.Equals,
            conditionValue: '',
            level: level + 1,
        })
    },
}
