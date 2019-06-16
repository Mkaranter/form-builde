import { openDb } from 'idb'
import { Question } from 'common/models'

const storageServiceFactory = (store: string) => {
    const dbPromise = openDb('form-db', 1, upgradeDB => {
        upgradeDB.createObjectStore(store, {
            keyPath: 'id',
            autoIncrement: true,
        })
    })

    const getAll = async () => {
        const db = await dbPromise
        return db
            .transaction(store)
            .objectStore(store)
            .getAll()
    }

    const send = async (data: Question | Omit<Question, 'id'>) => {
        const db = await dbPromise
        const tx = db.transaction(store, 'readwrite')
        return tx.objectStore(store).put(data)
    }

    const update = async (updated: Question) => send(updated)

    const add = async (added: Omit<Question, 'id'>) => send(added)

    const remove = async (key: number) => {
        const db = await dbPromise
        const tx = db.transaction(store, 'readwrite')
        return tx
            .objectStore(store)
            .delete(key)
            .then(() => {
                return key
            })
    }

    return Object.freeze({ getAll, update, add, remove })
}

export const formStoreService = storageServiceFactory('formStore')
