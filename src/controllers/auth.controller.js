const { selectUserByEmail, insertUser } = require('../models/users.model')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  selectUserByEmail(req.body, (error, {rows}) => {
    if(rows.length){
      const [user] = rows;
      if(req.body.password === user.password){
        const token = jwt.sign({id: user.id}, 'backend-secret')
        return res.status(200).json({
          success: true, 
          message: 'login success',
          results: {
            token
          }
        })
      }

      else{
        return res.status(401).json({
        success: false, 
        message: 'Wrong Email or Password'
      })
      }
    }
    else{
      return res.status(401).json({
      success: false, 
      message: 'Wrong Email or Password'
    })
    }
  })
}

exports.register = (req, res) => {
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