'use strict'

const axios = require('axios')
const generateJws = require('./generate-jws')
const config = require('../config')

module.exports = async comparisons => {
  const jws = generateJws()
  axios.defaults.headers.common['Authorization'] = jws
  const data = comparisons.map(comparison => Object.assign({id: comparison.id, name: comparison.name}))
  const result = await axios.post(config.saveUrl, {data: data})

  return result.data
}
