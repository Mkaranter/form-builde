import { formStoreService } from 'services'

import { viewModelFactory } from './view'
import { formModelFactory } from './form'

// export const models = { view: viewModelFactory(), form: formModelFactory(formStoreService) }

export const view = viewModelFactory()
export const form = formModelFactory(formStoreService)
