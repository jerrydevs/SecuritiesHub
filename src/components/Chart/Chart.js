import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import StocksPeriodsNav from './StocksPeriodsNav'
import CryptosPeriodsNav from './CryptosPeriodsNav'
import CanvasChart from './CanvasChart'

@inject('ChartState') @observer
export default class Chart extends Component {

    render() {
        return (
            <div>
                
                {(this.props.ChartState.type !== "None") ? <CanvasChart /> : null}
                {(this.props.ChartState.type === "Stock") ? <StocksPeriodsNav /> : null}
                {(this.props.ChartState.type === "Crypto") ? <CryptosPeriodsNav /> : null}

            </div>
        )
    }

}