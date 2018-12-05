export const createCycle = (cycle) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('cycles').add(cycle).then(() => {
            dispatch({ type: 'CREATE_CYCLE_SUCCESS', cycle})
        }).catch((err) => {
            dispatch({ type: 'CREATE_CYCLE_ERROR', err})
        })
    }
}

export const getCycle = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        let data = []
        const firestore = getFirestore()
        firestore.collection('cycles').where("current", "==", true).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            dispatch({ type: 'GET_CYCLE_SUCCESS', cycle: data[0] })
        }).catch((err) => {
            dispatch({ type: 'GET_CYCLE_ERROR', err})
        })
    }
}

export const getExerciseTemplates = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        let data = []
        const firestore = getFirestore()
        firestore.collection('exerciseTemplates').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            dispatch({ type: 'GET_EXERCISE_TEMPLATES_SUCCESS', data })
        }).catch((err) => {
            dispatch({ type: 'GET_EXERCISE_TEMPLATES_ERROR', err })
        })
    }
}

export const createExerciseTemplate = (exerciseTemplate) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('exerciseTemplates').add(exerciseTemplate).then((result) => {
            firestore.collection('exerciseTemplates').doc(result.id).set({ 
                ...exerciseTemplate,
                uid: result.id 
            }).then(() => dispatch({ type: 'CREATE_EXERCISE_TEMPLATE_SUCCESS', exerciseTemplate, result}) )
        }).catch((error) => {
            dispatch({ type: 'CREATE_EXERCISE_TEMPLATE_ERROR', error})
        })
    }
}

export const updateExerciseTemplate = (exerciseTemplate) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('exerciseTemplates').doc(exerciseTemplate.uid).set(exerciseTemplate).then(() => {
            dispatch({ type: 'UPDATE_EXERCISE_TEMPLATE_SUCCESS', exerciseTemplate})
        }).catch((error) => {
            dispatch({ type: 'UPDATE_EXERCISE_TEMPLATE_ERROR', error})
        })
    }
}

export const deleteExerciseTemplate = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('exerciseTemplates').doc(uid).delete().then(() => {
            dispatch({ type: 'DELETE_EXERCISE_TEMPLATE_SUCCESS', uid})
        }).catch((error) => {
            dispatch({ type: 'DELETE_EXERCISE_TEMPLATE_ERROR', error})
        })
    }
}

export const getBlockTemplates = () => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        let data = []
        const firestore = getFirestore()
        firestore.collection('blockTemplates').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            dispatch({ type: 'GET_BLOCK_TEMPLATES_SUCCESS', data })
        }).catch((err) => {
            dispatch({ type: 'GET_BLOCK_TEMPLATES_ERROR', err })
        })
    }
}

export const createBlockTemplate = (blockTemplate) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('blockTemplates').add(blockTemplate).then((result) => {
            firestore.collection('blockTemplates').doc(result.id).set({ 
                ...blockTemplate,
                uid: result.id 
            }).then(() => dispatch({ type: 'CREATE_BLOCK_TEMPLATE_SUCCESS', blockTemplate, result}) )
        }).catch((error) => {
            dispatch({ type: 'CREATE_BLOCK_TEMPLATE_ERROR', error})
        })
    }
}