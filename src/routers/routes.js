const express = require('express')
const routes = express()
const userController = require('../controllers/usersControllers')
const taskController = require('../controllers/taskControllers')
const authenticatorControllers = require('../controllers/authenticatorControllers')
const authenticator = require('../middleware/authenticator')

routes.post('/login',authenticatorControllers.create)

routes.get('/users',userController.index)
routes.post('/users', userController.create)
routes.get('/users/:id', userController.filter)
routes.delete('/users/:id', userController.destroy)
routes.put('/users/:id', userController.update)

routes.get('/task',authenticator.verifyJWT, taskController.index)
routes.post('/task',authenticator.verifyJWT, taskController.create)
routes.get('/task/:id',authenticator.verifyJWT, taskController.filter)
routes.delete('/task/:id',authenticator.verifyJWT, taskController.destroy)
routes.put('/task/:id',authenticator.verifyJWT, taskController.update)

module.exports = routes
