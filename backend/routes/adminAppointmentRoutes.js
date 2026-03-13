import express from 'express';
import { 
  getAppointments, 
  getAppointmentById, 
  updateAppointmentStatus 
} from '../controllers/adminAppointmentController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();

// All routes protected by Admin Auth
router.use(protectAdmin);

router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.patch('/:id/status', updateAppointmentStatus);

export default router;
