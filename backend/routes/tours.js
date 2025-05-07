import express from 'express';
import { createTour, deleteTour, getAllTour, getSingleTour, getTourBySearch, getTourCount, getFeaturedTour, updateTour, getAllToursWithoutPagination, getRecentTours } from '../controllers/tourController.js';
import { upload } from '../config/multer.js';
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router()

// create new tour
router.post('/tours',verifyAdmin, upload, createTour)
// update tour
router.put('/tours/:id', verifyUser, updateTour)
// getAll tour
router.get('/tours', getAllTour)
router.get('/alltours', getAllToursWithoutPagination)
// get single tour
router.get('/tours/:id', getSingleTour)
// get tour by search
router.get('/tours/search/getTourBySearch', getTourBySearch)
router.get('/tours/search/getFeaturedTours', getFeaturedTour)
router.get('/tourCount', getTourCount)
router.get('/recent', getRecentTours)
// delete tour
router.delete('/tours/:id', verifyUser, deleteTour)

export default router;