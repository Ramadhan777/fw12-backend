const errorHandler = require('../helpers/errorHandler')
const { selectAllStatus, selectStatus, insertStatus, patchStatus, deleteStatus } = require('../models/Status.model')

exports.readAllStatus = (req, res) => {
  selectAllStatus((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      Statuss: data.rows
    })
  })
}

exports.readStatus = (req, res) => {
  selectStatus(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Status not found"
      })
    }

    return res.status(200).json({
      success: true,
      Status: data.rows
    })
  })
}

exports.createStatus = (req, res) => {
  insertStatus(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Status created successfully",
      Status: data.rows[0]
    })
  })
}

exports.updateStatus = (req, res) => {
  patchStatus(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Status doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Status Updated",
      Status: data.rows
    })
  })
}

exports.deleteStatus = (req, res) => {
  deleteStatus(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Status doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Status Deleted",
      Status: data.rows
    })
  })
}
