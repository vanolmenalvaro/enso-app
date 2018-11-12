import authReducer from './authReducer'
import cycleReducer from './cycleReducer'
import tabReducer from './tabReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth: authReducer,
    cycle: cycleReducer,
    tab: tabReducer
})

export default rootReducer