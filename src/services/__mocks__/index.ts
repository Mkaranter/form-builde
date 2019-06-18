import { questions } from 'common/__mocks__/questions'

const storageService = () => {
    const getAll = () => {
        return new Promise(resolve => {
            process.nextTick(() => resolve(questions))
        })
    }

    return Object.freeze({ getAll })
}

export const formStoreService = storageService()
