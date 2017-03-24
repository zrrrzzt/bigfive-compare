'use strict'

const axios = require('axios')
const repackData = require('./repack-data')
const config = require('../config')

module.exports = async options => {
  const url = `${config.generatorUrl}?id=${options.id}`
  const results = await axios(url)
  const data = repackData(results.data)
  let next = options.previous

  if (options.previous.headers.length === 0) {
    next.headers.push({label: 'domain', type: 'string'})
  }

  next.headers.push({label: options.name, type: 'number'})

  if (options.previous.scores.length === 0) {
    data.headers.forEach((line, index) => {
      next.scores.push([line, data.scores[index]])
    })
  } else {
    next.scores.forEach((line, index) => {
      line.push(data.scores[index])
    })
  }

  return next
}
