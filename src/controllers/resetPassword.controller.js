const { selectAllResetPasswords, selectResetPassword, insertResetPassword, patchResetPassword, deleteResetPassword, countAllResetPasswords } = require('../models/resetPassword.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllResetPasswords = (req,res) => {
  const sortable = ['email', 'userId', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllResetPasswords, res, (filter, pageInfo) => {
    selectAllResetPasswords(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Reset Passwords',
      pageInfo,
      resetPassword: result.rows
    })
  })
})
}

exports.readResetPassword = (req, res) => {
  selectResetPassword(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie Genre not found"
      })
    }

    return res.status(200).json({
      success: true,
      resetPassword: data.rows
    })
  })
}

exports.createResetPassword = (req, res) => {
  insertResetPassword(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Movie Genre created successfully",
      resetPassword: data.rows[0]
    })
  })
}

exports.updateResetPassword = (req, res) => {
  patchResetPassword(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie Genre doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Genre Updated",
      resetPassword: data.rows
    })
  })
}

exports.deleteResetPassword = (req, res) => {
  deleteResetPassword(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie Genre doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Genre Deleted",
      resetPassword: data.rows
    })
  })
}