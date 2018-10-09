import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function CalendarView(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
        <Grid container 
            direction="row"
            justify="space-evenly"
            alignItems="center"
            spacing={0} xs={12}
        >
            <Grid item xs>
            <Paper className={classes.paper} square="true">Lunes</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} square="true">Martes</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} square="true">Miércoles</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} square="true">Jueves</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} square="true">Viernes</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} square="true">Sábado</Paper>
            </Grid>
            <Grid item xs>
            <Paper className={classes.paper} square="true">Domingo</Paper>
            </Grid>
        </Grid>
    </div>
  );
}

CalendarView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CalendarView);
