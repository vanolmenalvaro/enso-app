import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MoreVert, SupervisorAccount, SupervisedUserCircle, AccountCircle} from '@material-ui/icons';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getFirebase } from 'react-redux-firebase'

import { enableUser, 
    disableUser, 
    setAdminPrivileges, 
    setSuperAdminPrivileges, 
    setUserPrivileges, 
    sendPasswordResetEmail, 
    deleteUser, 
    createUser } from '../../../store/actions/adminActions'
import constants from '../../../config/constants'

const styles = () => ({
    card: {
        width: '100%',
        marginBottom: 5
    },
    avatarSuperAdmin: {
        backgroundColor: '#f44336',
    },
    avatarAdmin: {
        backgroundColor: '#ff7961',
    },
    avatarUser: {
        backgroundColor: '#03a9f4',
    },
    avatarDisabled: {
        backgroundColor: '#9e9e9e',
    }
  })

export class UserCard extends Component {
    state = {
        deleteDialogOpen: false,
        anchorEl: null,
        accessLevel: 0
    }

    handleMenuClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleMenuClose = () => {
        this.setState({ anchorEl: null })
    }

    handleDeleteDialogOpen = (uid) => {
        this.setState({ deleteDialogOpen: true, anchorEl: null, uid })
    }
    
    handleDeleteDialogClose = () => {
        this.setState({ deleteDialogOpen: false, uid: null })
    }

    handleDeleteDialogAccept = (uid) => {
        this.props.deleteUser(uid)
        this.handleDeleteDialogClose()
    }

    sendPasswordResetEmail = (email) => {
        this.props.sendPasswordResetEmail(email)
        this.setState({ anchorEl: null })
    }

    disableUser = (uid) => {
        this.props.disableUser(uid)
        this.setState({ anchorEl: null })
    }

    enableUser = (uid) => {
        this.props.enableUser(uid)
        this.setState({ anchorEl: null })
    }

    setSuperAdminPrivileges = (uid) => {
        this.props.setSuperAdminPrivileges(uid)
        this.setState({ anchorEl: null })
    }

    setAdminPrivileges = (uid) => {
        this.props.setAdminPrivileges(uid)
        this.setState({ anchorEl: null })
    }

    setUserPrivileges = (uid) => {
        this.props.setUserPrivileges(uid)
        this.setState({ anchorEl: null })
    }

    returnSubheader = (user) => {
        let disabled = ''
        if (user.disabled) {
          disabled = <Chip key={user.uid+'-chip'} label={constants.disabled} /> 
        }
        if(user.customClaims.admin) {
          if(user.customClaims.accessLevel === 1) {
            return constants.admin + disabled
          }else if(user.customClaims.accessLevel === 2){
            return constants.superAdmin + disabled
          }
        }else {
          return (
              [constants.user + '   ' , disabled]
            )
        }
    }

    returnClass = (user) => {
        if (user.disabled) {
            return this.props.classes.avatarDisabled
        } else if(user.customClaims.admin) {
            if(user.customClaims.accessLevel === 1) {
            return this.props.classes.avatarAdmin
            }else if(user.customClaims.accessLevel === 2){
            return this.props.classes.avatarSuperAdmin
            }
        }else {
            return this.props.classes.avatarUser
        }
    }

    returnMenuItems = (user) => {
        let items = []
        if(user.disabled === false ) {
            items.push(
                <MenuItem onClick={() => this.sendPasswordResetEmail(user.email)} key={user.uid+'-send-email'}>
                    {constants.sendPasswordRetrievingEmail}
                </MenuItem>
            )

            if(user.customClaims.accessLevel !== 2) {
                items.push(
                    <MenuItem onClick={() => this.setSuperAdminPrivileges(user.uid)} key={user.uid+'-set-superadmin-item'}>
                        {constants.setAsSuperadmin}
                    </MenuItem>
                )
            }
            if(user.customClaims.accessLevel !== 1) {
                items.push(
                    <MenuItem onClick={() => this.setAdminPrivileges(user.uid)} key={user.uid+'-set-admin-item'}>
                        {constants.setAsAdmin}
                    </MenuItem>
                )
            }
            if(user.customClaims.accessLevel !== 0) {
                items.push(
                    <MenuItem onClick={() => this.setUserPrivileges(user.uid)} key={user.uid+'-set-user-item'}>
                        {constants.setAsUser}
                    </MenuItem>
                )
            }

            items.push(
                <MenuItem onClick={() => this.disableUser(user.uid)} key={user.uid+'-disable-user-item'}>
                    {constants.disableUser}
                </MenuItem>
            )
        }else {
            items.push(
                <MenuItem onClick={() => this.enableUser(user.uid)} key={user.uid+'-enable-user-item'}>
                    {constants.enableUser}
                </MenuItem>
            )
        }
        items.push(
            <MenuItem onClick={() => this.handleDeleteDialogOpen()} key={user.uid+'-delete-user-item'}>
                {constants.deleteUser}
            </MenuItem>
        )
        return items
    }

    componentDidMount = () => {
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

    render() {
        const user = this.props.user
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
            <Fragment>
                <Card className={this.props.classes.card} key={user.uid+'-card'}>
                    <CardHeader
                    avatar={
                        <Avatar aria-label="Status" className={this.returnClass(user)}>
                            { user.customClaims.accessLevel === 0 && <AccountCircle/> }
                            { user.customClaims.accessLevel === 1 && <SupervisedUserCircle/> }
                            { user.customClaims.accessLevel === 2 && <SupervisorAccount/> }                  
                        </Avatar>
                    }
                    action={
                        this.state.accessLevel === 2 && //only superadmins can manage users
                            <Fragment>
                                <IconButton 
                                    id={user.email+'-button'}
                                    color="inherit"
                                    aria-label="More"
                                    aria-owns={open ? 'long-menu' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenuClick}
                                >
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    id={user.email+'-'}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={this.handleMenuClose}
                                >
                                    {this.returnMenuItems(user)}
                                </Menu>
                            </Fragment>
                    }
                    title={user.email}
                    subheader={this.returnSubheader(user)}
                    />
                </Card>
                {this.state.accessLevel === 2 && //only superadmins can manage users
                    <Dialog
                        open={this.state.deleteDialogOpen}
                        onClose={this.handleDeleteDialogClose}
                        aria-labelledby="alert-delete-dialog-title"
                        aria-describedby="alert-delete-dialog-description"
                        key={user.uid+'-delete-dialog'}
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
                            <Button onClick={() => this.handleDeleteDialogAccept(user.uid)} color="primary" autoFocus>
                                {constants.accept}
                            </Button>
                        </DialogActions>
                    </Dialog>
                }
            </Fragment>     
        ) 
    }
    
}
  
  const mapDispatchToProps = (dispatch) => {
    return {
      enableUser: (uid) => dispatch(enableUser(uid)),
      disableUser: (uid) => dispatch(disableUser(uid)),
      setAdminPrivileges: (uid) => dispatch(setAdminPrivileges(uid)),
      setSuperAdminPrivileges: (uid) => dispatch(setSuperAdminPrivileges(uid)),
      setUserPrivileges: (uid) => dispatch(setUserPrivileges(uid)),
      deleteUser: (uid) => dispatch(deleteUser(uid)),
      createUser: (email) => dispatch(createUser(email)),
      sendPasswordResetEmail: (email) => dispatch(sendPasswordResetEmail(email))
    }
  }
  
  export default compose(
    connect(null, mapDispatchToProps),
    withStyles(styles)
  )(UserCard)
