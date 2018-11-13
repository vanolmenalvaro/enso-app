import authReducer from './authReducer'
import cycleReducer from './cycleReducer'
import tabReducer from './tabReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    cycle: cycleReducer,
    tab: tabReducer,
    firebase: firebaseReducer
})

export default rootReducer