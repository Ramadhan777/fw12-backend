const cinemasRouter = require('express').Router()
const { readAllCinemas, readCinema, createCinema, updateCinema, deleteCinema} = require("../controllers/cinemas.controller")
const uploadMiddleware = require('../middleware/upload.middleware')

cinemasRouter.get('/', readAllCinemas)
cinemasRouter.get('/:id', readCinema)
cinemasRouter.post('/', uploadMiddleware, createCinema)
cinemasRouter.patch('/:id', uploadMiddleware, updateCinema)
cinemasRouter.delete('/:id', deleteCinema)

module.exports = cinemasRouter
