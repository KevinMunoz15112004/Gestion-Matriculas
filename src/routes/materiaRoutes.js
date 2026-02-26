import express from 'express';
import { body } from 'express-validator';
import { 
  crearMateria, 
  obtenerMaterias, 
  obtenerMateriaPorId, 
  actualizarMateria, 
  eliminarMateria 
} from '../controllers/materiaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validacionesMateria, validacionesActualizarMateria } from '../validators/materiasValidator.js';

const router = express.Router();

router.use(verificarToken);

router.post('/crear', validacionesMateria, crearMateria);
router.get('/', obtenerMaterias);
router.get('/:id', obtenerMateriaPorId);
router.put('/actualizar/:id', validacionesActualizarMateria, actualizarMateria);
router.delete('/eliminar/:id', eliminarMateria);

export default router;
