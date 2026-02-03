import express from 'express';
import {
    registrarSesion,
    obtenerHistorial,
    eliminarSesion,
    obtenerProgresoEjercicio,
    actualizarSesion
} from '../controllers/session.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';
import checkOnboarding from '../middlewares/onboarding.middleware.js';

const router = express.Router();

// Registrar una nueva sesión
router.post('/', verifyToken, checkOnboarding, registrarSesion);

// Obtener todo el historial del usuario
router.get('/historial', verifyToken, checkOnboarding ,obtenerHistorial);

// Eliminar una sesión específica
router.delete('/:id', verifyToken, checkOnboarding, eliminarSesion);

// Obtener el historial de un ejercicio concreto (para gráficas o consulta)
router.get('/ejercicio/:exerciseId', verifyToken, checkOnboarding, obtenerProgresoEjercicio);

// Añade esta ruta (usa el método PUT)
router.put('/:id', verifyToken, checkOnboarding, actualizarSesion);
export default router;
