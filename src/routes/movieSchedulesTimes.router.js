const movieScheduleTimeRouter = require('express').Router()
const { readAllMovieSchedulesTimes, readMovieSchedulesTime, createMovieSchedulesTime, updateMovieSchedulesTime, deleteMovieSchedulesTime} = require("../controllers/movieSchedulesTimes.controller")

movieScheduleTimeRouter.get('/', readAllMovieSchedulesTimes)
movieScheduleTimeRouter.get('/:id', readMovieSchedulesTime)
movieScheduleTimeRouter.post('/', createMovieSchedulesTime)
movieScheduleTimeRouter.patch('/:id', updateMovieSchedulesTime)
movieScheduleTimeRouter.delete('/:id', deleteMovieSchedulesTime)

module.exports = movieScheduleTimeRouter
