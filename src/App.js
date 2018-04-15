import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import NavBar from './components/NavBar.js'
import Main from './components/Main.js'

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            currentPage: "Home", //"Home", "Search", "Stocks", "Cryptos"
            
        }
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