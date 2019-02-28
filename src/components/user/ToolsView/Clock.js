import React, { Component } from 'react'
import { Pause, PlayArrow, Stop, MusicNote, MusicOff } from '@material-ui/icons'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import beepAudio from '../../../assets/beep.mp3'

const styles = {
    icon: {
        fontSize: 150
    },
    note: {
        position: 'absolute',
        right: 5,
        top: 60
    }
}

const beep = new Audio(beepAudio)

class Clock extends Component {
    constructor() {
        super()
        this.state = {
            isRunning: false,
            time: 0,
            tick: false
        }
    }

    tick() {
        if(this.state.tick) {
            beep.play()
        }
        this.setState(prevState => ({ time: prevState.time+1}))
    }

    handleClick = () => {
        if(!this.state.isRunning) {
            this.setState({ isRunning: true }, () => {
                this.timerID = setInterval(
                    () => this.tick(),
                    1000
                )
            })
        } else {
            this.setState({ isRunning: false }, () => {
                clearInterval(this.timerID)
            })
        }
    }

    handleStop = () => {
        this.setState({ time: 0 }, () => {
            clearInterval(this.timerID)
        })
    }

    handleSound = () => {
        this.setState(prevState => ({ tick: !prevState.tick}))
    }

    render() {
        const {classes} = this.props

        return (
            <Grid container spacing={8}>
                <div className={classes.note} onClick={this.handleSound}>
                    {
                        this.state.tick ? <MusicNote style={{fontSize: 40}} /> : <MusicOff style={{fontSize: 40}} />
                    }
                </div>
                <Grid item xs={12}>
                    <div className={classes.wrapper}>
                        <Typography 
                        variant='h1' 
                        align='center' 
                        className={classes.clock}
                        style={
                            (this.state.time <=9 && {fontSize: 350}) ||
                            (this.state.time >9 && this.state.time <= 19 && {fontSize: 325, marginRight: 30, marginBottom: 25}) ||
                            (this.state.time >19 && this.state.time <= 99 && {fontSize: 325, marginBottom: 25}) ||
                            (this.state.time >99 && this.state.time <= 199 && {fontSize: 225, marginRight: 20, marginTop: 30, marginBottom: 95}) ||
                            (this.state.time >199 && {fontSize: 225, marginTop: 30, marginBottom: 95})
                        }>
                            {this.state.time}
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12}  >
                    {
                        this.state.isRunning ?
                            <Grid container justify='center'>
                                <Pause onClick={this.handleClick} className={classes.icon}/>
                            </Grid>
                        :
                            <Grid container justify='center'>
                                <PlayArrow onClick={this.handleClick} className={classes.icon} />
                                { this.state.time !== 0 && <Stop onClick={this.handleStop} className={classes.icon} /> }
                            </Grid>
                    }
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(Clock)