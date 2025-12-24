import express from 'express';
import { createOutlet, getAllOutlets, createUser } from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/rbacMiddleware.js';

const router = express.Router();

// All routes are protected and restricted to SUPER_ADMIN
router.use(protect);
router.use(authorize('SUPER_ADMIN'));

router.route('/outlets')
  .post(createOutlet)
  .get(getAllOutlets);

router.post('/users', createUser);

export default router;
