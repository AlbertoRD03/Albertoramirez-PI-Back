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

module.exports = { createSession, getSessionsByUser };