const cinemasRouter = require('express').Router()
const { readAllCinemas, readCinema, createCinema, updateCinema, deleteCinema} = require("../controllers/cinemas.controller")

cinemasRouter.get('/', readAllCinemas)
cinemasRouter.get('/:id', readCinema)
cinemasRouter.post('/', createCinema)
cinemasRouter.patch('/:id', updateCinema)
cinemasRouter.delete('/:id', deleteCinema)

module.exports = cinemasRouter
