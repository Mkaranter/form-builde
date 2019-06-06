import produce from 'immer'
import { Question } from 'common/models'

interface AppState {
    questionList: Question[]
    showUserForm: boolean
}

export const form = {
    state: {
        questionList: [],
        showUserForm: false,
    },
    reducers: {
        initQuestionList(state: AppState, payload: Question[]) {
            return produce(state, draft => {
                draft.questionList = payload
            })
        },

        addQuestion(state: AppState, payload: Question) {
            return produce(state, draft => {
                draft.questionList = [...state.questionList, payload]
            })
        },

        updateQuestion(state: AppState, payload: Question) {
            const updatedState = state.questionList.map(q => {
                if (q.id === payload.id) return payload
                return q
            })

            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        deleteQuestion(state: AppState, payload: number) {
            const updatedState = state.questionList.filter(q => q.id !== payload)
            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        toggleUserForm(state: AppState) {
            return produce(state, draft => {
                draft.showUserForm = !draft.showUserForm
            })
        },
    },
}
