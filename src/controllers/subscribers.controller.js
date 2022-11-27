const errorHandler = require('../helpers/errorHandler')
const { selectAllSubscribers, selectSubscriber, insertSubscriber, patchSubscriber, deleteSubscriber, countAllSubscribers } = require('../models/Subscribers.model')

exports.readAllSubscribers = (req, res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['email', 'createdAt', 'updatedAt']
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

  countAllSubscribers(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null


    selectAllSubscribers(filter, (err, result) => {
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

exports.readSubscriber = (req, res) => {
  selectSubscriber(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Subscriber not found"
      })
    }

    return res.status(200).json({
      success: true,
      subscriber: data.rows
    })
  })
}

exports.createSubscriber = (req, res) => {
  insertSubscriber(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Subscriber created successfully",
      subscriber: data.rows[0]
    })
  })
}

exports.updateSubscriber = (req, res) => {
  patchSubscriber(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Subscriber doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Subscriber Updated",
      subscriber: data.rows
    })
  })
}

exports.deleteSubscriber = (req, res) => {
  deleteSubscriber(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Subscriber doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Subscriber Deleted",
      subscriber: data.rows
    })
  })
}
