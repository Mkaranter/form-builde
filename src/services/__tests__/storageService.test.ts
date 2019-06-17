import { formStoreService } from '../index'
import { questions } from 'common/__mocks__/questions'

jest.mock('../index')

test('works with async/await', async () => {
    expect.assertions(1)
    const data = await formStoreService.getAll()

    expect(data).toEqual(questions)
})
