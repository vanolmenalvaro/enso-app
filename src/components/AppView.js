import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AppBar from './content/layout/AppBar';
import BottomNav from './content/layout/BottomNav';
import Content from './content/Content'

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh'
    },
})
  

function AppView(props) {
    const { classes } = props;
    
    //Route guarding
    if(!props.auth.uid){
        return <Redirect to='/app/login' />
    }

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

const mapStateToProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(AppView)
