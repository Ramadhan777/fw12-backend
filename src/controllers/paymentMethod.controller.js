const { selectAllPaymentMethods, selectPaymentMethod, insertPaymentMethod, patchPaymentMethod, deletePaymentMethod, countAllPaymentMethods } = require('../models/paymentMethod.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')
const cloudinary = require('cloudinary').v2

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
      results: result.rows
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
      results: data.rows[0]
    })
  })
}

exports.createPaymentMethod = (req, res) => {
  if(req.file){
    req.body.picture = req.file.path
  }

  insertPaymentMethod(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Reserved Seat created successfully",
      results: data.rows[0]
    })
  })
}

exports.updatePaymentMethod = (req, res) => {
  if(req.file){
    req.body.picture = req.file.path
    selectPaymentMethod(req.params, async (err, data) => {
      if(err){
        return errorHandler(err, res)
      }
      if(data.rows.length){
        const [paymentMethod] = data.rows;
        if(paymentMethod.picture){
          console.log('file lama '+paymentMethod.picture)
          console.log('file lama cut '+paymentMethod.picture.slice(57,88))
          await cloudinary.uploader.destroy(paymentMethod.picture.slice(57,88))
        }
      }
    })
  }
  patchPaymentMethod(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "paymentMethod doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "PaymentMethod Updated",
      results: data.rows
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
      results: data.rows
    })
  })
}
