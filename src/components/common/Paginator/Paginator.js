import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

export default class Paginator extends Component {
    render() {
        return (
            <div>
                <Button onClick={this.props.prevPage}>Prev</Button>
                <span>{this.props.page + 1}</span>
                <Button onClick={this.props.nextPage}>Next</Button>
            </div>
        )
    }
}