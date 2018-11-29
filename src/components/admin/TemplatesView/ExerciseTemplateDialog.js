import React, { Component } from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import { connect } from 'react-redux'

import constants from '../../../config/constants'
import { createExerciseTemplate } from '../../../store/actions/programActions'

export class ExerciseTemplateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exerciseName: '',
            videoId: '',
            start: '',
            end: '',
            uid: ''
        }  
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createExerciseTemplate(this.state)
        this.handleClose()
    }

    handleClose = () => {
        this.props.handleDialogClose("exercise")
        this.setState({
            exerciseName: '',
            videoId: '',
            start: '',
            end: '',
            uid: ''
        })
    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <form>    
                        <DialogTitle id="form-dialog-title">{constants.addExercise}</DialogTitle>
                        <DialogContent>
                            <FormControl required fullWidth>
                                <InputLabel>{constants.name}</InputLabel>
                                <Input id="exerciseName" name="exerciseName" autoFocus required value={this.state.exerciseName} onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl>
                                <InputLabel>{constants.videoId}</InputLabel>
                                <Input id="videoId" name="videoId" value={this.state.videoId} onChange={this.handleChange}/>
                                <FormHelperText>{constants.videoIdHelper}</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <InputLabel>{constants.start}</InputLabel>
                                <Input id="start" name="start" type="number" value={this.state.start} onChange={this.handleChange}/>
                                <FormHelperText>{constants.startHelper}</FormHelperText>
                            </FormControl>
                            <FormControl>
                                <InputLabel htmlFor="number">{constants.end}</InputLabel>
                                <Input id="end" name="end" type="number" value={this.state.end} onChange={this.handleChange}/>
                                <FormHelperText>{constants.endHelper}</FormHelperText>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                {constants.cancel}
                            </Button>
                            <Button type="submit" onClick={this.handleSubmit} color="primary" disabled={this.state.exerciseName === ''}>
                                {constants.accept}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createExerciseTemplate: (exerciseTemplate) => dispatch(createExerciseTemplate(exerciseTemplate))
    }
}

export default connect(null, mapDispatchToProps)(ExerciseTemplateDialog)
