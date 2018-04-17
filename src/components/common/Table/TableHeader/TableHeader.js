import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'



export default class TableHeader extends Component {
    render() {
        return (
            <Table.Header>
                <Table.Row>
                    {this.props.headers.map((item, index) => {
                        return <Table.HeaderCell key={index}>{item}</Table.HeaderCell>
                    })}
                </Table.Row>
            </Table.Header>
        )
    }
}