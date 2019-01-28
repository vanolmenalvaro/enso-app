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
import { getUsers } from '../../../store/actions/adminActions'
import { getCycles } from '../../../store/actions/programActions'

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
    control: {
      marginBottom: 40,
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
            var user = this.props.admin.users.filter((user) => user.email === this.props.match.params.user)
            this.setState({ user: user[0] }) //filter() returns an array
        }
    }

    componentDidUpdate = () => {
        if(this.props.admin.users && (this.state.user === null || this.state.user.email !== this.props.match.params.user)) {
            var user = this.props.admin.users.filter((user) => user.email === this.props.match.params.user)
            this.setState({ user: user[0] }) //filter() returns an array
        }

        if(this.state.user !== null && 
            this.state.user.email === this.props.match.params.user && 
            (this.props.cycles[0].isInitState === true || this.props.cycles[0].user.uid !== this.state.user.uid)) {
                this.props.getCycles(this.state.user.uid)
        }
    }

    handleMenuClick = event => {
        event.stopPropagation() //so Card onClick event does not fire too
        this.setState({ anchorEl: event.currentTarget })
    }

    handleMenuClose = event => {
        event.stopPropagation() //so Card onClick event does not fire too
        this.setState({ anchorEl: null })
    }

    handleCycleCardClick = (cycle) => {
        this.props.history.push({
            pathname: "/app/admin/users/"+this.state.user.email+"/"+cycle.user.ref,
            state: { cycle, uid: this.state.user.uid }
        })
    }

    handleDeleteDialogOpen = (cycle) => {
        this.setState({ deleteDialogOpen: true, anchorEl: null, cycle: cycle })
    }
    
    handleDeleteDialogClose = () => {
        this.setState({ deleteDialogOpen: false, uid: null })
    }

    handleDeleteDialogAccept = () => {
        console.log("delete cycle "+this.state.cycle.user.ref)
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
                    <IconButton color="primary" className={classes.button} >
                        <Add className={classes.icon} />
                    </IconButton>
                    </Tooltip>
                </Grid>
                <Grid container direction="column" alignItems="center">
                    { this.props.cycles && !this.props.cycles[0].isInitState ?
                        this.props.cycles.map(cycle => 
                            <Card className={this.props.classes.card} key={cycle.user.ref+'-card'}>
                                <CardActionArea component='div' onClick={() => this.handleCycleCardClick(cycle)} disableRipple>
                                    <CardHeader
                                        action={
                                            <Fragment>
                                                <IconButton 
                                                    id={cycle.user.ref+'-button'}
                                                    color="inherit"
                                                    aria-label="More"
                                                    aria-owns={open ? 'long-menu' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={this.handleMenuClick}
                                                >
                                                    <MoreVert />
                                                </IconButton>
                                                <Menu
                                                    id={cycle.user.ref+'-menu'}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={this.handleMenuClose}
                                                >
                                                    <MenuItem onClick={() => this.handleCycleCardClick(cycle)} key={cycle.user.ref+'-edit'}>
                                                        {constants.edit}
                                                    </MenuItem>
                                                    <MenuItem onClick={() => this.handleDeleteDialogOpen(cycle)} key={cycle.user.ref+'-delete'}>
                                                        {constants.delete}
                                                    </MenuItem>
                                                </Menu>
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
                    <Typography variant="h4" className={classes.title} noWrap>
                        {constants.reports}
                    </Typography>
                    <Tooltip title={constants.createBlock}>
                    <IconButton color="primary" className={classes.button} >
                        <Add className={classes.icon} />
                    </IconButton>
                    </Tooltip>
                </Grid>
                <Grid container direction="column" alignItems="center">

                        <Typography variant="h5" noWrap>
                            <br/>{constants.noResults}
                        </Typography>
                </Grid>
                </Grid>
            </Grid>
            <Dialog
                open={this.state.deleteDialogOpen}
                onClose={this.handleDeleteDialogClose}
                aria-labelledby="alert-delete-dialog-title"
                aria-describedby="alert-delete-dialog-description"
                key={this.state.user && this.state.user.uid+'-delete-dialog'}
                >
                <DialogTitle id="alert-delete-dialog-title">{constants.deleteUserQuestion}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-delete-dialog-description">
                        {constants.deleteUserText}
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
        cycles: state.program.cycles
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: () => dispatch(getUsers()),
      getCycles: (uid) => dispatch(getCycles(uid))
    }
  }

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withRouter,
    withStyles(styles)
)(UserDetailView)