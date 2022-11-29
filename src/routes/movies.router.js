const movieRouter = require('express').Router()
const { readAllMovies, readMovie, createMovie, updateMovie, deleteMovie, readMovieByNow, readMovieByMonth} = require("../controllers/movies.controller")

movieRouter.get('/', readAllMovies)
movieRouter.get('/now', readMovieByNow)
movieRouter.get('/upcoming', readMovieByMonth)
movieRouter.get('/:id', readMovie)
movieRouter.post('/', createMovie)
movieRouter.patch('/:id', updateMovie)
movieRouter.delete('/:id', deleteMovie)

module.exports = movieRouter
