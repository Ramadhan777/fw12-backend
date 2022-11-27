const errorHandler = require('../helpers/errorHandler')
const { selectAllResetPasswords, selectResetPassword, insertResetPassword, patchResetPassword, deleteResetPassword, countAllResetPasswords } = require('../models/resetPassword.model')

exports.readAllResetPasswords = (req,res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['email', 'userId', 'createdAt', 'updatedAt']
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

  countAllResetPasswords(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null


    selectAllResetPasswords(filter, (err, result) => {
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