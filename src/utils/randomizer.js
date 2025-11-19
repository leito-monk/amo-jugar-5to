/**
 * Utilidades para aleatorizar contenido en juegos educativos
 */

/**
 * Algoritmo Fisher-Yates para mezclar arrays
 * Es el más eficiente y garantiza distribución uniforme
 * @param {Array} array - Array a mezclar
 * @returns {Array} - Array mezclado (copia, no modifica original)
 */
export function shuffleArray(array) {
  const shuffled = [...array] // Crear copia para no mutar original
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

/**
 * Selecciona N elementos aleatorios de un array sin repetición
 * @param {Array} array - Array fuente
 * @param {number} count - Cantidad de elementos a seleccionar
 * @returns {Array} - Array con elementos seleccionados
 */
export function selectRandomItems(array, count) {
  if (count >= array.length) {
    return shuffleArray(array)
  }
  
  const shuffled = shuffleArray(array)
  return shuffled.slice(0, count)
}

/**
 * Mezcla array pero mantiene algunos elementos en posiciones fijas
 * Útil para tutoriales donde la primera pregunta debe ser fácil
 * @param {Array} array - Array a mezclar
 * @param {Array} fixedIndices - Índices que no deben moverse [0, 1, 5]
 * @returns {Array} - Array mezclado con elementos fijos
 */
export function shuffleWithFixedPositions(array, fixedIndices = []) {
  const result = [...array]
  const fixedElements = {}
  
  // Guardar elementos fijos
  fixedIndices.forEach(idx => {
    fixedElements[idx] = result[idx]
  })
  
  // Obtener elementos que pueden moverse
  const movableElements = result.filter((_, idx) => !fixedIndices.includes(idx))
  
  // Mezclar elementos movibles
  const shuffledMovable = shuffleArray(movableElements)
  
  // Reconstruir array
  let movableIndex = 0
  return result.map((_, idx) => {
    if (fixedIndices.includes(idx)) {
      return fixedElements[idx]
    }
    return shuffledMovable[movableIndex++]
  })
}

/**
 * Filtra y aleatoriza por dificultad
 * @param {Array} questions - Array de preguntas con propiedad 'dificultad'
 * @param {Object} distribution - Distribución deseada {facil: 5, medio: 3, dificil: 2}
 * @returns {Array} - Preguntas seleccionadas y mezcladas
 */
export function selectByDifficulty(questions, distribution) {
  const result = []
  
  Object.keys(distribution).forEach(difficulty => {
    const filtered = questions.filter(q => q.dificultad === difficulty)
    const selected = selectRandomItems(filtered, distribution[difficulty])
    result.push(...selected)
  })
  
  return shuffleArray(result)
}

/**
 * Genera semilla aleatoria basada en fecha para consistencia diaria
 * Útil para "pregunta del día" - misma pregunta para todos ese día
 * @returns {number} - Semilla del día
 */
export function getDailySeed() {
  const today = new Date()
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
}

/**
 * Random con semilla (Mulberry32)
 * Permite reproducir secuencias aleatorias
 * @param {number} seed - Semilla
 * @returns {Function} - Función que genera números 0-1
 */
export function seededRandom(seed) {
  return function() {
    let t = seed += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

/**
 * Shuffle con semilla para reproducibilidad
 * @param {Array} array - Array a mezclar
 * @param {number} seed - Semilla
 * @returns {Array} - Array mezclado de forma reproducible
 */
export function shuffleWithSeed(array, seed) {
  const random = seededRandom(seed)
  const shuffled = [...array]
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  return shuffled
}

/**
 * Weighted random selection - selecciona elementos con pesos
 * Útil para mostrar más frecuentemente ciertos tipos de preguntas
 * @param {Array} items - Items con propiedad 'peso' o 'weight'
 * @returns {*} - Item seleccionado
 */
export function weightedRandomSelect(items) {
  const totalWeight = items.reduce((sum, item) => sum + (item.peso || item.weight || 1), 0)
  let random = Math.random() * totalWeight
  
  for (const item of items) {
    random -= (item.peso || item.weight || 1)
    if (random <= 0) {
      return item
    }
  }
  
  return items[items.length - 1]
}
