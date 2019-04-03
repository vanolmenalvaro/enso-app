import React, {Component, Fragment} from 'react'
import { Add, MoreVert } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardHeader from '@material-ui/core/CardHeader'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import constants from '../../../config/constants'
import UserCard from '../UsersView/UserCard'
import ReportCard from '../../user/ReportsView/ReportCard'
import { getUsers } from '../../../store/actions/adminActions'
import { getCycles, deleteCycle } from '../../../store/actions/programActions'
import { getReports } from '../../../store/actions/reportActions'

const styles = () => ({
    root: {
      flexGrow: 1,
    },
    card: {
        width: '100%',
        marginBottom: 5
    },
    paper: {
      padding: 5
    },
    title: {
      textAlign: 'center',
      paddingLeft: 52, //addIcon width
      width: `calc(100% - 52px)`, //100% - addIcon width
      paddingTop: 4
    },
    typography: {
      textAlign: 'center',
      paddingLeft: 48, //editIcon width
      width: `calc(100% - 48px)`, //100% - editIcon width
      paddingTop: 9
    },
    button: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 0
    },
    icon: {
      fontSize: 28
    }
})

export class UserDetailView extends Component {
    state = {
        user: null,
        anchorEl: null,
        deleteDialogOpen: false
    }

    componentDidMount = () => { 
        if(!this.props.admin.users){
          this.props.getUsers()
        }
        if(this.props.admin.users && (this.state.user === null || this.state.user.email !== this.props.match.params.user)) {
            var [ user ] = this.props.admin.users.filter((user) => user.email === this.props.match.params.user)
            this.setState({ user: user })

            this.props.getReports(user.uid)
        }
        
    }

    componentDidUpdate = () => {
        if(this.props.admin.users && (this.state.user === null || this.state.user.email !== this.props.match.params.user)) {
            var [ user ] = this.props.admin.users.filter((user) => user.email === this.props.match.params.user)
            this.setState({ user: user })
        }

        if(this.state.user !== null && 
        this.state.user.email === this.props.match.params.user && 
        (this.props.cycles && this.props.cycles[0] && (this.props.cycles[0].isInitState === true || this.props.cycles[0].user.uid !== this.state.user.uid))) {
                this.props.getCycles(this.state.user.uid)
        }

        if(this.state.user !== null && this.state.user.email === this.props.match.params.user && 
        (!this.props.reports.reports || !this.props.reports.reports.length > 0)){
            this.props.getReports(this.state.user.uid)
        }
    }

    handleMenuClick = (event, cycle) => {
        event.stopPropagation() //so Card onClick event does not fire too
        this.setState({ anchorEl: event.currentTarget, cycle: cycle })
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null })
    }

    handleCycleCardClick = (cycle) => {
        this.props.history.push({
            pathname: "/app/admin/users/"+this.state.user.email+"/"+cycle.user.ref,
            state: { cycleId: cycle.id, uid: this.state.user.uid }
        })
    }

    handleNewCycle = () => {
        let ref

        if(this.props.cycles && this.props.cycles[0] && !this.props.cycles[0].isInitState){
            ref = this.props.cycles[0].user.ref
            ref++
        } else {
            ref = 1
        }

        this.props.history.push({
            pathname: "/app/admin/users/"+this.state.user.email+"/"+ref,
            state: { cycleId: null,ref: ref, uid: this.state.user.uid }
        })
    }

    handleDeleteDialogOpen = () => {
        this.setState({ deleteDialogOpen: true, anchorEl: null})
    }
    
    handleDeleteDialogClose = () => {
        this.setState({ deleteDialogOpen: false, uid: null })
    }

    handleDeleteDialogAccept = () => {
        this.props.deleteCycle(this.state.cycle.id)
        this.handleDeleteDialogClose()
    }

    render() {
        const { classes } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
        <div>
            <Grid container className={classes.root} justify="space-evenly" spacing={8}>
                <Grid xs={4} item>
                    {this.state.user && <UserCard user={this.state.user} />}
                </Grid>
            </Grid>
            <Grid container className={classes.root} justify="space-evenly" spacing={8}>
                <Grid xs={6} item>
                    <Grid container direction="row">
                        <Typography variant="h4" className={classes.title} noWrap>
                            {constants.cycles}
                        </Typography>
                        <Tooltip title={constants.addCycle}>
                        <IconButton color="primary" className={classes.button} onClick={this.handleNewCycle}>
                            <Add className={classes.icon} />
                        </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid container direction="column" alignItems="center">
                        { this.props.cycles && this.props.cycles[0] && !this.props.cycles[0].isInitState ?
                            this.props.cycles.map(cycle => 
                                <Card className={this.props.classes.card} key={cycle.user.ref+'-card'}>
                                    <CardActionArea component='div' onClick={() => this.handleCycleCardClick(cycle)} disableRipple>
                                        <CardHeader
                                            action={
                                                <Fragment>
                                                    <IconButton 
                                                        id={cycle.id+'-button'}
                                                        color="inherit"
                                                        aria-label="More"
                                                        aria-owns={open ? 'long-menu' : undefined}
                                                        aria-haspopup="true"
                                                        onClick={(event) => this.handleMenuClick(event, cycle)}
                                                    >
                                                        <MoreVert />
                                                    </IconButton>
                                                </Fragment>
                                            }
                                            title={constants.cycle + " " + cycle.user.ref}
                                            titleTypographyProps={{ align: 'center' }}
                                        /> 
                                    </CardActionArea>
                                </Card>
                            )
                        : 
                            <Typography variant="h5" noWrap>
                                <br/>{constants.noResults}
                            </Typography>
                        } 
                    </Grid>
                </Grid>
                <Grid xs={6} item>
                    <Grid container direction="row">
                        <Typography variant="h4" className={classes.title} style={{marginBottom: 10}} noWrap>
                            {constants.reports}
                        </Typography>
                    </Grid>
                    <Grid container direction="column" alignItems="center">
                        { this.props.reports.reports && this.props.reports.reports.length > 0 
                            ? this.props.reports.reports.map(report => 
                                <ReportCard id={report.id} key={report.id} date={report.date} text={report.text} /> )
                            :
                            <Typography variant='h5' align='center'>
                                <br/>{constants.noReports}
                            </Typography> 
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={() => this.handleCycleCardClick(this.state.cycle)}>
                    {constants.edit}
                </MenuItem>
                <MenuItem onClick={() => this.handleDeleteDialogOpen(this.state.cycle)}>
                    {constants.delete}
                </MenuItem>
            </Menu>
            <Dialog
                open={this.state.deleteDialogOpen}
                onClose={this.handleDeleteDialogClose}
                aria-labelledby="alert-delete-dialog-title"
                aria-describedby="alert-delete-dialog-description"
                key={this.state.user && this.state.user.uid+'-delete-dialog'}
                >
                <DialogTitle id="alert-delete-dialog-title">{constants.deleteCycleQuestion}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-delete-dialog-description">
                        {constants.deleteCycleText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDeleteDialogClose} color="primary">
                        {constants.cancel}
                    </Button>
                    <Button onClick={this.handleDeleteDialogAccept} color="primary" autoFocus>
                        {constants.accept}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        admin: state.admin,
        cycles: state.program.cycles,
        reports: state.reports
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: () => dispatch(getUsers()),
      getCycles: (uid) => dispatch(getCycles(uid)),
      deleteCycle: (id) => dispatch(deleteCycle(id)),
      getReports: (uid) => dispatch(getReports(uid))
    }
  }

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withRouter,
    withStyles(styles)
)(UserDetailView)