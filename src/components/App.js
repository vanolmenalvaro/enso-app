import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import Login from './login/Login'
import AdminView from './admin/AdminView'
import UsersView from './admin/UsersView/UsersView'
import UserDetailView from './admin/UserDetailView/UserDetailView'
import CycleDetailView from './admin/CycleDetailView/CycleDetailView'
import TemplatesView from './admin/TemplatesView/TemplatesView'
import UserView from './user/UserView'
import CalendarView from './user/CalendarView/CalendarView'
import TrainingView from './user/TrainingView/TrainingView'
import ReportsView from './user/ReportsView/ReportsView'
import ToolsView from './user/ToolsView/ToolsView'


class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/app/login" component={Login} />

          <Route exact path="/app/admin/users" render={(props) => <AdminView {...props} children={<UsersView />} />} />
          <Route exact path="/app/admin/users/:user" render={(props) => <AdminView {...props} children={<UserDetailView />} />} />
          <Route path="/app/admin/users/:user/:cycle" render={(props) => <AdminView {...props} children={<CycleDetailView />} />} />
          <Route path="/app/admin/templates" render={(props) => <AdminView {...props} children={<TemplatesView />} />} />

          <Route exact path="/app/user/calendar" render={(props) => <UserView {...props} children={<CalendarView />} />} />
          <Route path="/app/user/calendar/:day" render={(props) => <UserView {...props} children={<TrainingView />} />} />
          <Route path="/app/user/reports" render={(props) => <UserView {...props} children={<ReportsView />} />} />
          <Route path="/app/user/tools" render={(props) => <UserView {...props} children={<ToolsView />} />} />
          <Redirect to="/app/user/calendar" /> {/* TODO: add 404 page */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default (App)

