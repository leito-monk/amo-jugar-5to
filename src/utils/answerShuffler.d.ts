/**
 * Opciones de configuración para el shuffle
 */
export interface ShuffleOptions {
  detectExceptions?: boolean
  preserveOrder?: boolean
  trackCorrectIndex?: boolean
}

/**
 * Opción de respuesta
 */
export interface Option {
  texto: string
  correcto: boolean
  [key: string]: any
}

/**
 * Metadata del shuffle
 */
export interface ShuffleMetadata {
  originalCorrectIndices: number[]
  newCorrectIndices: number[]
  shuffled: boolean
}

/**
 * Pregunta con opciones
 */
export interface Question {
  id?: string
  pregunta?: string
  opciones: Option[]
  preserveOrder?: boolean
  _shuffleMetadata?: ShuffleMetadata
  [key: string]: any
}

/**
 * Resultado de validación
 */
export interface ValidationResult {
  valid: boolean
  errors: string[]
}

/**
 * Mezcla opciones de una pregunta manteniendo track de la correcta
 */
export function shuffleQuestionOptions(
  question: Question,
  options?: ShuffleOptions
): Question

/**
 * Mezcla opciones de múltiples preguntas
 */
export function shuffleMultipleQuestions(
  questions: Question[],
  options?: ShuffleOptions
): Question[]

/**
 * Mezcla opciones pero garantiza que la correcta no esté siempre en misma posición
 */
export function balancedShuffle(question: Question): Question

/**
 * Valida formato de pregunta antes de mezclar
 */
export function validateQuestionFormat(question: Question): ValidationResult

/**
 * Normaliza formato de opciones para compatibilidad
 */
export function normalizeOptions(options: any[]): Option[]
