import React from "react"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  panelSummary: {
    height: 80,
    margin: 5
  },
  display1: {
    fontSize: 18,
    opacity: 0.9
  },
  heading: {
    fontSize: 14,
    opacity: 0.9,
    padding: 15
  },
  subheading: {
    opacity: 0.9
  },
  subheading2: {
    opacity: 0.9
  },
  details: {
    alignItems: "center",
    display: "flex",
  },
  cellLg: {
    width: "45%"
  },
  cellMd: {
    width: "22%"
  },
  cellSm: {
    width: "11%"
  }
});

class ExerciseCard extends React.Component {
  constructor() {
    super()

    this.state = {
      open: true
    }
  }

  handleToggle = () => {
    this.setState(prevState => ({ open: !prevState.open}))
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <ExpansionPanel key={this.props.name} className={classes.panel} expanded={this.state.open} onChange={this.handleToggle}>
                <ExpansionPanelSummary
                className={classes.panelSummary}
                expandIcon={!this.props.alwaysOpen && <ExpandMoreIcon />}
                >
                    <Typography className={classes.display1} >{this.props.name}</Typography>  
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Table padding="none">
                        <TableBody>
                        {this.props.exercises && this.props.exercises.map((obj, index) => (
                            <TableRow key={obj.name+index}>
                                <TableCell component="th" scope="row" className={classes.cellLg}>
                                    <Typography className={classes.heading}>
                                        {obj.block}{obj.block && ' - '}{obj.name}
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.cellMd}>
                                    <Typography className={classes.heading}>
                                        {obj.assignation}
                                    </Typography>
                                </TableCell>         
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    )
  }
}

export default withStyles(styles)(ExerciseCard);