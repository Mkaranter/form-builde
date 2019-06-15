import { questions } from 'common/__mocks__/questions'

const storageService = () => {
    const getAll = () => {
        return new Promise((resolve, reject) => {
            process.nextTick(() =>
                true
                    ? resolve(questions)
                    : reject({
                          error: 'Something went wrong',
                      })
            )
        })
    }

    return Object.freeze({ getAll })
}

export const formStoreService = storageService()
