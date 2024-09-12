import express from 'express';
import { createTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getTourCount, getFeaturedTour, updateTour } from '../controllers/tourController.js';
import { upload } from '../config/multer.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

// create new tour
router.post('/tours',verifyAdmin, upload, createTour)
// update tour
router.put('/tours/:id', verifyAdmin, updateTour)
// getAll tour
router.get('/tours', getAllTour)
// get single tour
router.get('/tours/:id', getSingleTour)
// get tour by search
router.get('/tours/search/getTourBySearch', getTourBySearch)
router.get('/tours/search/getFeaturedTours', getFeaturedTour)
router.get('/tours/search/getTourCount', getTourCount)
// delete tour
router.delete('/tours/:id', verifyAdmin, deleteTour)

export default router;