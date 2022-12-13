const { selectAllSubscribers, selectSubscriber, insertSubscriber, patchSubscriber, deleteSubscriber, countAllSubscribers } = require('../models/subscribers.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllSubscribers = (req, res) => {
  const sortable = ['email', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllSubscribers, res, (filter, pageInfo) => {
    selectAllSubscribers(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Subscribers',
      pageInfo,
      results: result.rows
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
      results: data.rows[0]
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
      results: data.rows[0]
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
      results: data.rows
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
      results: data.rows
    })
  })
}
