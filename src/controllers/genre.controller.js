const errorHandler = require('../helpers/errorHandler')
const { selectAllGenres, selectGenre, insertGenre, patchGenre, deleteGenre, countAllGenres } = require('../models/genre.model')

exports.readAllGenres = (req,res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['name', 'createdAt', 'updatedAt']
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

  countAllGenres(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null

    selectAllGenres(filter, (err, result) => {
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
