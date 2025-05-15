import express from 'express';
import { createBooking, getAllBooking, getBooking, getBookingAndRevenueTrends, getBookingsByUser } from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/booking', verifyUser, createBooking);
router.get('/booking/:id', verifyUser, getBooking);
router.get('/allbooking', verifyAdmin, getAllBooking);
router.get('/bookings/revenue', verifyAdmin, getBookingAndRevenueTrends);

router.get('/my-bookings', verifyUser, getBookingsByUser);

export default router