const Router = require('express')
const authRouter = require('./authRoutes')
const userRouter = require('./userRoutes')
const contentRouter = require('./contentRoutes')

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user',userRouter)
rootRouter.use('/content',contentRouter)

module.exports = rootRouter