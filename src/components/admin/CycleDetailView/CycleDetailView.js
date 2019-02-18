import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip'
import { Add } from '@material-ui/icons'
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
import { withRouter } from "react-router-dom"
import { connect } from 'react-redux'
import { compose } from 'redux'
import { arrayMove } from 'react-sortable-hoc'

import constants from '../../../config/constants'
import Calendar from '../../user/CalendarView/Calendar'
import BlockCard from './BlockCard'
import { getExerciseTemplates, getBlockTemplates, createCycle } from '../../../store/actions/programActions'

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
      cycle: this.props.location.state.cycle,
      uid: this.props.location.state.uid,
      edit: false,
      anchorEl: null,
      open: false,
      chipToAdd: "",
      blockToAdd: { name: ""}
    }
  }

  componentDidMount = () => {
    if(this.props.exerciseTemplates.length === 0) this.props.getExerciseTemplates()
    if(this.props.blockTemplates.length === 0) this.props.getBlockTemplates()
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
  }

  handleDialogClose = () => {
    this.handleMenuClose()
    this.setState({ open: false })
  }

  handleSelectChange =  event => {
    this.setState({ blockToAdd: (this.props.blockTemplates.filter(blocktemplate => blocktemplate.name === event.target.value))[0] })
  }

  render() {
    const { anchorEl } = this.state

    return (
      <Grid container direction="row" spacing={8}>
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
          {this.state.cycle.content.blocks.length !== 0 ?
            Object.keys(this.state.cycle.content.blocks).map((blockId, index) => (
              <BlockCard 
                block={this.state.cycle.content.blocks[blockId]} 
                key={'block-' + blockId + '-card'}
                exerciseTemplates={this.props.exerciseTemplates}
                updateState={this.updateState}
                index={index}
                chipToAdd={this.state.chipToAdd}
                addBlock={this.addBlockToCalendar}
                deleteBlock={this.deleteBlock}
              />) 
            )
          : 
            <Typography variant="h5" noWrap>
                <br/>{constants.noResults}
            </Typography>
          }
          <Grid container justify="center">
            <Tooltip title={constants.addBlock}>
              <Fab 
                color="primary" 
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExerciseTemplates: () => dispatch(getExerciseTemplates()),
    getBlockTemplates: () => dispatch(getBlockTemplates()),
    createCycle: (cycle) => dispatch(createCycle(cycle))
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(CycleDetailView)
 