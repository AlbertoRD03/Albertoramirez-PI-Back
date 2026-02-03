import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    // 1. Obtener el token de la cabecera (Header)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
    }

    try {
        // 2. Verificar el token usando la clave secreta
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Guardamos los datos del usuario (id, email) en la petición
        next(); // Continuamos al siguiente paso (controlador)
    } catch (error) {
        res.status(403).json({ error: 'Token no válido o expirado.' });
    }
};

export default verifyToken;
