import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom"

import Login from './login/Login'
import AdminView from './admin/AdminView'
import UsersView from './admin/UsersView/UsersView'
import BlueprintsView from './admin/BlueprintsView/BlueprintsView'
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
          <Route path="/app/admin/blueprints" render={(props) => <AdminView {...props} children={<BlueprintsView />} />} />
          <Route path="/app/admin/chat" render={(props) => <AdminView {...props} children={<ChatView />} />} />

          <Route path="/app/user/chat" render={(props) => <UserView {...props} children={<ChatView />} />} />
          <Route exact path="/app/user/calendar" render={(props) => <UserView {...props} children={<CalendarView />} />} />
          <Route path="/app/user/calendar/:day" render={(props) => <UserView {...props} children={<TrainingView />} />} />
          <Route path="/app/user/tools" render={(props) => <UserView {...props} children={<ToolsView />} />} />
          <Route component={CalendarView} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default (App)

