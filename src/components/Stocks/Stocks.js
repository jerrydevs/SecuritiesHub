import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import StocksTable from './StocksTable'
import StocksSortForm from './StocksSortForm'

@inject('StocksStore') @observer
export default class Stocks extends Component {

    render() {
        return (
            <div>
                <h1>Stocks</h1>

                <StocksSortForm />
                {(this.props.StocksStore.stocks) && <StocksTable {...this.state}/>}
            </div>
        )
    }
}
