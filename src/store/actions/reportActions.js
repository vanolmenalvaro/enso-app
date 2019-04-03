export const setReport = (report) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        var ref
        
        if(report.id && report.id !== '') {
            ref = firestore.collection('reports').doc(report.id)

            ref.get().then((doc) => {
                if (doc.exists) {
                    ref.set(report).then(() => {
                        dispatch({ type: 'UPDATE_REPORT_SUCCESS', report})
                    }).catch((error) => {
                        dispatch({ type: 'UPDATE_REPORT_ERROR', error})
                    })
                } else {
                    ref.set(report).then(() => {
                        dispatch({ type: 'CREATE_REPORT_SUCCESS', report})
                    }).catch((error) => {
                        dispatch({ type: 'CREATE_REPORT_ERROR', error})
                    })
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
        } else {
            ref = firestore.collection('reports')

            ref.add(report).then((resp) => {
                dispatch({ type: 'CREATE_REPORT_SUCCESS', report})
                let newReport = {
                    ...report,
                    id: resp.id
                }

                ref = firestore.collection('reports').doc(resp.id)

                ref.update(newReport).then(() => {
                    dispatch({ type: 'UPDATE_REPORT_SUCCESS', report: newReport})
                }).catch((error) => {
                    dispatch({ type: 'UPDATE_REPORT_ERROR', error})
                })
            }).catch((error) => {
                dispatch({ type: 'CREATE_REPORT_ERROR', error})
            })
        }
    }
}

export const deleteReport = (id) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore()
        firestore.collection('reports').doc(id).delete().then(() => {
            dispatch({ type: 'DELETE_REPORT_SUCCESS', id})
        }).catch((error) => {
            dispatch({ type: 'DELETE_REPORT_ERROR', error})
        })
    }
}

export const getReports = (uid) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        let data = []
        const firestore = getFirestore()
        firestore.collection('reports').where("uid", "==", uid).orderBy("date", "desc").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            dispatch({ type: 'GET_REPORTS_SUCCESS', data })
        }).catch((error) => {
            dispatch({ type: 'GET_REPORTS_ERROR', error})
        })
    }
}