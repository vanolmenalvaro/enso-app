import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from "react-router-dom"

import TrainingView from './TrainingView/TrainingView.js'
import CalendarView from './CalendarView/CalendarView.js'
import ChatView from './ChatView/ChatView.js'
import ToolsView from './ToolsView/ToolsView.js'
import { switchTab } from '../../store/actions/tabActions'

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  main: {
    width: '100%',
    height: '100%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    width: '100%',
    overflow: 'auto',
  },
});

class Content extends React.Component {

  componentDidMount = () => {
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
    const { classes } = this.props
    
    return (
      <React.Fragment>
        <CssBaseline />
          <main className={classes.main}>
            <div className={classes.appBarSpacer} />
            <div className={classes.content}>
              <Switch>
                <Route path="/app/chat" component={ChatView} />
                <Route exact path="/app/calendar" component={CalendarView} />
                <Route path="/app/calendar/:day" component={TrainingView} />
                <Route path="/app/tools" component={ToolsView} />
                <Route component={CalendarView} />
              </Switch>
            </div>
            <Hidden smUp>
              <div className={classes.appBarSpacer} />
            </Hidden>
          </main>
      </React.Fragment>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return{
    tab: state.tab.tab
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (tab, props) => dispatch(switchTab(tab, props))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter
)(Content)
