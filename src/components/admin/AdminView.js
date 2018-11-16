import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { getFirebase } from 'react-redux-firebase'
import { withRouter, Route, Switch } from "react-router-dom"

import AppBar from './layout/AppBar'
import CalendarView from '../user/CalendarView/CalendarView'

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
        <AppBar children={
        <Switch>
          {/* <Route path="/app/chat" component={ChatView} />
          <Route exact path="/app/calendar" component={CalendarView} />
          <Route path="/app/calendar/:day" component={TrainingView} />
          <Route path="/app/tools" component={ToolsView} /> */}
          <Route component={CalendarView} />
        </Switch>
        }/>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(AdminView)