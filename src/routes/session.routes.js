const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/session.controller');
const verifyToken = require('../middlewares/auth.middleware');

// Registrar una nueva sesión
router.post('/', verifyToken, sessionController.registrarSesion);

// Obtener todo el historial del usuario
router.get('/historial', verifyToken, sessionController.obtenerHistorial);

module.exports = router;