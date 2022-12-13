const { selectAllMovieSchedulesTimes, selectMovieSchedulesTime, insertMovieSchedulesTime, patchUser, deleteMovieSchedulesTime, countAllMovieSchedulesTimes } = require('../models/movieSchedulesTimes.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllMovieSchedulesTimes = (req, res) => {
  const sortable = ['time', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllMovieSchedulesTimes, res, (filter, pageInfo) => {
    selectAllMovieSchedulesTimes(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Movie Schedules Time',
      pageInfo,
      results: result.rows
    })
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
      results: data.rows[0]
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
      results: data.rows[0]
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
      results: data.rows
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
      results: data.rows
    })
  })
}
