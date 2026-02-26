import express from 'express';
import { body } from 'express-validator';
import { 
  crearEstudiante, 
  obtenerEstudiantes, 
  obtenerEstudiantePorId, 
  actualizarEstudiante, 
  eliminarEstudiante 
} from '../controllers/estudianteController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validacionesEstudiante, validacionesActualizarEstudiante } from '../validators/estudiantesValidator.js';

const router = express.Router();

router.use(verificarToken);

router.post('/crear', validacionesEstudiante, crearEstudiante);
router.get('/', obtenerEstudiantes);
router.get('/:id', obtenerEstudiantePorId);
router.put('/actualizar/:id', validacionesActualizarEstudiante, actualizarEstudiante);
router.delete('/eliminar/:id', eliminarEstudiante);

export default router;
