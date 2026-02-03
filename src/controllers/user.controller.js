import * as userService from '../services/user.service.js';

export const completeOnboarding = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fecha_nacimiento, genero, altura_cm, peso_kg, nivel_experiencia, objetivo_principal } = req.body;

        const user = await userService.updateUser(userId, {
            fecha_nacimiento,
            genero,
            altura_cm,
            peso_kg,
            nivel_experiencia,
            objetivo_principal,
            onboarding_completado: true // <--- Esto es lo que "cura" la cuenta
        });

        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        res.status(200).json({ 
            message: "Onboarding completado. ¡Bienvenido a FitTrack! 🏋️‍♂️", 
            user 
        });
    } catch (error) {
        res.status(500).json({ error: "Error al procesar el onboarding" });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await userService.getUserById(req.user.id);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el perfil" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.user.id, req.body);
        if (!updatedUser) return res.status(404).json({ error: "Usuario no encontrado" });
        res.status(200).json({ message: "Perfil actualizado correctamente", user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el perfil" });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const result = await userService.deleteFullUser(req.user.id);
        res.status(200).json({ 
            message: "Cuenta y datos eliminados permanentemente",
            details: `MySQL: ${result.mysql} registro, MongoDB: ${result.mongodb} sesiones.`
        });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la cuenta" });
    }
};