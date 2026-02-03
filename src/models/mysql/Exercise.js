const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/mysql');

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

module.exports = Exercise;