const express = require('express')
const { PORT } = require('./../constants')
const rootRouter = require('./routes')
const cors = require('cors')
const { initializeAdminUser } = require('./controllers/authController')



const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', rootRouter)

initializeAdminUser()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})