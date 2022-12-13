const { selectAllMovieSchedules, selectMovieSchedule, insertMovieSchedule, patchUser, deleteMovieSchedule, countAllMovieSchedules } = require('../models/movieSchedules.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllMovieSchedules = (req, res) => {
  const sortable = ['movieId', 'cinemaId', 'price', 'startDate', 'endDate', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllMovieSchedules, res, (filter, pageInfo) => {
    selectAllMovieSchedules(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Movie Schedules',
      pageInfo,
      results: result.rows
    })
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
      results: data.rows[0]
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
      results: data.rows[0]
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
      results: data.rows
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
      results: data.rows
    })
  })
}
