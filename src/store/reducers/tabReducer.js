import moment from 'moment';

const initState = {
    day: moment().format('DD/MM/YYYY'),
    tab: 1
}

const tabReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_TAB':
            //console.log('tab switched', action.tab)
            return Object.assign({}, state, {
                tab: action.tab
            })
        default:
            return state
    }
}

export default tabReducer