import React, { Component } from 'react'
import { inject } from 'mobx-react'

@inject('ChartState') 
export default class PeriodsNavButton extends Component  {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <button className="btn btn-sm" onClick={() => {
                this.props.ChartState.handleTimeFrameChange(this.props.period, this.props.interval);
                this.props.ChartState.executeSearch(this.props.ChartState.search)}} >
                {this.props.period}
            </button>
        )
    }
}

