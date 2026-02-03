import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Importar conexiones
import { sequelize, connectMySQL } from './config/mysql.js';
import connectMongoDB from './config/mongodb.js';

// Importar Modelos de MySQL para que Sequelize los reconozca
import './models/mysql/User.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import './models/mysql/Exercise.js';
import exerciseRoutes from './routes/exercise.routes.js';
import sessionRoutes from './routes/session.routes.js';

const app = express();

// Middlewares iniciales
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/sessions', sessionRoutes);



app.get('/', (req, res) => {
    res.send('Servidor de FitTrack operativo 🚀');
});

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
