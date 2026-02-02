const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexiones
const { sequelize, connectMySQL } = require('./config/mysql');
const connectMongoDB = require('./config/mongodb');

// Importar Modelos de MySQL para que Sequelize los reconozca
const User = require('./models/mysql/User');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middlewares iniciales
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

async function startServer() {
    try {
        // 1. Conectar a Bases de Datos
        await connectMySQL();
        await connectMongoDB();

        // 2. Sincronizar Modelos de MySQL (Crea las tablas si no existen)
        // force: false evita que se borren los datos existentes
        await sequelize.sync({ force: false });
        console.log('✅ Tablas de MySQL sincronizadas');

        // 3. Arrancar Servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 FitTrack Server listo en puerto ${PORT}`);
        });

    } catch (error) {
        console.error('❌ Error crítico al arrancar el servidor:', error);
    }
}

startServer();