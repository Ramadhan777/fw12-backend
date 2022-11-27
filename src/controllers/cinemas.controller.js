const errorHandler = require('../helpers/errorHandler')
const { selectAllCinemas, selectCinema, insertCinema, patchCinema, deleteCinema, countAllCinemas } = require('../models/cinemas.model')

exports.readAllCinemas = (req, res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['name', 'address', 'city','createdAt', 'updatedAt']
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

  countAllCinemas(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null

    selectAllCinemas(filter, (err, result) => {
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

exports.readCinema = (req, res) => {
  selectCinema(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cinema not found"
      })
    }

    return res.status(200).json({
      success: true,
      cinema: data.rows
    })
  })
}

exports.createCinema = (req, res) => {
  insertCinema(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Cinema created successfully",
      cinema: data.rows[0]
    })
  })
}

exports.updateCinema = (req, res) => {
  patchCinema(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Cinema doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Cinema Updated",
      cinema: data.rows
    })
  })
}

exports.deleteCinema = (req, res) => {
  deleteCinema(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Cinema doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Cinema Deleted",
      cinema: data.rows
    })
  })
}
