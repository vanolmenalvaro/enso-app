import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import ExerciseCard from './ExerciseCard'
import { getCycles } from '../../../store/actions/programActions'

class TrainingView extends Component{

  componentDidMount() {
    if(!this.props.program || !this.props.blocks || this.props.cycle.isInitState) {
      this.props.getCycles(this.props.auth.uid)
    }
  }

  render() {
    const day = this.props.match.params.day
    const formattedDay = day.replace(/-/g, '/')    

    return(
      <div>
        <Typography variant="h4" align='center'>
          {formattedDay}
        </Typography> 
          {this.props.program[day] && this.props.program[day].map(blockId => {
            let block = this.props.blocks[blockId]
            return (
                <div key={block.name}> 
                    <ExerciseCard 
                      key={block.name} 
                      name={block.name} 
                      shortName={block.shortName} 
                      color={block.color} 
                      exercises={block.exercises}
                    />
                </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
      program: state.program.cycles[0].content.program,
      blocks: state.program.cycles[0].content.blocks,
      cycle: state.program.cycles[0],
      day: state.tab.day,
      auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCycles: (uid) => dispatch(getCycles(uid))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(TrainingView)