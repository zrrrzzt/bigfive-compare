'use strict'

const jws = require('jws')
const config = require('../config')
const pkg = require('../package.json')

module.exports = () => {
  const signature = jws.sign({
    header: { alg: 'HS256' },
    payload: {
      system: pkg.name,
      version: pkg.version
    },
    secret: config.jwtSecret
  })

  return signature
}
