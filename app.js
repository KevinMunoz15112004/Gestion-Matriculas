import express from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes.js';
import estudianteRoutes from './src/routes/estudianteRoutes.js';
import materiaRoutes from './src/routes/materiaRoutes.js';
import matriculaRoutes from './src/routes/matriculaRoutes.js';

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/matriculas', matriculaRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'API Sistema de Gestión de Matrículas',
    version: '1.0.0'
  });
});

app.use((req, res) => {
  res.status(404).json({ 
    mensaje: 'Ruta no encontrada' 
  });
});

export default app;
