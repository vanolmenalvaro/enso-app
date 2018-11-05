import React, { Component } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

const styles = () => ({
  cell: {
    width: `calc(100% / 7)`,
    display: 'table-cell',
    textAlign: 'center',
    border: '1px solid #474747'
  },
  cellSelected: {
    backgroundColor: '#d8d8d8'
  },
  cellLastRow: {
    borderBottom: '0px'
  },
  typography: {
    fontSize: 14,
  }
});

class DayDetails extends Component {

  render() { 

    const { classes } = this.props

    return (
      <div className={classNames(
                    classes.cell,
                    this.props.rowNum === 5 && classes.cellLastRow,
                    moment(this.props.initialDate, this.props.dateFormat).add(this.props.day, 'days').isSame(new Date(), "day") && classes.cellSelected
                  )} 
                  key={this.props.day}>
          <Typography variant="subheading" className={classes.typography} noWrap>
              {moment(this.props.initialDate, this.props.dateFormat).add(this.props.day, 'days').format('D')}
              {moment(this.props.initialDate, this.props.dateFormat).add(this.props.day, 'days').format('D')==="1" &&
                  moment(this.props.initialDate, this.props.dateFormat).locale('es').add(this.props.day, 'days').format('MMM')
              }
          </Typography>
      </div>
    )
  } 
}

DayDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DayDetails);
