'use strict'

const axios = require('axios')
const ObjectID = require('bson-objectid')
const config = require('../config')
const generateJws = require('./generate-jws')

module.exports = async options => {
  let result
  let id
  const data = options.comparisons.map(comparison => Object.assign({ id: comparison.id, name: comparison.name }))
  const token = generateJws()

  axios.defaults.headers.common['Authorization'] = token

  if (options.id !== false) {
    id = options.id
    const url = `${config.saveUrl}/${id}`
    result = await axios.post(url, { comparison: data })
  } else {
    id = ObjectID()
    const url = `${config.saveUrl}/${id}`
    result = await axios.put(url, { comparison: data })
  }
  return result.data
}
