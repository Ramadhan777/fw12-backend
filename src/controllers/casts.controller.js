const errorHandler = require('../helpers/errorHandler')
const { selectAllCasts, selectCast, insertCast, patchCast, deleteCast, countAllCasts } = require('../models/casts.model')
const filter = require('../helpers/filter.helper')

exports.readAllCasts = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllCasts, res, (filter, pageInfo) => {
    selectAllCasts(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of casts',
      pageInfo,
      results: result.rows
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
      results: data.rows[0]
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
      results: data.rows[0]
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
      results: data.rows
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
      results: data.rows
    })
  })
}
