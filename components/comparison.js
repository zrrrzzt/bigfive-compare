'use strict'

import React from 'react'
import { Chart } from 'react-google-charts'

export default class Comparison extends React.Component {
  render () {
    return <div className='chart-container'>
      <Chart
        chartType='LineChart'
        columns={this.props.headers}
        rows={this.props.scores}
        options={{title: this.props.title}}
        graph_id='LineChart'
        width='100%'
        height='600px'
        legend_toggle
      />
    </div>
  }
}
