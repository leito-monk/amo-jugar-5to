/**
 * gameLogic.js
 * Funciones de lógica del juego Cazador de Caligramas
 */

/**
 * Mezcla un array usando el algoritmo Fisher-Yates
 * @param {Array} array - Array a mezclar
 * @returns {Array} - Array mezclado (nueva copia)
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Compara si la posición colocada coincide con la correcta
 * @param {Array} placed - Posición donde se colocó [row, col]
 * @param {Array} correct - Posición correcta [row, col]
 * @returns {boolean} - true si coinciden
 */
export function checkPosition(placed, correct) {
  return placed[0] === correct[0] && placed[1] === correct[1];
}

/**
 * Calcula el puntaje basado en intentos, pistas usadas y tiempo
 * @param {number} attempts - Número de intentos erróneos
 * @param {number} hintsUsed - Número de pistas utilizadas
 * @param {number} timeElapsed - Tiempo transcurrido en segundos
 * @returns {number} - Puntaje calculado (mínimo 10)
 */
export function calculateScore(attempts, hintsUsed, timeElapsed) {
  let score = 100; // Base de puntos
  
  // Penalización por intentos erróneos
  score -= attempts * 5;
  
  // Penalización por pistas usadas
  score -= hintsUsed * 10;
  
  // Bonus por completar rápido (menos de 2 minutos = 120 segundos)
  if (timeElapsed < 120) {
    score += 20;
  }
  
  // Asegurar que el puntaje mínimo sea 10
  return Math.max(score, 10);
}

/**
 * Obtiene un mensaje motivacional aleatorio del array
 * @param {Array} messages - Array de mensajes
 * @returns {string} - Mensaje seleccionado aleatoriamente
 */
export function getRandomMotivationalMessage(messages) {
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}
