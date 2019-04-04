import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Hidden from '@material-ui/core/Hidden';
import { People, LibraryBooks} from '@material-ui/icons/';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { switchTab } from '../../../store/actions/tabActions'
import constants from '../../../config/constants'

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
                <BottomNavigationAction label={constants.users} icon={<People />} onClick={() => this.props.switchTab(0, this.props, '/app/admin/users')} />
                <BottomNavigationAction label={constants.templates} icon={<LibraryBooks />} onClick={() => this.props.switchTab(1, this.props, '/app/admin/templates')} />
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
    switchTab: (tab, props, route) => dispatch(switchTab(tab, props, route))
  }
}

const mapStateToProps = (state) => {
  return{
    tab: state.tab.tab
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(styles),
  withRouter
)(BottomNav)