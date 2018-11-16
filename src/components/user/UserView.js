import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from "react-router-dom"

import TrainingView from './TrainingView/TrainingView.js'
import CalendarView from './CalendarView/CalendarView.js'
import ChatView from './ChatView/ChatView.js'
import ToolsView from './ToolsView/ToolsView.js'
import AppBar from './layout/AppBar'
import BottomNav from './layout/BottomNav'
import { switchTab } from '../../store/actions/tabActions'
import { getCycle } from '../../store/actions/cycleActions'


class UserView extends React.Component {

  componentDidMount = () => {
    this.props.getCycle()
  
    switch (this.props.location.pathname) {
      case '/app/chat':
        return this.props.switchTab(0)
      case '/app/calendar':
        return this.props.switchTab(1)
      case '/app/tools':
        return this.props.switchTab(2)
      default:
        return this.props.switchTab(1)
      }
  }

  render() {  
    return (
      <React.Fragment>
        <main>
          <CssBaseline />
            <AppBar children={
              <Switch>
                <Route path="/app/chat" component={ChatView} />
                <Route exact path="/app/calendar" component={CalendarView} />
                <Route path="/app/calendar/:day" component={TrainingView} />
                <Route path="/app/tools" component={ToolsView} />
                <Route component={CalendarView} />
              </Switch>
            }/>
            <BottomNav />
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    tab: state.tab.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCycle: () => dispatch(getCycle()),
    switchTab: (tab, props) => dispatch(switchTab(tab, props))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(UserView)
