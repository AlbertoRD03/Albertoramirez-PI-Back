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