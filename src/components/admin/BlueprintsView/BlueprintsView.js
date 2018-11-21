import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import { Clear, Add } from '@material-ui/icons'
import Fade from '@material-ui/core/Fade'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import constants from '../../../config/constants'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    minHeight: 140
  },
  control: {
    marginBottom: 40,
  },
  typography: {
    textAlign: 'center',
    paddingLeft: 52, //addIcon width
    width: `calc(100% - 52px)`, //100% - addIcon width
    paddingTop: 4
  },
  button: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 0
  },
  icon: {
    fontSize: 28
  }
});

export class BlueprintsView extends Component {
  state = {
    searchText: ''
  }

  handleChange = (event) => {
    this.setState({searchText: event.target.value})
  }

  deleteSearchText = () => {
    this.setState({searchText: ''})
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <FormControl className={classes.control} margin="normal" fullWidth>
            <InputLabel>{constants.search}</InputLabel>
            <Input
              name="search"
              type="text"
              id="search"
              onChange={this.handleChange}
              value={this.state.searchText}
              endAdornment={
                <Fade in={this.state.searchText !== ''}>
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="Delete search text"
                      onClick={this.deleteSearchText}
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                </Fade>
              }
            />
        </FormControl>

            <Grid container className={classes.root} justify="space-evenly" spacing={16}>
                <Grid xs={6} item >
                  <Grid container direction="row">
                    <Typography variant="h4" className={classes.typography} noWrap>
                        {constants.exercises}
                    </Typography>
                    <Tooltip title={constants.addExercise}>
                      <IconButton color="primary" className={classes.button} onClick={this.handleClickOpen} >
                        <Add className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  {/* exercises && map */}
                  <Paper className={classes.paper} />
                </Grid>
                <Grid xs={6} item>
                  <Grid container direction="row">
                    <Typography variant="h4" className={classes.typography} noWrap>
                        {constants.blocks}
                    </Typography>
                    <Tooltip title={constants.addBlock}>
                      <IconButton color="primary" className={classes.button} onClick={this.handleClickOpen} >
                        <Add className={classes.icon} />
                      </IconButton>
                    </Tooltip>
                  </Grid>
                  {/* exercises && map */}
                  <Paper className={classes.paper} />
                </Grid>
            </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(BlueprintsView)
