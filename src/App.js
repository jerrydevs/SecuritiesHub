import React, { Component } from 'react'

import NavBar from './components/Home/NavBar/NavBar'
import Main from './components/Main.js'

export default class App extends Component{
    state = {
        currentPage: "Home", //"Home", "Search", "Stocks", "Cryptos"
    }

    handleSwitchHome = () => {
        this.setState({
            currentPage: "Home"
        })
    }
    handleSwitchSearch = () => {
        this.setState({
            currentPage: "Search"
        })
    }
    handleSwitchStocks = () => {
        this.setState({
            currentPage: "Stocks"
        })
    }
    handleSwitchCryptos = () => {
        this.setState({
            currentPage: "Cryptos"
        })
    }

    render() {
        return(
            <div className="index">
                <NavBar switchHome={this.handleSwitchHome} switchSearch={this.handleSwitchSearch}
                switchStocks={this.handleSwitchStocks} switchCryptos={this.handleSwitchCryptos}/>
                <Main currentPage={this.state.currentPage}/>
            </div>
        )
    }
}