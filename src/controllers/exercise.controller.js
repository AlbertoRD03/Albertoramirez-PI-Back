import Exercise from '../models/mysql/Exercise.js';
import { Op } from 'sequelize'; // Importamos los operadores de Sequelize

export const getAllExercises = async (req, res) => {
    try {
        const { grupo, search } = req.query; // Extraemos parámetros de la URL: ?grupo=Pecho&search=Press
        let filters = {};

        // Si hay filtro de grupo muscular
        if (grupo) {
            filters.grupo_muscular = grupo;
        }

        // Si hay una búsqueda por nombre
        if (search) {
            filters.nombre = { [Op.like]: `%${search}%` }; // Búsqueda parcial: "contiene el texto"
        }

        const ejercicios = await Exercise.findAll({ where: filters });
        res.status(200).json(ejercicios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el catálogo de ejercicios' });
    }
};