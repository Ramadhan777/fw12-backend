const { selectAllMovieSchedules, selectMovieSchedule, insertMovieSchedule, patchUser, deleteMovieSchedule } = require('../models/movieSchedules.model')
const errorHandler = require('../helpers/errorHandler')

exports.readAllMovieSchedules = (req, res) => {
  selectAllMovieSchedules((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      movieSchedules: data.rows
    })
  })
}

exports.readMovieSchedule = (req, res) => {
  selectMovieSchedule(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "MovieSchedule not found"
      })
    }

    return res.status(200).json({
      success: true,
      movieSchedule: data.rows
    })
  })
}

exports.createMovieSchedule = (req, res) => {
  insertMovieSchedule(req.body, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Movie Schedule Created",
      movieSchedule: data.rows[0]
    })
  })
}

exports.updateMovieSchedule = (req, res) => {
  patchUser(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie Schedule doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Schedule Updated",
      movieSchedule: data.rows
    })
  })
}

exports.deleteMovieSchedule = (req, res) => {
  deleteMovieSchedule(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie Schedule doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Schedule Deleted",
      movieSchedule: data.rows
    })
  })
}
