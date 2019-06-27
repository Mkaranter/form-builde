import { openDB } from 'idb'

import { storageServiceFactory } from './storageServiceFactory'

export const formStoreService = storageServiceFactory('formStore', openDB)
export type OpenDB = typeof openDB
