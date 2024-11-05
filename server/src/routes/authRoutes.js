const authController = require('../controllers/authController')
const Router = require('express')
const authRouter = Router()

authRouter.post('/signup', authController.singup)
authRouter.post('/login', authController.login)

module.exports = authRouter