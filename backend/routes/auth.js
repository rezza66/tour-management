import express from 'express';
import { login, register } from '../controllers/authController.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.post('/auth/register', upload, register);
router.post('/auth/login', login);

export default router;