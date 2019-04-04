import React, { Component, Fragment } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { getFirebase } from 'react-redux-firebase'
import { withRouter } from "react-router-dom"

import AppBar from './layout/AppBar'
import BottomNav from './layout/BottomNav'
import { switchTab } from '../../store/actions/tabActions'

export class AdminView extends Component {

  componentDidMount = () => {
    //Route guarding
    let firebase = getFirebase()
    if(firebase.auth().currentUser){
      firebase.auth().currentUser.getIdTokenResult()
      .then((token) => {
        if(!token.claims.admin) this.props.history.push('/app/calendar')
      })
      .catch((error) => {
        console.log(error)
      })
    }

    switch (this.props.location.pathname) {
      case '/app/admin/users':
        return this.props.switchTab(0)
      case '/app/admin/templates':
        return this.props.switchTab(1)
      default:
        return this.props.switchTab(0)
    }
  }

  render() {
      //Route guarding
      if(!this.props.auth.uid) {
        return <Redirect to='/app/login' />
      }  

    return (
      <Fragment>
        <main>
          <CssBaseline />
          <AppBar children={this.props.children}/>
          <BottomNav />
        </main>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (tab, props) => dispatch(switchTab(tab, props))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(AdminView)