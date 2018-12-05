import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import { Add } from '@material-ui/icons'
import { connect } from 'react-redux'
import { compose } from 'redux'

import constants from '../../../config/constants'
import { createBlockTemplate } from '../../../store/actions/programActions'
import ExerciseRow from './ExerciseRow'

const styles = () => ({
    form: {
        minHeight: '50vh'
    },
    subtitle: {
        marginTop: 15
    },
    addButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 5,
        marginTop: 5,
        width: 48 //icon width
    }
})

export class ExerciseTemplateDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            shortName: "",
            color: "",
            exercises: [{
                name: "",
                block: "",
                assignation: ""
            }]
        }  
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.createBlockTemplate(this.state)
        this.handleClose()
    }

    handleClose = () => {
        this.props.handleDialogClose("block")
        this.setState({
            name: "",
            shortName: "",
            color: "",
            exercises: [{
                name: "",
                block: "",
                assignation: ""
            }]
        })
    }

    handleChange = (event, index) => {
        let newState = null
        
        if(index !== null) { 
            if(event.value) { //comes from exercise select
                console.log('comes from exercise select', event)
                newState = this.state.exercises
                newState[index] = { ...newState[index], name: event.value }
                this.setState({ exercises: newState })
            } else { //comes from exercise row inputs
                console.log('comes from exercise row inputs', event)
                newState = this.state.exercises
                newState[index] = { ...newState[index], [event.target.id]: event.target.value }
                this.setState({ exercises: newState })
            }      
        } else { //comes from blockName input
            console.log('comes from blockName input', event)
            this.setState({ [event.target.id]: event.target.value })
        }
    }

    addRow = () => {
        this.setState({
            exercises: [
                ...this.state.exercises,
                {
                    name: "",
                    block: "",
                    assignation: ""
                }
            ]
        })
    }

    deleteRow = (rowIndex) => {
        if(this.state.exercises.length <= 1) {
            this.setState({ exercises: 
                [{
                    name: "",
                    block: "",
                    assignation: ""
                }] 
            })
        } else {
            var newState = []
            this.state.exercises.map((exercise, index) => {
            if(index !== rowIndex) {
                newState.push(exercise)
            }
            return newState
        })
        this.setState({ exercises: newState })
        }
        
    }

    onDragEnd = result => {
        console.log('onDragEnd')
    }

    render() {
        const { classes } = this.props
        const options = this.props.exerciseTemplates && this.props.exerciseTemplates.map(option => ({
            value: option.exerciseName,
            label: option.exerciseName,
        }))

        console.log(this.state)

        return (
            <div> 
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{constants.createBlock}</DialogTitle>
                    <DialogContent>
                        <form className={classes.form}>
                            <FormControl required fullWidth>
                                <InputLabel>{constants.name}</InputLabel>
                                <Input id="name" name="name" autoFocus required value={this.state.name} onChange={(event) => this.handleChange(event, null)}/>
                            </FormControl>
                            <FormControl required fullWidth>
                                <InputLabel>{constants.shortName}</InputLabel>
                                <Input id="shortName" name="shortName" required value={this.state.shortName} onChange={(event) => this.handleChange(event, null)}/>
                            </FormControl>
                            <FormControl required>
                                <Typography variant="subtitle1" className={classes.subtitle}>{constants.color}: </Typography>
                                <input id="color" name="color" type="color" required value={this.state.color} onChange={(event) => this.handleChange(event, null)}/>
                            </FormControl>
                            <Typography variant="subtitle1" className={classes.subtitle}>{constants.exercises}:</Typography>
                            <Table padding='none'>    
                                <TableBody>
                                    {this.state.exercises && this.state.exercises.map((exercise, index) => (
                                        <ExerciseRow 
                                        exercise={exercise} 
                                        index={index} 
                                        key={exercise.name+index+'-row'} 
                                        options={options} 
                                        handleChange={this.handleChange} 
                                        deleteRow={this.deleteRow}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                            <Tooltip title={constants.addExercise}>
                                <div className={classes.addButton}> {/** necessary for tooltip to behave when button is disabled */}
                                    <IconButton color="primary" onClick={this.addRow} disabled={this.state.exercises[this.state.exercises.length - 1].name === ""}>
                                        <Add className={classes.icon} />
                                    </IconButton>
                                </div>  
                            </Tooltip>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            {constants.cancel}
                        </Button>
                        <Button 
                            type="submit" 
                            onClick={this.handleSubmit} 
                            color="primary" 
                            disabled={
                                this.state.exercises[this.state.exercises.length - 1].name === "" 
                                || this.state.name === ""
                                || this.state.shortName === ""
                                || this.state.color === ""
                            }
                        >
                            {constants.accept}
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      exerciseTemplates: state.program.templates.exerciseTemplates,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBlockTemplate: (blockTemplate) => dispatch(createBlockTemplate(blockTemplate))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(ExerciseTemplateDialog)
