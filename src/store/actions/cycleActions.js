export const createCycle = (cycle) => {
    return(dispatch, getState) => {
        //async work here
        dispatch({ type: 'CREATE_CYCLE', cycle})
    }
}