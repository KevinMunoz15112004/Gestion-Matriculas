import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import estudianteRoutes from './routes/estudianteRoutes.js';
import materiaRoutes from './routes/materiaRoutes.js';
import matriculaRoutes from './routes/matriculaRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/materias', materiaRoutes);
app.use('/api/matriculas', matriculaRoutes);

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
