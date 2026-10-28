// src/middleware/validators.js

const { body, param, validationResult } = require('express-validator');

/**
 * Reglas de validación para crear o actualizar una configuración.
 * - nombre: obligatorio, entre 3 y 100 caracteres
 * - correo: obligatorio, formato de correo válido
 * - limite: obligatorio, entero entre 50 y 100
 */
const configuracionRules = () => {
  return [
    body('nombre')
      .notEmpty().withMessage('El nombre es obligatorio')
      .isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres')
      .trim(),
    body('correo')
      .notEmpty().withMessage('El correo es obligatorio')
      .isEmail().withMessage('El correo debe tener un formato válido')
      .normalizeEmail(),
    body('limite')
      .notEmpty().withMessage('El límite es obligatorio')
      .isInt({ min: 50, max: 100 }).withMessage('El límite debe ser un número entero entre 50 y 100'),
  ];
};

/**
 * Reglas de validación para el ID en los parámetros de ruta.
 */
const idRule = () => {
  return [
    param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo'),
  ];
};

/**
 * Middleware que verifica si hay errores de validación.
 * Si los hay, responde con 400 y la lista de errores.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { configuracionRules, idRule, validate };