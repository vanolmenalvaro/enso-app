import React, { Component } from 'react'
import { connect } from 'react-redux'
import Typography from "@material-ui/core/Typography";

import ExerciseCard from './ExerciseCard'

class TrainingView extends Component{

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const { dispatch, ...restOfProps} = this.props

    let blocksThisDay = []
    this.props.blocks.map(block => (
      this.props.program[this.props.day] && this.props.program[this.props.day].map(programBlock => (
        programBlock.name === block.name &&
          blocksThisDay.push(block)
      ))
    ))

    var renderReturn = blocksThisDay.length !== 0
    ? blocksThisDay.map(obj => (
      <div key={obj.name}> 
        <ExerciseCard key={obj.name} name={obj.name} shortName={obj.shortName} color={obj.color} exercises={obj.exercises}  />
      </div>))
    : <Typography variant="h2">
        Rest Day! <span role="img" aria-label='party emoji'>🎉</span>
      </Typography>

    return(
      <div {...restOfProps}>
        {renderReturn}
      </div>
    )
  }

}

const mapStateToProps = (state) => {

  return{
      program: state.cycle.content.program,
      blocks: state.cycle.content.blocks,
      day: state.tab.day
  }

}

export default connect(mapStateToProps)(TrainingView)