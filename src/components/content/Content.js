import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
//eslint-disable-next-line
import TrainingView from './TrainingView/TrainingView.js'
import CalendarView from './CalendarView/CalendarView.js'

const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  main: {
    width: '100%',
    height: '100%'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    height: `calc(100% - 112px)`,
    width: '100%',
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
          <main className={classes.main}>
            <div className={classes.appBarSpacer} />
            <div className={classes.content}>
              {/* <TrainingView /> */}
                <CalendarView />
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
