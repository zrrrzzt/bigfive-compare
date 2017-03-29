'use strict'

const getResult = require('./get-result')

module.exports = async comparisons => {
  const jobs = comparisons.map(comparison => getResult(comparison.id))
  const data = await Promise.all(jobs)
  const results = data.map((line, index) => Object.assign(comparisons[index], {data: line}))

  return results
}
