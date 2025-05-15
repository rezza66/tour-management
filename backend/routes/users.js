import express from 'express'
import { deleteUser, getAllUser, getUserProfile, getUsersWithBookings, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../middleware/verifyToken.js';

const router = express.Router()



// update user
router.put('/users/:id', verifyAdmin, updateUser)
// getAll user
router.get('/users', verifyAdmin, getAllUser)

router.get('/profile', verifyUser, getUserProfile)
router.get('/bookings/users', verifyAdmin, getUsersWithBookings)

// delete user
router.delete('/users/:id', verifyUser,deleteUser)

export default router