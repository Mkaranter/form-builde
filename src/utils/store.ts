import { init, RematchRootState } from '@rematch/core'

import * as models from 'models'

export const store = init({
    models,
})

export const { dispatch } = store
export type Store = typeof store
export type Dispatch = typeof store.dispatch
export type RootState = RematchRootState<typeof models>
