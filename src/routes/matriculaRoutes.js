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

const router = express.Router();

// Validaciones para crear/actualizar matrícula
const validacionesMatricula = [
  body('codigo')
    .notEmpty().withMessage('El código es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El código debe tener al menos 2 caracteres')
    .isAlphanumeric().withMessage('El código solo puede contener letras y números'),
  body('descripcion')
    .notEmpty().withMessage('La descripción es obligatoria')
    .trim()
    .isLength({ min: 5 }).withMessage('La descripción debe tener al menos 5 caracteres'),
  body('creditos')
    .notEmpty().withMessage('Los créditos son obligatorios')
    .isInt({ min: 1 }).withMessage('Los créditos deben ser un número mayor a 0'),
  body('materia')
    .notEmpty().withMessage('La materia es obligatoria')
    .isMongoId().withMessage('ID de materia inválido'),
  body('estudiante')
    .notEmpty().withMessage('El estudiante es obligatorio')
    .isMongoId().withMessage('ID de estudiante inválido')
];

const validacionesActualizarMatricula = [
  body('codigo')
    .optional()
    .trim()
    .isLength({ min: 2 })
    .isAlphanumeric(),

  body('descripcion')
    .optional()
    .trim()
    .isLength({ min: 5 }),

  body('creditos')
    .optional()
    .isInt({ min: 1 }),

  body('materia')
    .optional()
    .isMongoId(),

  body('estudiante')
    .optional()
    .isMongoId()
];

// Todas las rutas requieren autenticación
router.use(verificarToken);

// Rutas privadas
router.post('/crear', validacionesMatricula, crearMatricula);
router.get('/', obtenerMatriculas);
router.get('/:id', obtenerMatriculaPorId);
router.get('/estudiante/:estudianteId', obtenerMatriculasPorEstudiante);
router.get('/materia/:materiaId', obtenerMatriculasPorMateria);
router.put('/actualizar/:id', validacionesActualizarMatricula, actualizarMatricula);
router.delete('/eliminar/:id', eliminarMatricula);

export default router;
