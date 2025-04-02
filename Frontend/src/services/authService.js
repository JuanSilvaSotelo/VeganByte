/**
 * Servicio de autenticación para administradores y usuarios
 * Maneja operaciones relacionadas con JWT y autenticación
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Realiza la autenticación del administrador
 * @param {Object} credentials - Credenciales del administrador (usuario y contraseña)
 * @returns {Promise} - Promesa con los datos de la respuesta
 */
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/admin/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('adminName', response.data.nombre);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cierra la sesión del administrador
 */
export const logoutAdmin = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminName');
};

/**
 * Verifica si el administrador está autenticado
 * @returns {Boolean} - true si está autenticado, false en caso contrario
 */
export const isAdminAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  return !!token; // Convierte a booleano
};

/**
 * Obtiene el token de autenticación del administrador
 * @returns {String|null} - Token de autenticación o null si no existe
 */
export const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

/**
 * Obtiene el nombre del administrador
 * @returns {String|null} - Nombre del administrador o null si no existe
 */
export const getAdminName = () => {
  return localStorage.getItem('adminName');
};

/**
 * Configura el token de autenticación en los headers de Axios
 * @returns {Object} - Objeto con los headers de autenticación
 */
export const getAuthHeaders = () => {
  const token = getAdminToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
};

/**
 * Realiza la autenticación del usuario
 * @param {Object} credentials - Credenciales del usuario (Usuario y Contraseña)
 * @returns {Promise} - Promesa con los datos de la respuesta
 */
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('userToken', response.data.token);
      localStorage.setItem('userEmail', credentials.Usuario); // Guardar el correo/usuario
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Cierra la sesión del usuario
 */
export const logoutUser = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userEmail');
};

/**
 * Verifica si el usuario está autenticado
 * @returns {Boolean} - true si está autenticado, false en caso contrario
 */
export const isUserAuthenticated = () => {
  const token = localStorage.getItem('userToken');
  return !!token; // Convierte a booleano
};

/**
 * Obtiene el token de autenticación del usuario
 * @returns {String|null} - Token de autenticación o null si no existe
 */
export const getUserToken = () => {
  return localStorage.getItem('userToken');
};

/**
 * Obtiene el email del usuario
 * @returns {String|null} - Email del usuario o null si no existe
 */
export const getUserEmail = () => {
  return localStorage.getItem('userEmail');
};