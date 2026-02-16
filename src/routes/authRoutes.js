import express from 'express';
import { body } from 'express-validator';
import { registrarUsuario, iniciarSesion, obtenerPerfil } from '../controllers/authController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Validaciones para registro
const validacionesRegistro = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
  body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .trim()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

// Validaciones para inicio de sesión
const validacionesLogin = [
  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];

// Rutas públicas
router.post('/registrar', validacionesRegistro, registrarUsuario);
router.post('/login', validacionesLogin, iniciarSesion);

// Rutas privadas (requieren autenticación)
router.get('/perfil', verificarToken, obtenerPerfil);

export default router;
