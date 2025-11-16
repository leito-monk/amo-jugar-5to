/**
 * useLocalStorage.js
 * Wrapper para localStorage con prefijo 'yoAmoAprender_'
 */

const PREFIX = 'yoAmoAprender_';

/**
 * Obtiene la clave con el prefijo
 * @param {string} key - Clave sin prefijo
 * @returns {string} - Clave con prefijo
 */
function getPrefixedKey(key) {
  return `${PREFIX}${key}`;
}

/**
 * Guarda datos en localStorage
 * @param {string} key - Clave para almacenar
 * @param {*} data - Datos a guardar (se serializarán con JSON.stringify)
 * @returns {boolean} - true si se guardó exitosamente, false en caso de error
 */
export function save(key, data) {
  try {
    const prefixedKey = getPrefixedKey(key);
    const serializedData = JSON.stringify(data);
    localStorage.setItem(prefixedKey, serializedData);
    return true;
  } catch (error) {
    console.error(`Error al guardar en localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Carga datos desde localStorage
 * @param {string} key - Clave a cargar
 * @returns {*} - Datos deserializados o null si no existen o hay error
 */
export function load(key) {
  try {
    const prefixedKey = getPrefixedKey(key);
    const serializedData = localStorage.getItem(prefixedKey);
    
    if (serializedData === null) {
      return null;
    }
    
    return JSON.parse(serializedData);
  } catch (error) {
    console.error(`Error al cargar desde localStorage (${key}):`, error);
    return null;
  }
}

/**
 * Elimina una entrada de localStorage
 * @param {string} key - Clave a eliminar
 * @returns {boolean} - true si se eliminó exitosamente, false en caso de error
 */
export function remove(key) {
  try {
    const prefixedKey = getPrefixedKey(key);
    localStorage.removeItem(prefixedKey);
    return true;
  } catch (error) {
    console.error(`Error al eliminar de localStorage (${key}):`, error);
    return false;
  }
}

/**
 * Limpia todas las entradas del proyecto (con prefijo 'yoAmoAprender_')
 * @returns {boolean} - true si se limpió exitosamente, false en caso de error
 */
export function clear() {
  try {
    const keys = getAllKeys();
    keys.forEach(key => {
      const prefixedKey = getPrefixedKey(key);
      localStorage.removeItem(prefixedKey);
    });
    return true;
  } catch (error) {
    console.error('Error al limpiar localStorage:', error);
    return false;
  }
}

/**
 * Lista todas las claves del proyecto (sin prefijo)
 * @returns {string[]} - Array de claves sin prefijo, o array vacío en caso de error
 */
export function getAllKeys() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(PREFIX)) {
        keys.push(key.substring(PREFIX.length));
      }
    }
    return keys;
  } catch (error) {
    console.error('Error al obtener claves de localStorage:', error);
    return [];
  }
}

export default {
  save,
  load,
  remove,
  clear,
  getAllKeys
};
