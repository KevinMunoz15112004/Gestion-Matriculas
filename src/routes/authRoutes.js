import express from 'express';
import { registrarUsuario, iniciarSesion, obtenerPerfil } from '../controllers/authController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validacionesLogin, validacionesRegistro } from '../validators/authValidator.js';

const router = express.Router();

router.post('/registrar', validacionesRegistro, registrarUsuario);
router.post('/login', validacionesLogin, iniciarSesion);

router.get('/perfil', verificarToken, obtenerPerfil);

export default router;
