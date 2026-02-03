import express from 'express';
import {
    registrarSesion,
    obtenerHistorial,
    eliminarSesion,
    obtenerProgresoEjercicio,
    actualizarSesion
} from '../controllers/session.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

const router = express.Router();

// Registrar una nueva sesión
router.post('/', verifyToken, registrarSesion);

// Obtener todo el historial del usuario
router.get('/historial', verifyToken, obtenerHistorial);

// Eliminar una sesión específica
router.delete('/:id', verifyToken, eliminarSesion);

// Obtener el historial de un ejercicio concreto (para gráficas o consulta)
router.get('/ejercicio/:exerciseId', verifyToken, obtenerProgresoEjercicio);

// Añade esta ruta (usa el método PUT)
router.put('/:id', verifyToken, actualizarSesion);
export default router;
