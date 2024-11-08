const Router = require('express')
const authRouter = require('./authRoutes')
const userRouter = require('./userRoutes')
const contentRouter = require('./contentRoutes')
const bookingRouter = require('./bookingRoutes')
const caseRouter = require('./caseRoutes')

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)
rootRouter.use('/content', contentRouter)
rootRouter.use('/booking', bookingRouter)
rootRouter.use('/case', caseRouter)
module.exports = rootRouter