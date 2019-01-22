import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from "react-router-dom"

import AppBar from './layout/AppBar'
import BottomNav from './layout/BottomNav'
import { switchTab } from '../../store/actions/tabActions'
import { getCycles } from '../../store/actions/programActions'


class UserView extends React.Component {

  componentDidMount = () => {
    this.props.getCycles(this.props.auth.uid)
  
    switch (this.props.location.pathname) {
      case '/app/user/chat':
        return this.props.switchTab(0)
      case '/app/user/calendar':
        return this.props.switchTab(1)
      case '/app/user/tools':
        return this.props.switchTab(2)
      default:
        return this.props.switchTab(1)
      }
  }

  render() {  
    //Route guarding
    if(!this.props.auth.uid) {
      return <Redirect to='/app/login' />
    }
    
    return (
      <React.Fragment>
        <main>
          <CssBaseline />
            <AppBar children={this.props.children}/>
            <BottomNav />
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    tab: state.tab.tab,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCycles: (uid) => dispatch(getCycles(uid)),
    switchTab: (tab, props) => dispatch(switchTab(tab, props))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(UserView)
