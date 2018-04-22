import React, { Component } from 'react'
import Siema from 'siema'
import { inject, observer } from 'mobx-react'

import NewsCard from '../Card/NewsCard'
import Button from '../ButtonPlain/ButtonPlain'

import './NewsCarousel.css'

@inject('NewsStore') @observer
export default class NewsCarousel extends Component {
    state = {
        news: this.props.NewsStore.news
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
                <Button click={this.prev} name="Prev"></Button>
                <Button click={this.next} name="Next"></Button>
            </div>
        )
    }
}