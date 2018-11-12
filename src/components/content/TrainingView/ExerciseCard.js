import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

class CheckboxList extends React.Component {
  state = {
    checked: [0]
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root}>
            <ExpansionPanel key={this.props.name} className={classes.panel}>
                <ExpansionPanelSummary
                className={classes.panelSummary}
                expandIcon={<ExpandMoreIcon />}
                >
                    <Typography className={classes.display1} >{this.props.name}</Typography>  
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    <Table padding="none">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cellLg}/>
                                <TableCell className={classes.cellMd} numeric>
                                    <Typography className={classes.subheading2}>
                                        SETS
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.cellMd} numeric>
                                    <Typography className={classes.subheading2}>
                                        REPS
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.cellSm} numeric />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.props.exercises && this.props.exercises.map(obj => (
                            <TableRow key={obj.name}>
                                <TableCell component="th" scope="row" className={classes.cellLg}>
                                    <Typography className={classes.heading}>
                                        {obj.name}
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.cellMd} numeric>
                                    <Typography className={classes.heading}>
                                        {obj.sets}
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.cellMd} numeric>
                                    <Typography className={classes.heading}>
                                        {obj.reps}
                                    </Typography>
                                </TableCell>
                                <TableCell className={classes.cellSm}>
                                    {obj.segs && 
                                        <Typography className={classes.heading} noWrap>
                                            ({obj.segs} s.)
                                        </Typography>
                                    }
                                </TableCell>          
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
  }
}

CheckboxList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CheckboxList);