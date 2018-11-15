export const switchTab = (tab, props) => {
    return(dispatch, getState) => {
        dispatch({ type: 'SWITCH_TAB', tab})
        
        if(props){
            switch (tab) {
            case 0:
                return props.history.push('/app/chat')
            case 1:
                return props.history.push('/app/calendar')
            case 3:
                return props.history.push('/app/calendar/'+props.day.replace(/\//g, '-'))
            case 2:
                return props.history.push('/app/tools')
            default:
                return
            }
        }
    }
}