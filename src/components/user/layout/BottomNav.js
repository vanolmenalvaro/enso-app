import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Hidden from '@material-ui/core/Hidden';
import { Assignment, Today, Build} from '@material-ui/icons/';
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
                <BottomNavigationAction label={constants.calendar} icon={<Today />} onClick={() => this.props.switchTab(0, this.props, '/app/user/calendar')} />
                <BottomNavigationAction label={constants.reports} icon={<Assignment />} onClick={() => this.props.switchTab(1, this.props, '/app/user/reports')} />
                <BottomNavigationAction label={constants.tools} icon={<Build />} onClick={() => this.props.switchTab(2, this.props, '/app/user/tools')} />
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