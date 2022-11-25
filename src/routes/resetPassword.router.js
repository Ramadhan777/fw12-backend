const resetPasswordRouter = require('express').Router()
const { readAllResetPasswords, readResetPassword, createResetPassword, updateResetPassword, deleteResetPassword} = require("../controllers/resetPassword.controller.js")

resetPasswordRouter.get('/', readAllResetPasswords)
resetPasswordRouter.get('/:id', readResetPassword)
resetPasswordRouter.post('/', createResetPassword)
resetPasswordRouter.patch('/:id', updateResetPassword)
resetPasswordRouter.delete('/:id', deleteResetPassword)

module.exports = resetPasswordRouter
