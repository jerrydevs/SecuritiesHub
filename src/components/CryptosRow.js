import React, { Component } from 'react';

const green = {
    color: '#009972'
}

const red = {
    color: '#E2453B'
}

export default class CryptosRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.rank}</td>
                <td>{this.props.name}</td>
                <td>{this.props.symbol}</td>
                <td>{this.props.price}</td>
                <td>{this.props.marketCap}</td>
                {(this.props.deltaPerc1H >= 0) ? 
                    <td style={green}>{this.props.deltaPerc1H}%</td> : <td style={red}>{this.props.deltaPerc1H}%</td>}
                {(this.props.deltaPerc1D >= 0) ?
                    <td style={green}>{this.props.deltaPerc1D}%</td> : <td style={red}>{this.props.deltaPerc1D}%</td>}
                {(this.props.deltaPerc7D >= 0) ?
                    <td style={green}>{this.props.deltaPerc7D}%</td> : <td style={red}>{this.props.deltaPerc7D}%</td>}
            </tr>
        )
    }
}