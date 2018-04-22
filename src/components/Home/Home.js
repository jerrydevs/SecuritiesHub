import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import NewsCarousel from '../common/Carousel/NewsCarousel'

@inject('NewsStore') @inject('StocksStore') @inject('CryptosStore') @observer
export default class Home extends Component {
    componentDidMount() {
        this.props.NewsStore.loadNews();
        this.props.StocksStore.loadStocks();
        this.props.CryptosStore.loadCryptos();
    }

    render() {
        return (
            <div>
                <h1>Home</h1>
                <NewsCarousel />
            </div>
        )
    }
}
