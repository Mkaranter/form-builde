import { OpenDB } from './'
import { Question, DbStore } from 'common/models'

export const storageServiceFactory = (store: DbStore, openDB: OpenDB) => {
    const dbPromise = openDB('form-db', 1, {
        upgrade(db) {
            db.createObjectStore(store, {
                keyPath: 'id',
                autoIncrement: true,
            })
        },
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

    const update = (updated: Question) => send(updated)

    const add = (added: Omit<Question, 'id'>) => send(added)

    const remove = async (key: number) => {
        const db = await dbPromise
        const tx = db.transaction(store, 'readwrite')

        return tx
            .objectStore(store)
            .delete(key)
            .then(() => key)
    }

    return Object.freeze({ getAll, update, add, remove })
}

export type StorageServiceFactory = ReturnType<typeof storageServiceFactory>
