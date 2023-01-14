const movieRouter = require('express').Router()
const { readAllMovies, readMovie, createMovie, updateMovie, deleteMovie, readMovieByNow, readMovieByMonth, readAllMoviesByGenre, readSchdeuleByDateAndCity} = require("../controllers/movies.controller")
const uploadMiddleware = require('../middleware/upload.middleware')

movieRouter.get('/', readAllMovies)
movieRouter.get('/genre', readAllMoviesByGenre)
movieRouter.get('/now', readMovieByNow)
movieRouter.get('/upcoming', readMovieByMonth)
movieRouter.get('/schedules', readSchdeuleByDateAndCity)
movieRouter.get('/:id', readMovie)
movieRouter.post('/', uploadMiddleware, createMovie)
movieRouter.patch('/:id', uploadMiddleware, updateMovie)
movieRouter.delete('/:id', deleteMovie)

module.exports = movieRouter
