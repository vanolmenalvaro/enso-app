import moment from 'moment';

const initState = {
    day: moment().format('DD/MM/YYYY'),
    tab: 1
}

const tabReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SWITCH_DAY':
            //console.log('day switched', action.day)
            return Object.assign({}, state, {
                day: action.day,
                tab: 2
            })
        case 'SWITCH_TAB':
            //console.log('tab switched', action.tab)
            if(action.tab === 1) {
                return Object.assign({}, state, {
                    tab: action.tab,
                    day: moment().format('DD/MM/YYYY')
                })
            }
            else {
                return Object.assign({}, state, {
                    tab: action.tab
                })
            }
            
        default:
            return state
    }
}

export default tabReducer