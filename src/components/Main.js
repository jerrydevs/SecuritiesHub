import React, { Component } from 'react'

import Home from './Home/Home'
import Search from './Search/Search'
import Stocks from './Stocks/Stocks'
import Cryptos from './Cryptos/Cryptos'

import './Main.css'


export default class Main extends Component {

    pageSwitch() {
        const currentPage = this.props.currentPage;
        if (currentPage === "Home") {
            return <Home />;
        } else if (currentPage === "Search") {
            return <Search />;
        } else if (currentPage === "Stocks") {
            return <Stocks />;
        } else if (currentPage === "Cryptos") {
            return <Cryptos />;
        } else {
            return <p>Something went wrong</p>
        }
    }

    render() {
        return (
            <main role="main">
                {this.pageSwitch()}
            </main>
        )
    }
}
