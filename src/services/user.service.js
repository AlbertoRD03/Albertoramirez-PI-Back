import User from '../models/mysql/User.js';
import Session from '../models/mongodb/Session.js';

// Obtener datos del perfil
export const getUserById = async (id) => {
    return await User.findByPk(id, {
        attributes: { exclude: ['password'] } // Nunca devolvemos la contraseña
    });
};

// Actualizar datos físicos
export const updateUser = async (id, updateData) => {
    const user = await User.findByPk(id);
    if (!user) return null;
    return await user.update(updateData);
};

// Borrado Híbrido Total
export const deleteFullUser = async (id) => {
    // 1. Borrar de MySQL
    const deletedInMySQL = await User.destroy({ where: { id } });
    
    // 2. Borrar todas sus sesiones en MongoDB
    const deletedInMongo = await Session.deleteMany({ usuario_id: id });
    
    return {
        mysql: deletedInMySQL,
        mongodb: deletedInMongo.deletedCount
    };
};