import React, {Component} from 'react'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'
import { DragHandle as DragIcon } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'

import ExerciseRow from './ExerciseRow'

const DragHandle = SortableHandle(() => <DragIcon/>)

const SortableItem = SortableElement(({ exercise, options, handleChange, deleteRow, indexProp }) => {
  return (
    <Grid container direction="row" alignItems='center' style={{zIndex: 99999}}>
      <Grid item style={{marginRight: 10}}>
        <DragHandle/>
      </Grid>
      <Grid item>
        <ExerciseRow 
          exercise={exercise}
          options={options} 
          handleChange={handleChange} 
          deleteRow={deleteRow}
          index={indexProp}
        />
      </Grid>
    </Grid>
  )
})

const SortableList = SortableContainer(({ exercises, options, handleChange, deleteRow }) => {
    return (
        <div>
          {exercises && exercises.map((exercise, index) => {
            return(
              <SortableItem 
                key={`item-${index}`} 
                index={index} //internal usage inside dnd library, can't be accessed later
                indexProp={index} //passed to the child component
                exercise={exercise} 
                options={options} 
                handleChange={handleChange} 
                deleteRow={deleteRow}
              />
            )
          })}
        </div>
    )
})

class ExerciseList extends Component {
  onSortEnd = ({oldIndex, newIndex}) => (
    this.props.handleSort(oldIndex, newIndex)
  )

  render() {
    return <SortableList 
      exercises={this.props.exercises} 
      options={this.props.options} 
      handleChange={this.props.handleChange} 
      deleteRow={this.props.deleteRow}
      onSortEnd={this.onSortEnd} 
      useDragHandle={true}
    />
  }
}

export default ExerciseList