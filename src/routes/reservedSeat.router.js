const reservedSeatRouter = require('express').Router()
const { readAllReservedSeats, createReservedSeat, updateReservedSeat, deleteReservedSeat, readReservedSeat } = require('../controllers/reservedSeat.controller')

reservedSeatRouter.get('/', readAllReservedSeats)
reservedSeatRouter.get('/:id', readReservedSeat)
reservedSeatRouter.post('/', createReservedSeat)
reservedSeatRouter.patch('/:id', updateReservedSeat)
reservedSeatRouter.delete('/:id', deleteReservedSeat)

module.exports = reservedSeatRouter
