exports.readAllUsers = (req, res) => {
  return res.status(200).json(
    {
      success: true,
      message: 'list data of users on /users'
    }
  )
}

exports.createUser = (req,res) => {
  return res.status(200).json({
    success: true,
    message: 'User created succesfully'
  })
}

exports.updateUser = (req,res) => {
  return res.status(200).json({
    success: true,
    message: 'User update succesfully'
  })
}

exports.deleteUser = (req,res) => {
  return res.status(200).json({
    success: true,
    message: 'Delete user succesfully'
  })
}

