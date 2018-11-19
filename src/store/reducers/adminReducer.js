const initState = {}

const adminReducer = (state = initState, action) => {
   switch (action.type) {
       case 'GET_USERS':
            //console.log(action.users)
            return {
                fetching: false,
                users: action.users
            }
       case 'GET_USERS_ERROR':
            console.log('getting users error', action.error)
            return state
       default:
            return state
   }
}

export default adminReducer