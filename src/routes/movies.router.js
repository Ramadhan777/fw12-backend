const movieRouter = require('express').Router()
const { readAllMovies, readMovie, createMovie, updateMovie, deleteMovie, readMovieByNow, readMovieByMonth, readAllMoviesByGenre} = require("../controllers/movies.controller")
const uploadMovieMiddleware = require('../middleware/uploadMovie.middleware')

movieRouter.get('/', readAllMovies)
movieRouter.get('/genre', readAllMoviesByGenre)
movieRouter.get('/now', readMovieByNow)
movieRouter.get('/upcoming', readMovieByMonth)
movieRouter.get('/:id', readMovie)
movieRouter.post('/', createMovie)
movieRouter.patch('/:id', uploadMovieMiddleware, updateMovie)
movieRouter.delete('/:id', deleteMovie)

module.exports = movieRouter
