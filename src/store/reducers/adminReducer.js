const initState = { createUserResp: null }

var usersCopy

const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            //console.log(action.users)
            return {
                processing: false,
                users: action.users
            }
        case 'SET_PROCESSING':
            return {
                ...state,
                processing: true
            }
        case 'GET_USERS_ERROR':
            console.log('getting users error', action.error)
            return state
        case 'ENABLE_USER_SUCCESS':
            usersCopy = []
            state.users.forEach(user => {
                if(user.uid === action.uid){ //look up the user which has changed
                    const newUser = { 
                        ...user,
                        disabled: false //update status
                    }
                    usersCopy.push(newUser)
                } else {
                    usersCopy.push(user)
                }
            }) 
            return {
                ...state,
                users: usersCopy,
                processing: false
            } 
        case 'ENABLE_USER_ERROR':
            console.log('enable user error', action.error)
            return state
        case 'DELETE_USER_SUCCESS':
        usersCopy = []
        state.users.forEach(user => {
            if(user.uid !== action.uid){ //copy users except deleted user
                usersCopy.push(user)
            }
        }) 
        return {
            ...state,
            users: usersCopy,
            processing: false
        } 
        case 'DELETE_USER_ERROR':
            console.log('disable user error', action.error)
            return state
        case 'DISABLE_USER_SUCCESS':
            usersCopy = []
            state.users.forEach(user => {
                if(user.uid === action.uid){ //look up the user which has changed
                    const newUser = { 
                        ...user,
                        disabled: true //update status
                    }
                    usersCopy.push(newUser)
                } else {
                    usersCopy.push(user)
                }
            }) 
            return {
                ...state,
                users: usersCopy,
                processing: false
            } 
        case 'DISABLE_USER_ERROR':
            console.log('disable user error', action.error)
            return state
        case 'CREATE_USER_SUCCESS':
            if(action.resp.data.errorInfo) {
                return {
                    ...state,
                    processing: false,
                    createUserResp: {
                        error: action.resp.data.errorInfo.message
                    }
                }
            }else {
               return {
                    users:[ 
                        ...state.users,
                        {
                            ...action.resp.data,
                            customClaims: {
                                accessLevel: 0,
                                admin: false
                            }
                        }
                    ],
                    processing: false,
                    createUserResp: 200
                } 
            }  
        case 'CREATE_USER_ERROR':
            console.log('creating user error', action.error)
            return state
        case 'RESET_CREATE_RESP':
            return{
                ...state,
                createUserResp: null
            }
        case 'SET_USER_PRIVS_SUCCESS':
            usersCopy = []
            state.users.forEach(user => {
                if(user.uid === action.uid){ //look up the user which has changed
                    const newUser = { 
                        ...user,
                        customClaims: { //update status
                            admin: false,
                            accessLevel: 0
                        } 
                    }
                    usersCopy.push(newUser)
                } else {
                    usersCopy.push(user)
                }
            }) 
            return {
                ...state,
                users: usersCopy,
                processing: false
            }
        case 'SET_USER_PRIVS_ERROR':
            console.log('set user privileges error', action.error)
            return state
        case 'SET_ADMIN_PRIVS_SUCCESS':
            usersCopy = []
            state.users.forEach(user => {
                if(user.uid === action.uid){ //look up the user which has changed
                    const newUser = { 
                        ...user,
                        customClaims: { //update status
                            admin: true,
                            accessLevel: 1
                        } 
                    }
                    usersCopy.push(newUser)
                } else {
                    usersCopy.push(user)
                }
            }) 
            return {
                ...state,
                users: usersCopy,
                processing: false
            }
        case 'SET_ADMIN_PRIVS_ERROR':
            console.log('set admin privileges error', action.error)
            return state
        case 'SET_SUPER_ADMIN_PRIVS_SUCCESS':
            usersCopy = []
            state.users.forEach(user => {
                if(user.uid === action.uid){ //look up the user which has changed
                    const newUser = { 
                        ...user,
                        customClaims: { //update status
                            admin: true,
                            accessLevel: 2
                        } 
                    }
                    usersCopy.push(newUser)
                } else {
                    usersCopy.push(user)
                }
            }) 
            return {
                ...state,
                users: usersCopy,
                processing: false
            }
        case 'SET_SUPER_ADMIN_PRIVS_ERROR':
            console.log('set super admin privileges error', action.error)
            return state
        case 'SEND_PASSWORD_RESET_EMAIL_SUCCESS':
            return state
        case 'SEND_PASSWORD_RESET_EMAIL_ERROR':
            console.log('sending password reset email error', action.error)
            return state
        default:
            return state
   }
}

export default adminReducer