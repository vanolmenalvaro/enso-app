import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

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
            if(i === 5) {
                children.push(
                    <div className={classes.cellLastRow} key={(j + i * 7)+1}>
                        <Typography variant="subheading" noWrap>
                            {((j + i * 7) % 31) +1}
                        </Typography>
                    </div>
                )
            }else{
                children.push(
                    <div className={classes.cell} key={(j + i * 7)+1}>
                        <Typography variant="subheading" noWrap>
                            {((j + i * 7) % 31) +1}
                        </Typography>
                    </div>
                )
            }
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
