import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = Router();

router.put('/onboarding', verifyToken, userController.completeOnboarding);
// Todas las rutas de perfil requieren estar logueado
router.get('/profile', verifyToken, userController.getProfile);
router.put('/profile', verifyToken, userController.updateProfile);
router.delete('/profile', verifyToken, userController.deleteAccount);

export default router;