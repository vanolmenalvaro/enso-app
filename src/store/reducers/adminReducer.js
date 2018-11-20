const initState = { shouldRefresh: true }

const adminReducer = (state = initState, action) => {
   switch (action.type) {
        case 'GET_USERS':
            //console.log(action.users)
            return {
                shouldRefresh: false,
                users: action.users
            }
        case 'GET_USERS_ERROR':
            console.log('getting users error', action.error)
            return state
        case 'ENABLE_USER_SUCCESS':
            //console.log(action.data)
            return {
                ...state,
                shouldRefresh: true
            }
        case 'ENABLE_USER_ERROR':
            console.log('enable user error', action.error)
            return state
        case 'DISABLE_USER_SUCCESS':
            //console.log(action.data)
            return {
                ...state,
                shouldRefresh: true
            }
        case 'DISABLE_USER_ERROR':
            console.log('disable user error', action.error)
            return state
        case 'SET_USER_PRIVS_SUCCESS':
            //console.log(action.data)
            return {
                ...state,
                shouldRefresh: true
            }
        case 'SET_USER_PRIVS_ERROR':
            console.log('set user privileges error', action.error)
            return state
        case 'SET_ADMIN_PRIVS_SUCCESS':
            //console.log(action.data)
            return {
                ...state,
                shouldRefresh: true
            }
        case 'SET_ADMIN_PRIVS_ERROR':
            console.log('set admin privileges error', action.error)
            return state
        case 'SET_SUPER_ADMIN_PRIVS_SUCCESS':
            //console.log(action.data)
            return {
                ...state,
                shouldRefresh: true
            }
        case 'SET_SUPER_ADMIN_PRIVS_ERROR':
            console.log('set super admin privileges error', action.error)
            return state
        case 'SEND_PASSWORD_RESET_EMAIL_SUCCESS':
            //console.log(action)
            return state
        case 'SEND_PASSWORD_RESET_EMAIL_ERROR':
            console.log('sending password reset email error', action.error)
            return state
        default:
            return state
   }
}

export default adminReducer