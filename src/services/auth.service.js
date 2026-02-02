const User = require('../models/mysql/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
    // 1. Encriptar la contraseña (hasheo)
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // 2. Crear el usuario en MySQL
    return await User.create({
        ...userData,
        password: hashedPassword
    });
};

const login = async (email, password) => {
    // 1. Buscar si el usuario existe
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');

    // 2. Comparar la contraseña enviada con la encriptada en la DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Contraseña incorrecta');

    // 3. Generar el Token JWT
    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
    );

    return { user, token };
};

module.exports = { register, login };