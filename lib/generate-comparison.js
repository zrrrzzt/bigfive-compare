'use strict'

const repackData = require('./repack-data')

module.exports = comparisons => {
  let domains = {
    title: 'Domains',
    headers: [{label: 'domain', type: 'string'}],
    scores: []
  }

  let facets = {}

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

    Object.keys(line.data.facets).forEach(domain => {
      if (!facets[domain]) {
        facets[domain] = {
          title: `${line.data.facets[domain].title}`,
          headers: [{label: 'facet', type: 'string'}],
          scores: line.data.facets[domain].headers.map((header, index) => {
            return [header, line.data.facets[domain].scores[index]]
          })
        }
      } else {
        facets[domain].scores.forEach((score, index) => {
          score.push(line.data.facets[domain].scores[index])
        })
      }
      facets[domain].headers.push({label: line.name, type: 'number'})
    })
    domains.headers.push({label: line.name, type: 'number'})
  })

  return {domains: domains, facets: facets}
}
