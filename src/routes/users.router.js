const userRouter = require('express').Router()
const { readAllUsers, createUser, updateUser, deleteUser, readUser } = require('../controllers/users.controller')
const authMiddleware = require('../middleware/auth.middleware')
const uploadMiddleware = require('../middleware/upload.middleware')

userRouter.get('/', readAllUsers)
userRouter.get('/:id', authMiddleware, readUser)
userRouter.post('/', createUser)
userRouter.patch('/', authMiddleware, uploadMiddleware, updateUser)
userRouter.delete('/:id', authMiddleware, deleteUser)

module.exports = userRouter
