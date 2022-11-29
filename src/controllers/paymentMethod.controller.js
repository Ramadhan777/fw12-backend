const { selectAllPaymentMethods, selectPaymentMethod, insertPaymentMethod, patchPaymentMethod, deletePaymentMethod, countAllPaymentMethods } = require('../models/paymentMethod.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllPaymentMethods = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllPaymentMethods, res, (filter, pageInfo) => {
    selectAllPaymentMethods(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Payment Methods',
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
