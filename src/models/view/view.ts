import produce from 'immer'
import { createModel } from '@rematch/core'

export type ViewState = {
    isUserFormVisible: boolean
}

export const view = createModel({
    state: {
        isUserFormVisible: false,
    },
    reducers: {
        toggleUserForm(state: ViewState): ViewState {
            return produce(state, draft => {
                draft.isUserFormVisible = !draft.isUserFormVisible
            })
        },
    },
})
