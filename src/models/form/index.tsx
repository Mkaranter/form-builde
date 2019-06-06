import produce from 'immer'
import { Question, FormState } from 'common/models'

export const form = {
    state: {
        questionList: [],
        showUserForm: false,
    },
    reducers: {
        initQuestionList(state: FormState, payload: Question[]) {
            return produce(state, draft => {
                draft.questionList = payload
            })
        },

        addQuestion(state: FormState, payload: Question) {
            return produce(state, draft => {
                draft.questionList = [...state.questionList, payload]
            })
        },

        updateQuestion(state: FormState, payload: Question) {
            const updatedState = state.questionList.map(q => {
                if (q.id === payload.id) return payload
                return q
            })

            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        deleteQuestion(state: FormState, payload: number) {
            const updatedState = state.questionList.filter(q => q.id !== payload)
            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        toggleUserForm(state: FormState) {
            return produce(state, draft => {
                draft.showUserForm = !draft.showUserForm
            })
        },
    },
}
