const profileRouter = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const uploadMiddleware = require('../middleware/upload.middleware')
const {readProfile, uploadImage} = require('../controllers/profile.controller')
const {updateUser} = require('../controllers/users.controller')

profileRouter.get('/', authMiddleware, readProfile)
profileRouter.patch('/', authMiddleware, uploadMiddleware, updateUser)
profileRouter.patch('/upload', authMiddleware, uploadMiddleware, uploadImage)

module.exports = profileRouter
