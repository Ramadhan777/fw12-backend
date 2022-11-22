const userRouter = require('express').Router()
const { readAllUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller')

userRouter.get('/', readAllUsers)
userRouter.post('/', createUser)
userRouter.patch('/', updateUser)
userRouter.delete('/', deleteUser)


module.exports = userRouter
