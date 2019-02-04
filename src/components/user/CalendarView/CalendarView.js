import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import { compose } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'

import DayDetails from './DayDetails'
import constants from '../../../config/constants'
import { switchTab } from '../../../store/actions/tabActions'
import { getCycles } from '../../../store/actions/programActions'

const styles = theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    border: '1px solid',
    backgroundColor: 'white',
    marginRight: 8,
    marginBottom: 65
  },
  headerRow: {
    display: 'table',
    width: '100%',
    height: 20,
    tableLayout: 'fixed',
  },
  row: {
    display: 'table',
    width: '100%',
    minHeight: `calc((100% - 19px) / 6)`,
    tableLayout: 'fixed',
  },
  cell: {
    width: `calc(100% / 7)`,
    display: 'table-cell',
    textAlign: 'center',
    border: '1px solid #474747'
  },
  typography: {
    fontSize: 14,
  }
});

class CalendarView extends Component {

    createCycle = () => {
        const { classes } = this.props;
        let weeks = []
        let dayNumber = ''
        let blocks = {}
        
        // Outer loop to create week row
        for (let i = 0; i < 6; i++) {
        let days = []

        //Inner loop to create each day
        for (let j = 0; j < 7; j++) { 
            if(this.props.cycle.content){
                dayNumber = moment(this.props.cycle.content.initialDate, constants.dateFormat).add(j + i * 7, 'days').format('DD/MM/YYYY')
                blocks = this.props.cycle.content.program[dayNumber] 
            }
            days.push(<DayDetails initialDate={this.props.cycle.content.initialDate} day={dayNumber} key={j + i * 7} blocks={blocks} switchTab={this.props.switchTab} edit={this.props.edit} />)
        }
        //Create the week and add the days
        weeks.push(
            <div className={classes.row} key={i}>
                {days}
            </div>)
        }
        return weeks
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if(this.props.uid) {
            this.props.getCycles(this.props.uid)
        } else {
            this.props.getCycles(this.props.auth.uid)
        }
    }

    render() {
        const { classes } = this.props;

        return (
        <Fragment>
            <div className={classes.paper}>
                <div className={classes.headerRow}>
                    {constants.weekDays.map(name => (
                        <div className={classes.cell} key={name}>
                            <Typography variant="caption" noWrap>
                                {name}
                            </Typography>
                        </div>
                    ))}
                </div>
                {this.createCycle()}
            </div>         
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
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(CalendarView);
