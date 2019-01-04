export const createCycle = (cycle) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('cycles').add(cycle).then(() => {
            dispatch({ type: 'CREATE_CYCLE_SUCCESS', cycle})
        }).catch((error) => {
            dispatch({ type: 'CREATE_CYCLE_ERROR', error})
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
        }).catch((error) => {
            dispatch({ type: 'GET_CYCLE_ERROR', error})
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
        }).catch((error) => {
            dispatch({ type: 'GET_EXERCISE_TEMPLATES_ERROR', error })
        })
    }
}

export const setExerciseTemplate = (exerciseTemplate) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        var ref = firestore.collection('exerciseTemplates').doc(exerciseTemplate.exerciseName)
        
        ref.get().then((doc) => {
            if (doc.exists) {
                ref.set(exerciseTemplate).then(() => {
                    dispatch({ type: 'UPDATE_EXERCISE_TEMPLATE_SUCCESS', exerciseTemplate})
                }).catch((error) => {
                    dispatch({ type: 'UPDATE_EXERCISE_TEMPLATE_ERROR', error})
                })
            } else {
                ref.set(exerciseTemplate).then(() => {
                    dispatch({ type: 'CREATE_EXERCISE_TEMPLATE_SUCCESS', exerciseTemplate})
                }).catch((error) => {
                    dispatch({ type: 'CREATE_EXERCISE_TEMPLATE_ERROR', error})
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    }
}

export const deleteExerciseTemplate = (exerciseName) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('exerciseTemplates').doc(exerciseName).delete().then(() => {
            dispatch({ type: 'DELETE_EXERCISE_TEMPLATE_SUCCESS', exerciseName})
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
        }).catch((error) => {
            dispatch({ type: 'GET_BLOCK_TEMPLATES_ERROR', error })
        })
    }
}

export const setBlockTemplate = (blockTemplate) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        var ref = firestore.collection('blockTemplates').doc(blockTemplate.name)

        ref.get().then((doc) => {
            if (doc.exists) {
                ref.set(blockTemplate).then(() => {
                    dispatch({ type: 'UPDATE_BLOCK_TEMPLATE_SUCCESS', blockTemplate})
                }).catch((error) => {
                    dispatch({ type: 'UPDATE_BLOCK_TEMPLATE_ERROR', error})
                })
            } else {
                ref.set(blockTemplate).then(() => {
                    dispatch({ type: 'CREATE_BLOCK_TEMPLATE_SUCCESS', blockTemplate})
                }).catch((error) => {
                    dispatch({ type: 'CREATE_BLOCK_TEMPLATE_ERROR', error})
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        })
    }
}

export const deleteBlockTemplate = (name) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('blockTemplates').doc(name).delete().then(() => {
            dispatch({ type: 'DELETE_BLOCK_TEMPLATE_SUCCESS', name})
        }).catch((error) => {
            dispatch({ type: 'DELETE_BLOCK_TEMPLATE_ERROR', error})
        })
    }
}