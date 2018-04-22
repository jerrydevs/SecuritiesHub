import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

@inject('CryptosStore') @observer
export default class CryptosSortForm extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <label>Sort By </label>
                <select 
                onChange={(e) => this.props.CryptosStore.handleSortByChange(e.target.value)}
                value={this.props.CryptosStore.sortBy}>
                    <option value="" disabled>Choose a category</option>
                    <option value="price">Price</option>
                    <option value="rank">Rank</option>
                    <option value="deltaPerc1H">% Change 1H</option>
                    <option value="deltaPerc1D">% Change 1D</option>
                    <option value="deltaPerc7D">% Change 7D</option>
                    <option value="marketCap">Market Cap</option>
                </select>

                {(this.props.CryptosStore.sortOrder === "Asc") ? 
                <button className="btn btn-sm" onClick={this.props.CryptosStore.handleSortOrderDesc}>   
                    <i className="fas fa-angle-double-up"></i>Asc
                </button>
                :
                <button className="btn btn-sm" onClick={this.props.CryptosStore.handleSortOrderAsc}>
                    <i className="fas fa-angle-double-down"></i>Desc
                </button>
                }
            </div>
        )
    }
}