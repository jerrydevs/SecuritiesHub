import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { Table } from 'semantic-ui-react'

import Paginator from '../common/Paginator/Paginator'
import TableHeader from '../common/Table/TableHeader/TableHeader'
import TableRow from '../common/Table/TableRow/TableRow'

const headers = ['Rank', 'Name', 'Symbol', 'Price (USD)', 'Market Cap (USD)', '1H Change', '1D Change', '7D Change']

@inject('CryptosStore') @observer
export default class CryptosTable extends Component{
    state = {
        page: 0
    }

    handlePrevPage = () => {
        if (this.state.page > 0) {
            this.setState({
                page: this.state.page - 1
            })
        }
    }

    handleNextPage = () => {
        this.setState({
            page: this.state.page + 1
        })
    }

    render() {
        return (
            <div>
                <Paginator nextPage={this.handleNextPage} prevPage={this.handlePrevPage} page={this.state.page}/>
                <Table compact>
                    <TableHeader headers={headers} />
                    <Table.Body>
                    {this.props.CryptosStore.sortedCryptos.slice(100*this.state.page, 100*this.state.page + 100).map((item) => {
                        return <TableRow key={item.rank} data={item} />
                    })}
                    </Table.Body>
                </Table>
                <Paginator nextPage={this.handleNextPage} prevPage={this.handlePrevPage} page={this.state.page}/>
            </div>
        )
    }
}
