import React, { Component } from 'react'
import Typography from "@material-ui/core/Typography"
//import Button from "@material-ui/core/Button"
import { connect } from 'react-redux'

import { createCycle } from '../../../store/actions/cycleActions'

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true

class ChatView extends Component{


    handleClick = () => {
        this.props.createCycle(this.props.cycle)
    }
    
    render() {
        const { createCycle, ...restOfProps} = this.props
        return (
            <div {...restOfProps}>
                <Typography variant="h1" align='center' style={{position: 'absolute'}}>
                    This is the Chat view
                </Typography>
                {/* <Button variant="contained" color="primary" onClick={this.handleClick}>
                    Send
                </Button> */}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createCycle: (cycle) => dispatch(createCycle(cycle))
    }
}

const mapStateToProps = (state) => {
    return{
        cycle: state.cycle
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatView)