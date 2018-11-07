const initState = {
    initialDate: "29/10/2018",
    cycle: [
        [
            {
            name: "Fuerza Tren Inferior",
            color: "#e91e63"
            },{
            name: "Protocolo Squat 2.0",
            color: "#8bc34a"
            },{
            name: "Handstands",
            color: "#673ab7"
            },{
            name: "Movilidad 1",
            color: "#ff9800"
            }
        ],
        [
            {
            name: "Fuerza Tren Superior",
            color: "#2196f3"
            },{
            name: "Protocolo Squat 2.0",
            color: "#8bc34a"
            },{
            name: "Core",
            color: "#009688"
            },{
            name: "Handstands",
            color: "#673ab7"
            }
        ],
        [],
        [],
        [
            {
            name: "Fuerza Tren Inferior",
            color: "#e91e63"
            },{
            name: "Protocolo Squat 2.0",
            color: "#8bc34a"
            },{
            name: "Handstands",
            color: "#673ab7"
            },{
            name: "Movilidad 1",
            color: "#ff9800"
            }
        ],
        [
            {
            name: "Fuerza Tren Superior",
            color: "#2196f3"
            },{
            name: "Protocolo Squat 2.0",
            color: "#8bc34a"
            },{
            name: "Core",
            color: "#009688"
            },{
            name: "Handstands",
            color: "#673ab7"
            },{
                name: "Movilidad 1",
                color: "#ff9800"
            }
        ],
        []
    ]
}

const cycleReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CYCLE':
            console.log('created cycle', action.cycle)
            break
        default:
            console.log('cycleReducer called with unknown action type')
    }
    return state
}

export default cycleReducer