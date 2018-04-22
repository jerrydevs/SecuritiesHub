import React, { Component } from 'react';
import NavButton from './NavButton.js'
import './styles/NavBar.css'

export default class NavBar extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <nav role="navigation">
                <NavButton switch={this.props.switchHome} font="fa-home" name="Home" />
                <NavButton switch={this.props.switchSearch} font="fa-search" name="Search" />
                <NavButton switch={this.props.switchStocks} font="fa-chart-line" name="Stocks" />
                <NavButton switch={this.props.switchCryptos} font="fa-bitcoin" name="Cryptos" />
            </nav>
        )
    }
}