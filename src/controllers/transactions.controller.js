const {insertTransaction, selectAllTransactions, selectTransaction, patchTransaction, deleteTransaction, countAllTransactions} = require('../models/Transactions.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllTransactions = (req, res) => {
  const sortable = ['bookingDate','email','fullname','movieId', 'cinemaId', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllTransactions, res, (filter, pageInfo) => {
    selectAllTransactions(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Transactions',
      pageInfo,
      casts: result.rows
    })
  })
})
}

exports.readTransaction = (req, res) => {
  selectTransaction(req.params, (error, data) => {
    if(error){
      return errorHandler(error, res)
    }

    if(data.rows.length === 0){
      return res.status(500).json({
        success: false,
        message: "Transaction not found"
      })
    }

    return res.status(200).json({
      success: true,
      transaction: data.rows
    })
  })
}

exports.createTransaction = (req, res) => {
  insertTransaction(req.body, (error, data) => {
    if(error){
      return errorHandler(error, res)
    }
    return res.status(200).json({
      success: true,
      message: "Transaction created successfully",
      transaction: data.rows[0]
    })
    })
}

exports.updateTransaction = (req,  res) => {
  patchTransaction(req.body, req.params, (error, data) => {
    if(error){
      return errorHandler(error, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Transaction doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Transaction Updated",
      Transaction : data.rows
    })
  })
}

exports.deleteTransaction = (req, res) => {
  deleteTransaction(req.params, (error, data) => {
    if(error){
      return errorHandler(error, res)
    }

    if(data.rows.length === 0){
      return res.status(500).json({
        success: false,
        message: "Transaction doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Transaction Deleted",
      transaction: data.rows
    })
  })
}
