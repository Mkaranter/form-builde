import produce from 'immer'
import { createModel } from '@rematch/core'

import { Question } from 'common/models'
import { formStoreService } from 'services'

export type FormState = {
    questionList: Question[]
}

export const form = createModel({
    state: {
        questionList: [],
    },
    reducers: {
        initList(state: FormState, payload: Question[]): FormState {
            return produce(state, draft => {
                draft.questionList = payload
            })
        },

        add(state: FormState, payload: Question): FormState {
            return produce(state, draft => {
                draft.questionList = [...state.questionList, payload]
            })
        },

        update(state: FormState, payload: Question): FormState {
            const updatedState = state.questionList.map(q => {
                if (q.id === payload.id) return payload
                return q
            })

            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },

        delete(state: FormState, payload: number): FormState {
            const updatedState = state.questionList.filter(q => q.id !== payload)
            return produce(state, draft => {
                draft.questionList = updatedState
            })
        },
    },
    effects: dispatch => ({
        async initQuestionList() {
            const questions = await formStoreService.getAll()
            dispatch.form.initList(questions)
        },
        async addQuestion(question: Question) {
            const newQuestionId = await formStoreService.add(question)
            dispatch.form.add({ ...question, id: newQuestionId })
        },

        async updateQuestion(question: Question) {
            await formStoreService.update(question)
            dispatch.form.update(question)
        },
        async deleteQuestion(id: number) {
            const deleteQuestionId = await formStoreService.delete(id)
            dispatch.form.delete(deleteQuestionId)
        },
    }),
})
