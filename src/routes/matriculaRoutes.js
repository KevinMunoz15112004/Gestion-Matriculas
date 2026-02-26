import express from 'express';
import { body } from 'express-validator';
import { 
  crearMatricula, 
  obtenerMatriculas, 
  obtenerMatriculaPorId,
  obtenerMatriculasPorEstudiante,
  obtenerMatriculasPorMateria,
  actualizarMatricula, 
  eliminarMatricula 
} from '../controllers/matriculaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validacionesMatricula, validacionesActualizarMatricula } from '../validators/matriculaValidator.js';

const router = express.Router();

router.use(verificarToken);

router.post('/crear', validacionesMatricula, crearMatricula);
router.get('/', obtenerMatriculas);
router.get('/:id', obtenerMatriculaPorId);
router.get('/estudiante/:estudianteId', obtenerMatriculasPorEstudiante);
router.get('/materia/:materiaId', obtenerMatriculasPorMateria);
router.put('/actualizar/:id', validacionesActualizarMatricula, actualizarMatricula);
router.delete('/eliminar/:id', eliminarMatricula);

export default router;
