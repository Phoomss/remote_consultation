const Router = require('express')
const authRouter = require('./authRoutes')

const rootRouter = Router()

rootRouter.use('/auth', authRouter)

module.exports = rootRouter