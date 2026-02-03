import Exercise from '../models/mysql/Exercise.js';

export const getAllExercises = async (req, res) => {
    try {
        const ejercicios = await Exercise.findAll();
        res.status(200).json(ejercicios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el catálogo de ejercicios' });
    }
};
