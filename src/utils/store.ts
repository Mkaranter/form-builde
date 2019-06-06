import { init } from '@rematch/core'
import { form } from 'models/form'

const store = init({
    models: {
        form,
    },
})

export default store
