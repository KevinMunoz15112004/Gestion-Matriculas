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

export const validacionesMateria = [
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .trim()
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .trim()
        .isLength({ min: 2 }).withMessage('El código debe tener al menos 2 caracteres')
        .isAlphanumeric().withMessage('El código solo puede contener letras y números'),
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria')
        .trim()
        .isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    body('creditos')
        .notEmpty().withMessage('Los créditos son obligatorios')
        .isInt({ min: 1, max: 10 }).withMessage('Los créditos deben ser un número entre 1 y 10'),
    validarCampos
];

export const validacionesActualizarMateria = [
    body('nombre').optional().trim().isLength({ min: 3 }),

    body('codigo')
        .optional()
        .trim()
        .isLength({ min: 2 })
        .isAlphanumeric(),

    body('descripcion')
        .optional()
        .trim()
        .isLength({ min: 10 }),

    body('creditos')
        .optional()
        .isInt({ min: 1, max: 10 }),
    validarCampos
];