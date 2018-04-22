import React, { Component } from 'react';
import StocksRow from './StocksRow'
import { inject, observer } from 'mobx-react'


@inject('StocksStore') @observer
export default class StocksTable extends Component{
    constructor(props) {
        super(props)
        this.state = {
            page: 0
        }
    }

    handlePrevPage = () => {
        if (this.state.page > 0) {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    handleNextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.handlePrevPage} className="btn btn-sm">Prev</button>
                <span>{this.state.page + 1}</span>
                <button onClick={this.handleNextPage} className="btn btn-sm">Next</button>
                <table className="table table-sm table-responsive table-hover">
                    <thead className="mdb-color darken-3">
                    <tr className="text-white">
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Current Price (USD)</th>
                        <th>Open Price (USD)</th>
                        <th>Volume</th>
                        <th>Change</th>
                        <th>Change</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.StocksStore.sortedStocks.slice(100*this.state.page, 100*this.state.page + 100).map((item) => {
                            return <StocksRow key={item.symbol} {...item} />
                        })}
                    </tbody>
                </table>
                <button onClick={this.handlePrevPage} className="btn btn-sm">Prev</button>
                <span>{this.state.page + 1}</span>
                <button onClick={this.handleNextPage} className="btn btn-sm">Next</button>
            </div>
        )
    }
}