'use strict'

const cookie = require('cookie')

module.exports = request => {
  const parsed = request && request.headers ? cookie.parse(request.headers.cookie) : false
  let tmp = parsed.profile
  let profile = false
  if (tmp) {
    tmp = tmp.replace('"{', '{')
    tmp = tmp.replace('}"', '}')
    profile = JSON.parse(tmp)
  }
  return profile
}
