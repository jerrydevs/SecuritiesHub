import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

const green = {
    color: '#009972'
}

const red = {
    color: '#E2453B'
}

const valuesToFix = ['delta', 'deltaPerc']

const deltas = ['delta', 'deltaPerc', 'deltaPerc1H', 'deltaPerc1D', 'deltaPerc7D']

export default class TableRow extends Component {
    render() {
        return (
            <Table.Row>
                {Object.keys(this.props.data).map((key, index) => {
                    if (deltas.includes(key)) {
                        if (valuesToFix.includes(key) && this.props.data[key] >= 0) {
                            return <Table.Cell style={green} key={index}>{this.props.data[key].toFixed(3)}</Table.Cell>
                        } else if (valuesToFix.includes(key) && this.props.data[key] < 0) {
                            return <Table.Cell style={red} key={index}>{this.props.data[key].toFixed(3)}</Table.Cell>
                        } else if (this.props.data[key] >= 0) {
                            return <Table.Cell style={green} key={index}>{this.props.data[key]}</Table.Cell>
                        } else {
                            return <Table.Cell style={red} key={index}>{this.props.data[key]}</Table.Cell>
                        }
                    } else {
                        return <Table.Cell key={index}>{this.props.data[key]}</Table.Cell>
                    }
                })}
            </Table.Row>
        )
    }
}