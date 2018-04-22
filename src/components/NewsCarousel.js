import React, { Component } from 'react'
import Siema from 'siema'

import NewsCard from './NewsCard'


import './styles/NewsCarousel.css'

export default class NewsCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: this.props.news
        }
    }

    componentDidMount() {
        this.siema = new Siema();
    }

    prev = () => {
        this.siema.prev()
    };

    next = () => {
        this.siema.next()
    };

    render() {
        return (
            <div className="newsCarousel">
                <div className="siema">
                    {this.state.news.map((item) => <NewsCard key={item.title} {...item} />)}
                </div>
                <button className="btn btn-sm" onClick={this.prev}>Prev</button>
                <button className="btn btn-sm" onClick={this.next}>Next</button>
            </div>
        )
    }
}