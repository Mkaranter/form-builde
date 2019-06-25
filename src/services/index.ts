import { storageServiceFactory } from './storageServiceFactory'
import { questionService as questionServiceInit } from 'utils/store'
import { openDB } from 'idb'

export const formStoreService = storageServiceFactory('formStore', openDB)
export const questionService = questionServiceInit
