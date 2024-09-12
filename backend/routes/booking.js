import express from 'express';
import { createBooking, getAllBooking, getBooking } from '../controllers/bookingController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/booking', verifyUser, createBooking);
router.get('/booking/:id', verifyUser, getBooking);
router.get('/allbooking', verifyAdmin, getAllBooking);

export default router