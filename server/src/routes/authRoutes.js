const authController = require('../controllers/authController')
const Router = require('express')
const authRouter = Router()

authRouter.post('/signup', authController.signup)
authRouter.post('/login', authController.login)

module.exports = authRouter