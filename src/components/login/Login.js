import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { signIn } from '../../store/actions/authActions'
import constants from '../../config/constants'

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
      backgroundColor: 'black',
      color: 'white'
    },
})

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.signIn(this.state)
    }

    render() {
        const { classes } = this.props

        //Route guarding
        if(this.props.auth.uid){
            return <Redirect to="/app" />
        }

        return (
            <div className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        {constants.login}
                    </Typography>
                    <form className={classes.form}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">{constants.email}</InputLabel>
                        <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChange}/>
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">{constants.password}</InputLabel>
                        <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
                    </FormControl>
                    { this.props.authError && 
                        <Typography align='center' color='error'>
                            {constants.loginError}
                        </Typography>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                    >
                        {constants.signin}
                    </Button>
                    </form>
                </Paper>
            </div>
        )
    }
}

Login.propTypes = {
classes: PropTypes.object.isRequired,
}
  
const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
  )(Login)
