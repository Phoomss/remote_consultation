const express = require('express')
const questionRouter = express.Router()
const questionController = require('../controllers/questionController')

questionRouter.post('/create', questionController.createQuestion)

questionRouter.get('/', questionController.listQuestion)
questionRouter.get('/:id', questionController.questionById)

questionRouter.put('/:id', questionController.updateQuestion)

questionRouter.delete('/:id', questionController.deleteQuestion)

module.exports = questionRouter
