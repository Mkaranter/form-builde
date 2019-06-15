import { openDb } from 'idb'
import { Question } from 'common/models'

class storageService {
    store: string
    constructor(store: string) {
        this.store = store
    }

    private dbPromise = openDb('form-db', 1, upgradeDB => {
        upgradeDB.createObjectStore(this.store, {
            keyPath: 'id',
            autoIncrement: true,
        })
    })

    async getAll() {
        const db = await this.dbPromise
        return db
            .transaction(this.store)
            .objectStore(this.store)
            .getAll()
    }

    async update(updated: Question) {
        const db = await this.dbPromise
        const tx = db.transaction(this.store, 'readwrite')
        return tx.objectStore(this.store).put(updated)
    }

    async add(added: Omit<Question, 'id'>) {
        const db = await this.dbPromise
        const tx = db.transaction(this.store, 'readwrite')
        return tx.objectStore(this.store).put(added)
    }

    async delete(key: number) {
        const db = await this.dbPromise
        const tx = db.transaction(this.store, 'readwrite')
        return tx
            .objectStore(this.store)
            .delete(key)
            .then(() => {
                return key
            })
    }
}

export const formStoreService = new storageService('formStore')
