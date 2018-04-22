import React, { Component } from 'react'
import { inject } from 'mobx-react'

import ButtonPlain from '../common/ButtonPlain/ButtonPlain'

@inject('ChartState') 
export default class PeriodsNavButton extends Component  {
    render() {
        return (
            <ButtonPlain 
                click={() => {
                    this.props.ChartState.handleTimeFrameChange(this.props.period, this.props.interval);
                    this.props.ChartState.executeSearch(this.props.ChartState.search)}} 
                name={this.props.period} >
            </ButtonPlain>
        )
    }
}

