import React, { Component } from 'react' 
import { Button, Icon } from 'semantic-ui-react'


export default class OrderToggle extends Component {

    renderToggle() {
        if (this.props.order === "Asc") {
            return (
                <Button onClick={this.props.sortDesc}>   
                    <Icon name="sort content ascending" />
                    Asc
                </Button>
            )
        } else {
            return (
                <Button onClick={this.props.sortAsc}>
                    <Icon name="sort content descending" />
                    Desc
                </Button>
            )
        }
    }

    render() {
        return(
            <div>
                {this.renderToggle()}
            </div>
        )
    }
}