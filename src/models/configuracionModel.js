// src/models/configuracionModel.js

/**
 * Modelo de configuración de usuario.
 * Almacena los datos en memoria (array) para demostración.
 */

let configuraciones = [
  { id: 1, nombre: 'Lizeth Sanabria', correo: 'ltsl35965425@soy.sena.edu.co', limite: 85 },
  { id: 2, nombre: 'Dilan Abella', correo: 'dilken111620@gmail.com', limite: 90 },
];

let ultimoId = 2;

/**
 * Obtiene todas las configuraciones.
 * @returns {Array} Lista de configuraciones
 */
const obtenerTodas = () => {
  return configuraciones;
};

/**
 * Obtiene una configuración por su ID.
 * @param {number} id - ID de la configuración
 * @returns {Object|null} Configuración encontrada o null
 */
const obtenerPorId = (id) => {
  return configuraciones.find((c) => c.id === parseInt(id)) || null;
};

/**
 * Crea una nueva configuración.
 * @param {Object} datos - { nombre, correo, limite }
 * @returns {Object} Configuración creada con ID asignado
 */
const crear = ({ nombre, correo, limite }) => {
  ultimoId += 1;
  const nueva = { id: ultimoId, nombre, correo, limite };
  configuraciones.push(nueva);
  return nueva;
};

/**
 * Actualiza una configuración existente.
 * @param {number} id - ID de la configuración
 * @param {Object} datos - { nombre, correo, limite }
 * @returns {Object|null} Configuración actualizada o null
 */
const actualizar = (id, { nombre, correo, limite }) => {
  const index = configuraciones.findIndex((c) => c.id === parseInt(id));
  if (index === -1) return null;
  configuraciones[index] = { id: parseInt(id), nombre, correo, limite };
  return configuraciones[index];
};

/**
 * Elimina una configuración por su ID.
 * @param {number} id - ID de la configuración
 * @returns {boolean} true si se eliminó, false si no existía
 */
const eliminar = (id) => {
  const index = configuraciones.findIndex((c) => c.id === parseInt(id));
  if (index === -1) return false;
  configuraciones.splice(index, 1);
  return true;
};

module.exports = { obtenerTodas, obtenerPorId, crear, actualizar, eliminar };