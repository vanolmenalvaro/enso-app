import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getFirebase } from 'react-redux-firebase'

import AppBar from './layout/AppBar'

export class AdminView extends Component {
  state = {
    isAdmin: true
  }
  handleClick = () => {
    const firebase = getFirebase()
    var listAllUsers = firebase.functions().httpsCallable('listAllUsers');
    listAllUsers().then((response) => {
      console.log(response)
    }).catch(function(error) {
      console.log(error.message)
    });
  }

  componentDidMount = () => {
    let firebase = getFirebase()
    if(firebase.auth().currentUser){
      firebase.auth().currentUser.getIdTokenResult()
      .then((token) => {
        if(token.claims.admin === false) {
          this.setState({ isAdmin: false })
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
      //Route guarding
      if(!this.props.auth.uid || this.state.isAdmin !== true) {
        return <Redirect to='/app/login' />
      }  

    return (
      <Fragment>
        <AppBar />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(AdminView)