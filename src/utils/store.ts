import { init, RematchRootState } from '@rematch/core'

import { questionServiceFactory } from 'services/questionServiceFactory'

import * as models from 'models'

export const store = init({
    models,
})

export const { dispatch } = store
export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type RootState = RematchRootState<typeof models>

export const questionService = questionServiceFactory(dispatch) //move it??
