import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import StocksTable from './StocksTable'
import StocksSortForm from './StocksSortForm'

@inject('StocksStore') @observer
export default class Stocks extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Stocks</h1>

                <StocksSortForm />
                {(this.props.StocksStore.stocks) ? <StocksTable {...this.state}/> : console.log('stocks are broken')}
            </div>
        )
    }
}
