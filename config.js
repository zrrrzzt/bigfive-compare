'use strict'

module.exports = {
  generatorUrl: process.env.GENERATOR_URL || 'https://generator.bigfive.maccyber.io',
  saveUrl: process.env.SAVE_URL || 'https://save.bigfive.maccyber.io',
  jwtSecret: process.env.JWT_SECRET || 'Gibberish, jibberish, jibber-jabber and gobbledygook'
}
