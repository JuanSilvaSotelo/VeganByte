// Este archivo centraliza la exportación de todos los modelos
// para facilitar su importación en otros archivos

import Cliente from './cliente.model.js';
import Administradores from './administradores.model.js';
import { Experiencia, Taller } from './evento.model.js'; // Importar Experiencia y Taller

export {
  Cliente,
  Administradores,
  Experiencia, // Exportar Experiencia
  Taller      // Exportar Taller
};