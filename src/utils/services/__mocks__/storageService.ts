class storageService {
    getAll() {
        return new Promise((resolve, reject) => {
            process.nextTick(() =>
                true
                    ? resolve(['dupaaaa'])
                    : reject({
                          error: 'dupa',
                      })
            )
        })
    }
}

const formStoreService = new storageService()

export default formStoreService
