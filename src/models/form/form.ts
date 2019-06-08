import produce from 'immer'
import { createModel } from '@rematch/core'
import { Question } from 'common/models'

export type FormState = {
    questionList: Question[]
}

export const form = createModel({
    state: {
        questionList: [],
    },
    reducers: {
        initQuestionList(state: FormState, payload: Question[]): FormState {
            return produce(state, draft => {
                draft.questionList = payload
            })
        },

        addQuestion(state: FormState, payload: Question): FormState {
            return produce(state, draft => {
                draft.questionList = [...state.questionList, payload]
            })
        },

        updateQuestion(state: FormState, payload: Question): FormState {
            const updatedState = state.questionList.map(q => {
                if (q.id === payload.id) return payload
                return q
            })

            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        deleteQuestion(state: FormState, payload: number): FormState {
            const updatedState = state.questionList.filter(q => q.id !== payload)
            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },
    },
})
