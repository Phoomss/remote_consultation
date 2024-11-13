const express = require('express')
const responseRouter = express.Router()
const responseController = require('../controllers/responseController')

responseRouter.post('/create', responseController.createRespone)

responseRouter.get('/', responseController.listResponse)

responseRouter.get('/:id/user/:id', responseController.responseByUserId)

responseRouter.put('/:id', responseController.updateResponse)

responseRouter.delete('/:id', responseController.deleteResponse)

module.exports = responseRouter
