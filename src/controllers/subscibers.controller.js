const errorHandler = require('../helpers/errorHandler')
const { selectAllSubscribers, selectSubscriber, insertSubscriber, patchSubscriber, deleteSubscriber } = require('../models/Subscribers.model')

exports.readAllSubscribers = (req, res) => {
  selectAllSubscribers((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      subscribers: data.rows
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
