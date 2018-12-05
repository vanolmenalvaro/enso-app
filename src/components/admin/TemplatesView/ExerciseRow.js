import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
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
      <TableRow>
        <TableCell>
          <FormControl className={classes.cellSm}>
            <InputLabel>{constants.block}</InputLabel>
            <Input id="block" name="block" disableUnderline value={this.props.exercise.block} onChange={(event) => this.props.handleChange(event, this.props.index)}/>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl>
            <AutoSuggestInput index={this.props.index} value={this.props.exercise.name} options={this.props.options} handleChange={this.props.handleChange}/>
          </FormControl>
        </TableCell>
        <TableCell>
          <FormControl className={classes.cellSm}>
            <InputLabel>{constants.assignation}</InputLabel>
            <Input id="assignation" name="assignation" disableUnderline value={this.props.exercise.assignation} onChange={(event) => this.props.handleChange(event, this.props.index)}/>
          </FormControl>
        </TableCell>
        <TableCell>
          <Tooltip title={constants.delete}>
            <IconButton className={classes.button} onClick={() => this.props.deleteRow(this.props.index)} >
              <Delete className={classes.icon} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    )
  }
}

export default(withStyles(styles))(ExerciseRow)