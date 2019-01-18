import React, {Component} from 'react'
import { Add } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import constants from '../../../config/constants'
import UserCard from '../UsersView/UserCard'
import { getUsers } from '../../../store/actions/adminActions'

const styles = () => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: 5
    },
    control: {
      marginBottom: 40,
    },
    title: {
      textAlign: 'center',
      paddingLeft: 52, //addIcon width
      width: `calc(100% - 52px)`, //100% - addIcon width
      paddingTop: 4
    },
    typography: {
      textAlign: 'center',
      paddingLeft: 48, //editIcon width
      width: `calc(100% - 48px)`, //100% - editIcon width
      paddingTop: 9
    },
    button: {
      display: 'block',
      marginLeft: 'auto',
      marginRight: 0
    },
    icon: {
      fontSize: 28
    }
})

export class UserDetailView extends Component {
    componentDidMount = () => {
        if(!this.props.admin.users){
          this.props.getUsers()
        }
    }

    render() {
        const { classes } = this.props
        if(this.props.admin.users) {
            var user = this.props.admin.users.filter((user) => user.email === this.props.match.params.user)
            user = user[0] //filter() returns an array
        }

        return (
        <div>
            <Grid container className={classes.root} justify="space-evenly" spacing={8}>
                <Grid xs={4} item>
                    {user && <UserCard user={user} />}
                </Grid>
            </Grid>
            <Grid container className={classes.root} justify="space-evenly" spacing={8}>
                <Grid xs={6} item>
                <Grid container direction="row">
                    <Typography variant="h4" className={classes.title} noWrap>
                        {constants.exercises}
                    </Typography>
                    <Tooltip title={constants.createExercise}>
                    <IconButton color="primary" className={classes.button} >
                        <Add className={classes.icon} />
                    </IconButton>
                    </Tooltip>
                </Grid>
                <Grid container direction="column" alignItems="center">

                        <Typography variant="h5" noWrap>
                            <br/>{constants.noResults}
                        </Typography>
                </Grid>
                </Grid>
                <Grid xs={6} item>
                <Grid container direction="row">
                    <Typography variant="h4" className={classes.title} noWrap>
                        {constants.blocks}
                    </Typography>
                    <Tooltip title={constants.createBlock}>
                    <IconButton color="primary" className={classes.button} >
                        <Add className={classes.icon} />
                    </IconButton>
                    </Tooltip>
                </Grid>
                <Grid container direction="column" alignItems="center">

                        <Typography variant="h5" noWrap>
                            <br/>{constants.noResults}
                        </Typography>
                </Grid>
                </Grid>
            </Grid>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        admin: state.admin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      getUsers: () => dispatch(getUsers())
    }
  }

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withRouter,
    withStyles(styles)
)(UserDetailView)

