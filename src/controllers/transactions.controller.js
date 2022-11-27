const {insertTransaction, selectAllTransactions, selectTransaction, patchTransaction, deleteTransaction, countAllTransactions} = require('../models/Transactions.model')
const errorHandler = require('../helpers/errorHandler')

exports.readAllTransactions = (req, res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['bookingDate','email','fullname','movieId', 'cinemaId', 'createdAt', 'updatedAt']
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

  countAllTransactions(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null


    selectAllTransactions(filter, (err, result) => {
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
