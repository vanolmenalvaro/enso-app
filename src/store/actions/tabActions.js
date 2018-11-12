export const switchDay = (day) => {
    return(dispatch, getState) => {
        dispatch({ type: 'SWITCH_DAY', day})
    }
}

export const switchTab = (tab) => {
    return(dispatch, getState) => {
        dispatch({ type: 'SWITCH_TAB', tab})
    }
}