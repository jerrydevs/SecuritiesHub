import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

import './ButtonPlain.css'


export default class ButtonPlain extends Component {
    render() {
        const name = this.props.name
        return (
            <Button onClick={this.props.click} className="ButtonPlain" secondary>{name}</Button>
        );
    }
}