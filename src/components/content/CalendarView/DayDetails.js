import React, { Component } from 'react'
import moment from 'moment';
import 'moment/locale/es';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Hidden from '@material-ui/core/Hidden';

import constants from '../../../config/constants'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const styles = () => ({
  cell: {
    width: `calc(100% / 7)`,
    display: 'table-cell',
    textAlign: 'center',
    border: '1px solid #474747'
  },
  cellSelected: {
    backgroundColor: '#d8d8d8',
  },
  typography: {
    fontSize: 12,
    '@media (min-height:650px)': {
      fontSize: 14,
    }
  },
  typographySm: {
    fontSize: 8,
    '@media (min-height:650px)': {
      fontSize: 10,
    },
    color: 'white',
    fontWeight: 'bold'
  },
  chip: {
    fontSize: 10,
    width: '100%',
    borderRadius: 6
  }
});

class DayDetails extends Component {

  render() { 
    const { classes } = this.props
    
    return (
      <div className={classNames(
                    classes.cell,
                    moment(this.props.day, constants.dateFormat).isSame(new Date(), "day") && classes.cellSelected
                  )} 
                  key={this.props.day}>
          <Typography variant="subtitle1" className={classes.typography} noWrap>
              {moment(this.props.day, constants.dateFormat).format('D')}
              {moment(this.props.day, constants.dateFormat).format('D')==="1" &&
                  moment(this.props.day, constants.dateFormat).locale('es').format('MMM')
              }
          </Typography>
          { this.props.exercises && this.props.exercises.map(obj => (
            <div className={classes.chip} style={{backgroundColor: obj.color}} key={obj.name}> 
              <Typography variant="subtitle1" className={classes.typographySm} noWrap>
                <Hidden mdUp> {obj.shortName} </Hidden>
                <Hidden smDown> {obj.name} </Hidden>
              </Typography>
            </div>
          ))}
      </div>
    )
  } 
}

DayDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DayDetails);
