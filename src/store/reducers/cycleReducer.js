 const initState = {
     initialDate: '22/10/2018',
     user: {
     },
     current: true,
     content: {
         blocks: [],
         program: {}
     }
 }

const cycleReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CYCLE':
            //console.log('created cycle', action.cycle)
            return state
        case 'CREATE_CYCLE_ERROR':
            console.log('create cycle error', action.error)
            return state
        case 'GET_CYCLE':
            //console.log('got cycle', action.cycle)
            return Object.assign({}, state, {
                program: {...action.cycle.program},
                blocks: {...action.cycle.blocks},
                ...action.cycle,
            })
        case 'GET_CYCLE_ERROR':
            console.log('getting cycle error', action.error)
            return state
        default:
            return state
    }
}

export default cycleReducer