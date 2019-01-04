import React from 'react'
import Select from 'react-select'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  input: {
    display: 'flex',
    padding: 0,
    minWidth: 200
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    zIndex: 100
  }
})

class AutoSuggestInput extends React.Component {

  NoOptionsMessage = props => {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    )
  }
  
  inputComponent = ({ inputRef, ...props }) => {
    return <div ref={inputRef} {...props} />;
  }
  
  Control = props => {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent: this.inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            
            ...props.innerProps,
          },
          disableUnderline: true
        }}
        {...props.selectProps.textFieldProps}
      />
    )
  }
  
  Option = props => {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    )
  }
  
  Placeholder = props => {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    )
  }
  
  SingleValue = props => {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    )
  }
  
  ValueContainer = props => {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }

  Menu = props => {
    return (
      <Paper
          className={props.selectProps.classes.paper} 
          {...props.innerProps}
      >
          {props.children}
      </Paper>
    )
  }

  render() {
    const { classes } = this.props

    const components = {
      Control: this.Control,
      Menu: this.Menu,
      NoOptionsMessage: this.NoOptionsMessage,
      Option: this.Option,
      Placeholder: this.Placeholder,
      SingleValue: this.SingleValue,
      ValueContainer: this.ValueContainer,
    }

    return (
      <div className={classes.root}>
        <NoSsr>
          <Select
            classes={classes}
            options={this.props.options}
            components={components}
            value={this.props.value && {value: this.props.value, label: this.props.value}} //expects value object like { value: string | number, label: string }
            onChange={(event) => this.props.handleChange(event, this.props.index)}
            placeholder={this.props.placeholder}
          />
        </NoSsr>
      </div>
    )
  }
}


export default withStyles(styles, { withTheme: true })(AutoSuggestInput)