import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Line } from 'react-chartjs-2'

@inject('ChartState') @observer
export default class CanvasChart extends Component {
    render() {
        let chartData = {
            datasets: [{
                label: this.props.ChartState.search,
                data: this.props.ChartState.chartData.slice().reduce((total, item) => {
                    total.push({x:item.x, y:item.y})
                    return total
                }, []),
                pointRadius: 0,
                lineTension: 0
            }]
        }
        let chartOptions = {
            scales: {
                xAxes: [{
                    type: "time",
                    time: {
                        unit: this.props.ChartState.interval
                        },
                    gridLines: {
                        display: false,
                    }
                }]
            },
            tooltips: {
                intersect: false,
                mode: "index"
            }
        }

        return(
            <Line options={chartOptions} data={chartData} />
        )
    }
}
   