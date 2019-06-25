import produce from 'immer'
import { createModel } from '@rematch/core'

import { Question } from 'common/models'
import { StorageServiceFactory } from 'services/storageServiceFactory'

export type FormState = {
    questionList: Question[]
}

export const formModelFactory = (formStoreService: StorageServiceFactory) =>
    createModel<FormState>({
        state: {
            questionList: [],
        },
        reducers: {
            initList(state, payload: Question[]) {
                return produce(state, draft => {
                    draft.questionList = payload
                })
            },

            add(state, payload: Question) {
                return produce(state, draft => {
                    draft.questionList = [...state.questionList, payload]
                })
            },

            update(state, payload: Question) {
                const updatedState = state.questionList.map(q => {
                    return q.id === payload.id ? payload : q
                })

                return produce(state, draft => {
                    draft.questionList = updatedState
                })
            },

            delete(state, payload: number) {
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
                const deleteQuestionId = await formStoreService.remove(id)
                dispatch.form.delete(deleteQuestionId)
            },
        }),
    })
