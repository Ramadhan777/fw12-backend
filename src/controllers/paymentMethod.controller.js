const errorHandler = require('../helpers/errorHandler')
const { selectAllPaymentMethods, selectPaymentMethod, insertPaymentMethod, patchPaymentMethod, deletePaymentMethod, countAllPaymentMethods } = require('../models/paymentMethod.model')

exports.readAllPaymentMethods = (req, res) => {

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

  countAllPaymentMethods(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null


    selectAllPaymentMethods(filter, (err, result) => {
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

exports.readPaymentMethod = (req, res) => {
  selectPaymentMethod(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Reserved Seat not found"
      })
    }

    return res.status(200).json({
      success: true,
      PaymentMethod: data.rows
    })
  })
}

exports.createPaymentMethod = (req, res) => {
  insertPaymentMethod(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Reserved Seat created successfully",
      PaymentMethod: data.rows[0]
    })
  })
}

exports.updatePaymentMethod = (req, res) => {
  patchPaymentMethod(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Reserved Seat doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "PaymentMethod Updated",
      PaymentMethod: data.rows
    })
  })
}

exports.deletePaymentMethod = (req, res) => {
  deletePaymentMethod(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Reserved Seat doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Reserved Seat Deleted",
      PaymentMethod: data.rows
    })
  })
}
