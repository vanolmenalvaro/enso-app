export const switchTab = (tab, props, route) => {
    return(dispatch, getState) => {     
        dispatch({ type: 'SWITCH_TAB', tab})
        if(props && route){
            return props.history.push(route)
        }
    }
}