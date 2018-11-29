import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"

import Login from './login/Login'
import AdminView from './admin/AdminView'
import UsersView from './admin/UsersView/UsersView'
import TemplatesView from './admin/TemplatesView/TemplatesView'
import UserView from './user/UserView'
import ChatView from './user/ChatView/ChatView'
import CalendarView from './user/CalendarView/CalendarView'
import TrainingView from './user/TrainingView/TrainingView'
import ToolsView from './user/ToolsView/ToolsView'


class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/app/login" component={Login} />

          <Route path="/app/admin/users" render={(props) => <AdminView {...props} children={<UsersView />} />} />
          <Route path="/app/admin/templates" render={(props) => <AdminView {...props} children={<TemplatesView />} />} />
          <Route path="/app/admin/chat" render={(props) => <AdminView {...props} children={<ChatView />} />} />

          <Route path="/app/user/chat" render={(props) => <UserView {...props} children={<ChatView />} />} />
          <Route exact path="/app/user/calendar" render={(props) => <UserView {...props} children={<CalendarView />} />} />
          <Route path="/app/user/calendar/:day" render={(props) => <UserView {...props} children={<TrainingView />} />} />
          <Route path="/app/user/tools" render={(props) => <UserView {...props} children={<ToolsView />} />} />
          <Redirect to="/app/user/calendar" />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default (App)

