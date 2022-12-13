const { selectUser } = require('../models/users.model')

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