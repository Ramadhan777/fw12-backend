const paymentMethodRouter = require('express').Router()
const { readAllPaymentMethods, createPaymentMethod, updatePaymentMethod, deletePaymentMethod, readPaymentMethod } = require('../controllers/paymentMethod.controller')

paymentMethodRouter.get('/', readAllPaymentMethods)
paymentMethodRouter.get('/:id', readPaymentMethod)
paymentMethodRouter.post('/', createPaymentMethod)
paymentMethodRouter.patch('/:id', updatePaymentMethod)
paymentMethodRouter.delete('/:id', deletePaymentMethod)

module.exports = paymentMethodRouter
