const {insertUser, selectAllUsers, selectUser, patchUser, deleteUser, countAllUsers} = require('../models/users.model')
const errorHandler = require('../helpers/errorHandler')
const filter = require('../helpers/filter.helper')

exports.readAllUsers = (req, res) => {
  const sortable = ['firstName','lastName', 'email', 'createdAt', 'updatedAt']

  filter(req.query, sortable, countAllUsers, res, (filter, pageInfo) => {
    selectAllUsers(filter, (err, result) => {
    if(err){
      return errorHandler(err, res)
    }

    return res.status(200).json({
      success: true,
      message: 'List of Users',
      pageInfo,
      casts: result.rows
    })
  })
})
}

exports.readUser = (req, res) => {
  selectUser(req.params.id, (error, data) => {
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
  patchUser(req.body, req.params.id, (error, data) => {
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
  deleteUser(req.params.id, (error, data) => {
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
