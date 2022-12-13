const { selectUserByEmail, insertUser, patchUser } = require('../models/users.model')
const { insertResetPassword, selectResetPasswordByEmailAndCode, deleteResetPassword
 } = require('../models/resetPassword.model')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../helpers/errorHandler')

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
    const {rows: users} = data;
    const [user] = users
    const token = jwt.sign({id: user.id}, 'backend-secret')

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      results: {
        token
      }
    })
    })
}

exports.forgotPassword = (req, res) => {
  const { email } = req.body

  selectUserByEmail(req.body, (err, {rows: users}) => {
    if(err){
      return errorHandler(err, res)
    }
    if(users.length){
      const [user] = users
      const data = {
        email,
        userId: user.id,
        code: Math.ceil(Math.random() * 90000 + 10000)
      };

      insertResetPassword(data, (err, {rows: results}) => {
        if(results.length){
          return res.status(200).json({
            success: true,
            message: "Reset password has been requested",
            results: results[0]
          })
        }
      })
    } else{
      return res.status(400).json({
        success: false,
        message: "Request Failed, User not found"
      })
    }

  })
}

exports.resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body

  if(password === confirmPassword){
    selectResetPasswordByEmailAndCode(req.body, (err, {rows : users}) => {
      if(err){
        return errorHandler(err, res)
      }

      if(users.length){
        const [request] = users
        const data = {
          password
        }

        if((new Date().getTime() - new Date(request.createdAt).getTime() ) > 1000 * 60 * 15){
          return res.status(400).json({
            success: false,
            message: "Code expired"
          })
        }

        patchUser(data, request.userId, (err, {rows: users}) => {
          if(err){
            return errorHandler(err, res)
          }

          if(users.length){
            deleteResetPassword(request.id, (err, {rows})=> {
              if(rows.length){
                return res.status(200).json({
                  success: true,
                  message: "Password updated, please relogin"
                })
              }
            })
          }
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Reset password failed, request Invalid'
        })
      }
    })
  } else{
    return res.status(400).json({
      success: false,
      message: "Password and confirm password not match"
    })
  }
}