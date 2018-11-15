import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import { compose } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment';

import DayDetails from './DayDetails'
import constants from '../../../config/constants'
import { getCycle } from '../../../store/actions/cycleActions'
import { switchTab } from '../../../store/actions/tabActions'

const styles = theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //minHeight: '100%',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    border: '1px solid',
    backgroundColor: 'white',
    position: 'absolute',
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

class Calendar extends Component {

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
            if(this.props.initialDate && this.props.program){
                dayNumber = moment(this.props.initialDate, constants.dateFormat).add(j + i * 7, 'days').format('DD/MM/YYYY')
                if(this.props.program){
                    blocks = this.props.program[dayNumber]
                }
            }
            days.push(<DayDetails day={dayNumber} key={j + i * 7} blocks={blocks} switchTab={this.props.switchTab}/>)
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
        this.props.getCycle()
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

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

    return{
        initialDate: state.cycle.initialDate,
        program: state.cycle.content.program,
        blocks: state.cycle.content.blocks,
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        getCycle: () => dispatch(getCycle()),
        switchTab: (day, props) => dispatch(switchTab(day, props))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Calendar);
