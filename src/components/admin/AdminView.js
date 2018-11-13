import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export class AdminView extends Component {
  render() {
    //Route guarding
    if(!this.props.auth.uid){
      return <Redirect to='/app/login' />
    }

    return (
      <div>
        
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