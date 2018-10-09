import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import TrainingView from './TrainingView/TrainingView.js'
import CalendarView from './CalendarView/CalendarView.js'

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
});

class Content extends React.Component {
  state = {}

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
              <TrainingView />
              {/* <CalendarView /> */}
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
