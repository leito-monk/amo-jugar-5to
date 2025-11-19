/**
 * Utilidades para aleatorizar opciones de respuesta en múltiple choice
 */

import { shuffleArray } from './randomizer'

/**
 * Mezcla opciones de una pregunta manteniendo track de la correcta
 * @param {Object} question - Pregunta con propiedad 'opciones'
 * @param {Object} options - Configuración
 * @returns {Object} - Pregunta con opciones mezcladas
 */
export function shuffleQuestionOptions(question, options = {}) {
  const config = {
    detectExceptions: true,     // Detectar casos especiales
    preserveOrder: false,        // Forzar mantener orden original
    trackCorrectIndex: true,     // Guardar índice de respuesta correcta
    ...options
  }
  
  // No mezclar si se indica explícitamente
  if (config.preserveOrder || question.preserveOrder) {
    return { ...question }
  }
  
  // No mezclar si hay excepciones detectadas
  if (config.detectExceptions && hasOrderDependency(question)) {
    console.warn(`Pregunta "${question.id || question.pregunta}" tiene dependencia de orden, no se mezcla`)
    return { ...question }
  }
  
  // Si no tiene opciones, retornar sin cambios
  if (!question.opciones || question.opciones.length === 0) {
    return { ...question }
  }
  
  // Encontrar índice(s) de respuesta(s) correcta(s)
  const correctIndices = question.opciones
    .map((opt, idx) => opt.correcto ? idx : -1)
    .filter(idx => idx !== -1)
  
  // Mezclar opciones
  const shuffledOptions = shuffleArray(question.opciones)
  
  // Crear nueva pregunta con opciones mezcladas
  const shuffledQuestion = {
    ...question,
    opciones: shuffledOptions
  }
  
  // Agregar metadata del shuffle si se solicita
  if (config.trackCorrectIndex) {
    shuffledQuestion._shuffleMetadata = {
      originalCorrectIndices: correctIndices,
      newCorrectIndices: shuffledOptions
        .map((opt, idx) => opt.correcto ? idx : -1)
        .filter(idx => idx !== -1),
      shuffled: true
    }
  }
  
  return shuffledQuestion
}

/**
 * Detecta si una pregunta tiene dependencia de orden en las opciones
 * @param {Object} question - Pregunta a analizar
 * @returns {boolean} - True si tiene dependencia de orden
 */
function hasOrderDependency(question) {
  if (!question.opciones) return false
  
  const optionsText = question.opciones.map(o => o.texto?.toLowerCase() || '').join(' ')
  
  // Patrones que indican orden importante
  const orderPatterns = [
    'todas las anteriores',
    'ninguna de las anteriores',
    'a y b son correctas',
    'tanto a como b',
    'solo a',
    'solo b',
    'primero.*luego',
    'antes.*después',
    'cronológico',
    'orden correcto',
    'secuencia',
    'del 1 al',
    'de menor a mayor',
    'de mayor a menor'
  ]
  
  // Verificar si algún patrón coincide
  return orderPatterns.some(pattern => {
    const regex = new RegExp(pattern, 'i')
    return regex.test(optionsText) || regex.test(question.pregunta || '')
  })
}

/**
 * Mezcla opciones de múltiples preguntas
 * @param {Array} questions - Array de preguntas
 * @param {Object} options - Opciones de configuración
 * @returns {Array} - Preguntas con opciones mezcladas
 */
export function shuffleMultipleQuestions(questions, options = {}) {
  return questions.map(q => shuffleQuestionOptions(q, options))
}

/**
 * Mezcla opciones pero garantiza que la correcta no esté siempre en misma posición
 * Útil para evitar patrones como "siempre la primera"
 * @param {Object} question - Pregunta
 * @returns {Object} - Pregunta mezclada balanceada
 */
export function balancedShuffle(question) {
  const correctIndex = question.opciones.findIndex(opt => opt.correcto)
  
  // Si ya no está en primera posición, mezclar normal
  if (correctIndex !== 0) {
    return shuffleQuestionOptions(question)
  }
  
  // Si está en primera, forzar que vaya a otra posición
  let shuffled = shuffleQuestionOptions(question)
  let attempts = 0
  const maxAttempts = 10
  
  while (shuffled.opciones[0].correcto && attempts < maxAttempts) {
    shuffled = shuffleQuestionOptions(question)
    attempts++
  }
  
  return shuffled
}

/**
 * Valida formato de pregunta antes de mezclar
 * @param {Object} question - Pregunta a validar
 * @returns {Object} - {valid: boolean, errors: string[]}
 */
export function validateQuestionFormat(question) {
  const errors = []
  
  if (!question.opciones) {
    errors.push('La pregunta no tiene propiedad "opciones"')
  } else {
    if (!Array.isArray(question.opciones)) {
      errors.push('Las opciones deben ser un array')
    }
    
    if (question.opciones.length < 2) {
      errors.push('Debe haber al menos 2 opciones')
    }
    
    const hasCorrect = question.opciones.some(opt => opt.correcto === true)
    if (!hasCorrect) {
      errors.push('Debe haber al menos una opción correcta')
    }
    
    const hasTexto = question.opciones.every(opt => opt.texto)
    if (!hasTexto) {
      errors.push('Todas las opciones deben tener propiedad "texto"')
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Normaliza formato de opciones para compatibilidad
 * Convierte diferentes formatos a estándar {texto: string, correcto: boolean}
 * @param {Array} options - Opciones en cualquier formato
 * @returns {Array} - Opciones normalizadas
 */
export function normalizeOptions(options) {
  return options.map(opt => {
    // Si ya está en formato correcto
    if (opt.texto !== undefined && opt.correcto !== undefined) {
      return opt
    }
    
    // Si es string simple: "Respuesta A"
    if (typeof opt === 'string') {
      return { texto: opt, correcto: false }
    }
    
    // Si tiene 'label' en lugar de 'texto'
    if (opt.label) {
      return {
        texto: opt.label,
        correcto: opt.correct || opt.correcto || false
      }
    }
    
    // Si tiene 'answer' en lugar de 'texto'
    if (opt.answer) {
      return {
        texto: opt.answer,
        correcto: opt.correct || opt.correcto || false
      }
    }
    
    return opt
  })
}
