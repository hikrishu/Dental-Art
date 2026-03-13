import express from 'express';
import { 
  getContacts, 
  getContactById, 
  markAsRead 
} from '../controllers/adminContactController.js';
import { protectAdmin } from '../middleware/protectAdmin.js';

const router = express.Router();

// All routes protected by Admin Auth
router.use(protectAdmin);

router.get('/', getContacts);
router.get('/:id', getContactById);
router.patch('/:id/read', markAsRead);

export default router;
