'use strict'

import React from 'react'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import { Chart } from 'react-google-charts'
import Head from '../components/head'
const getData = require('../lib/get-data')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static async getInitialProps (ctx) {
    return {
      data: {
        headers: [],
        scores: []
      },
      name: '',
      id: ''
    }
  }

  /*
  async componentDidMount () {
    const data = await getSitemap()
    const options = {
      data: data,
      limitDays: this.state.limitDays,
      showOnly: this.state.showOnly,
      filterBy: this.state.filterBy
    }
    const pages = filterSitemap(options)
    this.setState({data: data, pages: pages, loading: false})
  }
  */

  handleChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  async handleSubmit (event) {
    event.preventDefault()
    const options = {
      previous: this.state.data,
      name: this.state.name,
      id: this.state.id
    }

    const compare = await getData(options)
    this.setState({data: compare, name: '', id: ''})
  }

  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <Form onSubmit={this.handleSubmit}>
            <legend>Results to compare</legend>
            <Input name='name' label='Name for result' floatingLabel value={this.state.name} onChange={this.handleChange} />
            <Input name='id' label='ID for result' floatingLabel value={this.state.id} onChange={this.handleChange} />
            <Button variant='raised'>Add to compare</Button>
          </Form>
          {
            this.state.data.headers.length > 0 ? <div className={'my-pretty-chart-container'}>
              <Chart
                chartType='LineChart'
                columns={this.state.data.headers}
                rows={this.state.data.scores}
                options={{title: 'Comparison chart'}}
                graph_id='LineChart'
                width='100%'
                height='400px'
                legend_toggle
              />
            </div> : null
          }
        </Container>
      </div>
    )
  }
}
