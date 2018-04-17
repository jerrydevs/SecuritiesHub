import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import CryptosTable from './CryptosTable'
import CryptosSortForm from './CryptosSortForm'

@inject('CryptosStore') @observer
export default class Cryptos extends Component {
    render() {
        return (
            <div>
                <h1>Cryptos</h1>
                
                <CryptosSortForm />
                {(this.props.CryptosStore.cryptos) && <CryptosTable cryptos={this.props.CryptosStore.cryptos} />}
            </div>
        )
    }
}
