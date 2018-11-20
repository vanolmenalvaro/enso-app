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
        enableUser(uid).then((response) => {
            dispatch({ type: 'ENABLE_USER_SUCCESS', data: response.data })
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
        disableUser(uid).then((response) => {
            dispatch({ type: 'DISABLE_USER_SUCCESS', data: response.data })
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
        setUserPrivileges(uid).then((response) => {
            dispatch({ type: 'SET_USER_PRIVS_SUCCESS', data: response.data })
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
        setAdminPrivileges(uid).then((response) => {
            dispatch({ type: 'SET_ADMIN_PRIVS_SUCCESS', data: response.data })
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
        setSuperAdminPrivileges(uid).then((response) => {
            dispatch({ type: 'SET_SUPER_ADMIN_PRIVS_SUCCESS', data: response.data })
        }).catch((error) => {
            dispatch({ type: 'SET_SUPER_ADMIN_PRIVS_ERROR', error})
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