import express from 'express';
import { login, updatePassword } from '../controllers/adminAuthController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();

router.post('/login', login);
router.patch('/update-password', protectAdmin, updatePassword);

export default router;

