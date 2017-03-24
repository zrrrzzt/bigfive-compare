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
    next.headers = data.headers.map(line => Object.assign({label: line, type: 'number'}))
  }

  next.scores.push(data.scores)

  return next
}
