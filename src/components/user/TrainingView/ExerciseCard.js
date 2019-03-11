import React from "react"
import { withStyles } from "@material-ui/core/styles"
import ExpansionPanel from "@material-ui/core/ExpansionPanel"
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails"
import Avatar from '@material-ui/core/Avatar'
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Link from '@material-ui/core/Link'
import Modal from '@material-ui/core/Modal'
import YouTube from 'react-youtube'

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  panelSummary: {
    height: 80,
    margin: 5
  },
  avatar: {
    left: -10
  },
  display1: {
    fontSize: 18,
    opacity: 0.9,
    marginTop: 7
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
  },
  player: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
  }
});

class ExerciseCard extends React.Component {
  constructor() {
    super()

    this.state = {
      open: true,
      modalOpen: false
    }
  }

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleToggle = () => {
    this.setState(prevState => ({ open: !prevState.open}))
  }

  render() {
    const { classes } = this.props
    const opts = {
      width: window.innerWidth > 640 ? 640 : window.innerWidth,
      playerVars: {
        autoplay: 1,
        start: this.props.start,
        end: this.props.end,
        modestbranding: 1,
        rel: 0,
        playsinline: 1
      }
    };

    return (
      <div className={classes.root}>
        <ExpansionPanel key={this.props.name} className={classes.panel} expanded={this.state.open} onChange={this.handleToggle}>
          <ExpansionPanelSummary
          className={classes.panelSummary}
          expandIcon={!this.props.alwaysOpen && <ExpandMoreIcon />}
          >
            <Avatar style={{ backgroundColor: this.props.color }} className={classes.avatar}/>
            <Typography className={classes.display1} >{this.props.name}</Typography>  
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <Table padding="none">
              <TableBody>
              {this.props.exercises && this.props.exercises.map((obj, index) => (
                <TableRow key={obj.name+index}>
                  <TableCell component="th" scope="row" className={classes.cellLg}>
                    <Typography className={classes.heading}>
                      {obj.block}{obj.block && ' - '}
                      {(obj.videoId && obj.videoId !== '') ?
                        <Link
                          component="button"
                          variant="body2"
                          onClick={this.handleModalOpen}
                        >
                          {obj.name}
                        </Link>
                        :
                        obj.name
                      }
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.cellMd}>
                    <Typography className={classes.heading}>
                      {obj.assignation}
                    </Typography>
                  </TableCell>
                  {obj.videoId && obj.videoId !== '' &&       
                    <Modal
                    open={this.state.modalOpen}
                    onClose={this.handleModalClose}
                    disableAutoFocus
                    >
                      <YouTube
                        videoId={obj.videoId}
                        opts={opts}
                        className={classes.player}
                      />
                    </Modal>
                  }
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