const castsRouter = require('express').Router()
const { readAllCasts, readCast, createCast, updateCast, deleteCast} = require("../controllers/casts.controller")

castsRouter.get('/', readAllCasts)
castsRouter.get('/:id', readCast)
castsRouter.post('/', createCast)
castsRouter.patch('/:id', updateCast)
castsRouter.delete('/:id', deleteCast)

module.exports = castsRouter
