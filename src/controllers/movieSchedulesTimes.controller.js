const { selectAllMovieSchedulesTimes, selectMovieSchedulesTime, insertMovieSchedulesTime, patchUser, deleteMovieSchedulesTime, countAllMovieSchedulesTimes } = require('../models/movieSchedulesTimes.model')
const errorHandler = require('../helpers/errorHandler')

exports.readAllMovieSchedulesTimes = (req, res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['time', 'createdAt', 'updatedAt']
  req.query.sortBy = (sortable.includes(req.query.sortBy) && req.query.sortBy) || 'createdAt'
  req.query.sort = req.query.sort || 'ASC'

  const filter = {
    limit: req.query.limit,
    offset: (parseInt(req.query.page - 1)) * req.query.limit,
    search: req.query.search,
    sort: req.query.sort,
    sortBy: req.query.sortBy
  }

  const pageInfo = {
    page: req.query.page
  }

  countAllMovieSchedulesTimes(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null


    selectAllMovieSchedulesTimes(filter, (err, result) => {
      if(err){
        return errorHandler(err, res)
      }

      return res.status(200).json({
        success: true,
        pageInfo,
        casts: result.rows
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
