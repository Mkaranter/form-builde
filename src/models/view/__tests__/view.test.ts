import { init } from '@rematch/core'

import * as models from 'models'

describe('view model', () => {
    it('should toggle user form view', () => {
        const store = init({
            models,
        })

        store.dispatch.view.toggleUserFrom()
        const viewState = store.getState().view

        expect(viewState).toStrictEqual({ isUserFormVisible: true })
    })
})
