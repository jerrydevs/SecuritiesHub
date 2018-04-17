import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'semantic-ui-react'

import OrderToggle from '../common/OrderToggle/OrderToggle'

const options = [
    {
        text: 'Price',
        value: 'price'
    }, 
    {
        text: 'Rank',
        value: 'rank'   
    },
    {
        text: '% Change 1H',
        value: 'deltaPerc1H'
    },
    {
        text: '% Change 1D',
        value: 'deltaPerc1D'
    },
    {
        text: '% Change 7D',
        value: 'deltaPerc7D'
    },
    {
        text: 'Market Cap',
        value: 'marketCap'
    }
]

@inject('CryptosStore') @observer
export default class CryptosSortForm extends Component {
    render() {
        return (
            <div>
                <label>Sort By </label>
                <Dropdown 
                onChange={(e, {value}) => this.props.CryptosStore.handleSortByChange(value)}
                value={this.props.CryptosStore.sortBy}
                options={options} />
                
                <OrderToggle 
                sortDesc={this.props.CryptosStore.handleSortOrderDesc}
                sortAsc={this.props.CryptosStore.handleSortOrderAsc}
                order={this.props.CryptosStore.sortOrder} />
            </div>
        )
    }
}