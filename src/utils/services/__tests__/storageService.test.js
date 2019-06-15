import formStoreService from '../storageService'

jest.mock('../storageService')

test('works with async/await', async () => {
    expect.assertions(1)
    const data = await formStoreService.getAll()

    expect(data).toEqual(['dupa'])
})
