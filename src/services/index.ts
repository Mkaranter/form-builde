import { openDB } from 'idb'

// import { dispatch } from 'utils/store'

import { storageServiceFactory } from './storageServiceFactory'
// import { questionServiceFactory } from './questionServiceFactory'

export const formStoreService = storageServiceFactory('formStore', openDB)
// export const questionService = questionServiceFactory(dispatch)
export type OpenDB = typeof openDB
