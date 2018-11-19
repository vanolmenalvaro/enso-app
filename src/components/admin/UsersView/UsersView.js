import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import { MoreVert, SupervisorAccount, SupervisedUserCircle, AccountCircle} from '@material-ui/icons';
import { connect } from 'react-redux'
import { compose } from 'redux'

import { getUsers } from '../../../store/actions/adminActions'

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  placeholder: {
    height: 40,
  },
  card: {
    width: '100%',
    maxWidth: 900,
    marginBottom: 15
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

class UsersView extends Component {
  componentDidMount = () => {
    if(!this.props.admin.users){
      this.props.getUsers()
    }
  }

  render() {
    const { classes } = this.props

    let cardReturn = () => {
      //sort users depending on accessLevel
      sortUsers(this.props.admin.users)
      //show a card for each user
      return this.props.admin.users.map(user => (
        <Card className={classes.card} key={user.uid}>
          <CardHeader
            avatar={
              <Avatar aria-label="Status" className={returnClass(user)}>
                { user.customClaims.accessLevel === 0 && <AccountCircle/> }
                { user.customClaims.accessLevel === 1 && <SupervisedUserCircle/> }
                { user.customClaims.accessLevel === 2 && <SupervisorAccount/> }                  
              </Avatar>
            }
            action={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            title={user.email}
            subheader={returnSubheader(user)}
          />
        </Card>       
      ))
    }
  
    let sortUsers = (users) => {
      users.sort((a,b) => {
        if (a.customClaims.accessLevel < b.customClaims.accessLevel) {
          return 1
        }
        if (a.customClaims.accessLevel < b.customClaims.accessLevel) {
          return -1
        }
        // a must be equal to b
        return 0
      })
    }
    
    let returnSubheader = (user) => {
      let disabled = ''
      if (user.disabled) {
        disabled = ', disabled'
      }
      if(user.customClaims.admin) {
        if(user.customClaims.accessLevel === 1) {
          return 'Admin' + disabled
        }else if(user.customClaims.accessLevel === 2){
          return 'Superadmin' + disabled
        }
      }else {
        return 'User' + disabled
      }
    }

    let returnClass = (user) => {
      if (user.disabled) {
        return classes.avatarDisabled
      } else if(user.customClaims.admin) {
        if(user.customClaims.accessLevel === 1) {
          return classes.avatarAdmin
        }else if(user.customClaims.accessLevel === 2){
          return classes.avatarSuperAdmin
        }
      }else {
        return classes.avatarUser
      }
    }

    return (
      <div className={classes.root}>
        <div className={classes.placeholder}>
          <Fade
            in={!this.props.admin.users}
            style={{
              transitionDelay: !this.props.admin.users ? '800ms' : '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        </div>

        {this.props.admin.users && cardReturn()}
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
    getUsers: () => dispatch(getUsers())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(UsersView)
