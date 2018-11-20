import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import CircularProgress from '@material-ui/core/CircularProgress'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getFirebase } from 'react-redux-firebase'

import UserCard from './UserCard'
import { getUsers } from '../../../store/actions/adminActions'


const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  placeholder: {
    height: 40,
    margin: 5
  }  
})

class UsersView extends Component {
  state = {
    accessLevel: 0
  }

  componentDidMount = () => {
    if(!this.props.admin.users || this.props.admin.shouldRefresh === true){
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
    if(this.props.admin.shouldRefresh === true){
      this.props.getUsers()
    }
  }

  cardReturn = () => {
    //sort users depending on accessLevel
    this.sortUsers(this.props.admin.users)
    //show a card for each user
    return this.props.admin.users.map(user => (
      <UserCard className={this.props.classes.card} key={user.uid} user={user}/> 
    ))
  }

  sortUsers = (users) => {
    users.sort((a,b) => {
      if (a.customClaims.accessLevel < b.customClaims.accessLevel) {
        return 1
      }
      if (a.customClaims.accessLevel > b.customClaims.accessLevel) {
        return -1
      }
      // a must be equal to b
      return 0
    })
  }

  render() {
    return (
      <div className={this.props.classes.root}>
          <Fade
            in={!this.props.admin.users || this.props.admin.shouldRefresh}
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
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(UsersView)
