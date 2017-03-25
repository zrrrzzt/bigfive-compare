'use strict'

const axios = require('axios')
const config = require('../config')

module.exports = async id => {
  const url = `${config.saveUrl}/${id}`
  const results = axios(url)

  return results.data
}
