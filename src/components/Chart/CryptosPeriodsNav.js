import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'

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
            <Button.Group>
                {periodOptions.map((option) => {
                    return <PeriodsNavButton key={option.period} period={option.period} interval={option.xInterval} />
                })}
            </Button.Group>
        )
    }
}