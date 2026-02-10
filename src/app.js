import express from 'express';
import dotenv from 'dotenv';
import { sequelize, connectMySQL } from './config/mysql.js';
import connectMongoDB from './config/mongodb.js';
import './models/mysql/index.js';
import registerRoutes from './routes/index.routes.js';

dotenv.config();

const app = express();

registerRoutes(app);

const startServer = async () => {
  try {
    await connectMySQL();
    await connectMongoDB();

    await sequelize.sync({ force: false });
    console.log('✅ Tablas de MySQL sincronizadas');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 FitTrack Server listo en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error crítico al arrancar el servidor:', error);
  }
};

startServer();
