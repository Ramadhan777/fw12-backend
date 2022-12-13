const errorHandler = require('../helpers/errorHandler')
const { selectAllMovieGenres, selectMovieGenre, insertMovieGenre, patchMovieGenre, deleteMovieGenre } = require('../models/movieGenre.model')

exports.readAllMovieGenres = (req,res) => {
  selectAllMovieGenres((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      results: data.rows
    })
  })
}

exports.readMovieGenre = (req, res) => {
  selectMovieGenre(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie Genre not found"
      })
    }

    return res.status(200).json({
      success: true,
      results: data.rows[0]
    })
  })
}

exports.createMovieGenre = (req, res) => {
  insertMovieGenre(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Movie Genre created successfully",
      results: data.rows[0]
    })
  })
}

exports.updateMovieGenre = (req, res) => {
  patchMovieGenre(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie Genre doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Genre Updated",
      results: data.rows
    })
  })
}

exports.deleteMovieGenre = (req, res) => {
  deleteMovieGenre(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie Genre doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Genre Deleted",
      results: data.rows
    })
  })
}