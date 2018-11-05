import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import DayDetails from './DayDetails'

const styles = theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100%',
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
    height: `calc((100% - 19px) / 6)`,
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

    //mock date, real one should come as props
    initialDate="1/11/2018"
    dateFormat="DD-MM-YYYY"

    weekDays = [ "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM" ]
    
    createCycleDays = () => {
        const { classes } = this.props;
        let cycleDays = []
    
        // Outer loop to create parent
        for (let i = 0; i < 6; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 7; j++) {   
            children.push(<DayDetails day={j + i * 7} rowNum={i} initialDate={this.initialDate} dateFormat={this.dateFormat} key={j + i * 7}/>)
          }
          //Create the parent and add the children
          cycleDays.push(
            <div className={classes.row} key={i}>
                {children}
            </div>)
          
        }
        return cycleDays
      }

    render() {
        const { classes } = this.props;

        return (
        <Fragment>
            <div className={classes.paper}>
                <div className={classes.headerRow}>
                    {this.weekDays.map(name => (
                        <div className={classes.cell} key={name}>
                            <Typography variant="caption" noWrap>
                                {name}
                            </Typography>
                        </div>
                    ))}
                </div>
                {this.createCycleDays()}
            </div>         
        </Fragment>
        )
    }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
