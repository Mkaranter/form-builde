import produce from 'immer'
import { createModel } from '@rematch/core'
import { Question } from 'common/models'

import { storageService } from 'utils/storageService'

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
    effects: dispatch => ({
        async initQList() {
            const questions = await storageService.getAllQuestions()
            dispatch.form.initQuestionList(questions)
        },
        async addQ(question: Question) {
            const newQuestionId = await storageService.addQuestion(question)
            dispatch.form.addQuestion({ ...question, id: newQuestionId })
        },

        async updateQ(question: Question) {
            await storageService.updateQuestion(question)
            dispatch.form.updateQuestion(question)
        },
        async deleteQ(id: number) {
            const deleteQuestionId = await storageService.deleteQuestion(id)
            dispatch.form.deleteQuestion(deleteQuestionId)
        },
    }),
})
