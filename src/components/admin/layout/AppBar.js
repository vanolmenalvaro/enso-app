import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import {  MoreVert, 
        People,
        LibraryBooks,
        Chat } from '@material-ui/icons/'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import constants from '../../../config/constants'
import { switchTab } from '../../../store/actions/tabActions'
import { signOut } from '../../../store/actions/authActions'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: 'black'
  },
  appBarSpacer: theme.mixins.toolbar,
  drawer: {
    width: drawerWidth
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 1,
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
});

class AppBar extends Component {
    state = {
        open: false,
        anchorEl: null
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

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MuiAppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
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
                            onClose={this.handleClose}
                        >
                            <MenuItem onClick={this.handleUser}>
                                {constants.user}
                            </MenuItem>
                            <MenuItem onClick={this.handleSignout}>
                                {constants.logout}
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </MuiAppBar>
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                    paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <Divider />
                    <List>
                        <ListItem onClick={() => this.props.switchTab(0, this.props, '/app/admin/users')} selected={this.props.tab === 0}>
                            <ListItemIcon><People /></ListItemIcon>
                            <ListItemText primary={constants.users} />
                        </ListItem>
                        <ListItem onClick={() => this.props.switchTab(1, this.props, '/app/admin/blueprints')} selected={this.props.tab === 1}>
                            <ListItemIcon><LibraryBooks /></ListItemIcon>
                            <ListItemText primary={constants.blueprints} />
                        </ListItem>
                        <ListItem onClick={() => this.props.switchTab(2, this.props, '/app/admin/chat')} selected={this.props.tab === 2}>
                            <ListItemIcon><Chat /></ListItemIcon>
                            <ListItemText primary={constants.chat} />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {this.props.children}
                </main>
            </div>
        )
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