import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/mysql.js';

const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    grupo_muscular: {
        type: DataTypes.STRING, // Ej: Pecho, Espalda, Piernas
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    equipamiento: {
        type: DataTypes.STRING // Ej: Mancuernas, Barra, Máquina
    }
}, {
    tableName: 'ejercicios',
    timestamps: false // No necesitamos createdAt para el catálogo maestro
});

export default Exercise;
