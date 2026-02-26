import { body, validationResult } from 'express-validator';

const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: errores.array()
        });
    }
    next();
};

export const validacionesEstudiante = [
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
        .isNumeric().withMessage('La cédula debe contener solo números')
        .trim()
        .isLength({ min: 10, max: 10 }).withMessage('La cédula debe tener exactamente 10 caracteres'),
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
        .isLength({ min: 10, max: 10 }).withMessage('El teléfono debe tener exactamente 10 digitos'),
    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido')
        .normalizeEmail(),
    validarCampos
];

export const validacionesActualizarEstudiante = [
    body('nombre').optional().trim().isLength({ min: 2 }),
    body('apellido').optional().trim().isLength({ min: 2 }),
    body('cedula').optional().trim().isLength({ min: 10, max: 10 }).isNumeric(),
    body('fecha_nacimiento').optional().isISO8601(),
    body('ciudad').optional().trim(),
    body('direccion').optional().trim(),
    body('telefono').optional().trim().isLength({ min: 10, max: 10 }),
    body('email').optional().isEmail().normalizeEmail(),
    validarCampos
];
