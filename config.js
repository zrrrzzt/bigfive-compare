'use strict'

module.exports = {
  generatorUrl: process.env.GENERATOR_URL || 'https://generator.bigfive.maccyber.io',
  saveUrl: process.env.SAVE_URL || 'https://compares.save.bigfive.world',
  saveProfileUrl: process.env.SAVE_PROFILE_URL || 'https://profiles.save.bigfive.world',
  jwtSecret: process.env.JWT_SECRET || 'Gibberish, jibberish, jibber-jabber and gobbledygook',
  encryptorSecret: process.env.ENCRYPTOR_SECRET || 'When you rush around in hopeless circles. Searching everywhere for something true'
}
