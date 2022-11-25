const { selectAllMovieSchedulesTimes, selectMovieSchedulesTime, insertMovieSchedulesTime, patchUser, deleteMovieSchedulesTime } = require('../models/movieSchedulesTimes.model')
const errorHandler = require('../helpers/errorHandler')

exports.readAllMovieSchedulesTimes = (req, res) => {
  selectAllMovieSchedulesTimes((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      movieSchedulesTimes: data.rows
    })
  })
}

exports.readMovieSchedulesTime = (req, res) => {
  selectMovieSchedulesTime(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "MovieSchedulesTime not found"
      })
    }

    return res.status(200).json({
      success: true,
      movieSchedulesTime: data.rows
    })
  })
}

exports.createMovieSchedulesTime = (req, res) => {
  insertMovieSchedulesTime(req.body, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Movie Schedule Created",
      movieSchedulesTime: data.rows[0]
    })
  })
}

exports.updateMovieSchedulesTime = (req, res) => {
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
      movieSchedulesTime: data.rows
    })
  })
}

exports.deleteMovieSchedulesTime = (req, res) => {
  deleteMovieSchedulesTime(req.params, (err, data) => {
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
      movieSchedulesTime: data.rows
    })
  })
}
