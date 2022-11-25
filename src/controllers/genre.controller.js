const errorHandler = require('../helpers/errorHandler')
const { selectAllGenres, selectGenre, insertGenre, patchGenre, deleteGenre } = require('../models/genre.model')

exports.readAllGenres = (req,res) => {
  selectAllGenres((err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      genres: data.rows
    })
  })
}

exports.readGenre = (req, res) => {
  selectGenre(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Genre not found"
      })
    }

    return res.status(200).json({
      success: true,
      genre: data.rows
    })
  })
}

exports.createGenre = (req, res) => {
  insertGenre(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Genre created successfully",
      genre: data.rows[0]
    })
  })
}

exports.updateGenre = (req, res) => {
  patchGenre(req.body, req.params, (err, data) => {
    if(err){
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Genre doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Genre Updated",
      genre: data.rows
    })
  })
}

exports.deleteGenre = (req, res) => {
  deleteGenre(req.params, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "Genre doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Genre Deleted",
      genre: data.rows
    })
  })
}
