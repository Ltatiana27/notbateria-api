// src/controllers/configuracionController.js

const Configuracion = require('../models/configuracionModel');

/**
 * GET /api/configuraciones
 * Lista todas las configuraciones.
 */
const obtenerTodas = (req, res) => {
  try {
    const configuraciones = Configuracion.obtenerTodas();
    res.status(200).json(configuraciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las configuraciones' });
  }
};

/**
 * GET /api/configuraciones/:id
 * Obtiene una configuración por ID.
 */
const obtenerPorId = (req, res) => {
  try {
    const { id } = req.params;
    const configuracion = Configuracion.obtenerPorId(id);
    if (!configuracion) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.status(200).json(configuracion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la configuración' });
  }
};

/**
 * POST /api/configuraciones
 * Crea una nueva configuración.
 */
const crear = (req, res) => {
  try {
    const { nombre, correo, limite } = req.body;
    const nueva = Configuracion.crear({ nombre, correo, limite });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la configuración' });
  }
};

/**
 * PUT /api/configuraciones/:id
 * Actualiza una configuración existente.
 */
const actualizar = (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, limite } = req.body;
    const actualizada = Configuracion.actualizar(id, { nombre, correo, limite });
    if (!actualizada) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la configuración' });
  }
};

/**
 * DELETE /api/configuraciones/:id
 * Elimina una configuración.
 */
const eliminar = (req, res) => {
  try {
    const { id } = req.params;
    const eliminada = Configuracion.eliminar(id);
    if (!eliminada) {
      return res.status(404).json({ error: 'Configuración no encontrada' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la configuración' });
  }
};

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };