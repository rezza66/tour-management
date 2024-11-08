import express from 'express';
import { createBooking, getAllBooking, getBooking, getBookingAndRevenueTrends, getBookingsByUser } from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/booking', verifyUser, createBooking);
router.get('/booking/:id', verifyUser, getBooking);
router.get('/bookings/user/:id', verifyUser, getBookingsByUser);
router.get('/allbooking', verifyAdmin, getAllBooking);
router.get('/bookings/revenue', verifyAdmin, getBookingAndRevenueTrends);

export default router