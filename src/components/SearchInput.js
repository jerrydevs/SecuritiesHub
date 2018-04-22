import React, { Component } from 'react'

export default class SearchInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ''
        }
    }

    onInput(e) {
        this.setState({
            input: e.target.value
        })
    }
    render() {
        return (
            <div className="md-form">
                <input 
                    type="text" 
                    value={this.state.input}
                    onChange={this.onInput}
                    id="searchText"
                    className="form-control" 
                    placeholder="Enter a stock or crypto symbol E.g. AAPL, BTC ..." />

                <button className="btn btn-md" onClick={this.props.search(this.state.input)}>Go</button>
            </div>
        )
    }
}