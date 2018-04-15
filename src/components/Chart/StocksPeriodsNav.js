import React, { Component } from 'react'

import PeriodsNavButton from './PeriodsNavButton'

const periodOptions = [
    {
        period: '1D',
        xInterval: 'day'
    },
    {
        period: '1M',
        xInterval: 'day'
    },
    {
        period: '3M',
        xInterval: 'week'
    },
    {
        period: '6M',
        xInterval: 'week'
    },
    {
        period: 'YTD',
        xInterval: 'week'
    },
    {
        period: '1Y',
        xInterval: 'week'
    },
    {
        period: '2Y',
        xInterval: 'month'
    },
    {
        period: '5Y',
        xInterval: 'month'
    }
]

export default class StocksPeriodsNav extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="btn-group">
                {periodOptions.map((option) => {
                    return <PeriodsNavButton key={option.period} period={option.period} interval={option.xInterval} />
                })}
            </div>
        )
    }
}