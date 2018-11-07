import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Fade from '@material-ui/core/Fade';

import TrainingView from './TrainingView/TrainingView.js'
import CalendarView from './CalendarView/CalendarView.js'
import ChatView from './ChatView/ChatView.js'

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

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <CssBaseline />
          <main className={classes.main}>
            <div className={classes.appBarSpacer} />
            <div className={classes.content}>
              <Fade in={this.props.tabIndex === 0} mountOnEnter unmountOnExit>
                <ChatView />
              </Fade>
              <Fade in={this.props.tabIndex === 1} mountOnEnter unmountOnExit> 
                <CalendarView />
              </Fade>   
              <Fade in={this.props.tabIndex === 2} mountOnEnter unmountOnExit>
                <TrainingView />
              </Fade> 
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
};

export default withStyles(styles)(Content);
