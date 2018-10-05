import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Hidden from '@material-ui/core/Hidden';
import { Chat, 
    Today,
    FitnessCenter,
    Dashboard } from '@material-ui/icons/';

const styles = {
  root: {
  },
  stickToBottom: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
};

class BottomNav extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <Hidden smUp>
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={classes.stickToBottom}
            >
                <BottomNavigationAction label="Chat" icon={<Chat />} />
                <BottomNavigationAction label="Calendario" icon={<Today />} />
                <BottomNavigationAction label="Entreno" icon={<FitnessCenter />} />
                <BottomNavigationAction label="Admin" icon={<Dashboard />} />
            </BottomNavigation>
        </Hidden>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BottomNav);