const initState = {
    id: '123456',
    initialDate: '29/10/2018',
    user: {
        id: '74366668D',
        name: 'Álvaro'
    },
    content: {
        blocks: [
            {
                name: 'Fuerza Tren Superior',
                shortName: 'F.T.Sup.',
                color: '#2196f3',
                exercises: [
                    {
                        block: 'A',
                        name: 'Flexiones en anillas',
                        video: 'urlhere',
                        sets : 2,
                        reps: 10
                    },{
                        block: 'B',
                        name: 'Dips en anillas',
                        video: 'urlhere',
                        sets : 6,
                        reps: 4
                    },{
                        block: 'C',
                        name: 'Dominadas en anillas',
                        video: 'urlhere',
                        sets : 5,
                        reps: 5
                    },{
                        block: 'D',
                        name: 'Cuelgue activo a dos manos',
                        video: 'urlhere',
                        sets : 2,
                        reps: 8,
                        tempo: '(5s)'
                    }
                ]
            },{
                name: 'Fuerza Tren Inferior',
                shortName: 'F.T.Inf.',
                color: '#e91e63',
                exercises: [
                    {
                        block: 'A',
                        name: 'Back squat',
                        video: 'urlhere',
                        sets : 5,
                        reps: 5,
                        kgs: 75
                    },{
                        block: 'B',
                        name: 'Split squat',
                        video: 'urlhere',
                        sets : 3,
                        reps: 8,
                        kgs: 35
                    }
                ]
            },{
                name: 'Protocolo Squat 2.0',
                shortName: 'P.S. 2',
                color: '#8bc34a'
            },{
                name: 'Handstands',
                shortName: 'Hs.',
                color: '#673ab7'
            },{
                name: 'Movilidad 1',
                shortName: 'Mov. 1',
                color: '#ff9800'
            },{
                name: 'Core',
                shortName: 'Core',
                color: '#009688'
            }
        ],
        program: {
            '29/10/2018': [
                {
                    name: 'Protocolo Squat 2.0',
                    shortName: 'P.S. 2',
                    color: '#8bc34a'
                },{
                    name: 'Handstands',
                    shortName: 'Hs.',
                    color: '#673ab7'
                },{
                    name: 'Fuerza Tren Superior',
                    shortName: 'F.T.Sup.',
                    color: '#2196f3'
                },{
                    name: 'Core',
                    shortName: 'Core',
                    color: '#009688'
                }
            ],
            '30/10/2018': [
                {
                    name: 'Protocolo Squat 2.0',
                    shortName: 'P.S. 2',
                    color: '#8bc34a'
                },{
                    name: 'Handstands',
                    shortName: 'Hs.',
                    color: '#673ab7'
                },{
                    name: 'Fuerza Tren Inferior',
                    shortName: 'F.T.Inf.',
                    color: '#e91e63'
                },{
                    name: 'Movilidad 1',
                    shortName: 'Mov. 1',
                    color: '#ff9800'
                }
            ],
            '02/11/2018': [
                {
                    name: 'Protocolo Squat 2.0',
                    shortName: 'P.S. 2',
                    color: '#8bc34a'
                },{
                    name: 'Handstands',
                    shortName: 'Hs.',
                    color: '#673ab7'
                },{
                    name: 'Fuerza Tren Superior',
                    shortName: 'F.T.Sup.',
                    color: '#2196f3'
                },{
                    name: 'Core',
                    shortName: 'Core',
                    color: '#009688'
                }
            ],
            '03/11/2018': [
                {
                    name: 'Protocolo Squat 2.0',
                    shortName: 'P.S. 2',
                    color: '#8bc34a'
                },{
                    name: 'Handstands',
                    shortName: 'Hs.',
                    color: '#673ab7'
                },{
                    name: 'Fuerza Tren Inferior',
                    shortName: 'F.T.Inf.',
                    color: '#e91e63'
                },{
                    name: 'Movilidad 1',
                    shortName: 'Mov. 1',
                    color: '#ff9800'
                }
            ]
        }
    }
}

const cycleReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_CYCLE':
            console.log('created cycle', action.cycle)
            break
        default:
            //console.log('cycleReducer called with unknown action type')
    }
    return state
}

export default cycleReducer