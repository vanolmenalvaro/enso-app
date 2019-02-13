import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { ExpandMore, Add } from '@material-ui/icons'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import Collapse from '@material-ui/core/Collapse'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { arrayMove } from 'react-sortable-hoc'

import constants from '../../../config/constants'
import ExerciseList from '../TemplatesView/ExerciseList'

const styles = theme => ({
    card: {
        width: '100%',
        overflow: 'visible',
        marginBottom: 5
    },
    actions: {
        display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
      }),
      marginLeft: 'auto',
      marginRight: 10,
      marginTop: 10,
      opacity: 0.6
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    expandOpenCard: {
        marginBottom: 10,
        marginTop: 3
    },
    actionsRight: {
        marginLeft: 'auto'
    },
    icon: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 0
    }
})

export class BlockCard extends Component {
    constructor() {
        super()
        this.state = {
            expanded: false,
            name: "",
            shortName: "",
            color: "#000000",
            id: "",
            exercises: [{
                name: "",
                block: "",
                assignation: ""
            }]        
        }
    }

    updateParentState = () => {
        this.props.updateState({
            name: this.state.name,
            shortName: this.state.shortName,
            color: this.state.color,
            exercises: this.state.exercises,
            id: this.state.id
        }, this.state.id)
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }))
    }

    componentDidMount = () => {
        this.setState({
            name: this.props.block.name,
            shortName: this.props.block.shortName,
            color: this.props.block.color,
            exercises: this.props.block.exercises,
            id: this.props.block.id
        })
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
        }, () => this.updateParentState())
    }

    deleteRow = (rowIndex) => {
        if(this.state.exercises.length <= 1) {
            this.setState({ exercises: 
                [{
                    name: "",
                    block: "",
                    assignation: ""
                }] 
            }, () => this.updateParentState())
        } else {
            var newState = []
            this.state.exercises.map((exercise, index) => {
            if(index !== rowIndex) {
                newState.push(exercise)
            }
            return newState
        })
        this.setState({ exercises: newState }, () => this.updateParentState())
        }
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
                    exercises: newState
                }, () => this.updateParentState())
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
                    exercises: newState
                }, () => this.updateParentState())
            }  
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        }, () => this.updateParentState())
    }

    handleSort = (oldIndex, newIndex) => {
        this.setState((state) => ({
            exercises: arrayMove(state.exercises, oldIndex, newIndex)
        }), () => this.updateParentState())
    }

    render() {
        const { classes } = this.props
        const options = this.props.exerciseTemplates && this.props.exerciseTemplates.map(option => ({
            value: option.exerciseName,
            label: option.exerciseName,
        }))

        return (
            <Card className={classnames(classes.card, {
                [classes.expandOpenCard]: this.state.expanded,
                })}>
                <CardActionArea onClick={this.handleExpandClick}>
                    <CardHeader
                    action={
                        <div className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                            })}
                        >
                            <ExpandMore />
                        </div>
                    }
                    title={this.props.block.name}
                    />
                </CardActionArea>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <form>    
                            <FormControl required fullWidth>
                                <InputLabel>{constants.name}</InputLabel>
                                <Input id="name" name="name" required value={this.state.name} onChange={this.handleChange}/>
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
                                <div> {/** necessary for tooltip to behave when button is disabled */}
                                    <IconButton 
                                        color="primary" 
                                        onClick={this.addRow} 
                                        disabled={this.state.exercises[this.state.exercises.length - 1].name === ""} 
                                        className={classes.icon}
                                    >
                                        <Add />
                                    </IconButton>
                                </div>  
                            </Tooltip>
                        </form>
                    </CardContent>
                </Collapse>
                <CardActions>
                    <Button 
                        size="small" 
                        color="primary" 
                        onClick={() => this.props.addBlock(this.state.id)}
                        disabled={this.props.chipToAdd !== "" && this.props.chipToAdd !== this.state.id}
                        variant={this.props.chipToAdd !== "" && this.props.chipToAdd === this.state.id ? "contained" : "text"}
                    >
                        {this.props.chipToAdd !== "" && this.props.chipToAdd === this.state.id  ? constants.accept : constants.addToCalendar}
                    </Button>
                    <Button size="small">
                        {constants.delete}
                    </Button>
                </CardActions>
            </Card>   
        )
    }
}

export default withStyles(styles)(BlockCard)