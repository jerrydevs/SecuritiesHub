import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

import Button from '../common/ButtonPlain/ButtonPlain'

export default class SearchInput extends Component {
    render() {
        return (
            <div>
                <Form.Input 
                    type="text" 
                    label="Search" 
                    placeholder="Enter a stock or crypto symbol E.g. AAPL, BTC ..." 
                    fluid
                    value={this.props.value}
                    onChange={this.props.change}
                    autoComplete="off" />

                <Button 
                    click={this.props.execute}
                    name="Go" />
            </div>
        )
    }
}