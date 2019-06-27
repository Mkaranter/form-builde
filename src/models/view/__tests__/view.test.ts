import { init } from '@rematch/core'
import 'fake-indexeddb/auto'

import * as models from 'models'
import { Store } from 'utils/store'

describe('view model', () => {
    it('should toggle user form', () => {
        let store: Store

        store = init({
            models,
        })

        store.dispatch.view.toggleUserForm()
        const viewData = store.getState().view

        expect(viewData).toStrictEqual({ isUserFormVisible: true })
    })
})
