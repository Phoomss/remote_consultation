const express = require('express')
require('dotenv').config({ path: '../.env' })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8081

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})