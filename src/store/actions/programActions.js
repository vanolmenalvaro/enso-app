export const setCycle = (cycle) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        var ref
        
        if(cycle.id) {
            ref = firestore.collection('cycles').doc(cycle.id)

            ref.get().then((doc) => {
                if (doc.exists) {
                    ref.set(cycle).then(() => {
                        dispatch({ type: 'UPDATE_CYCLE_SUCCESS', cycle})
                    }).catch((error) => {
                        dispatch({ type: 'UPDATE_CYCLE_ERROR', error})
                    })
                } else {
                    ref.set(cycle).then(() => {
                        dispatch({ type: 'CREATE_CYCLE_SUCCESS', cycle})
                    }).catch((error) => {
                        dispatch({ type: 'CREATE_CYCLE_ERROR', error})
                    })
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
        } else {
            ref = firestore.collection('cycles')

            ref.add(cycle).then((resp) => {
                
                let newCycle = {
                    ...cycle,
                    id: resp.id
                }

                ref = firestore.collection('cycles').doc(resp.id)

                ref.update(newCycle).then(() => {
                    dispatch({ type: 'UPDATE_CYCLE_SUCCESS', cycle: newCycle})
                }).catch((error) => {
                    dispatch({ type: 'UPDATE_CYCLE_ERROR', error})
                })
            }).catch((error) => {
                dispatch({ type: 'CREATE_CYCLE_ERROR', error})
            })
        }
    }
}

export const deleteCycle = (id) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('cycles').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_CYCLE_SUCCESS', id})
        }).catch((error) => {
            dispatch({ type: 'DELETE_CYCLE_ERROR', error})
        })
    }
}

export const clearCurrentCycle = () => {
    return(dispatch) => {
        dispatch({ type: 'CLEAR_CURR_CYCLE_SUCCESS' })
    }
}

export const getCycles = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        let data = []
        const firestore = getFirestore()
        firestore.collection('cycles').where("user.uid", "==", uid).orderBy("user.ref", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            dispatch({ type: 'GET_CYCLES_SUCCESS', data })
        }).catch((error) => {
            dispatch({ type: 'GET_CYCLES_ERROR', error})
        })
    }
}

export const getCycle = (id) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('cycles').doc(id).get().then(doc => {
            if (doc.exists) {
                dispatch({ type: 'GET_CYCLE_SUCCESS', cycle: doc.data() })
            }            
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