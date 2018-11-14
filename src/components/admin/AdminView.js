import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getFirebase } from 'react-redux-firebase'
import Button from "@material-ui/core/Button"

export class AdminView extends Component {
  
  handleClick = () => {
    const firebase = getFirebase()
    var listAllUsers = firebase.functions().httpsCallable('listAllUsers');
    listAllUsers().then((response) => {
      console.log(response)
    }).catch(function(error) {
      console.log(error.message)
    });
  }

  render() {
    //Route guarding
    if(!this.props.auth.uid){
      return <Redirect to='/app/login' />
    }

    const firebase = getFirebase()
    firebase.auth().currentUser.getIdTokenResult()
    .then((idTokenResult) => {
      console.log(idTokenResult)
    })
    .catch((error) => {
      console.log(error);
    });
    

    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClick}>
          Send
        </Button> 
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(AdminView)