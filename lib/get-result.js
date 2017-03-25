'use strict'

const axios = require('axios')
const config = require('../config')

module.exports = async id => {
  const url = `${config.generatorUrl}?id=${id}`
  const results = await axios(url)

  return results.data
}
