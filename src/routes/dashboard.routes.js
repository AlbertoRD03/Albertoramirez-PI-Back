import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/weekly-workload', verifyToken, dashboardController.getStats);

export default router;