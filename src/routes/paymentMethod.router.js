const paymentMethodRouter = require('express').Router()
const { readAllPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod, readPaymentMethod } = require('../controllers/paymentMethod.controller')
const uploadMiddleware = require('../middleware/upload.middleware')

paymentMethodRouter.get('/', readAllPaymentMethods)
paymentMethodRouter.get('/:id', readPaymentMethod)
paymentMethodRouter.post('/', uploadMiddleware, createPaymentMethod)
paymentMethodRouter.patch('/:id', uploadMiddleware, updatePaymentMethod)
paymentMethodRouter.delete('/:id', deletePaymentMethod)

module.exports = paymentMethodRouter
