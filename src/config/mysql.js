const { Sequelize } = require('sequelize');
require('dotenv').config();

//Configura sequelize 
const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false, 
        pool: {
            max: 5,        
            min: 0,        
            acquire: 30000, 
            idle: 10000    
        }
    }
);

//Verifica conexion
const connectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log('MySQL: Conexión establecida correctamente.');
    } catch (error) {
        console.error('MySQL: Error de conexión:', error.message);
        process.exit(1); 
    }
};

module.exports = { sequelize, connectMySQL };