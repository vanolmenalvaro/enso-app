import React, {Component, Fragment} from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import { Add } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { compose } from 'redux'

import ReportCard from './ReportCard'
import { getReports } from '../../../store/actions/reportActions'
import constants from '../../../config/constants'

const styles = theme => ({
  fab: {
    position: 'absolute',
    right: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing.unit * 8
    },
    [theme.breakpoints.up('sm')]: {
      bottom: theme.spacing.unit * 2
    }
  }
})

export class ReportsView extends Component {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }
  componentDidMount = () => {
    if(!this.props.reports.reports || !this.props.reports.reports.length > 0){
      this.props.getReports(this.props.auth.uid)
    }
  }

  handleDialogOpen = () => {
    this.setState({open: true})
  }

  handleDialogClose = () => {
    this.setState({open: false})
  }

  render () {
    const { classes } = this.props

    return (
      <Fragment>
        { this.props.reports.reports && this.props.reports.reports.length > 0 
          ? this.props.reports.reports.map(report => 
            <ReportCard id={report.id} key={report.id} date={report.date} text={report.text} /> )
          :
          <Typography variant='h4' align='center'>{constants.noReports}</Typography> 
        }
        <Tooltip title={constants.addBlock}>
          <Fab onClick={this.handleDialogOpen} className={classes.fab} color="primary">
            <Add />
          </Fab>
        </Tooltip>

        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{constants.addReport}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {constants.addBlockText}
            </DialogContentText>
            <ReportCard embedded handleDialogClose={this.handleDialogClose} />
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    reports: state.reports,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReports: (uid) => dispatch(getReports(uid))
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(ReportsView)
