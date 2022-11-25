const movieCastRouter = require('express').Router()
const { readAllMovieCasts, readMovieCast, createMovieCast, updateMovieCast, deleteMovieCast} = require("../controllers/movieCasts.controller.js")

movieCastRouter.get('/', readAllMovieCasts)
movieCastRouter.get('/:id', readMovieCast)
movieCastRouter.post('/', createMovieCast)
movieCastRouter.patch('/:id', updateMovieCast)
movieCastRouter.delete('/:id', deleteMovieCast)

module.exports = movieCastRouter
