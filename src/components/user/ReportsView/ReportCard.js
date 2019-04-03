import React, {Component, Fragment} from 'react'
import { withStyles } from '@material-ui/core/styles'
import classnames from 'classnames'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { Edit, Save, Clear, Delete} from '@material-ui/icons/'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { connect } from 'react-redux'
import { compose } from 'redux'
import * as moment from 'moment'

import constants from '../../../config/constants'
import { setReport, deleteReport } from '../../../store/actions/reportActions'

const styles = theme => ({
  actions: {
    marginLeft: 'auto'
  },
  card: {
    marginBottom: 5,
    width: '100%'
  },
  title: {
    textAlign: 'center'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  MuiPrivateNotchedOutline: {
      borderWidth: 0
  }
});

export class ReportsView extends Component {
    constructor(props) {
        super(props)

        this.state = { 
            expanded: props.embedded ? true : false,
            edit: props.embedded ? true : false
        }
    }

    firstDay = () => {
        if(!this.props.date) {
            const date = new Date()
            date.setDate(1)
    
            // Get the first Monday in the month
            while (date.getDay() !== 1) {
                date.setDate(date.getDate() + 1)
            }
    
            let month = date.getMonth()+1
            let day = date.getDate()
    
            if (month < 10) month = '0' + month
            if (day < 10) day = '0' + day
    
            return date.getFullYear()+"-"+month+"-"+day
        } else {
            return this.props.date
        }
    }

    componentWillMount = () => {
        this.setState({ 
            title: moment(this.firstDay()).format('L') + ' - ' + moment(this.firstDay()).add(6, 'days').format('L'),
            text: this.props.text ? this.props.text : '',
            date: moment(this.firstDay()).format('YYYY-MM-DD'),
            id: this.props.id ? this.props.id : '',
            dateError: false,
            deleteDialogOpen: false,
            anchorEl: null,
        })
    }

    componentDidUpdate = () => {
        if(!this.props.embedded && this.state.id === '') {
            this.setState({
                id: this.props.id
            })
        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }))
    }

    handleTextChange = (event) => {
        if(this.state.edit) {
            this.setState({
                [event.target.id]: event.target.value
            })
        }
    }

    handleDateChange =  event => {
        if(this.state.edit) {
            if(new Date(event.target.value).getDay() !== 1) {
                this.setState({dateError: true})
            } else {
                this.setState({ 
                    title: moment(event.target.value).format('L') + ' - ' + moment(event.target.value).add(6, 'days').format('L'),
                    date: event.target.value,
                    dateError: false,
                    edit: true
                })
            }
        }
    }

    handleEdit = () => {
        this.setState({
            edit: true
        })
        document.getElementById("text").focus()
    }

    handleSave = () => {
        this.props.setReport({ 
            title: this.state.title,
            text: this.state.text,
            date: this.state.date,
            id: this.state.id,
            uid: this.props.auth.uid
        })

        this.setState({
            edit: false
        })

        if(this.props.embedded) {
            this.props.handleDialogClose()
        }
    }

    handleCancel = () => {
        console.log('cancel', this.firstDay())
        this.setState({
            title: moment(this.firstDay()).format('L') + ' - ' + moment(this.firstDay()).add(6, 'days').format('L'),
            text: this.props.text ? this.props.text : '',
            date: moment(this.firstDay()).format('YYYY-MM-DD'),
            edit: false
        })
    }

    handleDeleteDialogOpen = (event) => {
        this.setState({ deleteDialogOpen: true, anchorEl: null })
    }
    
    handleDeleteDialogClose = () => {
        this.setState({ deleteDialogOpen: false, uid: null })
    }

    handleDelete = () => {
        this.props.deleteReport(this.state.id)
    }

    render () {
        const {classes} = this.props

        return (
            <Fragment>
                <Card 
                        elevation={this.props.embedded && 0}
                        className={classes.card} >
                    <CardActionArea onClick={this.handleExpandClick} component='span'>
                    <CardHeader 
                    title={this.state.title}
                    action={
                        <IconButton
                        className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                        })}
                        aria-expanded={this.state.expanded}
                        aria-label="Show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    }
                    className={classes.title} />  
                    </CardActionArea>  
                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <FormControl error={this.state.dateError}>
                            <TextField
                                    id="iniDate"
                                    label={constants.startingDate}
                                    type="date"
                                    value={this.state.date}
                                    onChange={this.handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    className={classes.card}
                                    error={this.state.dateError} />
                            { this.state.dateError === true && <FormHelperText>{constants.datePickerErrorText}</FormHelperText> }
                        </FormControl>
                        <TextField fullWidth 
                                multiline 
                                autoComplete='false'
                                label={constants.report}
                                value={this.state.text}            
                                id='text'
                                autoFocus={this.state.edit}
                                InputProps={{
                                    disableUnderline: !this.state.edit,
                                    spellCheck: false
                                }}
                                onChange={this.handleTextChange} />
                    </CardContent>
                    <CardActions className={classes.actions} disableActionSpacing>
                        {!this.state.edit ?
                            <Fragment>
                                <IconButton aria-label="Edit" onClick={this.handleEdit}>
                                    <Edit />
                                </IconButton>
                                <IconButton aria-label="Delete" onClick={this.handleDeleteDialogOpen}>
                                    <Delete />
                                </IconButton>
                            </Fragment>
                        :
                            this.props.embedded ? 
                                <Fragment>
                                    <Button onClick={this.handleSave} color="primary">
                                        {constants.accept}
                                    </Button>
                                    <Button onClick={this.props.handleDialogClose} color="primary">
                                        {constants.cancel}
                                    </Button>                                
                            </Fragment>
                            :
                                <Fragment>
                                    <IconButton aria-label="Save" onClick={this.handleSave}>
                                        <Save />
                                    </IconButton>
                                    <IconButton aria-label="Cancel" onClick={this.handleCancel}>
                                        <Clear />
                                    </IconButton>
                                </Fragment>
                        }
                        
                    </CardActions>
                    </Collapse>
                </Card>
                <Dialog
                    open={this.state.deleteDialogOpen}
                    onClose={this.handleDeleteDialogClose}
                    aria-labelledby="alert-delete-dialog-title"
                    aria-describedby="alert-delete-dialog-description"
                    >
                    <DialogTitle id="alert-delete-dialog-title">{constants.deleteReportQuestion}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-delete-dialog-description">
                            {constants.deleteReportText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDeleteDialogClose} color="primary">
                            {constants.cancel}
                        </Button>
                        <Button onClick={this.handleDelete} color="primary" autoFocus>
                            {constants.accept}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
      auth: state.firebase.auth
    }
  }

const mapDispatchToProps = (dispatch) => {
    return {
        setReport: (report) => dispatch(setReport(report)),
        deleteReport: (id) => dispatch(deleteReport(id))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(ReportsView)
