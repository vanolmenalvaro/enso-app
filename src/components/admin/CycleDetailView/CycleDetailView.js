import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { Add, LowPriority, Delete } from '@material-ui/icons'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { arrayMove } from 'react-sortable-hoc'
import moment from 'moment'

import constants from '../../../config/constants'
import Calendar from '../../user/CalendarView/Calendar'
import BlockCard from './BlockCard'
import { getExerciseTemplates, getBlockTemplates, setCycle, getCycle } from '../../../store/actions/programActions'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export class CycleDetailView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cycleId: this.props.location.state.cycleId,
      cycle: this.props.cycle,
      uid: this.props.location.state.uid,
      edit: false,
      anchorEl: null,
      open: false,
      chipToAdd: "",
      blockToAdd: { name: ""},
      dateError: false,
      updateSwitch: false
    }
  }

  componentDidMount = () => {
    if(this.props.location.state.cycleId !== null) {
      this.props.getCycle(this.props.location.state.cycleId)
    } else {
      this.handleStartFromScratch(this.props.location.state.ref)
    }
    if(this.props.exerciseTemplates.length === 0) this.props.getExerciseTemplates()
    if(this.props.blockTemplates.length === 0) this.props.getBlockTemplates()
  }

  componentDidUpdate = () => {
    if(this.state.cycle.isInitState === true && !this.props.cycle.isInitState){
      this.setState({cycle: this.props.cycle})
    }
  }

  componentWillUnmount = () => {
    this.handleStartFromScratch()
  }

  addChip = (day) => {
    var newDay = []
    if(this.state.cycle.content.program[day] && this.state.cycle.content.program[day].length !== 0) {
      newDay =this.state.cycle.content.program[day].slice()
    }

    newDay.push(this.state.chipToAdd)

    this.setState({ 
      cycle: {
        ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          program: {
            ...this.state.cycle.content.program,
            [day]: newDay
          }
        }
      },
      edit: true
    })
  }

  deleteChip = (chipIndex, day) => {
    var newDay = []
    if(this.state.cycle.content.program[day].length > 1) {
      newDay = this.state.cycle.content.program[day].filter((chip, index) => index !== chipIndex)
    }
    this.setState({ 
      cycle: {
        ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          program: {
            ...this.state.cycle.content.program,
            [day]: newDay
          }
        }
      },
      edit: true
    })
  }

  handleSortChips = (oldIndex, newIndex, day) => {
    this.setState({
      cycle: {
        ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          program: {
            ...this.state.cycle.content.program,
            [day]: arrayMove(this.state.cycle.content.program[day], oldIndex, newIndex)
          }
        }
      },
      edit: true
    })
  }

  updateState = (newState, id) => {
    let newBlocks = JSON.parse(JSON.stringify(this.state.cycle.content.blocks)) //deep copy
    newBlocks[id] = newState

    this.setState({
      cycle: {
        ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          blocks: newBlocks
        }
      },
      edit: true
    })
  }

  addBlockToCalendar = (id) => {
    if(this.state.chipToAdd !== "") {
      this.setState({ chipToAdd: "" })
    } else {
      this.setState({ chipToAdd: id })
    }
  }

  addBlock = ( 
    name = "", 
    shortName = "", 
    color = "#000000", 
    exercises = [{
      name: "",
      block: "",
      assignation: ""
    }], 
    id = Math.random().toString(36)
  ) => {
    let newBlock = {
      name: name,
      shortName: shortName,
      color: color,
      exercises: exercises,
      id: id
    }
  
    this.setState({
      cycle: {
        ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          blocks: {
            ...this.state.cycle.content.blocks,
            [id]: newBlock
          }
        }
      },
      edit: true
    })
    this.handleMenuClose()
  }

  deleteBlock = (id) => {
    let newBlocks = JSON.parse(JSON.stringify(this.state.cycle.content.blocks)) //deep copy
    let newProgram = {}

    //delete block from Blocks
    delete newBlocks[id]

    //delete blocks from Program
    Object.keys(this.state.cycle.content.program).map(day => {
      newProgram[day] = this.state.cycle.content.program[day].filter(block => block !== id)
      if(newProgram[day].length === 0) {
        delete newProgram[day] 
      }
      return null
    })

    this.setState({
      cycle: {
        ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          blocks: newBlocks,
          program: newProgram
        }
      },
      edit: true
    })
  }

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
  }

  handleDialogOpen = () => {
    this.handleMenuClose()
    this.setState({ open: true })
  }

  handleDialogAccept = () => {
    this.handleDialogClose()
    this.addBlock(this.state.blockToAdd.name, this.state.blockToAdd.shortName, this.state.blockToAdd.color, this.state.blockToAdd.exercises)
    this.setState({ edit: true })
  }

  handleDialogClose = () => {
    this.handleMenuClose()
    this.setState({ open: false })
  }

  handleSelectChange =  event => {
    this.setState({ 
      blockToAdd: (this.props.blockTemplates.filter(blocktemplate => blocktemplate.name === event.target.value))[0],
      edit: true 
    })
  }

  handleFormChange =  event => {
    this.setState({ 
      [event.target.id]: event.target.value,
      edit: true
    })
  }

  handleDateChange =  event => {
    if(new Date(event.target.value).getDay() !== 1) {
      this.setState({dateError: true})
    } else {
      this.setState({ 
        cycle: {
          ...this.state.cycle,
          content: {
            ...this.state.cycle.content,
            initialDate: event.target.value
          }
        },
        dateError: false,
        edit: true
      })
    }
  }

  handleCancel = () => {
    this.setState(prevState => ({ 
      cycle: this.props.cycle,
      edit: false,
      updateSwitch: !prevState.updateSwitch
    }))
  }

  handleAccept = () => {
    let newBlocks = []
    Object.keys(this.state.cycle.content.blocks).forEach(block => {
      let newBlock = JSON.parse(JSON.stringify(this.state.cycle.content.blocks[block])) //deep copy

      newBlock.exercises.forEach((newBlockExercise, ind )=> {
        let completeExercise = 
          this.props.exerciseTemplates.filter(exerciseTemplateExercise => 
          exerciseTemplateExercise.exerciseName === newBlockExercise.name)[0]

        if(completeExercise && completeExercise.videoId) {
          newBlock.exercises[ind] = {
            videoId: completeExercise.videoId,
            end: completeExercise.end,
            start: completeExercise.start,
            ...newBlock.exercises[ind],
          }
        }
      })

      newBlocks = {
        ...newBlocks,
        [newBlock.id]: newBlock
      }
    })
     
    this.props.setCycle({
       ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          blocks: newBlocks
        }
    })

    this.setState({ edit: false })
  }

  handleStartFromScratch = (ref) => {
    const date = new Date()
    date.setDate(1)

    // Get the first Monday in the month
    while (date.getDay() !== 1) {
        date.setDate(date.getDate() + 1)
    }

    let month = date.getMonth()+1
    let day = date.getDate()

    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    const firstDay = date.getFullYear()+"-"+month+"-"+day

    this.setState({ 
      cycle: {
        user: {
          uid: this.state.uid,
          ref: ref || this.state.cycle.user.ref
        },
        content: {
          initialDate: firstDay,
          blocks: [],
          program: {}
        }
      },
      edit: true
    })
  }

  handleCopyFromWeekOne = () => {
    let newProgram = {}

    for(let i=0;i<7;i++) { //iterate through first week
      let dayFirstWeek = moment(this.state.cycle.content.initialDate, constants.dateFormat).add(i, 'days').format(constants.dateFormat)
      
      if(this.state.cycle.content.program[dayFirstWeek]) { //if a day exists in the first week
        for(let j=0;j<6;j++) { //copy it in the remaining weeks
          let dayRestOfWeeks = moment(dayFirstWeek, constants.dateFormat).add(j*7, 'days').format(constants.dateFormat)
          newProgram[dayRestOfWeeks] = JSON.parse(JSON.stringify(this.state.cycle.content.program[dayFirstWeek])) //deep copy
        }
      }
    }

    this.setState({ 
      cycle: {
        ...this.state.cycle,
        content: {
          ...this.state.cycle.content,
          program: newProgram
        }
      },
      edit: true
    })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <Grid container direction="row" spacing={8}>
        <Grid item md={6}>
          <Grid container direction="row" spacing={8} justify="flex-start">
            <Grid item>
              <FormControl error={this.state.dateError}>
                <TextField
                  id="iniDate"
                  label={constants.startingDate}
                  type="date"
                  value={this.state.cycle && this.state.cycle.content.initialDate}
                  onChange={this.handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={this.state.dateError}
                />
                { this.state.dateError === true && <FormHelperText>{constants.datePickerErrorText}</FormHelperText> }
              </FormControl>
            </Grid>
            <Grid item>
              <Tooltip title={constants.startFromScratch}>
                <Button 
                  size="small"
                  variant="outlined"
                  style={{ height: '100%' }}
                  onClick={this.handleStartFromScratch}
                >
                    <Delete/>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title={constants.copyFromWeekOne}>
                <Button 
                  size="small"
                  variant="outlined"
                  style={{ height: '100%' }}
                  onClick={this.handleCopyFromWeekOne}
                >
                    <LowPriority/>
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Grid container direction="row" spacing={8} justify="flex-end" style={{ height: '100%' }}>
            <Grid item>
                <Button
                  variant="contained"
                  onClick={this.handleCancel}
                  disabled={!this.state.edit}
                >
                  {constants.cancel}
                </Button>
            </Grid>
            <Grid item>
                <Button 
                  color="primary"
                  variant="contained"
                  onClick={this.handleAccept}
                  disabled={!this.state.edit}
                >
                  {constants.accept}
                </Button>
            </Grid>
          </Grid>
        </Grid>  
        <Grid item xs={12} lg={6}>
          <Calendar 
            cycle={this.state.cycle} 
            uid={this.state.uid} 
            edit={true}
            handleSortChips={this.handleSortChips}
            addChip={this.addChip}
            deleteChip={this.deleteChip}
            chipToAdd={this.state.chipToAdd}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          {this.state.cycle.content.blocks.length !== 0 &&
            Object.keys(this.state.cycle.content.blocks).map((blockId, index) => (
              <BlockCard 
                block={this.state.cycle.content.blocks[blockId]} 
                key={'block-' + blockId + this.state.updateSwitch + '-card'}
                exerciseTemplates={this.props.exerciseTemplates}
                updateState={this.updateState}
                index={index}
                chipToAdd={this.state.chipToAdd}
                addBlock={this.addBlockToCalendar}
                deleteBlock={this.deleteBlock}
              />) 
            )
          }
          <Grid container justify="center">
            <Tooltip title={constants.addBlock}>
              <Fab 
                aria-owns={anchorEl ? 'simple-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleMenuClick} 
              >
                <Add />
              </Fab>
            </Tooltip>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem onClick={this.handleDialogOpen}>{constants.fromTemplate}</MenuItem>
              <MenuItem onClick={() => this.addBlock()}>{constants.fromScratch}</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{constants.addBlock}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {constants.addBlockText}
            </DialogContentText>
            <Select
              native
              value={this.state.blockToAdd.name}
              onChange={this.handleSelectChange}
              input={<Input/>}
            >
              <option value={{}} />
              {this.props.blockTemplates && this.props.blockTemplates.map(block => 
                <option value={block.name} key={block.name}>{block.name}</option>
              )}
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogClose} color="primary">
              {constants.cancel}
            </Button>
            <Button onClick={this.handleDialogAccept} color="primary">
              {constants.accept}
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    exerciseTemplates: state.program.templates.exerciseTemplates,
    blockTemplates: state.program.templates.blockTemplates,
    cycle: state.program.currCycle
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExerciseTemplates: () => dispatch(getExerciseTemplates()),
    getBlockTemplates: () => dispatch(getBlockTemplates()),
    setCycle: (cycle) => dispatch(setCycle(cycle)),
    getCycle: (id) => dispatch(getCycle(id))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CycleDetailView)
 