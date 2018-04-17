import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'

import SearchInput from './SearchInput'
import Chart from '../Chart/Chart'

@inject('ChartState') @observer
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            type: this.props.ChartState.type
        }
    }

    handleInput = (e) => {
        this.setState({
            input: e.target.value.toUpperCase()
        })
    }

    render() {
        return (
            <div>
                <h1>Search</h1>

                <SearchInput 
                    value={this.state.input}
                    change={this.handleInput}
                    execute={this.props.ChartState.executeSearch(this.state.input.trim())} />

                {this.props.ChartState.type !== "None" && <Chart />}
             </div>
        )
    }
}
