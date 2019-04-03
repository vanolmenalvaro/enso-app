const initState = {
    reports: []    
}

let newReports

const reportReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_REPORT_SUCCESS':
            return {
                reports: [
                    action.report,
                    ...state.reports                    
                ]
            }
        case 'CREATE_REPORT_ERROR':
            console.log('create report error', action.error)
            return state
        case 'UPDATE_REPORT_SUCCESS':
            newReports = []
            state.reports.forEach(report => {
                if(!report.id){
                    newReports.push(action.report)
                } else {
                    newReports.push(report)
                }
            })
            return {
                reports: newReports
            }
        case 'UPDATE_REPORT_ERROR':
            console.log('update report error', action.error)
            return state
        case 'DELETE_REPORT_SUCCESS':
            newReports = state.reports.filter(report => report.id !== action.id)
            return {
                reports: newReports
            }
        case 'DELETE_REPORT_ERROR':
            console.log('deleting report error', action.error)
            return state
        case 'GET_REPORTS_SUCCESS':
            if(action.data.length !== 0){
                return {
                    reports: action.data
                }
            } else {
                return {
                    reports: initState.reports
                }
            }
        case 'GET_REPORTS_ERROR':
            console.log('getting reports error', action.error)
            return state
        default:
            return state
    }
}

export default reportReducer