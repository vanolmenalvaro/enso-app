import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/es'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import Hidden from '@material-ui/core/Hidden'
import ButtonBase from '@material-ui/core/ButtonBase'
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'

import constants from '../../../config/constants'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const styles = () => ({
  cell: {
    width: `calc(100% / 7)`,
    display: 'table-cell',
    textAlign: 'center',
    border: '1px solid #474747',
    padding: 1
  },
  cellChildren: {
    width: '100%'
  },
  cellSelected: {
    backgroundColor: '#d8d8d8',
  },
  typography: {
    fontSize: 12,
    '@media (min-width:1370px)': {
      fontSize: 14,
    }
  },
  grey: {
    color: '#666666'
  },
  typographySm: {
    fontSize: 8,
    '@media (min-width:1370px)': {
      fontSize: 10,
    },
    color: 'white',
    fontWeight: 'bold'
  },
  chip: {
    fontSize: 10,
    width: '100%',
    borderRadius: 8,
    margin: 1
  }
});

class DayDetails extends Component {

  handleClick = () => {
    if(this.props.blocks !== undefined && (!this.props.edit || this.props.edit!==true)) this.props.switchTab(3, this.props, '/app/user/calendar/'+this.props.day.replace(/\//g, '-'))
  }

  render() { 
    const { classes } = this.props

    return (
      <div className={classNames(
          classes.cell,
          moment(this.props.day, constants.dateFormat).isSame(new Date(), "day") && classes.cellSelected
        )} 
        key={this.props.day}
      >
          {this.props.blocks && this.props.blocks !== undefined && 
            <ButtonBase onClick={this.handleClick} className={classes.cellChildren}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Typography 
                  variant="subtitle1" 
                  className={classNames(
                    classes.typography,
                    moment(this.props.day, constants.dateFormat).format('M') !== moment(this.props.initialDate, constants.dateFormat).format('M') && classes.grey
                  )} 
                  noWrap
                >
                    {moment(this.props.day, constants.dateFormat).format('D')}
                    {(moment(this.props.day, constants.dateFormat).format('D')==="1" || this.props.day === this.props.initialDate) &&
                      ' ' + moment(this.props.day, constants.dateFormat).locale('es').format('MMM')}
                    
                </Typography>
                {this.props.blocks.map(obj => (
                  <div className={classes.chip} style={{backgroundColor: obj.color}} key={obj.name}> 
                    <Typography variant="subtitle1" className={classes.typographySm} noWrap>
                      <Hidden mdUp> {obj.shortName} </Hidden>
                      <Hidden smDown> {obj.name} </Hidden>
                    </Typography>
                  </div>
                ))}
              </Grid>
            </ButtonBase>
          }
          {this.props.blocks === undefined &&
            <Typography 
              variant="subtitle1" 
              className={classNames(
                classes.typography,
                moment(this.props.day, constants.dateFormat).format('M') !== moment(this.props.initialDate, constants.dateFormat).format('M') && classes.grey
              )} 
              noWrap
            >
              {moment(this.props.day, constants.dateFormat).format('D')}
              {(moment(this.props.day, constants.dateFormat).format('D')==="1" || this.props.day === this.props.initialDate) &&
                ' ' + moment(this.props.day, constants.dateFormat).locale('es').format('MMM')}
            </Typography>
          }
      </div>
    )
  } 
}

DayDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter
)(DayDetails);
