const errorHandler = require('../helpers/errorHandler')
const { selectAllCinemas, selectCinema, insertCinema, patchCinema, deleteCinema, countAllCinemas } = require('../models/cinemas.model')
const filter = require('../helpers/filter.helper')
const cloudinary = require('cloudinary').v2

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
      results: result.rows
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
      results: data.rows[0]
    })
  })
}

exports.createCinema = (req, res) => {
  if(req.file){
    req.body.picture = req.file.path
  }

  insertCinema(req.body, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: "Cinema created successfully",
      results: data.rows[0]
    })
  })
}

exports.updateCinema = (req, res) => {
  if(req.file){
    req.body.picture = req.file.path

    selectCinema(req.params, async (err, data) => {
      if(err) {
        return errorHandler(err, res)
      }

      if(data.rows.length){
        const [cinema] = data.rows;
        if(cinema.picture){
          console.log(`file lama ${cinema.picture}`)
          console.log(`file lama cut ${cinema.picture.slice(57,88)}`)
          await cloudinary.uploader.destroy(cinema.picture.slice(57,88))
        }
      }
    })
  }
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
      results: data.rows
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
      results: data.rows
    })
  })
}
