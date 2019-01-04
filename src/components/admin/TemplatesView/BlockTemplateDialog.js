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
import { Add } from '@material-ui/icons'
import { arrayMove } from 'react-sortable-hoc'
import { connect } from 'react-redux'
import { compose } from 'redux'

import constants from '../../../config/constants'
import { setBlockTemplate } from '../../../store/actions/programActions'
import ExerciseList from './ExerciseList'

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
            color: "#000000",
            exercises: [{
                name: "",
                block: "",
                assignation: ""
            }]
        }  
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.setBlockTemplate({
            name: this.state.name,
            shortName: this.state.shortName,
            color: this.state.color,
            exercises: this.state.exercises
        })
        this.handleClose()
    }

    handleClose = () => {
        this.props.handleDialogClose("block")
        this.setState({
            name: "",
            shortName: "",
            color: "#000000",
            exercises: [{
                name: "",
                block: "",
                assignation: ""
            }]
        })
    }
    
    handleChangeRow = (event, index, name) => {
        let newState = null
        if(index !== null) { 
            if(event !== null && event.value) { //comes from exercise select
                newState = this.state.exercises.map((a, ind) => {
                    var returnValue = {...a};
                    if (ind === index) {
                      returnValue.name = event.value
                    }
                    return returnValue
                })
                this.setState({ 
                    exercises: newState,
                    edit: true 
                })
            } else { //comes from exercise row inputs
                newState = this.state.exercises.map((a, ind) => {
                    var returnValue = {...a};
                    if (ind === index) {
                        if(event === 'Backspace') {
                            returnValue[name] = returnValue[name].slice(0, -1)
                        }
                        else if(event.length === 1) {
                            returnValue[name] = returnValue[name].valueOf()+event
                        }
                    }
                    return returnValue
                })
                this.setState({ 
                    exercises: newState,
                    edit: true 
                })
            }      
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value,
            edit: true
        })
    }

    handleSort = (oldIndex, newIndex) => {
        this.setState((state) => ({
            exercises: arrayMove(state.exercises, oldIndex, newIndex),
            edit: true
        }))
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

    render() {
        const { classes } = this.props
        const options = this.props.exerciseTemplates && this.props.exerciseTemplates.map(option => ({
            value: option.exerciseName,
            label: option.exerciseName,
        }))

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
                                <Input id="name" name="name" autoFocus required value={this.state.name} onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl required fullWidth>
                                <InputLabel>{constants.shortName}</InputLabel>
                                <Input id="shortName" name="shortName" required value={this.state.shortName} onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl required>
                                <Typography variant="subtitle1" className={classes.subtitle}>{constants.color}: </Typography>
                                <input id="color" name="color" type="color" required value={this.state.color} onChange={this.handleChange}/>
                            </FormControl>
                            <Typography variant="subtitle1" className={classes.subtitle}>{constants.exercises}:</Typography>
                            <ExerciseList
                                exercises={this.state.exercises}
                                options={options}
                                handleChange={this.handleChangeRow}
                                handleSort={this.handleSort}
                                deleteRow={this.deleteRow}
                            />
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

const mapDispatchToProps = (dispatch) => {
    return {
        setBlockTemplate: (blockTemplate) => dispatch(setBlockTemplate(blockTemplate))
    }
}

export default compose(
    connect(null, mapDispatchToProps),
    withStyles(styles)
)(ExerciseTemplateDialog)
