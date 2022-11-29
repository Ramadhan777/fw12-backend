const { selectAllMovies, selectMovie, selectMovieByNow, selectMovieByMonth,insertMovie, patchUser, deleteMovie, countAllMovies } = require('../models/movies.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllMovies = (req, res) => {

  const sortable = ['title', 'releaseDate', 'director', 'duration', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllMovies, res, (filter, pageInfo) => {
    selectAllMovies(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Movies',
      pageInfo,
      casts: result.rows
    })
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

exports.readMovieByNow = (req, res) => {
  selectMovieByNow((err, data) => {
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
      movies: data.rows
    })
  })
}

exports.readMovieByMonth = (req, res) => {
  selectMovieByMonth(req.body.month, (err, data) => {
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
      movies: data.rows
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
