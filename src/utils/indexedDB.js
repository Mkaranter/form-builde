import { openDb } from 'idb'

const dbPromise = openDb('form-db', 1, upgradeDB => {
    upgradeDB.createObjectStore('formStore', {
        keyPath: 'id',
        autoIncrement: true,
    })
})

export const idbEvents = {
    async getAll() {
        const db = await dbPromise
        return db
            .transaction('formStore')
            .objectStore('formStore')
            .getAll()
    },

    async getOne(key) {
        const db = await dbPromise
        return db
            .transaction('formStore')
            .objectStore('formStore')
            .get(key)
    },

    async set(val) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore').put(val)
        return tx.complete
    },

    async delete(key) {
        const db = await dbPromise
        const tx = db.transaction('formStore', 'readwrite')
        tx.objectStore('formStore').delete(key)
        return tx.complete
    },
}
