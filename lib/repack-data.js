'use strict'

module.exports = data => {
  let results = {
    domains: {
      headers: [],
      scores: []
    },
    facets: {
      headers: [],
      scores: []
    }
  }

  data.forEach(area => {
    results.domains.headers.push(area.title)
    results.domains.scores.push(area.score)
    area.facets.forEach(facet => {
      results.facets.headers.push(facet.title)
      results.facets.scores.push(facet.score)
    })
  })

  return results
}
