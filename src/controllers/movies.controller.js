const { selectAllMovies, selectMovie, insertMovie, patchUser, deleteMovie } = require('../models/movies.model')
const errorHandler = require('../helpers/errorHandler')

exports.readAllMovies = (req, res) => {
  selectAllMovies((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      movies: data.rows
    })
  })
}

exports.readMovie = (req, res) => {
  selectMovie(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Movie not found"
      })
    }

    return res.status(200).json({
      success: true,
      movie: data.rows
    })
  })
}

exports.createMovie = (req, res) => {
  insertMovie(req.body, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Movie Created",
      movie: data.rows[0]
    })
  })
}

exports.updateMovie = (req, res) => {
  patchUser(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Updated",
      movie: data.rows
    })
  })
}

exports.deleteMovie = (req, res) => {
  deleteMovie(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Movie doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Movie Deleted",
      movie: data.rows
    })
  })
}
