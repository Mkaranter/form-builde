import produce from 'immer'
import { createModel } from '@rematch/core'

export type ViewState = {
    showUserForm: boolean
}

export const view = createModel({
    state: {
        showUserForm: false,
    },
    reducers: {
        toggleUserForm(state: ViewState): ViewState {
            return produce(state, draft => {
                draft.showUserForm = !draft.showUserForm
            })
        },
    },
})
