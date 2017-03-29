'use strict'

module.exports = {
  generatorUrl: process.env.GENERATOR_URL || 'https://generator.bigfive.maccyber.io',
  saveUrl: process.env.SAVE_URL || 'https://compares.save.bigfive.world',
  jwtSecret: process.env.JWT_SECRET || 'Gibberish, jibberish, jibber-jabber and gobbledygook'
}
