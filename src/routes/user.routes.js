const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Ruta protegida: solo accesible si envías un token válido
router.put('/onboarding', verifyToken, userController.completeOnboarding);

module.exports = router;