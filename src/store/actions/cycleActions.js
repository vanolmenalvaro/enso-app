export const createCycle = (cycle) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
         const firestore = getFirestore()
         firestore.collection('cycles').add(cycle).then(() => {
             dispatch({ type: 'CREATE_CYCLE', cycle})
         }).catch((err) => {
             dispatch({ type: 'CREATE_CYCLE_ERROR', err})
         })
    }
}

export const getCycle = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        //async work here
        let data = []
         const firestore = getFirestore()
         firestore.collection('cycles').where("current", "==", true).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            dispatch({ type: 'GET_CYCLE', cycle: data[0] })
         }).catch((err) => {
             dispatch({ type: 'GET_CYCLE_ERROR', err})
         })
    }
}