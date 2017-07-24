'use strict'

import React from 'react'
import Router from 'next/router'
import Container from 'muicss/lib/react/container'
import Form from 'muicss/lib/react/form'
import Input from 'muicss/lib/react/input'
import Button from 'muicss/lib/react/button'
import Head from '../components/head'
import Loading from '../components/loading'
import Comparison from '../components/comparison.js'
import Profile from '../components/Profile'
import FacetSwitcher from '../components/FacetSwitcher'
import ComparisonFilter from '../components/ComparisonFilter'
const { parse } = require('url')
const getProfile = require('../lib/get-profile')
const getResult = require('../lib/get-result')
const getComparison = require('../lib/get-comparison')
const loadResults = require('../lib/load-results')
const generateComparison = require('../lib/generate-comparison')
const saveComparison = require('../lib/save-comparison')
const saveToProfile = require('../lib/save-to-profile')

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.state = Object.assign(this.props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSaveToProfile = this.handleSaveToProfile.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  static async getInitialProps (ctx) {
    const profile = getProfile(ctx.req)

    return {
      data: [],
      filteredIds: [],
      name: '',
      id: '',
      resultId: ctx.query.id || false,
      isLoading: false,
      show: 'domains',
      profile: profile
    }
  }

  async componentDidMount () {
    if (this.state.resultId) {
      this.setState({isLoading: true})
      const saved = await getComparison(this.state.resultId)
      const data = await loadResults(saved.comparison)
      const filtered = data.map(item => item.id)
      const comparisons = generateComparison(data)
      const show = this.state.show
      this.setState({data: data, filteredIds: filtered, isLoading: false, comparison: comparisons[show], comparisons: comparisons})
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
    const prevFilter = this.state.filteredIds
    const input = parse(this.state.id, true).query
    const id = input.id || this.state.id
    const data = await getResult(id)
    prevData.push({name: this.state.name, id: id, data: data})
    prevFilter.push(id)

    const comparisons = generateComparison(prevData)
    const show = this.state.show
    this.setState({name: '', id: '', isLoading: false, data: prevData, filteredIds: prevFilter, comparison: comparisons[show], comparisons: comparisons})

    // Saves changes
    try {
      const save = await saveComparison({id: this.state.resultId, comparisons: prevData})
      const resultId = save.id
      this.setState({resultId: resultId})
      Router.push({pathname: '/', query: {id: resultId}})
    } catch (error) {
      console.error(error)
    }
  }

  async handleSaveToProfile (event) {
    event.preventDefault()
    this.setState({isLoading: true})
    try {
      const data = await saveToProfile(this.state)
      this.setState({isLoading: false, savedToProfileId: data.id})
    } catch (error) {
      console.error(error)
      this.setState({isLoading: false})
    }
  }

  handleToggle (event) {
    event.preventDefault()
    const facet = event.target.dataset.facet
    const comparisons = this.state.comparisons
    const comparison = facet ? comparisons.facets[facet] : comparisons['domains']
    const show = facet || 'domains'
    this.setState({comparison: comparison, show: show})
  }

  handleFilter (event) {
    event.preventDefault()
    let filtered = []
    const show = this.state.show
    const comparisonId = event.target.dataset.comparison
    let prevFilter = this.state.filteredIds
    if (prevFilter.includes(comparisonId)) {
      filtered = prevFilter.filter(item => item !== comparisonId)
    } else {
      prevFilter.push(comparisonId)
      filtered = prevFilter
    }
    const data = this.state.data.filter(data => filtered.includes(data.id))
    const comparisons = generateComparison(data)
    const comparison = show === 'domains' ? comparisons['domains'] : comparisons.facets[show]
    this.setState({filteredIds: filtered, comparisons: comparisons, comparison: comparison})
  }
  render () {
    return (
      <div>
        <Head />
        <Container fluid>
          <Profile profile={this.state.profile} />
          <Form onSubmit={this.handleSubmit}>
            <legend>Results to compare</legend>
            <Input name='name' label='Name for result' floatingLabel value={this.state.name} onChange={this.handleChange} />
            <Input name='id' label='ID or URL for result' floatingLabel value={this.state.id} onChange={this.handleChange} />
            <Button variant='raised' type='submit' disabled={this.state.isLoading}>Add to compare</Button>
          </Form>
          <Loading loading={this.state.isLoading} />
          {
            this.state.data.length > 0 ? <Comparison {...this.state.comparison} /> : null
          }
          {
            this.state.data.length > 0 ? <FacetSwitcher facets={this.state.comparisons.facets} show={this.state.show} clickHandler={this.handleToggle} /> : null
          }
          {
            this.state.profile && this.state.resultId ? <Button variant='raised' className='mui--pull-right' onClick={this.handleSaveToProfile} disabled={this.state.isLoading}>Save to profile</Button> : null
          }
          {
            this.state.data.length > 0 ? <ComparisonFilter data={this.state.data} clickHandler={this.handleFilter} filtered={this.state.filteredIds} /> : null
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
