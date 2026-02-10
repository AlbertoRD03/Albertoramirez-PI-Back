import express from 'express';
import cors from 'cors';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import gamificacionRoutes from './gamificacion.routes.js';

const registerRoutes = (app) => {
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/gamificacion', gamificacionRoutes);

  app.get('/', (req, res) => {
    res.send('Servidor de FitTrack operativo 🚀');
  });
};

export default registerRoutes;
