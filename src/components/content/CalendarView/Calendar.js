import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    padding: 15    
  },
  row: {
    display: 'table',
    width: '100%',
    tableLayout: 'fixed',
    padding: 10
  },
  cell: {
    width: '14%',
    display: 'table-cell',
    textAlign: 'center'
  }
});

export class Calendar extends Component {
    state = {}

    weekDays = [ "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM" ]
    
    createCycleDays = () => {
        const { classes } = this.props;
        let cycleDays = []
    
        // Outer loop to create parent
        for (let i = 0; i < 6; i++) {
          let children = []
          //Inner loop to create children
          for (let j = 0; j < 7; j++) {
            children.push(
                <div className={classes.cell}>
                    <Typography variant="subheading" noWrap>
                        {((j + i * 7) % 31) +1}
                    </Typography>
                </div>
            )
          }
          //Create the parent and add the children
          cycleDays.push(
            <div className={classes.row}>
                {children}
            </div>)
        }
        return cycleDays
      }

    render() {
        const { classes } = this.props;

        return (
        <div className={classes.row}>
            <Paper className={classes.paper}>
                <div className={classes.row}>
                    {this.weekDays.map(name => (
                        <div className={classes.cell}>
                            <Typography variant="caption" noWrap>
                                {name}
                            </Typography>
                        </div>
                    ))}
                </div>
                {this.createCycleDays()}
            </Paper>         
        </div>
        )
    }
}

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Calendar);
