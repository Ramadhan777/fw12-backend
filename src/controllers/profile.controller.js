const { selectUser, uploadImage } = require('../models/users.model')
const errorHandler = require('../helpers/errorHandler')
const cloudinary = require('cloudinary').v2

exports.readProfile = (req, res) => {
  selectUser(req.userData.id, (error, data) => {
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
      results: data.rows[0]
    })
  })
}

exports.uploadImage = (req, res) => {
  if(req.file){
    req.body.picture = req.file.path
    selectUser(req.userData.id, async (err, data) => {
      if(err){
        return errorHandler(err, res)
      }
      if(data.rows.length){
        const [user] = data.rows;
        if(user.picture){
         await cloudinary.uploader.destroy(user.picture.slice(57,88))
        }
      }
    })
  }

  console.log(reg.body.picture)

  uploadImage(req.body, req.userData.id, (error, data) => {
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
      message: "Profile Updated",
      user : data.rows
    })
  })
}