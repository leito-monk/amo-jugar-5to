<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GameLayout from '../../components/game/GameLayout.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
import eventosData from './eventos.json'

// Types
interface Evento {
  id: string
  titulo: string
  año: number
  descripcion: string
  imagen: string
  categoria: string
  relacionadoCon: string[]
  esencia: string
  placed?: boolean
  correct?: boolean
}

interface QuizQuestion {
  pregunta: string
  opciones: string[]
  correcta: number
  explicacion: string
}

interface Connection {
  from: string
  to: string
  type: string
}

// State
const events = ref<Evento[]>([])
const placedEvents = ref<Map<number, Evento>>(new Map())
const draggedEvent = ref<Evento | null>(null)
const showConnections = ref(false)
const connections = ref<Connection[]>([])
const quizActive = ref(false)
const quizAnswers = ref<(number | null)[]>([])
const score = ref(0)
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const quizCompleted = ref(false)

// Constants
const START_YEAR = 1700
const END_YEAR = 1810
const TOLERANCE = 5

// Computed
const quizFinal = computed(() => eventosData.quizFinal as QuizQuestion[])
const allPlaced = computed(() => events.value.every(e => e.placed))
const years = computed(() => {
  const yearList = []
  for (let year = START_YEAR; year <= END_YEAR; year += 10) {
    yearList.push(year)
  }
  return yearList
})

// Instructions
const instructions = `🕰️ ¡Bienvenido a la Línea del Tiempo!

1. Observa los eventos históricos del Siglo XVIII
2. Arrastra cada evento a su posición correcta en la línea del tiempo
3. Tienes una tolerancia de ±5 años para colocar cada evento
4. Al completar todos los eventos, verás las conexiones entre ellos
5. Finalmente, responde el quiz para consolidar tu aprendizaje

📊 Sistema de puntos:
• Colocación correcta: +15 puntos por evento
• Quiz: +10 puntos por respuesta correcta

🎯 Objetivo: Comprender la cronología y las relaciones causa-efecto entre los eventos del Siglo XVIII`

// Methods
const getXPos = (year: number): number => {
  const totalYears = END_YEAR - START_YEAR
  const yearOffset = year - START_YEAR
  return (yearOffset / totalYears) * 100
}

const dragEvent = (event: Evento) => {
  draggedEvent.value = event
}

const handleDrop = (event: DragEvent, year: number) => {
  event.preventDefault()
  
  if (!draggedEvent.value) return
  
  const diff = Math.abs(draggedEvent.value.año - year)
  
  if (diff <= TOLERANCE) {
    // Correct placement
    draggedEvent.value.placed = true
    draggedEvent.value.correct = true
    placedEvents.value.set(year, draggedEvent.value)
    score.value += 15
    
    feedbackCorrect.value = true
    feedbackMessage.value = `¡Excelente! Colocaste "${draggedEvent.value.titulo}" correctamente.\n\nAño correcto: ${draggedEvent.value.año}\n\n+15 puntos`
    showFeedback.value = true
    
    // Check if all events are placed
    if (allPlaced.value) {
      showConnections.value = true
      generateConnections()
    }
  } else {
    // Incorrect placement
    feedbackCorrect.value = false
    feedbackMessage.value = `No es el año correcto.\n\n"${draggedEvent.value.titulo}" ocurrió en ${draggedEvent.value.año}.\n\nIntenta colocarlo más cerca de ese año.`
    showFeedback.value = true
  }
  
  draggedEvent.value = null
}

const generateConnections = () => {
  connections.value = []
  events.value.forEach(evento => {
    evento.relacionadoCon.forEach(relId => {
      connections.value.push({
        from: evento.id,
        to: relId,
        type: evento.esencia
      })
    })
  })
  
  // Show quiz after a short delay
  setTimeout(() => {
    quizActive.value = true
  }, 2000)
}

const getConnectionPath = (conn: Connection): string => {
  const fromEvent = events.value.find(e => e.id === conn.from)
  const toEvent = events.value.find(e => e.id === conn.to)
  
  if (!fromEvent || !toEvent) return ''
  
  const fromX = getXPos(fromEvent.año)
  const toX = getXPos(toEvent.año)
  
  // Create a curved path between events
  const y = 50 // Middle of timeline
  const controlPointOffset = 30
  
  return `M ${fromX} ${y} Q ${(fromX + toX) / 2} ${y - controlPointOffset} ${toX} ${y}`
}

const answerQuiz = (questionIndex: number, optionIndex: number) => {
  quizAnswers.value[questionIndex] = optionIndex
  
  const question = quizFinal.value[questionIndex]
  if (!question) return
  
  const isCorrect = optionIndex === question.correcta
  
  if (isCorrect) {
    score.value += 10
    feedbackCorrect.value = true
    feedbackMessage.value = `¡Correcto! +10 puntos\n\n${question.explicacion}`
  } else {
    feedbackCorrect.value = false
    feedbackMessage.value = `No es correcto.\n\n${question.explicacion}`
  }
  
  showFeedback.value = true
  
  // Check if all questions answered
  if (quizAnswers.value.filter(a => a !== null).length === quizFinal.value.length) {
    setTimeout(() => {
      quizCompleted.value = true
    }, 1000)
  }
}

const closeFeedback = () => {
  showFeedback.value = false
}

const resetGame = () => {
  events.value = eventosData.eventos.map(e => ({ ...e, placed: false, correct: false }))
  placedEvents.value.clear()
  draggedEvent.value = null
  showConnections.value = false
  connections.value = []
  quizActive.value = false
  quizAnswers.value = []
  score.value = 0
  quizCompleted.value = false
}

// Lifecycle
onMounted(() => {
  events.value = eventosData.eventos.map(e => ({ ...e, placed: false, correct: false }))
})
</script>

<template>
  <GameLayout
    title="🕰️ Línea del Tiempo Interactiva"
    :instructions="instructions"
  >
    <div class="space-y-6">
      <!-- Score -->
      <div class="flex justify-between items-center bg-base-100 p-4 rounded-lg shadow-md">
        <div class="flex items-center gap-4">
          <div class="badge badge-lg badge-primary">
            Puntos: {{ score }}
          </div>
          <div class="badge badge-lg badge-accent">
            Colocados: {{ events.filter(e => e.placed).length }}/{{ events.length }}
          </div>
        </div>
        <button
          v-if="quizCompleted"
          class="btn btn-primary btn-sm"
          @click="resetGame"
        >
          Reiniciar
        </button>
      </div>

      <!-- Timeline Container -->
      <div class="timeline-container bg-base-100 p-6 rounded-lg shadow-xl">
        <div class="timeline-scroll">
          <!-- Timeline SVG -->
          <svg class="timeline-line" viewBox="0 0 100 100" preserveAspectRatio="none">
            <!-- Main line -->
            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" stroke-width="0.5" class="text-base-content" />
            
            <!-- Year markers -->
            <g v-for="year in years" :key="year">
              <line
                :x1="getXPos(year)"
                :y1="40"
                :x2="getXPos(year)"
                :y2="60"
                stroke="currentColor"
                stroke-width="0.5"
                class="text-base-content"
              />
              <text
                :x="getXPos(year)"
                y="75"
                text-anchor="middle"
                class="text-xs fill-current text-base-content"
                font-size="4"
              >
                {{ year }}
              </text>
            </g>
          </svg>
          
          <!-- Drop zones -->
          <div class="drop-zones">
            <div
              v-for="year in years"
              :key="`drop-${year}`"
              class="drop-zone"
              :style="{ left: getXPos(year) + '%' }"
              @drop="handleDrop($event, year)"
              @dragover.prevent
            >
              <div v-if="placedEvents.get(year)" class="event-card-placed">
                <div class="text-xs font-bold">{{ placedEvents.get(year)?.titulo }}</div>
                <div class="text-xs opacity-70">{{ placedEvents.get(year)?.año }}</div>
              </div>
            </div>
          </div>
          
          <!-- Connections overlay -->
          <svg v-if="showConnections" class="connections-layer" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" viewBox="0 0 10 10">
                <path d="M0,0 L10,5 L0,10 Z" fill="currentColor" class="text-primary" />
              </marker>
            </defs>
            <path
              v-for="(conn, idx) in connections"
              :key="`conn-${idx}`"
              :d="getConnectionPath(conn)"
              stroke="currentColor"
              :class="conn.type === 'causa' ? 'text-info' : 'text-success'"
              stroke-width="0.3"
              fill="none"
              marker-end="url(#arrow)"
            />
          </svg>
        </div>
      </div>

      <!-- Events Bank -->
      <div class="events-bank bg-base-100 p-6 rounded-lg shadow-xl">
        <h3 class="text-xl font-bold mb-4">📚 Arrastra cada evento a su año en la línea del tiempo</h3>
        
        <div v-if="allPlaced && showConnections" class="alert alert-success mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>¡Excelente! Has completado la línea del tiempo. Observa las conexiones entre eventos.</span>
        </div>
        
        <div class="event-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="event in events"
            v-show="!event.placed"
            :key="event.id"
            class="event-card card bg-base-200 shadow-md hover:shadow-xl transition-all cursor-move"
            draggable="true"
            @dragstart="dragEvent(event)"
          >
            <div class="card-body p-4">
              <div class="flex items-start gap-2">
                <span class="text-2xl">📜</span>
                <div class="flex-1">
                  <h4 class="card-title text-base">{{ event.titulo }}</h4>
                  <p class="text-sm text-base-content/70 mt-2">{{ event.descripcion }}</p>
                  <div class="mt-2">
                    <span class="badge badge-sm" :class="{
                      'badge-primary': event.categoria === 'revolucion',
                      'badge-secondary': event.categoria === 'independencia',
                      'badge-accent': event.categoria === 'imperio',
                      'badge-info': event.categoria === 'conflicto'
                    }">
                      {{ event.categoria }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div v-if="events.filter(e => !e.placed).length === 0 && !allPlaced" class="col-span-full text-center py-8 text-base-content/50">
            Arrastrando eventos...
          </div>
        </div>
      </div>
    </div>

    <!-- Quiz Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="quizActive" class="modal modal-open">
          <div class="modal-box max-w-3xl">
            <h2 class="text-2xl font-bold mb-4">📝 Quiz Final</h2>
            
            <div v-if="!quizCompleted" class="space-y-6">
              <div
                v-for="(q, idx) in quizFinal"
                :key="`quiz-${idx}`"
                class="quiz-question"
              >
                <p class="font-semibold mb-3">{{ idx + 1 }}. {{ q.pregunta }}</p>
                <div class="flex flex-col gap-2">
                  <button
                    v-for="(opc, i) in q.opciones"
                    :key="`opt-${idx}-${i}`"
                    class="btn btn-outline justify-start"
                    :class="{
                      'btn-success': quizAnswers[idx] === i && i === q.correcta,
                      'btn-error': quizAnswers[idx] === i && i !== q.correcta,
                      'btn-disabled': quizAnswers[idx] !== null && quizAnswers[idx] !== undefined
                    }"
                    :disabled="quizAnswers[idx] !== null && quizAnswers[idx] !== undefined"
                    @click="answerQuiz(idx, i)"
                  >
                    {{ opc }}
                  </button>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8">
              <div class="text-6xl mb-4">🎉</div>
              <h3 class="text-2xl font-bold mb-2">¡Felicitaciones!</h3>
              <p class="text-lg mb-4">Has completado la Línea del Tiempo Interactiva</p>
              <div class="stats shadow">
                <div class="stat">
                  <div class="stat-title">Puntuación Final</div>
                  <div class="stat-value text-primary">{{ score }}</div>
                </div>
              </div>
              <div class="modal-action justify-center">
                <button class="btn btn-primary" @click="quizActive = false">
                  Ver Timeline
                </button>
                <button class="btn btn-outline" @click="resetGame">
                  Jugar de Nuevo
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Feedback Modal -->
    <FeedbackModal
      :show="showFeedback"
      :is-correct="feedbackCorrect"
      :message="feedbackMessage"
      @close="closeFeedback"
    />
  </GameLayout>
</template>

<style scoped>
.timeline-container {
  min-height: 200px;
}

.timeline-scroll {
  position: relative;
  min-height: 150px;
  overflow-x: auto;
  padding: 20px 0;
}

.timeline-line {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
}

.drop-zones {
  position: relative;
  height: 120px;
  margin-top: -100px;
}

.drop-zone {
  position: absolute;
  width: 80px;
  height: 100%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.drop-zone:hover {
  background-color: rgba(79, 70, 229, 0.1);
  border-radius: 8px;
}

.event-card-placed {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.2), rgba(139, 92, 246, 0.2));
  border: 2px solid rgba(79, 70, 229, 0.5);
  border-radius: 8px;
  padding: 8px;
  text-align: center;
  max-width: 100px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: placeEvent 0.3s ease;
}

@keyframes placeEvent {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.connections-layer {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  height: 100px;
  pointer-events: none;
  opacity: 0.7;
}

.event-card {
  cursor: grab;
  transition: all 0.3s ease;
}

.event-card:active {
  cursor: grabbing;
  transform: scale(1.05);
}

.event-card:hover {
  transform: translateY(-4px);
}

.events-bank {
  max-height: 600px;
  overflow-y: auto;
}

.quiz-question {
  padding: 20px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.9);
}
</style>
