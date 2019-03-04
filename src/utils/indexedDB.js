import { openDb, deleteDb } from 'idb';

export const indexedDBinit = () => {
	if (!('indexedDB' in window)) {
		console.log("This browser doesn't support IndexedDB");
		return;
	}

	openDb('form-db', 1, function(upgradeDB) {
		console.log('making a new object store');
		if (!upgradeDB.objectStoreNames.contains('formStore')) {
			upgradeDB.createObjectStore('formStore', {
				keyPath: 'id',
				autoIncrement: true
			});
		}
	});
};

const dbPromise = openDb('form-db');

export const idbInputs = {
	async getAll() {
		const db = await dbPromise;
		return db
			.transaction('formStore')
			.objectStore('formStore')
			.getAll();
	},

	async set(val) {
		const db = await dbPromise;
		const tx = db.transaction('formStore', 'readwrite');
		tx.objectStore('formStore').put(val);
		return tx.complete;
	},

	async delete(key) {
		console.log(key);
		const db = await dbPromise;
		const tx = db.transaction('formStore', 'readwrite');
		tx.objectStore('formStore').delete(key);
		return tx.complete;
	}
};
