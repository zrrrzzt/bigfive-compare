'use strict'

module.exports = data => {
  let results = {
    headers: [],
    scores: []
  }

  data.forEach(area => {
    results.headers.push(area.title)
    results.scores.push(area.score)
    area.facets.forEach(facet => {
      results.headers.push(facet.title)
      results.scores.push(facet.score)
    })
  })

  return results
}
