import React, { Component } from 'react';
import ButtonAnim from '../../common/ButtonAnim/ButtonAnim'
import './NavBar.css'


export default class NavBar extends Component{
    render() {
        return (
            <nav>
                <ButtonAnim click={this.props.switchHome} icon="home" name="Home" />
                <ButtonAnim click={this.props.switchSearch} icon="search" name="Search" />
                <ButtonAnim click={this.props.switchStocks} icon="line chart" name="Stocks" />
                <ButtonAnim click={this.props.switchCryptos} icon="bitcoin" name="Cryptos" />
            </nav>
        )
    }
}