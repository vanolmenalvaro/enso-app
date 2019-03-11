import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { Delete } from '@material-ui/icons'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'


import constants from '../../../config/constants'
import AutoSuggestInput from './AutoSuggestInput'

const styles = () => ({
  cellSm: {
    width: 75,
    paddingBottom: 17,
    marginLeft: 2
  }
})

class ExerciseRow extends Component {
  render() { 
    const { classes } = this.props

    return (
      <Grid container direction="row" alignItems='center'>
        <Grid item>
          <FormControl className={classes.cellSm}>
            <InputLabel>{constants.block}</InputLabel>
            <Input 
              id={'block'+this.props.index} 
              name="block" 
              disableUnderline 
              value={this.props.exercise.block} 
              onKeyDown={(event) => this.props.handleChange(event.key, this.props.index, 'block')}
              autoComplete="off"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <AutoSuggestInput 
              index={this.props.index} 
              value={this.props.exercise.name}
              options={this.props.options} 
              handleChange={this.props.handleChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl className={classes.cellSm}>
            <InputLabel>{constants.assignation}</InputLabel>
            <Input 
              id={"assignation"+this.props.index} 
              name="assignation" 
              disableUnderline 
              value={this.props.exercise.assignation} 
              onKeyDown={(event) => this.props.handleChange(event.key, this.props.index, 'assignation')}
              autoComplete="off"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Tooltip title={constants.delete}>
            <IconButton onClick={() => this.props.deleteRow(this.props.index)} >
              <Delete />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    )
  }
}

export default(withStyles(styles))(ExerciseRow)