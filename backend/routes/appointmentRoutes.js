import express from 'express';
import { createAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

// POST /api/appointments — Submit a new appointment request
router.post('/', createAppointment);

export default router;
