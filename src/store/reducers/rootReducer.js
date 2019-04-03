import authReducer from './authReducer'
import programReducer from './programReducer'
import reportReducer from './reportReducer'
import tabReducer from './tabReducer'
import adminReducer from './adminReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
    auth: authReducer,
    program: programReducer,
    reports: reportReducer,
    tab: tabReducer,
    firebase: firebaseReducer,
    admin: adminReducer
})

export default rootReducer