import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
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
      chipToAdd: ""
    }
  }

  componentDidMount = () => {
    if(this.props.exerciseTemplates.length === 0) this.props.getExerciseTemplates()
    if(this.props.blockTemplates.length === 0) this.props.getBlockTemplates()
  }

  addChip = (day) => {
    var newDay = []
    if(this.state.cycle.content.program[day]) {
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
    let newBlocks = this.state.cycle.content.blocks
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

  addBlock = (id) => {
    if(this.state.chipToAdd !== "") {
      this.setState({ chipToAdd: "" })
    } else {
      this.setState({ chipToAdd: id })
    }
  }

  render() {
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
                key={this.state.cycle.content.blocks[blockId].name+'-block-card'}
                exerciseTemplates={this.props.exerciseTemplates}
                updateState={this.updateState}
                index={index}
                chipToAdd={this.state.chipToAdd}
                addBlock={this.addBlock}
              />) 
            )
          : 
            <Typography variant="h5" noWrap>
                <br/>{constants.noResults}
            </Typography>
          }
        </Grid>
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
 