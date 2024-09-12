import express from 'express'
import { deleteUser, getAllUser, getSingleUser, updateUser } from '../controllers/userController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router()



// update user
router.put('/users/:id', verifyUser, updateUser)
// getAll user
router.get('/users', verifyAdmin,getAllUser)
// get single user
router.get('/users/:id', verifyUser,getSingleUser)
// delete user
router.delete('/users/:id', verifyUser,deleteUser)

export default router