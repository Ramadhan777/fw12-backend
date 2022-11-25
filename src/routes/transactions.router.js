const transactionRouter = require('express').Router()
const { readAllTransactions, createTransaction, updateTransaction, deleteTransaction, readTransaction } = require('../controllers/transactions.controller')

transactionRouter.get('/', readAllTransactions)
transactionRouter.get('/:id', readTransaction)
transactionRouter.post('/', createTransaction)
transactionRouter.patch('/:id', updateTransaction)
transactionRouter.delete('/:id', deleteTransaction)

module.exports = transactionRouter
