import { ref, computed } from 'vue'
import { shuffleQuestionOptions, validateQuestionFormat } from '@/utils/answerShuffler'

/**
 * Composable para manejar preguntas con opciones mezcladas
 * @param {Object} options - Configuración
 */
export function useShuffledQuestion(options = {}) {
  const config = {
    shuffleOnLoad: true,      // Mezclar al cargar pregunta
    validateFormat: true,     // Validar formato antes de usar
    autoDetectExceptions: true, // Detectar casos especiales
    ...options
  }
  
  const currentQuestion = ref(null)
  const shuffledQuestion = ref(null)
  const validationErrors = ref([])
  
  /**
   * Cargar y preparar pregunta
   * @param {Object} question - Pregunta original
   */
  const loadQuestion = (question) => {
    currentQuestion.value = question
    validationErrors.value = []
    
    // Validar formato si está configurado
    if (config.validateFormat) {
      const validation = validateQuestionFormat(question)
      if (!validation.valid) {
        validationErrors.value = validation.errors
        console.error('Errores de validación:', validation.errors)
        shuffledQuestion.value = question // Usar original si hay errores
        return
      }
    }
    
    // Mezclar opciones si está configurado
    if (config.shuffleOnLoad) {
      shuffledQuestion.value = shuffleQuestionOptions(question, {
        detectExceptions: config.autoDetectExceptions
      })
    } else {
      shuffledQuestion.value = question
    }
  }
  
  /**
   * Re-mezclar pregunta actual
   */
  const reshuffle = () => {
    if (currentQuestion.value) {
      shuffledQuestion.value = shuffleQuestionOptions(currentQuestion.value, {
        detectExceptions: config.autoDetectExceptions
      })
    }
  }
  
  /**
   * Verificar si una opción es correcta
   * @param {Object} option - Opción seleccionada
   * @returns {boolean}
   */
  const isCorrect = (option) => {
    return option.correcto === true
  }
  
  /**
   * Obtener todas las opciones correctas
   * @returns {Array}
   */
  const getCorrectOptions = () => {
    return shuffledQuestion.value?.opciones.filter(opt => opt.correcto) || []
  }
  
  /**
   * Obtener índice de opción correcta (para single choice)
   * @returns {number}
   */
  const getCorrectIndex = () => {
    return shuffledQuestion.value?.opciones.findIndex(opt => opt.correcto) || -1
  }
  
  // Computed
  const hasMultipleCorrect = computed(() => {
    const correct = getCorrectOptions()
    return correct.length > 1
  })
  
  const isValid = computed(() => validationErrors.value.length === 0)
  
  const wasShuffled = computed(() => {
    return shuffledQuestion.value?._shuffleMetadata?.shuffled || false
  })
  
  return {
    // State
    currentQuestion,
    shuffledQuestion,
    validationErrors,
    
    // Methods
    loadQuestion,
    reshuffle,
    isCorrect,
    getCorrectOptions,
    getCorrectIndex,
    
    // Computed
    hasMultipleCorrect,
    isValid,
    wasShuffled
  }
}
