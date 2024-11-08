import express from 'express'
import { deleteUser, getAllUser, getSingleUser, getUsersWithBookings, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router()



// update user
router.put('/users/:id', verifyUser, updateUser)
// getAll user
router.get('/users', verifyUser, getAllUser)
// get single user
router.get('/users/:id', verifyUser,getSingleUser)
router.get('/bookings/users',getUsersWithBookings)

// delete user
router.delete('/users/:id', verifyUser,deleteUser)

export default router