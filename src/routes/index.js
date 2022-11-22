const routes = require('express').Router()

routes.use('/users', require('./users.router'))

module.exports = routes
