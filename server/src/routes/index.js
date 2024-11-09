const Router = require('express')
const authRouter = require('./authRoutes')
const userRouter = require('./userRoutes')
const contentRouter = require('./contentRoutes')
const bookingRouter = require('./bookingRoutes')
const caseRouter = require('./caseRoutes')
const questionRouter = require('./questionRoutes')
const answerRouter = require('./answerRoutes')
const responseRouter = require('./resonseRoutes')

const rootRouter = Router()

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter)
rootRouter.use('/content', contentRouter)
rootRouter.use('/booking', bookingRouter)
rootRouter.use('/case', caseRouter)
rootRouter.use('/question', questionRouter)
rootRouter.use('/answer', answerRouter)
rootRouter.use('/response', responseRouter)

module.exports = rootRouter