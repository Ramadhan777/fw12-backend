const errorHandler = require('../helpers/errorHandler')
const { selectAllCinemas, selectCinema, insertCinema, patchCinema, deleteCinema, countAllCinemas } = require('../models/cinemas.model')
const filter = require('../helpers/filter.helper')

exports.readAllCinemas = (req, res) => {
  const sortable = ['name', 'address', 'city','createdAt', 'updatedAt']

  filter(req.query, sortable, countAllCinemas, res, (filter, pageInfo) => {
    selectAllCinemas(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of cinemas',
      pageInfo,
      cinemas: result.rows
    })
  })
})
}

exports.readCinema = (req, res) => {
  selectCinema(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cinema not found"
      })
    }

    return res.status(200).json({
      success: true,
      cinema: data.rows
    })
  })
}

exports.createCinema = (req, res) => {
  insertCinema(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Cinema created successfully",
      cinema: data.rows[0]
    })
  })
}

exports.updateCinema = (req, res) => {
  patchCinema(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Cinema doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Cinema Updated",
      cinema: data.rows
    })
  })
}

exports.deleteCinema = (req, res) => {
  deleteCinema(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Cinema doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Cinema Deleted",
      cinema: data.rows
    })
  })
}
