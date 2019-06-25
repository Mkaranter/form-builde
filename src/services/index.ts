import { storageServiceFactory } from './storageServiceFactory'
import { openDB } from 'idb'

export const formStoreService = storageServiceFactory('formStore', openDB)
