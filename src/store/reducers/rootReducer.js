import authReducer from './authReducer'
import cycleReducer from './cycleReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    cycle: cycleReducer,
    firestore: firestoreReducer
})

export default rootReducer