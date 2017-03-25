'use strict'

const repackData = require('./repack-data')

module.exports = comparisons => {
  let results = {
    headers: [{label: 'domain', type: 'string'}],
    scores: []
  }

  const lines = comparisons.map(comparison => Object.assign({id: comparison.id, name: comparison.name, data: repackData(comparison.data)}))

  lines.forEach(line => {
    if (results.scores.length === 0) {
      line.data.headers.forEach((header, index) => {
        results.scores.push([header, line.data.scores[index]])
      })
    } else {
      results.scores.forEach((score, index) => {
        score.push(line.data.scores[index])
      })
    }

    results.headers.push({label: line.name, type: 'number'})
  })

  return results
}
