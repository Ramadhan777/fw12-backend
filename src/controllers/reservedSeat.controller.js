const errorHandler = require('../helpers/errorHandler')
const { selectAllReservedSeats, selectReservedSeat, insertReservedSeat, patchReservedSeat, deleteReservedSeat } = require('../models/reservedSeat.model')

exports.readAllReservedSeats = (req, res) => {
  selectAllReservedSeats((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      reservedSeats: data.rows
    })
  })
}

exports.readReservedSeat = (req, res) => {
  selectReservedSeat(req.params, (err, data) => {
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
      reservedSeat: data.rows
    })
  })
}

exports.createReservedSeat = (req, res) => {
  insertReservedSeat(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Reserved Seat created successfully",
      reservedSeat: data.rows[0]
    })
  })
}

exports.updateReservedSeat = (req, res) => {
  patchReservedSeat(req.body, req.params, (err, data) => {
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
      message: "ReservedSeat Updated",
      reservedSeat: data.rows
    })
  })
}

exports.deleteReservedSeat = (req, res) => {
  deleteReservedSeat(req.params, (err, data) => {
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
      reservedSeat: data.rows
    })
  })
}
