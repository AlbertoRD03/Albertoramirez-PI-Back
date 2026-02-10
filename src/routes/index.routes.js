import express from 'express';
import cors from 'cors';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import gamificacionRoutes from './gamificacion.routes.js';
import sessionRoutes from './session.routes.js';
import exerciseRoutes from './exercise.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const registerRoutes = (app) => {
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/gamificacion', gamificacionRoutes);
  app.use('/api/sesiones', sessionRoutes);
  app.use('/api/ejercicios', exerciseRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.get('/', (req, res) => {
    res.send('Servidor de FitTrack operativo 🚀');
  });
};

export default registerRoutes;
