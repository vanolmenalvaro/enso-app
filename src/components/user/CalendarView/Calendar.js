import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'

import DayDetails from './DayDetails'
import constants from '../../../config/constants'

const styles = theme => ({
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
      border: '1px solid',
      backgroundColor: 'white',
      marginRight: 8,
      marginBottom: 65
    },
    headerRow: {
      display: 'table',
      width: '100%',
      height: 20,
      tableLayout: 'fixed',
    },
    row: {
      display: 'table',
      width: '100%',
      minHeight: `calc((100% - 19px) / 6)`,
      tableLayout: 'fixed',
    },
    cell: {
      width: `calc(100% / 7)`,
      display: 'table-cell',
      textAlign: 'center',
      border: '1px solid #474747'
    },
    typography: {
      fontSize: 14,
    }
  });

class Calendar extends Component {

    returnBlocksforDay = (dayNumber) => {
        let blocks = []
        this.props.cycle.content.program[dayNumber].map(blockId => (
            blocks.push({
                color: this.props.cycle.content.blocks[blockId].color,
                name: this.props.cycle.content.blocks[blockId].name,
                shortName: this.props.cycle.content.blocks[blockId].shortName
            })
        ))
        return blocks
    }
    
    createCycle = () => {
        const { classes } = this.props;
        let weeks = []
        let dayNumber = ''
        let blocks = []
        let days = []
        
        // Outer loop to create week row
        for (let i = 0; i < 6; i++) {
            days = []
            //Inner loop to create each day
            for (let j = 0; j < 7; j++) { 
                blocks = []
                if(this.props.cycle.content){
                    dayNumber = moment(this.props.cycle.content.initialDate, constants.dateFormat).add(j + i * 7, 'days').format('DD/MM/YYYY')
                    if(this.props.cycle.content.program[dayNumber]) {
                        blocks = this.returnBlocksforDay(dayNumber)
                    }
                }
                days.push(<DayDetails 
                    initialDate={this.props.cycle.content.initialDate} 
                    day={dayNumber} key={j + i * 7} 
                    blocks={blocks} 
                    switchTab={this.props.switchTab} 
                    edit={this.props.edit}
                    handleSortChips={this.props.handleSortChips}
                    deleteChip={this.props.deleteChip}
                    addChip={this.props.addChip}
                    chipToAdd={this.props.chipToAdd}
                />)
            }
            //Create the week and add the days
            weeks.push(
                <div className={classes.row} key={i}>
                    {days}
                </div>)
        }
        return weeks
    }
    render() {
        const { classes } = this.props

        return (
            <div className={classes.paper}>
                <div className={classes.headerRow}>
                    {constants.weekDays.map(name => (
                        <div className={classes.cell} key={name}>
                            <Typography variant="caption" noWrap>
                                {name}
                            </Typography>
                        </div>
                    ))}
                </div>
                {this.createCycle()}
            </div>   
        )
    }
}

export default withStyles(styles)(Calendar);