import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { ChevronLeft, MoreVert } from '@material-ui/icons/';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Chat, 
        Today,
        FitnessCenter,
        Dashboard } from '@material-ui/icons/';
import { compose } from 'redux'
import { connect } from 'react-redux'

import constants from '../../config/constants'
import { switchTab } from '../../store/actions/tabActions'


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: 'black',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    paddingLeft: 40
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  }
});

class AppBar extends React.Component {
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleStateOnScreenResize = () => {
    if(window.innerWidth > 1280){
      this.setState({ open: true });
    }
    else if (window.innerWidth < 600){
      this.setState({ open: false });
    }
  };

  componentDidMount = () => {
    this.handleStateOnScreenResize();
    window.addEventListener('resize', this.handleStateOnScreenResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleStateOnScreenResize);
  }
 

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <MuiAppBar
            position="fixed"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <Hidden xsDown> 
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(
                    classes.menuButton,
                    this.state.open && classes.menuButtonHidden,
                  )}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Typography variant="h6" color="inherit" noWrap className={classes.title}>
                Enso App
              </Typography>
              <IconButton color="inherit">
                <MoreVert />
              </IconButton>
            </Toolbar>
          </MuiAppBar>
          <Hidden xsDown>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.toolbarIcon}>
                <Hidden lgUp>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeft />
                  </IconButton>
                </Hidden>
              </div>

              <Divider />

              <List>
                <MenuItem button onClick={() => this.props.switchTab(0)} selected={this.props.tab === 0}>
                  <ListItemIcon>
                    <Chat />
                  </ListItemIcon>
                  <ListItemText primary={constants.chat} />
                </MenuItem>
                <MenuItem button onClick={() => this.props.switchTab(1)} selected={this.props.tab === 1}>
                  <ListItemIcon>
                    <Today />
                  </ListItemIcon>
                  <ListItemText primary={constants.calendar} />
                </MenuItem>
                <MenuItem button onClick={() => this.props.switchTab(2)} selected={this.props.tab === 2}>
                  <ListItemIcon>
                    <FitnessCenter />
                  </ListItemIcon>
                  <ListItemText primary={constants.training} />
                </MenuItem>

                <Divider />

                <MenuItem button onClick={() => this.props.switchTab(3)} selected={this.props.tab === 3}>
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <ListItemText primary={constants.admin} />
                </MenuItem>
              </List>
            </Drawer>
          </Hidden>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (tab) => dispatch(switchTab(tab))
  }
}

const mapStateToProps = (state) => {
  return{
    tab: state.tab.tab
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(AppBar)
