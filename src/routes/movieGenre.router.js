const movieGenreRouter = require('express').Router()
const { readAllMovieGenres, readMovieGenre, createMovieGenre, updateMovieGenre, deleteMovieGenre} = require("../controllers/movieGenre.controller.js")

movieGenreRouter.get('/', readAllMovieGenres)
movieGenreRouter.get('/:id', readMovieGenre)
movieGenreRouter.post('/', createMovieGenre)
movieGenreRouter.patch('/:id', updateMovieGenre)
movieGenreRouter.delete('/:id', deleteMovieGenre)

module.exports = movieGenreRouter
