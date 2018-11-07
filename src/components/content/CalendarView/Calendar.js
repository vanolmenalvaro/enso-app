import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import DayDetails from './DayDetails'
import constants from '../../../constants'

const styles = theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    //minHeight: '100%',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    border: '1px solid',
    borderBottom: '2px solid #474747',
    backgroundColor: 'white'
    
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
  cellLastRow: {
    width: `calc(100% / 7)`,
    display: 'table-cell',
    textAlign: 'center',
    border: '1px solid #474747',
    borderBottom: '0px'
  },
  typography: {
    fontSize: 14,
  }
});

class Calendar extends Component {
    state = {}

    //mock date, real one should be fetched
    initialDate="29/10/2018"

    //should be fetched
    exercises=[
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
    
    createCycle = () => {
        const { classes } = this.props;
        let weeks = []
    
        // Outer loop to create week row
        for (let i = 0; i < 6; i++) {
          let days = []
          //Inner loop to create each day
          for (let j = 0; j < 7; j++) {   
            days.push(<DayDetails day={j + i * 7} rowNum={i} initialDate={this.initialDate} key={j + i * 7} exercises={this.exercises[j]} />)
          }
          //Create the week and add the days
          weeks.push(
            <div className={classes.row} key={i}>
                {days}
            </div>)
          
        }
        return weeks
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

export default withStyles(styles)(Calendar);
