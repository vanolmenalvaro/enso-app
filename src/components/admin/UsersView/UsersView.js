import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import Fab from '@material-ui/core/Fab'
import Add  from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getFirebase } from 'react-redux-firebase'

import UserCard from './UserCard'
import { getUsers, createUser } from '../../../store/actions/adminActions'
import constants from '../../../config/constants'


const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
  placeholder: {
    height: 40,
    margin: 5
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  }
})

class UsersView extends Component {
  state = {
    accessLevel: 0,
    dialogOpen: false,
    email: '',
  };

  handleChange = (event) => {
    this.setState({email: event.target.value})
  }

  handleClickOpen = () => {
    this.setState({ dialogOpen: true })
  }

  handleClose = () => {
    this.setState({ dialogOpen: false })
  }

  handleAccept = () => {
    this.props.createUser(this.state.email)
  }

  componentDidMount = () => {
    if(!this.props.admin.users){
      this.props.getUsers()
    }
    //check superadmin status
    let firebase = getFirebase()
    if(firebase.auth().currentUser){
      firebase.auth().currentUser.getIdTokenResult()
      .then((token) => {
        this.setState({accessLevel: token.claims.accessLevel})
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }

  componentDidUpdate = () => {
    if(this.state.dialogOpen && this.props.admin.createUserResp === 200) {
      this.setState({ dialogOpen: false })
    }
  }

  cardReturn = () => {
    this.sortUsers(this.props.admin.users)
    //show a card for each user
    return this.props.admin.users.map(user => (
      <UserCard key={user.uid} user={user}/> 
    ))
  }

  sortUsers = (users) => {
    users.sort((a,b) => {
      // sort depending on disabled state
      if (a.disabled === true && b.disabled === false) {
        return 1
      }
      else if (a.disabled === false && b.disabled === true) {
        return -1
      }else {// if disabled state is equal sort depending on accessLevel
        if (a.customClaims.accessLevel < b.customClaims.accessLevel) {
          return 1
        }
        else if (a.customClaims.accessLevel > b.customClaims.accessLevel) {
          return -1
        }else { // if accessLevel is equal sort depending on email
          if (a.email > b.email) {
            return 1
          }
          else if (a.email < b.email) {
            return -1
          }else { // they are equal
            return 0
          }
        }
      }
      
    })
  }

  render() {
    return (
      <div className={this.props.classes.root}>
          <Fade
            in={!this.props.admin.users || this.props.admin.processing}
            style={{
              transitionDelay: !this.props.admin.users ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <div className={this.props.classes.placeholder}>
              <CircularProgress />
            </div>
          </Fade>
        {this.props.admin.users && this.cardReturn()}
        {this.state.accessLevel === 2 && //only superadmins can manage users
          <Fragment>
            {this.props.admin.users && 
              <Tooltip title={constants.createUser}>
                <Fab color="primary" className={this.props.classes.fab} onClick={this.handleClickOpen} >
                  <Add className={this.props.classes.icon} />
                </Fab>
              </Tooltip>
            }
            <Dialog
              open={this.state.dialogOpen}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">{constants.createUser}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                {constants.createUserText}
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="email"
                  label={constants.email}
                  type="email"
                  fullWidth
                  onChange={this.handleChange}
                />
                { this.props.admin.createUserResp && this.props.admin.createUserResp.error && 
                  <Typography align='center' color='error'>
                      {this.props.admin.createUserResp.error}
                  </Typography>
                }
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  {constants.cancel}
                </Button>
                <Button onClick={this.handleAccept} color="primary">
                  {constants.accept}
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      admin: state.admin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(getUsers()),
    createUser: (email) => dispatch(createUser(email))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(UsersView)
