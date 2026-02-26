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

export const validacionesMatricula = [
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
        .isMongoId().withMessage('ID de estudiante inválido'),
    validarCampos
];

export const validacionesActualizarMatricula = [
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
        .isMongoId(),
    validarCampos
];