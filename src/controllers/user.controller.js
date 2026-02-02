const User = require('../models/mysql/User');

exports.completeOnboarding = async (req, res) => {
    try {
        const userId = req.user.id; // Obtenido gracias al middleware
        const { fecha_nacimiento, genero, altura_cm, peso_kg, nivel_experiencia, objetivo_principal } = req.body;

        // 1. Buscar al usuario y actualizar sus datos
        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        await user.update({
            fecha_nacimiento,
            genero,
            altura_cm,
            peso_kg,
            nivel_experiencia,
            objetivo_principal,
            onboarding_completado: true // <--- ¡Muy importante!
        });

        res.status(200).json({ message: 'Onboarding completado con éxito', user });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};