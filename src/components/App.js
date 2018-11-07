import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from './layout/AppBar';
import BottomNav from './layout/BottomNav';
import Content from './content/Content.js'

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },
});

class App extends React.Component {
  state = {
    tabIndex: 1,
  }

  handleChange = (event, tabIndex) => {
    this.setState({ tabIndex });
  };

  handleChangeIndex = index => {
    this.setState({ tabIndex: index })
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <AppBar tabIndex={this.state.tabIndex} onChange={this.handleChange} onChangeIndex={this.handleChangeIndex} />
          <Content tabIndex={this.state.tabIndex} onChange={this.handleChange} onChangeIndex={this.handleChangeIndex} />
          <BottomNav tabIndex={this.state.tabIndex} onChange={this.handleChange} onChangeIndex={this.handleChangeIndex} />
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);