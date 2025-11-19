import { ref, computed } from 'vue'
import { save, load } from '../../composables/useLocalStorage'
import { 
  shuffleArray, 
  selectRandomItems, 
  selectByDifficulty,
  shuffleWithFixedPositions 
} from '@/utils/randomizer'

/**
 * Composable para manejar aleatorización de preguntas con tracking
 * @param {string} gameId - ID único del juego
 * @param {Object} options - Opciones de configuración
 */
export function useQuestionRandomizer(gameId, options = {}) {
  const defaults = {
    shuffleOnInit: true,           // Mezclar al iniciar
    trackAnswered: true,           // Guardar preguntas respondidas
    avoidRecentRepeats: true,      // Evitar repetir últimas N preguntas
    recentCount: 5,                // Cantidad de recientes a evitar
    fixedPositions: [],            // Posiciones que no se mueven
    weightedSelection: false       // Usar selección con pesos
  }
  
  const config = { ...defaults, ...options }
  const storageKey = `${gameId}_question_history`
  
  const answeredQuestions = ref([])
  const currentPool = ref([])
  const currentIndex = ref(0)
  
  /**
   * Inicializar pool de preguntas
   * @param {Array} questions - Todas las preguntas disponibles
   */
  const initQuestions = (questions) => {
    if (config.trackAnswered) {
      const history = load(storageKey) || []
      answeredQuestions.value = history
    }
    
    let pool = [...questions]
    
    // Filtrar preguntas recientes si está configurado
    if (config.avoidRecentRepeats && answeredQuestions.value.length > 0) {
      const recentIds = answeredQuestions.value
        .slice(-config.recentCount)
        .map(q => q.id)
      
      pool = pool.filter(q => !recentIds.includes(q.id))
      
      // Si filtró demasiadas, agregar algunas de vuelta
      if (pool.length < 5) {
        pool = [...questions]
      }
    }
    
    // Aplicar aleatorización según configuración
    if (config.shuffleOnInit) {
      if (config.fixedPositions.length > 0) {
        currentPool.value = shuffleWithFixedPositions(pool, config.fixedPositions)
      } else {
        currentPool.value = shuffleArray(pool)
      }
    } else {
      currentPool.value = pool
    }
    
    currentIndex.value = 0
    return currentPool.value
  }
  
  /**
   * Inicializar con distribución por dificultad
   * @param {Array} questions - Todas las preguntas
   * @param {Object} distribution - {facil: 5, medio: 3, dificil: 2}
   */
  const initWithDifficulty = (questions, distribution) => {
    const selected = selectByDifficulty(questions, distribution)
    currentPool.value = selected
    currentIndex.value = 0
    return selected
  }
  
  /**
   * Obtener siguiente pregunta
   */
  const getNextQuestion = () => {
    if (currentIndex.value >= currentPool.value.length) {
      return null
    }
    return currentPool.value[currentIndex.value]
  }
  
  /**
   * Marcar pregunta como respondida y avanzar
   * @param {Object} question - Pregunta respondida
   * @param {boolean} correct - Si fue correcta
   */
  const markAnswered = (question, correct = true) => {
    if (config.trackAnswered) {
      answeredQuestions.value.push({
        id: question.id,
        timestamp: Date.now(),
        correct
      })
      
      // Limitar historial a últimas 100 preguntas
      if (answeredQuestions.value.length > 100) {
        answeredQuestions.value = answeredQuestions.value.slice(-100)
      }
      
      save(storageKey, answeredQuestions.value)
    }
    
    currentIndex.value++
  }
  
  /**
   * Reiniciar pool (para rejugar)
   * @param {Array} questions - Preguntas originales
   * @param {boolean} clearHistory - Limpiar historial
   */
  const reset = (questions, clearHistory = false) => {
    if (clearHistory) {
      answeredQuestions.value = []
      save(storageKey, [])
    }
    return initQuestions(questions)
  }
  
  /**
   * Obtener estadísticas
   */
  const getStats = () => {
    const total = answeredQuestions.value.length
    const correct = answeredQuestions.value.filter(q => q.correct).length
    
    return {
      total,
      correct,
      incorrect: total - correct,
      accuracy: total > 0 ? Math.round((correct / total) * 100) : 0
    }
  }
  
  // Computed properties
  const hasMore = computed(() => currentIndex.value < currentPool.value.length)
  const progress = computed(() => {
    const total = currentPool.value.length
    return total > 0 ? Math.round((currentIndex.value / total) * 100) : 0
  })
  const remaining = computed(() => currentPool.value.length - currentIndex.value)
  
  return {
    // State
    currentPool,
    currentIndex,
    answeredQuestions,
    
    // Methods
    initQuestions,
    initWithDifficulty,
    getNextQuestion,
    markAnswered,
    reset,
    getStats,
    
    // Computed
    hasMore,
    progress,
    remaining
  }
}
