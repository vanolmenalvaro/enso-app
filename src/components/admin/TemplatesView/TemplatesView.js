import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
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
import { connect } from 'react-redux'
import { compose } from 'redux'

import constants from '../../../config/constants'
import ExerciseTemplateDialog from './ExerciseTemplateDialog'
import { getExerciseTemplates } from '../../../store/actions/programActions'
import ExerciseTemplateCard from './ExerciseTemplateCard'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 5
  },
  control: {
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    paddingLeft: 52, //addIcon width
    width: `calc(100% - 52px)`, //100% - addIcon width
    paddingTop: 4
  },
  typography: {
    textAlign: 'center',
    paddingLeft: 48, //editIcon width
    width: `calc(100% - 48px)`, //100% - editIcon width
    paddingTop: 9
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

export class TemplatesView extends Component {
  state = {
    searchText: '',
    exerciseDialogOpen: false,
    blockDialogOpen: false
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value})
  }

  deleteSearchText = () => {
    this.setState({searchText: ''})
  }

  handleDialogClose = (dialog) => {
    if(dialog === 'exercise') {
      this.setState({ 
        exerciseDialogOpen: false,
      })
    }
    if(dialog === 'block') {
      this.setState({ blockDialogOpen: false })
    }
  }

  handleDialogOpen = (dialog) => {
    if(dialog === 'exercise') {
      this.setState({ 
        exerciseDialogOpen: true,
      })
    }
    if(dialog === 'block') {
      this.setState({ blockDialogOpen: true })
    }
  }

  componentDidMount = () => {
    this.props.getExerciseTemplates()
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
              id="searchText"
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
        <Grid container className={classes.root} justify="space-evenly" spacing={8}>
            <Grid xs={6} item >
              <Grid container direction="row">
                <Typography variant="h4" className={classes.title} noWrap>
                    {constants.exercises}
                </Typography>
                <Tooltip title={constants.addExercise}>
                  <IconButton color="primary" className={classes.button} onClick={() => this.handleDialogOpen("exercise")} >
                    <Add className={classes.icon} />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid container direction="column" alignItems="center">
                { this.props.exerciseTemplates.length !== 0 ?
                    this.props.exerciseTemplates.map((exerciseTemplate) => 
                      <ExerciseTemplateCard exerciseTemplate={exerciseTemplate} key={exerciseTemplate.uid+'-card'}/>) 
                  :
                    <Typography variant="h5" noWrap>
                        <br/>{constants.noResults}
                    </Typography>
                }
              </Grid>
            </Grid>
            <Grid xs={6} item>
              <Grid container direction="row">
                <Typography variant="h4" className={classes.title} noWrap>
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
        <ExerciseTemplateDialog open={this.state.exerciseDialogOpen} handleDialogClose={this.handleDialogClose}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    exerciseTemplates: state.program.templates.exerciseTemplates,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExerciseTemplates: () => dispatch(getExerciseTemplates()),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(TemplatesView)
