import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import { MoreVert, SupervisorAccount, SupervisedUserCircle, AccountCircle} from '@material-ui/icons';
import { connect } from 'react-redux'
import { compose } from 'redux'

import { enableUser, disableUser, setAdminPrivileges, setSuperAdminPrivileges, setUserPrivileges, sendPasswordResetEmail } from '../../../store/actions/adminActions'
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
        open: false,
        anchorEl: null
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget })
    }

    handleClose = () => {
        this.setState({ anchorEl: null })
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
          disabled = ', ' + constants.disabled
        }
        if(user.customClaims.admin) {
          if(user.customClaims.accessLevel === 1) {
            return constants.admin + disabled
          }else if(user.customClaims.accessLevel === 2){
            return constants.superAdmin + disabled
          }
        }else {
          return constants.user + disabled
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

    render() {
        const user = this.props.user
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
            <Card className={this.props.classes.card} key={user.uid}>
                <CardHeader
                avatar={
                    <Avatar aria-label="Status" className={this.returnClass(user)}>
                        { user.customClaims.accessLevel === 0 && <AccountCircle/> }
                        { user.customClaims.accessLevel === 1 && <SupervisedUserCircle/> }
                        { user.customClaims.accessLevel === 2 && <SupervisorAccount/> }                  
                    </Avatar>
                }
                action={
                    <Fragment>
                    <IconButton 
                        id={user.email+'-button'}
                        color="inherit"
                        aria-label="More"
                        aria-owns={open ? 'long-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                    >
                        <MoreVert />
                    </IconButton>
                    <Menu
                        id={user.email+'-'}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={this.handleClose}
                    >
                        {user.disabled === false &&
                            <MenuItem onClick={() => this.sendPasswordResetEmail(user.email)}>
                                {constants.sendPasswordRetrievingEmail}
                            </MenuItem>
                        }
                        
                        {user.customClaims.accessLevel !== 2 && user.disabled === false &&
                            <MenuItem onClick={() => this.setSuperAdminPrivileges(user.uid)}>
                                {constants.setAsSuperadmin}
                            </MenuItem>
                        }

                        {user.customClaims.accessLevel !== 1 && user.disabled === false &&
                            <MenuItem onClick={() => this.setAdminPrivileges(user.uid)}>
                                {constants.setAsAdmin}
                            </MenuItem>
                        }

                        {user.customClaims.accessLevel !== 0 && user.disabled === false &&
                            <MenuItem onClick={() => this.setUserPrivileges(user.uid)}>
                                {constants.setAsUser}
                            </MenuItem>
                        }

                        {user.disabled === true ?
                            <MenuItem onClick={() => this.enableUser(user.uid)}>
                                {constants.enableUser}
                            </MenuItem>
                        :
                            <MenuItem onClick={() => this.disableUser(user.uid)}>
                                {constants.disableUser}
                            </MenuItem>
                        }
                    </Menu>
                    </Fragment>
                }
                title={user.email}
                subheader={this.returnSubheader(user)}
                />
            </Card>      
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
      sendPasswordResetEmail: (email) => dispatch(sendPasswordResetEmail(email))
    }
  }
  
  export default compose(
    connect(null, mapDispatchToProps),
    withStyles(styles)
  )(UserCard)
