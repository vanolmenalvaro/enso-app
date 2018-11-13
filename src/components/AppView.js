import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppBar from './layout/AppBar';
import BottomNav from './layout/BottomNav';
import Content from './content/Content'

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh'
    },
})
  

function AppView(props) {
    const { classes } = props;
    
    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                <AppBar />
                <Content />
                <BottomNav />
            </div>
        </React.Fragment>
    )
}

export default withStyles(styles)(AppView)
