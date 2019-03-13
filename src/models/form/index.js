import produce from 'immer'

export const form = {
    state: {
        questionList: [],
        showGeneratedForm: false,
    },
    reducers: {
        initQuestionList(state, payload) {
            return produce(state, draft => {
                draft.questionList = payload
            })
        },

        addQuestion(state, payload) {
            return produce(state, draft => {
                draft.questionList = [...state.questionList, payload]
            })
        },

        updateQuestion(state, payload) {
            const updatedState = state.questionList.map(q => {
                if (q.id === payload.id) return payload
                return q
            })

            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        deleteQuestion(state, payload) {
            const updatedState = state.questionList.filter(q => q.id !== payload)
            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        toggleGeneratedForm(state) {
            return produce(state, draft => {
                draft.showGeneratedForm = !draft.showGeneratedForm
            })
        },
    },
}
