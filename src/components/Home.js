import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import NewsCarousel from './NewsCarousel'

@inject('NewsStore') @inject('StocksStore') @inject('CryptosStore') @observer
export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.NewsStore.loadNews();
        this.props.StocksStore.loadStocks();
        this.props.CryptosStore.loadCryptos();
    }

    componentDidCatch() {

    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                {(this.props.NewsStore.news) ?  <NewsCarousel news={this.props.NewsStore.news} /> : <p>Loading...</p>}
            </div>
        )
    }
}
