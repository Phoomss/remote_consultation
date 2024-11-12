const express = require('express')
const answerRouter = express.Router()
const answerController = require('../controllers/answerController')

answerRouter.post('/create', answerController.createAnswer)

answerRouter.get('/search', answerController.searchAnswer)
answerRouter.get('/', answerController.listAnswer)
answerRouter.get('/:id', answerController.answerById)

answerRouter.put('/:id', answerController.updateAnswer)

answerRouter.delete('/:id', answerController.deleteAnswer)

module.exports = answerRouter