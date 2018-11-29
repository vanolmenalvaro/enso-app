import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ExerciseCard from './ExerciseCard'

class TrainingView extends Component{

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const day = this.props.match.params.day.replace(/-/g, '/')
    let blocksThisDay = []
    this.props.blocks.map(block => (
      this.props.program[day] && this.props.program[day].map(programBlock => (
        programBlock.name === block.name &&
          blocksThisDay.push(block)
      ))
    ))

    var renderReturn = 
    blocksThisDay.length !== 0 && 
    blocksThisDay.map(obj => (
      <div key={obj.name}> 
        <ExerciseCard key={obj.name} name={obj.name} shortName={obj.shortName} color={obj.color} exercises={obj.exercises}  />
      </div>))

    return(
      <div>
        <Typography variant="h4" align='center'>
          {day}
        </Typography> 
        {renderReturn}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      program: state.program.cycle.content.program,
      blocks: state.program.cycle.content.blocks,
      day: state.tab.day
  }
}

export default compose(
  connect(mapStateToProps),
  withRouter
)(TrainingView)