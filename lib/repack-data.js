'use strict'

module.exports = data => {
  let results = {
    domains: {
      headers: [],
      scores: []
    },
    facets: {}
  }

  data.forEach(area => {
    results.domains.headers.push(area.title)
    results.domains.scores.push(area.score)
    results.facets[area.domain] = {
      domain: area.domain,
      title: area.title,
      headers: [],
      scores: []
    }
    area.facets.forEach(facet => {
      results.facets[area.domain].headers.push(facet.title)
      results.facets[area.domain].scores.push(facet.score)
    })
  })

  return results
}
