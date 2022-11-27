const errorHandler = require('../helpers/errorHandler')
const { selectAllCasts, selectCast, insertCast, patchCast, deleteCast, countAllCasts } = require('../models/casts.model')

exports.readAllCasts = (req, res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['name', 'createdAt', 'updatedAt']
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

  countAllCasts(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null


    selectAllCasts(filter, (err, result) => {
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

exports.readCast = (req, res) => {
  selectCast(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cast not found"
      })
    }

    return res.status(200).json({
      success: true,
      cast: data.rows
    })
  })
}

exports.createCast = (req, res) => {
  insertCast(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Cast created successfully",
      cast: data.rows[0]
    })
  })
}

exports.updateCast = (req, res) => {
  patchCast(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Cast doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Cast Updated",
      cast: data.rows
    })
  })
}

exports.deleteCast = (req, res) => {
  deleteCast(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Cast doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Cast Deleted",
      cast: data.rows
    })
  })
}
