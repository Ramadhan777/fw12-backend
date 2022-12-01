const profileRouter = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const uploadMiddleware = require('../middleware/upload.middleware')
const {readProfile} = require('../controllers/profile.controller')
const {updateUser} = require('../controllers/users.controller')

profileRouter.get('/', authMiddleware, readProfile)
profileRouter.patch('/', authMiddleware, uploadMiddleware, updateUser)

module.exports = profileRouter
