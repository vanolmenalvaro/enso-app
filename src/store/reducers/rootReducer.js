import authReducer from './authReducer'
import cycleReducer from './cycleReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    project: cycleReducer
})

export default rootReducer