import User from '../models/mysql/User.js';

const checkOnboarding = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        
        if (!user || !user.onboarding_completado) {
            return res.status(403).json({ 
                error: "Acceso denegado. Debes completar el onboarding antes de registrar entrenamientos." 
            });
        }
        
        next(); // Si está completado, adelante
    } catch (error) {
        res.status(500).json({ error: "Error en la validación de seguridad" });
    }
};

export default checkOnboarding;