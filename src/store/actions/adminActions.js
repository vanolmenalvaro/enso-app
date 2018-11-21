export const getUsers = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var listAllUsers = firebase.functions().httpsCallable('listAllUsers');
        listAllUsers().then((response) => {
            dispatch({ type: 'GET_USERS', users: response.data.users })
        }).catch((error) => {
            dispatch({ type: 'GET_USERS_ERROR', error})
        })
    }
}

export const enableUser = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var enableUser = firebase.functions().httpsCallable('enableUser')
        enableUser(uid).then(() => {
            dispatch({ type: 'ENABLE_USER_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'ENABLE_USER_ERROR', error})
        })
    }
}

export const disableUser = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var disableUser = firebase.functions().httpsCallable('disableUser')
        disableUser(uid).then(() => {
            dispatch({ type: 'DISABLE_USER_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'DISABLE_USER_ERROR', error})
        })
    }
}

export const setUserPrivileges = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var setUserPrivileges = firebase.functions().httpsCallable('setUserPrivileges')
        setUserPrivileges(uid).then(() => {
            dispatch({ type: 'SET_USER_PRIVS_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'SET_USER_PRIVS_ERROR', error})
        })
    }
}

export const setAdminPrivileges = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var setAdminPrivileges = firebase.functions().httpsCallable('setAdminPrivileges')
        setAdminPrivileges(uid).then(() => {
            dispatch({ type: 'SET_ADMIN_PRIVS_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'SET_ADMIN_PRIVS_ERROR', error})
        })
    }
}

export const setSuperAdminPrivileges = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var setSuperAdminPrivileges = firebase.functions().httpsCallable('setSuperAdminPrivileges')
        setSuperAdminPrivileges(uid).then(() => {
            dispatch({ type: 'SET_SUPER_ADMIN_PRIVS_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'SET_SUPER_ADMIN_PRIVS_ERROR', error})
        })
    }
}

export const deleteUser = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var deleteUser = firebase.functions().httpsCallable('deleteUser')
        deleteUser(uid).then(() => {
            dispatch({ type: 'DELETE_USER_SUCCESS' })
        }).catch((error) => {
            dispatch({ type: 'DELETE_USER_ERROR', error})
        })
    }
}

export const createUser = (email) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        // generates a random alphanumeric string
        //var randomPass = Math.random().toString(36)
        
        //async work here
        const firebase = getFirebase()
        var createUser = firebase.functions().httpsCallable('createUser')
        createUser(email).then((resp) => {
            dispatch({ type: 'CREATE_USER_SUCCESS' , resp})
        }).catch((error) => {
            dispatch({ type: 'CREATE_USER_ERROR', error})
        })
    }
}

export const sendPasswordResetEmail = (email) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            dispatch({ type: 'SEND_PASSWORD_RESET_EMAIL_SUCCESS' })
        })
        .catch((error) => {
            dispatch({ type: 'SEND_PASSWORD_RESET_EMAIL_ERROR', error})
        });
    }
}