const subscribersRouter = require('express').Router()
const { readAllSubscribers, readSubscriber, createSubscriber, updateSubscriber, deleteSubscriber} = require("../controllers/subscribers.controller")

subscribersRouter.get('/', readAllSubscribers)
subscribersRouter.get('/:id', readSubscriber)
subscribersRouter.post('/', createSubscriber)
subscribersRouter.patch('/:id', updateSubscriber)
subscribersRouter.delete('/:id', deleteSubscriber)

module.exports = subscribersRouter
