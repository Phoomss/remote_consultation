const Router = require('express')
const caseRouter = Router()
const caseController = require('../controllers/caseController')

caseRouter.post('/create', caseController.createCase)

caseRouter.get('/', caseController.caseList)
caseRouter.get('/:id', caseController.caseById)

caseRouter.put('/:id', caseController.updateCase)

caseRouter.delete('/:id', caseController.deleteCase)

module.exports = caseRouter