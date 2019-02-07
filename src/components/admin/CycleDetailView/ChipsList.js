import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'
import Grid from '@material-ui/core/Grid'
import Typography from "@material-ui/core/Typography"
import ButtonBase from '@material-ui/core/ButtonBase'
import { DragHandle as DragIcon, Close } from '@material-ui/icons'

const styles = () => ({
    typographySm: {
      fontSize: 10,
      color: 'white',
      fontWeight: 'bold'
    },
    chip: {
      fontSize: 10,
      width: '100%',
      borderRadius: 8,
      margin: 1
    },
    icon: {
      color: 'white',
      fontSize: 15,
      margin: 2
    }
  });

const DragHandle = SortableHandle(() => <DragIcon style={{color: 'white'}}/>)

const SortableItem = SortableElement(({ block, deleteChip, indexProp, day, classes }) => {
  return (
    <Grid  container direction="row" className={classes.chip} alignItems="center" justify="space-between" style={{ backgroundColor: block.color }} key={block.name}> 
      <Grid item>
        <DragHandle className={classes.icon}/>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1" className={classes.typographySm} noWrap>
          {block.shortName}
        </Typography>
      </Grid>
      <Grid item>
        <ButtonBase onClick={() => deleteChip(indexProp, day)}>
          <Close className={classes.icon}/>
        </ButtonBase>
      </Grid>
    </Grid>
  )
})

const SortableList = SortableContainer(({ blocks, deleteChip, handleSortChips, day, classes }) => {
    return (
        <div>
          {blocks && blocks.map((block, index) => {
            return(
              <SortableItem 
                key={`item-${index}-${block.name}`} 
                index={index} //internal usage inside dnd library, can't be accessed later
                indexProp={index} //passed to the child component
                block={block} 
                deleteChip={deleteChip}
                handleSortChips={handleSortChips}
                day={day}
                classes={classes}
              />
            )
          })}
        </div>
    )
})

class ChipsList extends Component {
  onSortEnd = ({oldIndex, newIndex}) => (
    this.props.handleSortChips(oldIndex, newIndex, this.props.day)
  )

  render() {
    return <SortableList 
      blocks={this.props.blocks} 
      deleteChip={this.props.deleteChip}
      onSortEnd={this.onSortEnd}
      classes={this.props.classes}
      useDragHandle={true}
      day={this.props.day}
    />
  }
}

export default withStyles(styles)(ChipsList)
