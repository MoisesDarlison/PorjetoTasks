const express = require('express')
const routes = express()
const userController = require('../controllers/usersControllers')
const taskController = require('../controllers/taskControllers')
const loginMiddleware = require('../middleware/loginMiddleware')


//rota de login Authorization ,loginMiddleware.verifyJWT
routes.post('/login',loginMiddleware.create)

routes.get('/users',userController.index)
routes.post('/users', userController.create)
routes.get('/users/:id', userController.filter)
routes.delete('/users/:id', userController.destroy)
routes.put('/users/:id', userController.update)

routes.get('/task',loginMiddleware.verifyJWT, taskController.index)
routes.post('/task',loginMiddleware.verifyJWT, taskController.create)
routes.get('/task/:id',loginMiddleware.verifyJWT, taskController.filter)
routes.delete('/task/:id',loginMiddleware.verifyJWT, taskController.destroy)
routes.put('/task/:id',loginMiddleware.verifyJWT, taskController.upgrade)

module.exports = routes
