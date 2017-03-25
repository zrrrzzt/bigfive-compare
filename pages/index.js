'use strict'

import React from 'react'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Head from '../components/head'
import Loading from '../components/loading'
import Comparison from '../components/comparison'
const getResult = require('../lib/get-result')
const generateComparison = require('../lib/generate-comparison')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static async getInitialProps (ctx) {
    return {
      data: [],
      name: '',
      id: '',
      isLoading: false
    }
  }

  /*
  async componentDidMount () {
    this.setState({isLoading: true})
    const loadComparisons = require('../lib/load-comparisons')
    const comparisons = require('../test/data/example.json')
    const data = await loadComparisons(comparisons)
    this.setState({data: data, isLoading: false})
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
    this.setState({isLoading: true})
    const prevData = this.state.data
    const data = await getResult(this.state.id)
    prevData.push({name: this.state.name, id: this.state.id, data: data})
    this.setState({name: '', id: '', isLoading: false, data: prevData})
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
            <Button variant='raised' type='submit' disabled={this.state.isLoading}>Add to compare</Button>
          </Form>
          <Loading loading={this.state.isLoading} />
          {
            this.state.data.length > 0 ? <Comparison data={generateComparison(this.state.data)} /> : null
          }
        </Container>
      </div>
    )
  }
}
