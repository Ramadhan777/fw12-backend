const movieRouter = require('express').Router()
const { readAllMovies, readMovie, createMovie, updateMovie, deleteMovie} = require("../controllers/movies.controller")

movieRouter.get('/', readAllMovies)
movieRouter.get('/:id', readMovie)
movieRouter.post('/', createMovie)
movieRouter.patch('/:id', updateMovie)
movieRouter.delete('/:id', deleteMovie)

module.exports = movieRouter
