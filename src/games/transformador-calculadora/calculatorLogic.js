/**
 * calculatorLogic.js
 * Funciones de lógica para el Transformador de Calculadora
 */

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} - Número formateado como "3.456.789"
 */
export function formatWithSeparators(num) {
  if (num === null || num === undefined) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Detecta qué dígitos cambiaron entre dos números
 * @param {number} before - Número anterior
 * @param {number} after - Número después
 * @returns {Array<number>} - Array de índices de dígitos que cambiaron (0 = más a la izquierda)
 */
export function detectChangedDigits(before, after) {
  const beforeStr = before.toString().padStart(7, '0');
  const afterStr = after.toString().padStart(7, '0');
  
  const changedIndices = [];
  for (let i = 0; i < beforeStr.length; i++) {
    if (beforeStr[i] !== afterStr[i]) {
      changedIndices.push(i);
    }
  }
  
  return changedIndices;
}

/**
 * Obtiene el nombre de la posición de un dígito
 * @param {number} idx - Índice del dígito (0 = millones, 6 = unidades)
 * @returns {string} - Nombre de la posición
 */
export function getPositionName(idx) {
  const positions = [
    'millones',
    'centenas de mil',
    'decenas de mil',
    'miles',
    'centenas',
    'decenas',
    'unidades'
  ];
  
  return positions[idx] || 'posición desconocida';
}

/**
 * Genera una explicación pedagógica del cambio
 * @param {string} operation - Operación realizada ('+' o '-')
 * @param {number} value - Valor de la operación
 * @param {Array<number>} changedPositions - Posiciones que cambiaron
 * @returns {string} - Texto explicativo
 */
export function generateExplanation(operation, value, changedPositions) {
  if (changedPositions.length === 0) {
    return 'No hubo cambios en el número.';
  }
  
  const opText = operation === '+' ? 'sumar' : 'restar';
  const formattedValue = formatWithSeparators(value);
  
  const positionNames = changedPositions.map(idx => getPositionName(idx));
  const positionsText = positionNames.length === 1 
    ? positionNames[0]
    : positionNames.slice(0, -1).join(', ') + ' y ' + positionNames[positionNames.length - 1];
  
  return `Al ${opText} ${formattedValue}, cambian las cifras de: ${positionsText}.`;
}

/**
 * Calcula el resultado de una operación
 * @param {number} num1 - Primer número
 * @param {string} operation - Operación ('+' o '-')
 * @param {number} num2 - Segundo número
 * @returns {number} - Resultado de la operación
 */
export function calculate(num1, operation, num2) {
  if (operation === '+') {
    return num1 + num2;
  } else if (operation === '-') {
    return num1 - num2;
  }
  return num1;
}

/**
 * Valida que un número esté en el rango permitido (0 a 9,999,999)
 * @param {number} num - Número a validar
 * @returns {boolean} - true si es válido
 */
export function isValidNumber(num) {
  return num >= 0 && num <= 9999999;
}
