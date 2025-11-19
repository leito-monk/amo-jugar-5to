/**
 * gameLogic.js
 * Funciones de lógica del juego Autopista Numérica
 */

import { selectByDifficulty } from '../../utils/randomizer.js';

/**
 * Formatea un número con separadores de miles
 * @param {number} num - Número a formatear
 * @returns {string} - Número formateado con puntos (ej: "3.456.789")
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Convierte un número a su representación en palabras (español)
 * @param {number} num - Número a convertir (0 - 9.999.999)
 * @returns {string} - Número en palabras
 */
export function numberToWords(num) {
  if (num === 0) return 'cero';
  
  const unidades = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const decenas = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const especiales = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const centenas = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
  
  function convertirGrupo(n) {
    if (n === 0) return '';
    if (n === 100) return 'cien';
    
    let resultado = '';
    const c = Math.floor(n / 100);
    const d = Math.floor((n % 100) / 10);
    const u = n % 10;
    
    if (c > 0) {
      resultado += centenas[c];
    }
    
    if (d === 1) {
      if (resultado) resultado += ' ';
      resultado += especiales[u];
    } else {
      if (d >= 2) {
        if (resultado) resultado += ' ';
        resultado += decenas[d];
        if (u > 0) {
          resultado += ' y ' + unidades[u];
        }
      } else if (u > 0) {
        if (resultado) resultado += ' ';
        resultado += unidades[u];
      }
    }
    
    return resultado;
  }
  
  const millones = Math.floor(num / 1000000);
  const miles = Math.floor((num % 1000000) / 1000);
  const unidadesNum = num % 1000;
  
  let resultado = '';
  
  if (millones > 0) {
    if (millones === 1) {
      resultado += 'un millón';
    } else {
      resultado += convertirGrupo(millones) + ' millones';
    }
  }
  
  if (miles > 0) {
    if (resultado) resultado += ' ';
    if (miles === 1) {
      resultado += 'mil';
    } else {
      resultado += convertirGrupo(miles) + ' mil';
    }
  }
  
  if (unidadesNum > 0) {
    if (resultado) resultado += ' ';
    resultado += convertirGrupo(unidadesNum);
  }
  
  return resultado;
}

/**
 * Convierte palabras a número (español) - versión tolerante
 * @param {string} str - Texto en palabras
 * @returns {number|null} - Número convertido o null si falla
 */
export function wordsToNumber(str) {
  // Normalizar: minúsculas, quitar acentos, quitar espacios extra
  const normalizado = str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Mapeo de palabras a números
  const palabras = {
    'cero': 0, 'uno': 1, 'dos': 2, 'tres': 3, 'cuatro': 4,
    'cinco': 5, 'seis': 6, 'siete': 7, 'ocho': 8, 'nueve': 9,
    'diez': 10, 'once': 11, 'doce': 12, 'trece': 13, 'catorce': 14,
    'quince': 15, 'dieciseis': 16, 'diecisiete': 17, 'dieciocho': 18, 'diecinueve': 19,
    'veinte': 20, 'treinta': 30, 'cuarenta': 40, 'cincuenta': 50,
    'sesenta': 60, 'setenta': 70, 'ochenta': 80, 'noventa': 90,
    'cien': 100, 'ciento': 100,
    'doscientos': 200, 'trescientos': 300, 'cuatrocientos': 400, 'quinientos': 500,
    'seiscientos': 600, 'setecientos': 700, 'ochocientos': 800, 'novecientos': 900,
    'mil': 1000, 'millon': 1000000, 'millones': 1000000
  };
  
  // Intentar conversión simple
  let resultado = 0;
  let temp = 0;
  
  const tokens = normalizado.split(' ');
  
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    
    if (token === 'y') continue;
    
    if (palabras[token] !== undefined) {
      const valor = palabras[token];
      
      if (valor === 1000000) {
        if (temp === 0) temp = 1;
        resultado += temp * valor;
        temp = 0;
      } else if (valor === 1000) {
        if (temp === 0) temp = 1;
        resultado += temp * valor;
        temp = 0;
      } else {
        temp += valor;
      }
    }
  }
  
  resultado += temp;
  return resultado > 0 ? resultado : null;
}

/**
 * Selecciona preguntas aleatorias según dificultad
 * @param {Array} pool - Array de preguntas
 * @param {number} total - Total de preguntas a seleccionar
 * @returns {Array} - Array de preguntas seleccionadas
 */
export function selectRandomQuestions(pool, total = 10) {
  // Distribución: 3 fáciles, 4 medias, 3 difíciles
  const distribution = {
    facil: 3,
    medio: 4,
    dificil: 3
  };
  
  return selectByDifficulty(pool, distribution);
}

/**
 * Valida respuesta de texto (normalizada)
 * @param {string} userAnswer - Respuesta del usuario
 * @param {string} correctAnswer - Respuesta correcta
 * @returns {boolean} - true si coinciden (normalizado)
 */
export function validateTextAnswer(userAnswer, correctAnswer) {
  const normalizar = (str) => 
    str.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  
  return normalizar(userAnswer) === normalizar(correctAnswer);
}

/**
 * Calcula la posición en la recta numérica basada en el click
 * @param {number} clickX - Posición X del click
 * @param {number} rectaWidth - Ancho total de la recta
 * @param {number} rangoMin - Valor mínimo de la recta
 * @param {number} rangoMax - Valor máximo de la recta
 * @returns {number} - Valor calculado en la recta
 */
export function calculateNumberLineValue(clickX, rectaWidth, rangoMin, rangoMax) {
  const porcentaje = clickX / rectaWidth;
  const valor = rangoMin + (rangoMax - rangoMin) * porcentaje;
  return Math.round(valor);
}

/**
 * Valida si un valor en la recta numérica es correcto
 * @param {number} userValue - Valor seleccionado por el usuario
 * @param {number} correctValue - Valor correcto
 * @param {number} tolerance - Tolerancia permitida
 * @returns {boolean} - true si está dentro de la tolerancia
 */
export function validateNumberLine(userValue, correctValue, tolerance) {
  return Math.abs(userValue - correctValue) <= tolerance;
}

/**
 * Genera velocidad aleatoria para autos IA
 * @returns {number} - Velocidad entre 0.8 y 1.2
 */
export function randomAISpeed() {
  return 0.8 + Math.random() * 0.4;
}
