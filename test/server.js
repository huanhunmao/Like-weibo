

const request = require('supertest')
const server = require('../src/app').callback()
const servers = request(server)

module.exports = servers
