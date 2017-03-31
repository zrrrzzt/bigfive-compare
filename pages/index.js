'use strict'

const { parse } = require('url')
import React from 'react'
import Router from 'next/router'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Head from '../components/head'
import Loading from '../components/loading'
import Comparison from '../components/comparison.js'
const getResult = require('../lib/get-result')
const getComparison = require('../lib/get-comparison')
const loadResults = require('../lib/load-results')
const generateComparison = require('../lib/generate-comparison')
const saveComparison = require('../lib/save-comparison')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  static async getInitialProps (ctx) {
    return {
      data: [],
      name: '',
      id: '',
      resultId: ctx.query.id || false,
      isLoading: false,
      show: 'domains'
    }
  }

  async componentDidMount () {
    if (this.state.resultId) {
      this.setState({isLoading: true})
      const saved = await getComparison(this.state.resultId)
      const data = await loadResults(saved.comparison)
      const comparisons = generateComparison(data)
      const show = this.state.show
      this.setState({data: data, isLoading: false, comparison: comparisons[show], comparisons: comparisons})
    }
  }

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
    const input = parse(this.state.id, true).query
    const id = input.id || this.state.id
    const data = await getResult(id)
    prevData.push({name: this.state.name, id: id, data: data})
    const comparisons = generateComparison(prevData)
    const show = this.state.show
    this.setState({name: '', id: '', isLoading: false, data: prevData, comparison: comparisons[show], comparisons: comparisons})
  }

  async handleSave (event) {
    event.preventDefault()
    this.setState({isLoading: true})
    try {
      const save = await saveComparison({id: this.state.resultId, comparisons: this.state.data})
      const resultId = save.id
      this.setState({resultId: resultId, isLoading: false})
      Router.push({pathname: '/', query: {id: resultId}})
    } catch (error) {
      this.setState({isLoading: false})
    }
  }

  handleToggle (event) {
    event.preventDefault()
    const comparisons = this.state.comparisons
    const show = this.state.show === 'domains' ? 'facets' : 'domains'
    this.setState({show: show, comparison: comparisons[show]})
  }

  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <Form onSubmit={this.handleSubmit}>
            <legend>Results to compare</legend>
            <Input name='name' label='Name for result' floatingLabel value={this.state.name} onChange={this.handleChange} />
            <Input name='id' label='ID or URL for result' floatingLabel value={this.state.id} onChange={this.handleChange} />
            <Button variant='raised' type='submit' disabled={this.state.isLoading}>Add to compare</Button>
          </Form>
          <Loading loading={this.state.isLoading} />
          {
            this.state.data.length > 0 ? <Comparison title={this.state.comparison.title} headers={this.state.comparison.headers} scores={this.state.comparison.scores} /> : null
          }
          {
            this.state.data.length > 0 ? <Button variant='raised' onClick={this.handleToggle}>Show {this.state.show === 'domains' ? 'facets' : 'domains'}</Button> : null
          }
          {
            this.state.data.length > 0 ? <Button variant='raised' className='mui--pull-right' onClick={this.handleSave} disabled={this.state.isLoading}>Save comparison</Button> : null
          }
        </Container>
        <footer className='mui-container mui--text-center'>
          <a href='https://github.com/zrrrzzt/bigfive-compare' target='_blank'>bigfive-compare</a><br />
              Made with ❤ by <a href='https://github.com/zrrrzzt/' target='_blank'>zrrrzzt</a> and <a href='https://github.com/maccyber' target='_blank'>maccyber</a>
        </footer>
      </div>
    )
  }
}
