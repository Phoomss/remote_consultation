const express = require('express')
const { PORT } = require('./../constants')
const rootRouter = require('./routes')
const cors = require('cors')
const { initializeAdminUser } = require('./controllers/authController')
const bodyParser = require('body-parser')



const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next();
});

app.use('/api', rootRouter)

initializeAdminUser()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})