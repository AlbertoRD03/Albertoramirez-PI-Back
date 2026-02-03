import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/stats', verifyToken, dashboardController.getFullDashboard);

export default router;