import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'semantic-ui-react'

import OrderToggle from '../common/OrderToggle/OrderToggle'

const options = [
    {
        text: 'Current Price',
        value: 'current'
    },
    {
        text: '$ Change',
        value: 'delta'
    },
    {
        text: '% Change',
        value: 'deltaPerc'
    },
    {
        text: 'Open Price',
        value: 'open'
    },
    {
        text: 'Volume',
        value: 'volume'
    }
]

@inject('StocksStore') @observer
export default class StocksSortForm extends Component {

    render() {
        return (
            <div>
                <label>Sort By </label>
                <Dropdown 
                onChange={(e, {value}) => this.props.StocksStore.handleSortByChange(value)}
                value={this.props.StocksStore.sortBy} 
                options={options} />

                <OrderToggle
                sortDesc={this.props.StocksStore.handleSortOrderDesc}
                sortAsc={this.props.StocksStore.handleSortOrderAsc}
                order={this.props.StocksStore.sortOrder} />
            </div>
        )
    }
}