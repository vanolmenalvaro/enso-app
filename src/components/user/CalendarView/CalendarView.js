import React, { Component } from 'react'
import { connect } from 'react-redux'

import Calendar from './Calendar'
import { switchTab } from '../../../store/actions/tabActions'
import { getCycles } from '../../../store/actions/programActions'



class CalendarView extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
        if(this.props.uid) {
            this.props.getCycles(this.props.uid)
        } else {
            this.props.getCycles(this.props.auth.uid)
        }
    }

    render() {
        return (
            <Calendar cycle={this.props.cycle} />
        )
    }
}

const mapStateToProps = (state) => {
    return{
        cycle: state.program.cycles[0],
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCycles: (uid) => dispatch(getCycles(uid)),
        switchTab: (day, props, route) => dispatch(switchTab(day, props, route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarView);
