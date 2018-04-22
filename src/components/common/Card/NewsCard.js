import React, { Component } from 'react'
import { Card, Image, Icon } from 'semantic-ui-react'

import './NewsCard.css'

export default class NewsCard extends Component {
    render() {
        return (
            <Card fluid className="newsCard">
                <a href={this.props.url}><Image src={this.props.img} className="cardImage"/></a>
                <Card.Content>
                    <Card.Header>
                        {this.props.title}
                    </Card.Header>
                    <Card.Meta>
                        {this.props.author}
                    </Card.Meta>
                    <Card.Description>
                        {this.props.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name="time" />
                    {this.props.publishedAt}
                </Card.Content>
            </Card>
        )
    }
}     
