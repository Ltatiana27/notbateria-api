// src/routes/configuracionRoutes.js

const express = require('express');
const router = express.Router();
const controller = require('../controllers/configuracionController');
const { configuracionRules, idRule, validate } = require('../middleware/validators');

// GET /api/configuraciones - Listar todas
router.get('/', controller.obtenerTodas);

// GET /api/configuraciones/:id - Obtener por ID
router.get('/:id', idRule(), validate, controller.obtenerPorId);

// POST /api/configuraciones - Crear
router.post('/', configuracionRules(), validate, controller.crear);

// PUT /api/configuraciones/:id - Actualizar
router.put('/:id', idRule(), configuracionRules(), validate, controller.actualizar);

// DELETE /api/configuraciones/:id - Eliminar
router.delete('/:id', idRule(), validate, controller.eliminar);

module.exports = router;