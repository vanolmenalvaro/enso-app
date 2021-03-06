const date = new Date()
date.setDate(1)

// Get the first Monday in the month
while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1)
}

let month = date.getMonth()+1
let day = date.getDate()

if (month < 10) month = '0' + month
if (day < 10) day = '0' + day

const firstDay = date.getFullYear()+"-"+month+"-"+day

const initState = {
    cycles: [{
        user: {},
        isInitState: true,
        content: {
            initialDate: firstDay,
            blocks: [],
            program: {}
        }
    }],
    currCycle: {
        user: {},
        isInitState: true,
        content: {
            initialDate: firstDay,
            blocks: [],
            program: {}
        }
    },
    templates : {
        exerciseTemplates: [],
        blockTemplates: []
    }
    
}

let templatesCopy, newCycles

const programReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CYCLE_SUCCESS':
            return {
                ...state,
                cycles: [
                    action.cycle,
                    ...state.cycles                    
                ],
                currCycle: action.cycle
            }
        case 'CREATE_CYCLE_ERROR':
            console.log('create cycle error', action.error)
            return state
        case 'CLEAR_CURR_CYCLE_SUCCESS':
            return {
                ...state,
                currCycle: initState.currCycle
                }
        case 'UPDATE_CYCLE_SUCCESS':
            newCycles = []
            state.cycles.forEach(cycle => {
                if(!cycle.id){
                    newCycles.push(action.cycle)
                } else {
                    newCycles.push(cycle)
                }
            })
            return {
                ...state,
                cycles: newCycles,
                currCycle: action.cycle
            }
        case 'UPDATE_CYCLE_ERROR':
            console.log('update cycle error', action.error)
            return state
        case 'GET_CYCLE_SUCCESS':
            if(action.cycle.length !== 0){
                return {
                    ...state,
                    currCycle: action.cycle
                }
            } else {
                return {
                    ...state,
                    currCycle: initState.currCycle
                }
            }
        case 'GET_CYCLE_ERROR':
            console.log('getting cycle error', action.error)
            return state
        case 'DELETE_CYCLE_SUCCESS':
            newCycles = state.cycles.filter(cycle => cycle.id !== action.id)
            return {
                ...state,
                cycles: newCycles
            }
        case 'DELETE_CYCLE_ERROR':
            console.log('deleting cycle error', action.error)
            return state
        case 'GET_CYCLES_SUCCESS':
            if(action.data.length !== 0){
                return {
                    ...state,
                    cycles: action.data
                }
            } else {
                return {
                    ...state,
                    cycles: initState.cycles
                }
            }
        case 'GET_CYCLES_ERROR':
            console.log('getting cycles error', action.error)
            return state
        case 'GET_EXERCISE_TEMPLATES_SUCCESS':
            return {
                ...state,
                templates: {
                    ...state.templates,
                    exerciseTemplates: action.data
                }
            }
        case 'GET_EXERCISE_TEMPLATES_ERROR':
            console.log('getting exercise templates error', action.error)
            return state
        case 'CREATE_EXERCISE_TEMPLATE_SUCCESS':
            console.log('created exercise template', action.exerciseTemplate)
            return {
                ...state,
                templates: {
                    ...state.templates,
                    exerciseTemplates: [
                        ...state.templates.exerciseTemplates,
                        action.exerciseTemplate,        
                    ]
                }
            }
        case 'CREATE_EXERCISE_TEMPLATE_ERROR':
            console.log('create exercise template error', action.error)
            return state
        case 'UPDATE_EXERCISE_TEMPLATE_SUCCESS':
            templatesCopy = []
            state.templates.exerciseTemplates.forEach(template => {
                if(template.exerciseName === action.exerciseTemplate.exerciseName){
                   templatesCopy.push(action.exerciseTemplate) //switch old template with the new one
                } else {
                    templatesCopy.push(template)
                }
            }) 
            return {
                ...state,
                templates: {
                    ...state.templates,
                    exerciseTemplates: templatesCopy
                }
            }  
        case 'UPDATE_EXERCISE_TEMPLATE_ERROR':
            console.log('update exercise template error', action.error)
            return state
        case 'DELETE_EXERCISE_TEMPLATE_SUCCESS':
            console.log('deleted exercise template', action.exerciseName)
            templatesCopy = []
            state.templates.exerciseTemplates.forEach(template => {
                if(template.exerciseName === action.exerciseName){
                    //don't push the deleted template
                } else {
                    templatesCopy.push(template)
                }
            }) 
            return {
                ...state,
                templates: {
                    ...state.templates,
                    exerciseTemplates: templatesCopy
                }
            }  
        case 'DELETE_EXERCISE_TEMPLATE_ERROR':
            console.log('delete exercise template error', action.error)
            return state
        case 'GET_BLOCK_TEMPLATES_SUCCESS':
            return {
                ...state,
                templates: {
                    ...state.templates,
                    blockTemplates: action.data
                }
            }
        case 'GET_BLOCK_TEMPLATES_ERROR':
            console.log('getting block templates error', action.error)
            return state
        case 'CREATE_BLOCK_TEMPLATE_SUCCESS':
            console.log('set block template', action.blockTemplate)
            return {
                ...state,
                templates: {
                    ...state.templates,
                    blockTemplates: [
                        ...state.templates.blockTemplates,
                        action.blockTemplate                        
                    ]
                }
            }
        case 'CREATE_BLOCK_TEMPLATE_ERROR':
            console.log('set block template error', action.error)
            return state

        case 'UPDATE_BLOCK_TEMPLATE_SUCCESS':
            console.log('update block template', action.blockTemplate)
            templatesCopy = []
            state.templates.blockTemplates.forEach(template => {
                if(template.name === action.blockTemplate.name){
                   templatesCopy.push(action.blockTemplate) //switch old template with the new one
                } else {
                    templatesCopy.push(template)
                }
            }) 
            return {
                ...state,
                templates: {
                    ...state.templates,
                    blockTemplates: templatesCopy
                }
            }  
        case 'UPDATE_BLOCK_TEMPLATE_ERROR':
            console.log('update block template error', action.error)
            return state
        case 'DELETE_BLOCK_TEMPLATE_SUCCESS':
            console.log('deleted block template', action.name)
            templatesCopy = []
            state.templates.blockTemplates.forEach(template => {
                if(template.name === action.name){
                    //don't push the deleted template
                } else {
                    templatesCopy.push(template)
                }
            }) 
            return {
                ...state,
                templates: {
                    ...state.templates,
                    blockTemplates: templatesCopy
                }
            }  
        case 'DELETE_BLOCK_TEMPLATE_ERROR':
            console.log('delete block template error', action.error)
            return state
        default:
            return state
    }
}

export default programReducer