import React, { Component } from 'react'

import './styles/NewsCard.css'
import 'mdbootstrap'

export default class NewsCard extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (

            <div className="card card-cascade wider reverse my-4 newsCard">

                <div className="view overlay">
                    <img src={this.props.img} className="img-fluid" />
                    <a href={this.props.url}><div className="mask rgba-white-slight"></div></a>
                </div>

                <div className="card-body text-center">

                    <h4 className="card-title"><strong>{this.props.title}</strong></h4>

                    <p className="card-text">{this.props.description}</p>

                </div>
            </div>
        )
    }
}     
