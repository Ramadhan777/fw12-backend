const {insertUser, selectAllUsers, selectUser, patchUser, deleteUser, countAllUsers} = require('../models/users.model')
const errorHandler = require('../helpers/errorHandler')

exports.readAllUsers = (req, res) => {

  req.query.page = parseInt(req.query.page) || 1
  req.query.limit = parseInt(req.query.limit) || 5
  req.query.search = req.query.search || ''
  const sortable = ['firstName','lastName', 'email', 'createdAt', 'updatedAt']
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

  countAllUsers(filter, (err, data) => {
    if(err) {
      return errorHandler(err, res)
    }

    pageInfo.totalData = parseInt(data.rows[0].totalData)
    pageInfo.totalPage = Math.ceil(pageInfo.totalData / req.query.limit)
    pageInfo.nextPage = req.query.page < pageInfo.totalPage ? req.query.page + 1: null
    pageInfo.prevPage = req.query.page > 1 ? req.query.page - 1: null


    selectAllUsers(filter, (err, result) => {
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

exports.readUser = (req, res) => {
  selectUser(req.params, (error, data) => {
    console.log(data)
    if(error){
      return errorHandler(error, res)
    }

    if(data.rows.length === 0){
      return res.status(500).json({
        success: false,
        message: "User not found"
      })
    }

    return res.status(200).json({
      success: true,
      user: data.rows
    })
  })
}

exports.createUser = (req, res) => {
  insertUser(req.body, (error, data) => {
    if(error){
      return errorHandler(error, res)
    }
    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: data.rows[0]
    })
    })
}

exports.updateUser = (req,  res) => {
  patchUser(req.body, req.params, (error, data) => {
    if(error){
      return errorHandler(error, res)
    }

    if(data.rows.length === 0){
      return res.status(400).json({
        success: false,
        message: "User doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User Updated",
      user : data.rows
    })
  })
}

exports.deleteUser = (req, res) => {
  deleteUser(req.params, (error, data) => {
    if(error){
      return errorHandler(error, res)
    }

    if(data.rows.length === 0){
      return res.status(500).json({
        success: false,
        message: "User doesn't exist"
      })
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted",
      user: data.rows
    })
  })
}
