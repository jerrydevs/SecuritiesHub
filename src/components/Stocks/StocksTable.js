import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import { Table } from 'semantic-ui-react'

import Paginator from '../common/Paginator/Paginator'
import TableHeader from '../common/Table/TableHeader/TableHeader'
import TableRow from '../common/Table/TableRow/TableRow'

const headers = ['Name', 'Symbol', 'Current Price', 'Open Price', 'Volume', '$ Change', '% Change']

@inject('StocksStore') @observer
export default class StocksTable extends Component{
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
                    {this.props.StocksStore.sortedStocks.slice(100*this.state.page, 100*this.state.page + 100).map((item) => {
                        return <TableRow key={item.symbol} data={item} />
                    })}
                    </Table.Body>
                </Table>
                <Paginator nextPage={this.handleNextPage} prevPage={this.handlePrevPage} page={this.state.page}/>
            </div>
        )
    }
}