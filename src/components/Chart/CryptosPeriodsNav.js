import React, { Component } from 'react'

import PeriodsNavButton from './PeriodsNavButton'

const periodOptions = [
    {
        period: '1D',
        xInterval: 'hour'
    },
    {
        period: '1W',
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
        period: '1Y',
        xInterval: 'week'
    },
    {
        period: '2Y',
        xInterval: 'month'
    }
]

export default class CryptosPeriodsNav extends Component {
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