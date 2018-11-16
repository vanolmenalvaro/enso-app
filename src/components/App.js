import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import UserView from './user/UserView'
import Login from './login/Login'
import AdminView from './admin/AdminView'

class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/app" component={UserView} />
          <Route exact path="/app/login" component={Login} />
          <Route exact path="/app/admin" component={AdminView} />
          <Route component={UserView} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default (App)

