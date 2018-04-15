import React, { Component } from 'react';

const green = {
    color: '#009972'
}

const red = {
    color: '#E2453B'
}

export default class StocksRow extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>{this.props.symbol}</td>
                <td>{this.props.current}</td>
                <td>{this.props.open}</td>
                <td>{this.props.volume}</td>
                {(this.props.delta >= 0) ? <td style={green}>${this.props.delta.toFixed(4)}</td> : <td style={red}>${this.props.delta.toFixed(4)}</td>}
                {(this.props.deltaPerc >= 0) ? <td style={green}>{this.props.deltaPerc.toFixed(4)}%</td> : <td style={red}>{this.props.deltaPerc.toFixed(4)}%</td>}
            </tr>
        )
    }
}