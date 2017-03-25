'use strict'

import React from 'react'
import { Chart } from 'react-google-charts'

export default class Comparison extends React.Component {
  render () {
    return <div className={'my-pretty-chart-container'}>
      <Chart
        chartType='LineChart'
        columns={this.props.data.headers}
        rows={this.props.data.scores}
        options={{title: 'Comparison chart'}}
        graph_id='LineChart'
        width='100%'
        height='600px'
        legend_toggle
      />
    </div>
  }
}
