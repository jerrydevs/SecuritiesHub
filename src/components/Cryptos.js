import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import CryptosTable from './CryptosTable'
import CryptosSortForm from './CryptosSortForm'

@inject('CryptosStore') @observer
export default class Cryptos extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <h1>Cryptos</h1>
                
                <CryptosSortForm />
                {(this.props.CryptosStore.cryptos) ? <CryptosTable cryptos={this.props.CryptosStore.cryptos} /> : console.log('cryptos are broken')}
            </div>
        )
    }
}
