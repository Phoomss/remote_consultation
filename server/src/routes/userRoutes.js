const userController = require('../controllers/userController')
const Router = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const userRouter = Router()

userRouter.get('/userInfo', [authMiddleware], userController.userInfo)

module.exports = userRouter