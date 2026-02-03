const sessionService = require('../services/session.service');

exports.registrarSesion = async (req, res) => {
    try {
        // El id viene del token verificado en el middleware
        const usuario_id = req.user.id;
        
        // Extraemos los datos del entrenamiento
        const { tipo_rutina, ejercicios_realizados, notas, duracion_minutos } = req.body;

        const sesionGuardada = await sessionService.createSession({
            usuario_id,
            tipo_rutina,
            ejercicios_realizados,
            notas,
            duracion_minutos
        });

        res.status(201).json({
            message: "¡Entrenamiento guardado con éxito!",
            sesion: sesionGuardada
        });
    } catch (error) {
        res.status(500).json({ error: "Error al registrar la sesión de entrenamiento" });
    }
};

exports.obtenerHistorial = async (req, res) => {
    try {
        const historial = await sessionService.getSessionsByUser(req.user.id);
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el historial" });
    }
};

exports.eliminarSesion = async (req, res) => {
    try {
        const resultado = await sessionService.deleteSession(req.params.id, req.user.id);
        if (!resultado) return res.status(404).json({ error: "Sesión no encontrada" });
        
        res.status(200).json({ message: "Sesión eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la sesión" });
    }
};

exports.obtenerProgresoEjercicio = async (req, res) => {
    try {
        const { exerciseId } = req.params;
        const progreso = await sessionService.getExerciseHistory(req.user.id, parseInt(exerciseId));
        res.status(200).json(progreso);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el progreso del ejercicio" });
    }
};