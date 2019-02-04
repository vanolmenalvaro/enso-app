import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { withRouter } from "react-router-dom"
import { compose } from 'redux'

import CalendarView from '../../user/CalendarView/CalendarView'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export class CycleDetailView extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <Grid container direction="row" spacing={8}>
        <Grid item xs={12} lg={8}>
          <CalendarView cycle={this.props.location.state.cycle} uid={this.props.location.state.uid} edit={true} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
      </Grid>
    )
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(CycleDetailView)
 