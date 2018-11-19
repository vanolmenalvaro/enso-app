export const getUsers = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        const firebase = getFirebase()
        var listAllUsers = firebase.functions().httpsCallable('listAllUsers')
        listAllUsers().then((response) => {
            dispatch({ type: 'GET_USERS', users: response.data.users })
        }).catch(function(error) {
            dispatch({ type: 'GET_USERS_ERROR', error})
        })
    }
}