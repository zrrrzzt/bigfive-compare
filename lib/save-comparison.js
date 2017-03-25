'use strict'

const axios = require('axios')
const uuid = require('uuid')
const config = require('../config')

module.exports = async comparisons => {
  const data = comparisons.map(comparison => Object.assign({id: comparison.id, name: comparison.name}))
  const result = await axios.post(config.saveUrl, {key: uuid(), type: 'comparison', data: data})
  console.log(result.data)
  return result.data
}
