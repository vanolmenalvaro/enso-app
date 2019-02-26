import React, { Component, Fragment } from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withStyles } from '@material-ui/core/styles'

import Calendar from './Calendar'
import ExerciseCard from '../TrainingView/ExerciseCard'
import { switchTab } from '../../../store/actions/tabActions'
import { getCycles } from '../../../store/actions/programActions'

const styles = (theme) => ({
    vertList: {
        position: 'absolute',
        right: 5,
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        overflowY: 'auto',
        overflowX: 'hidden',
        whiteSpace: 'nowrap',
        height: `calc(100% - 68px)`,
        width: '27.5vw'
    },
    horList: {
        position: 'absolute',
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        overflowX: 'scroll',
        whiteSpace: 'nowrap',
        marginBottom: 5,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 63
        }
    },
    parent: {
        position: 'relative',
        marginRight: 8
    }
});

class CalendarView extends Component {
    componentDidMount() {   
        if(this.props.uid) {
            this.props.getCycles(this.props.uid)
        } else {
            this.props.getCycles(this.props.auth.uid)
        }
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    
    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const { classes } = this.props

        return (
            <Fragment >
                <Grid container direction="row" spacing={8}>
                    <Grid item xs={12} lg={8}>
                        <Calendar cycle={this.props.cycle} switchTab={this.props.switchTab} />
                    </Grid>
                    <Hidden mdDown>
                        <Grid item xs={12} lg={4} className={classes.vertList}>
                                {
                                    this.props.cycle && Object.keys(this.props.cycle.content.blocks).map(blockId => {
                                        let block = this.props.cycle.content.blocks[blockId]
                                        return ( 
                                                <ExerciseCard 
                                                    key={block.name} 
                                                    name={block.name} 
                                                    shortName={block.shortName} 
                                                    color={block.color} 
                                                    exercises={block.exercises}
                                                />
                                        )
                                    })
                                }
                        </Grid>
                    </Hidden>
                    <Hidden lgUp>
                        <Grid item xs={12} className={classes.parent}>
                            <Grid container spacing={8} className={classes.horList}>
                                {
                                    this.props.cycle && Object.keys(this.props.cycle.content.blocks).map(blockId => {
                                        let block = this.props.cycle.content.blocks[blockId]
                                        return ( 
                                            <div key={block.name+'frag'} style={{margin: 3}}>
                                                <ExerciseCard 
                                                    key={block.name+'block'} 
                                                    name={block.name} 
                                                    shortName={block.shortName} 
                                                    color={block.color} 
                                                    exercises={block.exercises}
                                                    style={{margin: 4}}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </Grid>
                        </Grid>  
                    </Hidden>
                </Grid>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        cycle: state.program.cycles[0],
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCycles: (uid) => dispatch(getCycles(uid)),
        switchTab: (day, props, route) => dispatch(switchTab(day, props, route))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(CalendarView);
