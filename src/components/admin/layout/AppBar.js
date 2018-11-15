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
import {  MoreVert } from '@material-ui/icons/'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'

import constants from '../../../config/constants'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: 'black'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
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
        anchorEl: null,
        isAdmin: false
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
        this.props.history.push('/app/calendar');
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
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
                <Divider />
                <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </main>
            </div>
        )
    }
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    withRouter
)(AppBar)