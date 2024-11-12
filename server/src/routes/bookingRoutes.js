const express = require('express');
const bookingRouter = express.Router();  
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

bookingRouter.get('/', [authMiddleware], bookingController.listBooking);
bookingRouter.get('/count', [authMiddleware], bookingController.countBookingType);
bookingRouter.get('/info', [authMiddleware], bookingController.bookingInfo);
bookingRouter.get('/:id', [authMiddleware], bookingController.bookingById);

bookingRouter.post('/create',[authMiddleware], bookingController.createBooking);

bookingRouter.put('/:id', [authMiddleware], bookingController.bookingUpdate);

bookingRouter.delete('/:id',[authMiddleware], bookingController.bookingDelete);

module.exports = bookingRouter;
