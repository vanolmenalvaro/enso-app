import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Calendar from './Calendar'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
});

function CalendarView(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <Calendar />
    </div>
  );
}

CalendarView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarView);
