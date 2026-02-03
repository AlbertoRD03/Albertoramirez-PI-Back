import Session from '../models/mongodb/Session.js';

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

const updateSession = async (sessionId, userId, updateData) => {
    // Buscamos por ID de sesión Y por ID de usuario para asegurar que nadie edite sesiones ajenas
    return await Session.findOneAndUpdate(
        { _id: sessionId, usuario_id: userId },
        { $set: updateData }, //$set para actualizar solo los campos proporcionados
        { new: true } // Esto devuelve el documento ya actualizado
    );
}

export {
    createSession,
    getSessionsByUser,
    deleteSession,
    getExerciseHistory,
    updateSession
};
