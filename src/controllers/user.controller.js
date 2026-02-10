import User from '../models/mysql/User.js';

export const completeOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fecha_nacimiento,
      genero,
      altura_cm,
      peso_kg,
      nivel_experiencia,
      objetivo_principal
    } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    await user.update({
      fecha_nacimiento,
      genero,
      altura_cm,
      peso_kg,
      nivel_experiencia,
      objetivo_principal,
      onboarding_completado: true
    });

    res.status(200).json({ message: 'Onboarding completado con éxito', user });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el perfil' });
  }
};
