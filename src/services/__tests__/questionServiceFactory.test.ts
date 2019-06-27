import 'fake-indexeddb/auto'
import { dispatch } from 'utils/store'

import { questionServiceFactory } from '../questionServiceFactory'

describe('should check condition', () => {
    let questionService: any
    beforeEach(() => {
        questionService = questionServiceFactory(dispatch)
    })

    it.only('addSubQuestion', () => {
        const spy = jest.spyOn(dispatch.form, 'addQuestion')

        const params = { level: 1, id: 'er' }

        questionService.addSubQuestion(params)

        expect(spy).toHaveBeenCalledWith({
            parentId: params.id,
            text: '',
            type: 'text',
            conditionType: 'equals',
            conditionValue: '',
            level: params.level + 1,
        })
    })
})
