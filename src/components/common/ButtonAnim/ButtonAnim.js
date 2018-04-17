import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'

import './ButtonAnim.css'


export default class ButtonAnim extends Component {
    render() {
        const name = this.props.name
        return (
            <Button animated onClick={this.props.click} className="ButtonAnim">
                <Button.Content visible>{name}</Button.Content>
                <Button.Content hidden><Icon name={this.props.icon}/></Button.Content>   
            </Button>
        );
    }
}