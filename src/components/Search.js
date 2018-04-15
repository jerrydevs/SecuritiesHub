import React, { Component } from 'react';
import { inject } from 'mobx-react'

import SearchInput from './SearchInput'
import Chart from './Chart/Chart'

@inject('ChartState')
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

                <div className="md-form">
                    <input 
                        type="text" 
                        value={this.state.input}
                        onChange={this.handleInput}
                        id="searchText"
                        className="form-control" 
                        placeholder="Enter a stock or crypto symbol E.g. AAPL, BTC ..." 
                        autoComplete="off" />
                    <button 
                        onClick={() => {this.props.ChartState.executeSearch(this.state.input.trim())}}
                        className="btn btn-md">
                        Go
                    </button>
                </div>

                <Chart />
             </div>
        )
    }
}
