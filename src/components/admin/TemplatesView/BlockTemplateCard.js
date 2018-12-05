import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { ExpandMore, Edit, Delete } from '@material-ui/icons'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import Collapse from '@material-ui/core/Collapse'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'

import constants from '../../../config/constants'

const styles = theme => ({
    card: {
        width: '100%'
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
        marginBottom: 5,
        marginTop: 5
    },
    actionsRight: {
        marginLeft: 'auto'
    }
})

export class BlockTemplateCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            edit: false
        }  
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }

    componentDidMount = () => {
 
    }

    handleDelete = () => {

    }

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    handleEdit = () => {
 
    }

    handleCancel = () => {

    }

    handleSubmit = (event) => {
        event.preventDefault()

    }

    render() {
        const { classes } = this.props

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
                    title={this.props.exerciseTemplate.exerciseName}
                    />
                </CardActionArea>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <form>    
                            <FormControl fullWidth disabled={!this.state.edit}>
                                <InputLabel>{constants.name}</InputLabel>
                                <Input id="exerciseName" name="exerciseName" value={this.state.exerciseName} onChange={this.handleChange}/>
                            </FormControl>
                            <FormControl fullWidth disabled={!this.state.edit}>
                                <InputLabel>{constants.videoId}</InputLabel>
                                <Input id="videoId" name="videoId" value={this.state.videoId} onChange={this.handleChange}/>
                                <FormHelperText>{constants.videoIdHelper}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth disabled={!this.state.edit}>
                                <InputLabel>{constants.start}</InputLabel>
                                <Input id="start" name="start" type="number" value={this.state.start} onChange={this.handleChange}/>
                                <FormHelperText>{constants.startHelper}</FormHelperText>
                            </FormControl>
                            <FormControl fullWidth disabled={!this.state.edit}>
                                <InputLabel htmlFor="number">{constants.end}</InputLabel>
                                <Input id="end" name="end" type="number" value={this.state.end} onChange={this.handleChange}/>
                                <FormHelperText>{constants.endHelper}</FormHelperText>
                            </FormControl>
                        </form>
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton 
                            onClick={this.handleEdit}
                            aria-label="Edit"
                            color={this.state.edit ? "primary" : "default"}
                        >
                            <Edit />
                        </IconButton>
                        <IconButton onClick={this.handleDelete} aria-label="Delete">
                            <Delete />
                        </IconButton>
                        <div className={classes.actionsRight}>
                            <Button color="primary" onClick={this.handleCancel} disabled={!this.state.edit}>
                                {constants.cancel}
                            </Button>
                            <Button type="submit" onClick={this.handleSubmit} color="primary" disabled={!this.state.edit}>
                                {constants.accept}
                            </Button>
                        </div>
                    </CardActions>
                </Collapse>
            </Card>   
        )
    }
}
  
export default withStyles(styles)(BlockTemplateCard)