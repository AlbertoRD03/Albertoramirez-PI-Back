import express from 'express';
import { completeOnboarding } from '../controllers/user.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

router.put('/onboarding', verifyToken, completeOnboarding);

export default router;
