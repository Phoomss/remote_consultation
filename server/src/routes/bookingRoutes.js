const express = require('express')
const Router = express.Router()
const bookingRouter = Router()
const bookingController = require('../controllers/bookingController')

bookingRouter.get('/',bookingController.listBooking)
bookingRouter.get('/:id',bookingController.bookingById)

bookingRouter.post('/',bookingController.createBooking)

bookingRouter.put('/:id',bookingController.bookingUpdate)

bookingRouter.delete('/:id',bookingController.bookingDelete)

module.exports = bookingRouter