import dva from './utils/dva'
import models from './models'
import initialState from './initialState'


const dvaApp = dva.createApp({
    initialState,
    models
})

const store = dvaApp.getStore()

export default store
