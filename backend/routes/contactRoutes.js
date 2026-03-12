import express from 'express';
import { submitContactMessage } from '../controllers/contactController.js';

const router = express.Router();

// Define POST route: /api/contact
router.post('/', submitContactMessage);

export default router;
