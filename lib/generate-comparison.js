'use strict'

const repackData = require('./repack-data')

module.exports = comparisons => {
  let domains = {
    title: 'Domains',
    headers: [{label: 'domain', type: 'string'}],
    scores: []
  }

  let facets = {
    title: 'Facets',
    headers: [{label: 'facet', type: 'string'}],
    scores: []
  }

  const lines = comparisons.map(comparison => Object.assign({id: comparison.id, name: comparison.name, data: repackData(comparison.data)}))

  lines.forEach(line => {
    if (domains.scores.length === 0) {
      line.data.domains.headers.forEach((header, index) => {
        domains.scores.push([header, line.data.domains.scores[index]])
      })
    } else {
      domains.scores.forEach((score, index) => {
        score.push(line.data.domains.scores[index])
      })
    }

    if (facets.scores.length === 0) {
      line.data.facets.headers.forEach((header, index) => {
        facets.scores.push([header, line.data.facets.scores[index]])
      })
    } else {
      facets.scores.forEach((score, index) => {
        score.push(line.data.facets.scores[index])
      })
    }

    domains.headers.push({label: line.name, type: 'number'})
    facets.headers.push({label: line.name, type: 'number'})
  })

  return {domains: domains, facets: facets}
}
