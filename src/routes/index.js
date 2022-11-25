const routes = require('express').Router()

routes.use('/users', require('./users.router'))
routes.use('/resetPassword', require('./resetPassword.router'))
routes.use('/movies', require('./movies.router'))
routes.use('/genre', require('./genre.router'))
routes.use('/movieGenre', require('./movieGenre.router'))
routes.use('/casts', require('./casts.router'))
routes.use('/movieCasts', require('./movieCasts.router'))
routes.use('/cinemas', require('./cinemas.router'))
routes.use('/movieSchedules', require('./movieSchedules.router'))
routes.use('/movieSchedulesTimes', require('./movieSchedulesTimes.router'))
routes.use('/status', require('./status.router'))
routes.use('/transactions', require('./transactions.router'))
routes.use('/reservedSeat', require('./reservedSeat.router'))
routes.use('/paymentMethod', require('./paymentMethod.router'))
routes.use('/subscribers', require('./subscribers.router'))

module.exports = routes
