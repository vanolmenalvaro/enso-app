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
import { compose } from 'redux'
import { connect } from 'react-redux'

import { switchTab } from '../../store/actions/tabActions'

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

  render() {
    const { classes } = this.props;
    
    return (
        <Hidden smUp>
            <BottomNavigation
                value={this.props.tab}
                showLabels
                className={classes.stickToBottom}
            >
                <BottomNavigationAction label="Chat" icon={<Chat />} onClick={() => this.props.switchTab(0)} />
                <BottomNavigationAction label="Calendario" icon={<Today />} onClick={() => this.props.switchTab(1)} />
                <BottomNavigationAction label="Entreno" icon={<FitnessCenter />} onClick={() => this.props.switchTab(2)} />
                <BottomNavigationAction label="Admin" icon={<Dashboard />} onClick={() => this.props.switchTab(3)} />
            </BottomNavigation>
        </Hidden>
    );
  }
}

BottomNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles)
)(BottomNav)