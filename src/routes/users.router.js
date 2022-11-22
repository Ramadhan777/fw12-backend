const userRouter = require('express').Router()
const { readAllUsers, createUser, updateUser, deleteUser, readUser } = require('../controllers/users.controller')

userRouter.get('/', readAllUsers)
userRouter.get('/:id', readUser)
userRouter.post('/', createUser)
userRouter.patch('/', updateUser)
userRouter.delete('/', deleteUser)


module.exports = userRouter
