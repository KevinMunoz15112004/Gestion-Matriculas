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

const router = express.Router();

// Validaciones para crear/actualizar estudiante
const validacionesEstudiante = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('cedula')
    .notEmpty().withMessage('La cédula es obligatoria')
    .trim()
    .isLength({ min: 5 }).withMessage('La cédula debe tener al menos 5 caracteres'),
  body('fecha_nacimiento')
    .notEmpty().withMessage('La fecha de nacimiento es obligatoria')
    .isISO8601().withMessage('Debe ser una fecha válida (formato: YYYY-MM-DD)'),
  body('ciudad')
    .notEmpty().withMessage('La ciudad es obligatoria')
    .trim(),
  body('direccion')
    .notEmpty().withMessage('La dirección es obligatoria')
    .trim(),
  body('telefono')
    .notEmpty().withMessage('El teléfono es obligatorio')
    .trim()
    .isLength({ min: 7 }).withMessage('El teléfono debe tener al menos 7 caracteres'),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail()
];

const validacionesActualizarEstudiante = [
  body('nombre').optional().trim().isLength({ min: 2 }),
  body('apellido').optional().trim().isLength({ min: 2 }),
  body('cedula').optional().trim().isLength({ min: 5 }),
  body('fecha_nacimiento').optional().isISO8601(),
  body('ciudad').optional().trim(),
  body('direccion').optional().trim(),
  body('telefono').optional().trim().isLength({ min: 7 }),
  body('email').optional().isEmail().normalizeEmail()
];


// Todas las rutas requieren autenticación
router.use(verificarToken);

// Rutas privadas
router.post('/crear', validacionesEstudiante, crearEstudiante);
router.get('/', obtenerEstudiantes);
router.get('/:id', obtenerEstudiantePorId);
router.put('/actualizar/:id', validacionesActualizarEstudiante, actualizarEstudiante);
router.delete('/eliminar/:id', eliminarEstudiante);

export default router;
