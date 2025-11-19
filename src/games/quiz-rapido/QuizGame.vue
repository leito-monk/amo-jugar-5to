<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '../../components/game/GameLayout.vue'
import ScoreBoard from '../../components/game/ScoreBoard.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
import preguntasData from './preguntas.json'
import { selectRandomItems } from '../../utils/randomizer.js'
import { shuffleQuestionOptions } from '../../utils/answerShuffler.js'

// Types
interface Opcion {
  texto: string
  correcto: boolean
}

interface Pregunta {
  id: string
  materia: string
  dificultad: string
  pregunta: string
  opciones: Opcion[]
  explicacion?: string
}

interface Ranking {
  nombre: string
  puntaje: number
  fecha: string
}

// State
const router = useRouter()
const dificultad = ref<'facil' | 'medio' | 'dificil' | null>(null)
const preguntas = ref<Pregunta[]>([])
const preguntaActual = ref(0)
const respuestaSeleccionada = ref<number | null>(null)
const puntaje = ref(0)
const respuestasCorrectas = ref(0)
const tiempoRestante = ref(30)
const juegoIniciado = ref(false)
const juegoTerminado = ref(false)
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const tiemposPorPregunta = ref<number[]>([])
const nombreJugador = ref('')

let timerInterval: number | null = null

// Computed
const preguntaActualData = computed(() => preguntas.value[preguntaActual.value])
const progreso = computed(() => Math.round(((preguntaActual.value + 1) / 20) * 100))
const tiempoLimite = computed(() => dificultad.value === 'dificil' ? 20 : 30)
const timerColor = computed(() => {
  if (tiempoRestante.value <= 5) return 'text-error'
  if (tiempoRestante.value <= 10) return 'text-warning'
  return 'text-primary'
})

const estadisticasPorMateria = computed(() => {
  const stats: Record<string, { correctas: number; total: number }> = {}
  
  preguntas.value.forEach((pregunta, index) => {
    if (index >= preguntaActual.value || !pregunta) return
    
    const materia = pregunta.materia
    if (!stats[materia]) {
      stats[materia] = { correctas: 0, total: 0 }
    }
    
    stats[materia]!.total++
    
    if (tiemposPorPregunta.value[index] !== undefined && tiemposPorPregunta.value[index] >= 0) {
      stats[materia]!.correctas++
    }
  })
  
  return stats
})

const ranking = computed(() => {
  const stored = localStorage.getItem('quiz-rapido-ranking')
  if (!stored) return []
  return JSON.parse(stored) as Ranking[]
})

const mejoresPuntajes = computed(() => {
  return ranking.value.slice(0, 5)
})

// Instructions
const instructions = `🎯 Quiz Rápido Unidad 1

¡Pon a prueba tus conocimientos de todas las materias!

📋 Cómo jugar:
• Selecciona nivel de dificultad (Fácil, Medio o Difícil)
• Responde 20 preguntas aleatorias
• Cada pregunta tiene un límite de tiempo:
  - Fácil/Medio: 30 segundos
  - Difícil: 20 segundos
• Recibirás feedback inmediato después de cada respuesta

🎯 Materias incluidas:
• Lengua (recursos literarios, acentuación)
• Matemática (números hasta 9.999.999)
• Ciencias Sociales (Invasiones Inglesas)
• Ciencias Naturales (hidrosfera, ciclo del agua)

💡 Sistema de puntos:
• Respuesta correcta: puntos según tiempo restante
• Respuesta incorrecta: 0 puntos
• Sin respuesta: 0 puntos

🏆 Al final verás tu puntaje y el ranking de mejores jugadores`

// Methods
const seleccionarDificultad = (nivel: 'facil' | 'medio' | 'dificil') => {
  dificultad.value = nivel
  iniciarJuego()
}

const iniciarJuego = () => {
  if (!dificultad.value) return
  
  // Filtrar preguntas por dificultad
  const preguntasFiltradas = preguntasData.preguntas.filter(
    (p: Pregunta) => p.dificultad === dificultad.value
  )
  
  // Si no hay suficientes preguntas de la dificultad seleccionada, incluir otras
  let preguntasSeleccionadas: Pregunta[]
  if (preguntasFiltradas.length >= 20) {
    preguntasSeleccionadas = selectRandomItems(preguntasFiltradas, 20)
  } else {
    // Mezclar dificultades cercanas
    const todasPreguntas = preguntasData.preguntas as Pregunta[]
    preguntasSeleccionadas = selectRandomItems(todasPreguntas, 20)
  }
  
  // Mezclar opciones de cada pregunta
  preguntas.value = preguntasSeleccionadas.map(p => shuffleQuestionOptions(p) as Pregunta)
  
  preguntaActual.value = 0
  puntaje.value = 0
  respuestasCorrectas.value = 0
  tiempoRestante.value = tiempoLimite.value
  juegoIniciado.value = true
  juegoTerminado.value = false
  respuestaSeleccionada.value = null
  tiemposPorPregunta.value = []
  
  iniciarTimer()
}

const iniciarTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  timerInterval = window.setInterval(() => {
    if (tiempoRestante.value > 0) {
      tiempoRestante.value--
    } else {
      // Tiempo agotado, avanzar a siguiente pregunta
      procesarRespuesta(null)
    }
  }, 1000)
}

const seleccionarRespuesta = (index: number) => {
  if (respuestaSeleccionada.value !== null) return
  respuestaSeleccionada.value = index
  
  // Detener timer
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  // Procesar respuesta después de un breve momento
  setTimeout(() => {
    procesarRespuesta(index)
  }, 500)
}

const procesarRespuesta = (index: number | null) => {
  const pregunta = preguntaActualData.value
  if (!pregunta) return
  
  const esCorrecta = index !== null && pregunta.opciones[index]?.correcto === true
  
  // Guardar tiempo usado para esta pregunta
  if (esCorrecta) {
    tiemposPorPregunta.value.push(tiempoRestante.value)
    respuestasCorrectas.value++
    
    // Calcular puntos: base + bonus por tiempo
    const puntosBase = 10
    const bonusTiempo = Math.floor(tiempoRestante.value / 2)
    puntaje.value += puntosBase + bonusTiempo
  } else {
    tiemposPorPregunta.value.push(-1) // Marca como incorrecta
  }
  
  // Mostrar feedback
  feedbackCorrect.value = esCorrecta
  if (esCorrecta) {
    feedbackMessage.value = pregunta.explicacion || '¡Correcto! ✓'
  } else if (index !== null) {
    const respuestaCorrecta = pregunta.opciones.find(o => o.correcto)?.texto
    feedbackMessage.value = `Incorrecto. La respuesta correcta es: ${respuestaCorrecta}.${pregunta.explicacion ? ' ' + pregunta.explicacion : ''}`
  } else {
    const respuestaCorrecta = pregunta.opciones.find(o => o.correcto)?.texto
    feedbackMessage.value = `Tiempo agotado. La respuesta correcta era: ${respuestaCorrecta}.${pregunta.explicacion ? ' ' + pregunta.explicacion : ''}`
  }
  showFeedback.value = true
}

const siguientePregunta = () => {
  showFeedback.value = false
  respuestaSeleccionada.value = null
  
  if (preguntaActual.value < preguntas.value.length - 1) {
    preguntaActual.value++
    tiempoRestante.value = tiempoLimite.value
    iniciarTimer()
  } else {
    terminarJuego()
  }
}

const terminarJuego = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  juegoTerminado.value = true
}

const guardarPuntaje = () => {
  if (!nombreJugador.value.trim()) {
    alert('Por favor ingresa tu nombre')
    return
  }
  
  const nuevoRanking: Ranking = {
    nombre: nombreJugador.value.trim(),
    puntaje: puntaje.value,
    fecha: new Date().toLocaleDateString()
  }
  
  const rankingActual = ranking.value
  rankingActual.push(nuevoRanking)
  rankingActual.sort((a, b) => b.puntaje - a.puntaje)
  
  // Guardar solo los mejores 10
  const top10 = rankingActual.slice(0, 10)
  localStorage.setItem('quiz-rapido-ranking', JSON.stringify(top10))
  
  nombreJugador.value = ''
}

const reiniciarJuego = () => {
  dificultad.value = null
  juegoIniciado.value = false
  juegoTerminado.value = false
  preguntaActual.value = 0
  puntaje.value = 0
  respuestasCorrectas.value = 0
  tiempoRestante.value = 30
  respuestaSeleccionada.value = null
  tiemposPorPregunta.value = []
  
  if (timerInterval) {
    clearInterval(timerInterval)
  }
}

const volverAlMenu = () => {
  reiniciarJuego()
  router.push('/juegos')
}

// Cleanup
onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
})
</script>

<template>
  <GameLayout 
    title="Quiz Rápido Unidad 1" 
    :instructions="instructions"
    @home="volverAlMenu"
  >
    <!-- Selector de Dificultad -->
    <div v-if="!juegoIniciado && !juegoTerminado" class="max-w-2xl mx-auto">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-3xl mb-4">🎯 Selecciona la Dificultad</h2>
          <p class="mb-6">Elige el nivel de desafío para tu quiz</p>
          
          <div class="flex flex-col md:flex-row gap-4 w-full max-w-xl">
            <button 
              @click="seleccionarDificultad('facil')"
              class="btn btn-success btn-lg flex-1"
            >
              <span class="text-2xl">😊</span>
              <div class="text-left">
                <div class="font-bold">Fácil</div>
                <div class="text-xs opacity-70">30 segundos por pregunta</div>
              </div>
            </button>
            
            <button 
              @click="seleccionarDificultad('medio')"
              class="btn btn-warning btn-lg flex-1"
            >
              <span class="text-2xl">🤔</span>
              <div class="text-left">
                <div class="font-bold">Medio</div>
                <div class="text-xs opacity-70">30 segundos por pregunta</div>
              </div>
            </button>
            
            <button 
              @click="seleccionarDificultad('dificil')"
              class="btn btn-error btn-lg flex-1"
            >
              <span class="text-2xl">😰</span>
              <div class="text-left">
                <div class="font-bold">Difícil</div>
                <div class="text-xs opacity-70">20 segundos por pregunta</div>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Ranking Preview -->
      <div v-if="mejoresPuntajes.length > 0" class="card bg-base-200 shadow-xl mt-6">
        <div class="card-body">
          <h3 class="card-title">🏆 Mejores Puntajes</h3>
          <div class="space-y-2">
            <div 
              v-for="(record, index) in mejoresPuntajes" 
              :key="index"
              class="flex justify-between items-center p-2 rounded"
              :class="index === 0 ? 'bg-warning text-warning-content' : index === 1 ? 'bg-base-300' : index === 2 ? 'bg-base-300' : 'bg-base-100'"
            >
              <div class="flex items-center gap-2">
                <span class="font-bold">{{ index + 1 }}.</span>
                <span>{{ record.nombre }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="badge badge-primary">{{ record.puntaje }} pts</span>
                <span class="text-xs opacity-70">{{ record.fecha }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Juego Activo -->
    <div v-else-if="juegoIniciado && !juegoTerminado" class="max-w-4xl mx-auto">
      <!-- Header con Info -->
      <div class="flex justify-between items-center mb-6">
        <ScoreBoard 
          :score="puntaje" 
          :correct-answers="respuestasCorrectas"
          :total-questions="20"
        />
        
        <div class="flex items-center gap-4">
          <div class="badge badge-lg badge-info">
            Pregunta {{ preguntaActual + 1 }}/20
          </div>
          <div :class="['text-3xl font-bold', timerColor]">
            ⏱️ {{ tiempoRestante }}s
          </div>
        </div>
      </div>

      <!-- Barra de Progreso -->
      <div class="mb-6">
        <div class="flex justify-between text-sm mb-1">
          <span>Progreso</span>
          <span>{{ progreso }}%</span>
        </div>
        <progress class="progress progress-primary w-full" :value="progreso" max="100"></progress>
      </div>

      <!-- Pregunta Actual -->
      <div v-if="preguntaActualData" class="card bg-base-200 shadow-xl">
        <div class="card-body">
          <div class="flex items-start gap-4 mb-6">
            <div class="badge badge-lg" :class="{
              'badge-success': preguntaActualData.materia === 'Lengua',
              'badge-primary': preguntaActualData.materia === 'Matemática',
              'badge-warning': preguntaActualData.materia === 'Ciencias Sociales',
              'badge-info': preguntaActualData.materia === 'Ciencias Naturales'
            }">
              {{ preguntaActualData.materia }}
            </div>
            <h3 class="text-2xl font-bold flex-1">{{ preguntaActualData.pregunta }}</h3>
          </div>

          <!-- Opciones -->
          <div class="space-y-3">
            <button
              v-for="(opcion, index) in preguntaActualData.opciones"
              :key="index"
              @click="seleccionarRespuesta(index)"
              class="btn btn-lg w-full justify-start text-left h-auto min-h-[4rem] whitespace-normal"
              :class="{
                'btn-primary': respuestaSeleccionada === index && opcion.correcto,
                'btn-error': respuestaSeleccionada === index && !opcion.correcto,
                'btn-outline': respuestaSeleccionada !== index
              }"
              :disabled="respuestaSeleccionada !== null"
            >
              <span class="font-bold mr-2">{{ String.fromCharCode(65 + index) }}.</span>
              <span class="flex-1">{{ opcion.texto }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pantalla Final / Podio -->
    <div v-else-if="juegoTerminado" class="max-w-4xl mx-auto">
      <div class="card bg-base-200 shadow-xl">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-4xl mb-4">🎉 ¡Quiz Completado!</h2>
          
          <!-- Estadísticas Principales -->
          <div class="stats stats-vertical lg:stats-horizontal shadow mb-6">
            <div class="stat">
              <div class="stat-figure text-primary text-4xl">🏆</div>
              <div class="stat-title">Puntaje Total</div>
              <div class="stat-value text-primary">{{ puntaje }}</div>
              <div class="stat-desc">puntos obtenidos</div>
            </div>
            
            <div class="stat">
              <div class="stat-figure text-success text-4xl">✓</div>
              <div class="stat-title">Respuestas Correctas</div>
              <div class="stat-value text-success">{{ respuestasCorrectas }}/20</div>
              <div class="stat-desc">{{ Math.round((respuestasCorrectas / 20) * 100) }}% de acierto</div>
            </div>
            
            <div class="stat">
              <div class="stat-figure text-info text-4xl">⭐</div>
              <div class="stat-title">Nivel</div>
              <div class="stat-value text-info capitalize">{{ dificultad }}</div>
              <div class="stat-desc">dificultad seleccionada</div>
            </div>
          </div>

          <!-- Estadísticas por Materia -->
          <div class="w-full mb-6">
            <h3 class="text-xl font-bold mb-4">📊 Rendimiento por Materia</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="(stats, materia) in estadisticasPorMateria" 
                :key="materia"
                class="card bg-base-100"
              >
                <div class="card-body p-4">
                  <h4 class="font-bold">{{ materia }}</h4>
                  <div class="flex justify-between items-center">
                    <span>{{ stats.correctas }}/{{ stats.total }} correctas</span>
                    <span class="badge" :class="{
                      'badge-success': stats.correctas === stats.total,
                      'badge-warning': stats.correctas >= stats.total / 2,
                      'badge-error': stats.correctas < stats.total / 2
                    }">
                      {{ Math.round((stats.correctas / stats.total) * 100) }}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Guardar en Ranking -->
          <div class="w-full max-w-md mb-6">
            <h3 class="text-xl font-bold mb-4">💾 Guardar en Ranking</h3>
            <div class="join w-full">
              <input 
                v-model="nombreJugador"
                type="text" 
                placeholder="Tu nombre"
                class="input input-bordered join-item w-full"
                @keyup.enter="guardarPuntaje"
              />
              <button 
                @click="guardarPuntaje"
                class="btn btn-primary join-item"
              >
                Guardar
              </button>
            </div>
          </div>

          <!-- Ranking Actual -->
          <div v-if="mejoresPuntajes.length > 0" class="w-full max-w-md mb-6">
            <h3 class="text-xl font-bold mb-4">🏆 Top 5 Mejores Puntajes</h3>
            <div class="space-y-2">
              <div 
                v-for="(record, index) in mejoresPuntajes" 
                :key="index"
                class="flex justify-between items-center p-3 rounded"
                :class="{
                  'bg-warning text-warning-content': index === 0,
                  'bg-neutral text-neutral-content': index === 1,
                  'bg-accent text-accent-content': index === 2,
                  'bg-base-100': index > 2
                }"
              >
                <div class="flex items-center gap-3">
                  <span class="text-2xl">
                    {{ index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.` }}
                  </span>
                  <span class="font-bold">{{ record.nombre }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="badge badge-lg">{{ record.puntaje }} pts</span>
                  <span class="text-xs opacity-70">{{ record.fecha }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Botones de Acción -->
          <div class="flex gap-4">
            <button @click="reiniciarJuego" class="btn btn-primary btn-lg">
              🔄 Jugar Otra Vez
            </button>
            <button @click="volverAlMenu" class="btn btn-outline btn-lg">
              🏠 Volver al Menú
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedback Modal -->
    <FeedbackModal
      :show="showFeedback"
      :is-correct="feedbackCorrect"
      :message="feedbackMessage"
      @close="siguientePregunta"
    />
  </GameLayout>
</template>

<style scoped>
/* Animaciones para transiciones suaves */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
