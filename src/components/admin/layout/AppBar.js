import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import MuiAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import { ChevronLeft, MoreVert, People, LibraryBooks } from '@material-ui/icons/'
import MenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { getFirebase } from 'react-redux-firebase'
import { withRouter } from 'react-router-dom'

import constants from '../../../config/constants'
import { switchTab } from '../../../store/actions/tabActions'
import { signOut } from '../../../store/actions/authActions'


window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

const drawerWidth = 240

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBarSpacer: theme.mixins.toolbar,
  toolbar: theme.mixins.toolbar,
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
    textAlign: 'center',
    paddingLeft: 40
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
  menuButtonHidden: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 1,
  },
})

class AppBar extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    isAdmin: false
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  };

  handleDrawerClose = () => {
    this.setState({ open: false })
  };

  handleStateOnScreenResize = () => {
    if(window.innerWidth > 1280){
      this.setState({ open: true })
    }
    else if (window.innerWidth < 600){
      this.setState({ open: false })
    }
  };

  componentDidMount = () => {
    this.handleStateOnScreenResize();
    window.addEventListener('resize', this.handleStateOnScreenResize)
    this.isAdmin()
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleStateOnScreenResize)
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };

  handleSignout = () => {
    this.props.signOut()
  };

  handleUser = () => {
    this.props.history.push('/app/user/calendar');
  };

  isAdmin = () => {
    let firebase = getFirebase()
    firebase.auth().currentUser.getIdTokenResult()
    .then((token) => {
      if(token.claims.admin) {
        this.setState({ isAdmin: true })
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

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
              <IconButton 
                color="inherit"
                aria-label="More"
                aria-owns={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVert />
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}>
                  <MenuItem onClick={this.handleUser}>
                      {constants.userView}
                  </MenuItem>
                  <MenuItem onClick={this.handleSignout}>
                      {constants.logout}
                  </MenuItem>
              </Menu>
            </Toolbar>
          </MuiAppBar>
          <Hidden xsDown>
            <Drawer
              variant="permanent"
              className={classNames(classes.drawer, {
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              })}
              classes={{
                paper: classNames({
                  [classes.drawerOpen]: this.state.open,
                  [classes.drawerClose]: !this.state.open,
                }),
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
                <ListItem onClick={() => this.props.switchTab(0, this.props, '/app/admin/users')} selected={this.props.tab === 0}>
                    <ListItemIcon><People /></ListItemIcon>
                    <ListItemText primary={constants.users} />
                </ListItem>
                <ListItem onClick={() => this.props.switchTab(1, this.props, '/app/admin/templates')} selected={this.props.tab === 1}>
                    <ListItemIcon><LibraryBooks /></ListItemIcon>
                    <ListItemText primary={constants.templates} />
                </ListItem>
              </List>
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            {this.props.children}
            <Hidden smUp>
              <div className={classes.appBarSpacer} />
            </Hidden>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    switchTab: (tab, props, route) => dispatch(switchTab(tab, props, route)),
    signOut: () => dispatch(signOut())
  }
}

const mapStateToProps = (state) => {
  return{
    tab: state.tab.tab,
  }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter
)(AppBar)