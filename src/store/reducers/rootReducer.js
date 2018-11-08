import authReducer from './authReducer'
import cycleReducer from './cycleReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    cycle: cycleReducer
})

export default rootReducer