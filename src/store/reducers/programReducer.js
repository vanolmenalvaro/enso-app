 const initState = {
    cycle: {
        initialDate: '22/10/2018',
        user: {
        },
        current: true,
        content: {
            blocks: [],
            program: {}
        }
    },
    templates : {
        openExerciseTemplateDialog: false,
        openBlockTemplateDialog: false,
        exerciseTemplates: [],
        blockTemplates: []
    }
    
}

var templatesCopy

const programReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CYCLE_SUCCESS':
            return state
        case 'CREATE_CYCLE_ERROR':
            console.log('create cycle error', action.error)
            return state
        case 'GET_CYCLE_SUCCESS':
            return {
                ...state,
                cycle: {
                    program: {...action.cycle.program},
                    blocks: {...action.cycle.blocks},
                    ...action.cycle
                } 
            }
        case 'GET_CYCLE_ERROR':
            console.log('getting cycle error', action.error)
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
                        {
                            ...action.exerciseTemplate,
                            uid: action.result.id //set the creation uid to redux state
                        }
                        
                    ]
                }
            }
        case 'CREATE_EXERCISE_TEMPLATE_ERROR':
            console.log('create exercise template error', action.error)
            return state
        case 'UPDATE_EXERCISE_TEMPLATE_SUCCESS':
            templatesCopy = []
            state.templates.exerciseTemplates.forEach(template => {
                if(template.uid === action.exerciseTemplate.uid){
                   templatesCopy.push(action.exerciseTemplate) //switch old themplate with the new one
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
            templatesCopy = []
            state.templates.exerciseTemplates.forEach(template => {
                if(template.uid === action.uid){
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
            console.log('created block template', action.blockTemplate)
            return {
                ...state,
                templates: {
                    ...state.templates,
                    blockTemplates: [
                        ...state.templates.blockTemplates,
                        {
                            ...action.blockTemplate,
                            uid: action.result.id //set the creation uid to redux state
                        }
                        
                    ]
                }
            }
        case 'CREATE_BLOCK_TEMPLATE_ERROR':
            console.log('create block template error', action.error)
            return state
        default:
            return state
    }
}

export default programReducer