const Session = require('../models/mongodb/Session');

const createSession = async (sessionData) => {
    //instancia del modelo Session con los datos recibidos
    const nuevaSesion = new Session(sessionData);
    return await nuevaSesion.save();
};

const getSessionsByUser = async (userId) => {
    // Buscamos todas las sesiones del usuario, ordenadas por la más reciente
    return await Session.find({ usuario_id: userId }).sort({ fecha: -1 });
};

const deleteSession = async (sessionId, userId) => {
    // Solo borramos si la sesión pertenece al usuario (seguridad)
    return await Session.findOneAndDelete({ _id: sessionId, usuario_id: userId });
};

const getExerciseHistory = async (userId, exerciseId) => {
    // Buscamos todas las sesiones del usuario que contengan ese ejercicio_id
    return await Session.find({
        usuario_id: userId,
        "ejercicios_realizados.ejercicio_id": exerciseId
    })
    .select('fecha ejercicios_realizados.$') // Solo traemos la fecha y el ejercicio específico
    .sort({ fecha: -1 });
};


module.exports = { createSession, getSessionsByUser, deleteSession, getExerciseHistory };