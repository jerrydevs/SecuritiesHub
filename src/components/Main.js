import React, { Component } from 'react'

import Home from './Home'
import Search from './Search'
import Stocks from './Stocks'
import Cryptos from './Cryptos'

import './styles/Main.css'


export default class Main extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {

    }

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
