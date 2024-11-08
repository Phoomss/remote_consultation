const Router = require('express')
const authRouter = require('./authRoutes')
const userRouter = require('./userRoutes')
const contentRouter = require('./contentRoutes')
const bookingRouter = require('./bookingRoutes')

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user',userRouter)
rootRouter.use('/content',contentRouter)
rootRouter.use('/booking',bookingRouter)
module.exports = rootRouter