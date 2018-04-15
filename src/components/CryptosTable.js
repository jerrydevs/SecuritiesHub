import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import CryptosRow from './CryptosRow'


@inject('CryptosStore') @observer
export default class CryptosTable extends Component{
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
                <table className="table table-sm table-responsive">
                    <thead className="mdb-color darken-3">
                    <tr className="text-white">
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Symbol</th>
                        <th>Price (USD)</th>
                        <th>Market Cap (USD)</th>
                        <th>1H Change</th>
                        <th>1D Change</th>
                        <th>7D Change</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.CryptosStore.sortedCryptos.slice(100*this.state.page, 100*this.state.page + 100).map((item) => {
                            return <CryptosRow key={item.rank} {...item} />
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