import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('StocksStore') @observer
export default class StocksSortForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <label>Sort By </label>
                <select 
                onChange={(e) => this.props.StocksStore.handleSortByChange(e.target.value)}
                value={this.props.StocksStore.sortBy}>
                    <option value="" disabled>Choose a category</option>
                    <option value="current">Current Price</option>
                    <option value="delta">$ Change</option>
                    <option value="deltaPerc">% Change</option>
                    <option value="open">Open Price</option>
                    <option value="volume">Volume</option>
                </select>

                {(this.props.StocksStore.sortOrder === "Asc") ? 
                <button className="btn btn-sm" onClick={this.props.StocksStore.handleSortOrderDesc}>   
                    <i className="fas fa-angle-double-up"></i>Asc
                </button>
                :
                <button className="btn btn-sm" onClick={this.props.StocksStore.handleSortOrderAsc}>
                    <i className="fas fa-angle-double-down"></i>Desc
                </button>
                }
            </div>
        )
    }
}