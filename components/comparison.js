'use strict'

import { Chart } from 'react-google-charts'

export default props => (
  <div className='chart-container'>
    <Chart
      chartType='ColumnChart'
      columns={props.headers}
      rows={props.scores}
      options={{title: props.title}}
      graph_id='LineChart'
      width='100%'
      height='600px'
      legend_toggle
    />
  </div>
)
