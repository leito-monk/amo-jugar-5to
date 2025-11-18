<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GameLayout from '../../components/game/GameLayout.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
import journeyData from './journey.json'
import EvaporationAnimation from './animations/EvaporationAnimation.vue'
import CondensationAnimation from './animations/CondensationAnimation.vue'
import PrecipitationAnimation from './animations/PrecipitationAnimation.vue'
import InfiltrationAnimation from './animations/InfiltrationAnimation.vue'

// Types
interface Pregunta {
  texto: string
  opciones: string[]
  correcta: number
  explicacion: string
}

interface Opcion {
  texto: string
  siguienteEtapa: string
  proceso: string | null
  pregunta?: Pregunta
}

interface Etapa {
  id: string
  titulo: string
  descripcion: string
  imagen: string
  proceso: string | null
  animacion?: string
  opciones: Opcion[]
  esFinal?: boolean
}

interface Experimento {
  id: string
  titulo: string
  descripcion: string
  tipo: string
  minTemp: number
  maxTemp: number
  observacion: string
}

interface JourneyData {
  etapas: Etapa[]
  experimentos: Experimento[]
}

// State
const etapas = ref<Etapa[]>((journeyData as JourneyData).etapas)
const experimentos = ref<Experimento[]>((journeyData as JourneyData).experimentos)
const currentStageId = ref('inicio')
const journeyPath = ref<Etapa[]>([])
const currentQuestion = ref<Pregunta | null>(null)
const pendingNextStage = ref<string | null>(null)
const showExperiment = ref(false)
const experimentData = ref<Experimento | null>(null)
const tempValue = ref(50)
const journeyComplete = ref(false)
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')

// Computed
const currentStage = computed(() => {
  return etapas.value.find(e => e.id === currentStageId.value) || etapas.value[0]
})

const uniqueProcesses = computed(() => {
  const processes = journeyPath.value
    .map(stage => stage.proceso)
    .filter(p => p !== null) as string[]
  return [...new Set(processes)].map(p => getProcesoLabel(p))
})

// Instructions
const instructions = `🌊 ¡Bienvenido a la Gran Aventura del Ciclo del Agua!

En este juego, TÚ eres una gota de agua que viaja por todo el ciclo del agua.

📖 Cómo jugar:
1. Lee la historia en cada etapa
2. Elige tu camino (diferentes procesos del ciclo)
3. Responde preguntas sobre los procesos
4. Observa las animaciones de cada proceso
5. Al final, verás tu viaje completo

💧 Procesos que aprenderás:
• Evaporación: Agua líquida → vapor
• Condensación: Vapor → gotitas en nubes
• Precipitación: Lluvia, nieve, etc.
• Infiltración: Agua que entra al suelo
• Escorrentía: Agua que fluye por la superficie

🎯 Objetivo: Completar el ciclo del agua y aprender sobre cada proceso`

// Animation component mapping
const animationComponents: Record<string, any> = {
  evaporation: EvaporationAnimation,
  condensation: CondensationAnimation,
  precipitation: PrecipitationAnimation,
  infiltration: InfiltrationAnimation
}

// Methods
const getAnimation = (animationName: string) => {
  return animationComponents[animationName] || null
}

const getProcesoLabel = (proceso: string) => {
  const labels: Record<string, string> = {
    evaporacion: 'Evaporación',
    condensacion: 'Condensación',
    precipitacion: 'Precipitación',
    infiltracion: 'Infiltración',
    escorrentia: 'Escorrentía'
  }
  return labels[proceso] || proceso
}

const getProcesoBadgeColor = (proceso: string | null) => {
  if (!proceso) return 'badge-neutral'
  
  const colors: Record<string, string> = {
    evaporacion: 'badge-warning',
    condensacion: 'badge-info',
    precipitacion: 'badge-primary',
    infiltracion: 'badge-accent',
    escorrentia: 'badge-secondary'
  }
  return colors[proceso] || 'badge-neutral'
}

const selectChoice = (opcion: Opcion) => {
  if (opcion.pregunta) {
    currentQuestion.value = opcion.pregunta
    pendingNextStage.value = opcion.siguienteEtapa
  } else {
    avanzar(opcion.siguienteEtapa)
  }
}

const answerQuestion = (index: number) => {
  if (!currentQuestion.value) return
  
  const isCorrect = index === currentQuestion.value.correcta
  
  if (isCorrect) {
    feedbackCorrect.value = true
    feedbackMessage.value = `¡Correcto! 🎉\n\n${currentQuestion.value.explicacion}`
    showFeedback.value = true
    
    // Offer optional experiment
    setTimeout(() => {
      if (pendingNextStage.value) {
        currentQuestion.value = null
        avanzar(pendingNextStage.value)
        pendingNextStage.value = null
      }
    }, 100)
  } else {
    feedbackCorrect.value = false
    feedbackMessage.value = `No es correcto. ¡Intenta de nuevo! 💪\n\nPista: ${currentQuestion.value.explicacion}`
    showFeedback.value = true
  }
}

const avanzar = (siguienteId: string) => {
  // Add current stage to journey path
  const current = currentStage.value
  if (current && !journeyPath.value.find(s => s.id === current.id)) {
    journeyPath.value.push(current)
  }
  
  currentStageId.value = siguienteId
  
  // Check if final stage
  const nextStage = etapas.value.find(e => e.id === siguienteId)
  if (nextStage?.esFinal) {
    journeyPath.value.push(nextStage)
    journeyComplete.value = true
  }
}

const showExperimentModal = () => {
  const firstExperiment = experimentos.value[0]
  if (firstExperiment) {
    experimentData.value = firstExperiment
    showExperiment.value = true
  }
}

const closeExperiment = () => {
  showExperiment.value = false
  experimentData.value = null
}

const getEvaporationClass = (temp: number) => {
  if (temp < 30) return 'evaporation-slow'
  if (temp < 60) return 'evaporation-medium'
  return 'evaporation-fast'
}

const restartJourney = () => {
  currentStageId.value = 'inicio'
  journeyPath.value = []
  currentQuestion.value = null
  pendingNextStage.value = null
  journeyComplete.value = false
  tempValue.value = 50
}

const finishGame = () => {
  // Could emit an event or navigate away
  console.log('Game finished!')
}

const closeFeedback = () => {
  showFeedback.value = false
}

onMounted(() => {
  // Initialize game
  journeyPath.value = []
})
</script>

<template>
  <GameLayout
    title="🌊 Ciclo del Agua: La Gran Aventura"
    :instructions="instructions"
  >
    <div class="space-y-6">
      <!-- Journey Container -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Story Panel -->
        <div class="lg:col-span-2">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <!-- Stage Image with Animation -->
              <div v-if="currentStage" class="stage-image relative bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg overflow-hidden h-64 flex items-center justify-center">
                <div class="text-9xl">{{ currentStage.imagen }}</div>
                
                <!-- Animation Overlay -->
                <div v-if="currentStage.animacion" class="animation-layer absolute inset-0">
                  <component :is="getAnimation(currentStage.animacion)" />
                </div>
              </div>
              
              <!-- Story Text -->
              <div v-if="currentStage" class="story-text mt-6 space-y-4">
                <h2 class="text-3xl font-bold text-primary">{{ currentStage.titulo }}</h2>
                <p class="text-lg leading-relaxed">{{ currentStage.descripcion }}</p>
                
                <!-- Process Badge -->
                <div v-if="currentStage.proceso" class="flex items-center gap-2">
                  <span class="badge badge-lg" :class="getProcesoBadgeColor(currentStage.proceso)">
                    📌 Proceso: {{ getProcesoLabel(currentStage.proceso) }}
                  </span>
                </div>
              </div>
              
              <!-- Choices -->
              <div v-if="currentStage && !journeyComplete && currentStage.opciones.length > 0" class="choices mt-6 space-y-3">
                <h3 class="text-xl font-semibold mb-4">¿Qué haces ahora?</h3>
                <button
                  v-for="(opcion, index) in currentStage.opciones"
                  :key="index"
                  @click="selectChoice(opcion)"
                  class="choice-btn btn btn-lg btn-outline btn-primary w-full justify-start text-left transition-all hover:scale-105"
                >
                  <span class="text-xl">{{ opcion.texto }}</span>
                </button>
              </div>

              <!-- Experiment Button (optional) -->
              <div v-if="currentStage && currentStage.proceso === 'evaporacion' && !journeyComplete" class="mt-4">
                <button @click="showExperimentModal" class="btn btn-sm btn-accent btn-outline">
                  🧪 Ver experimento virtual
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Journey Map Sidebar -->
        <div class="lg:col-span-1">
          <div class="card bg-base-100 shadow-xl sticky top-20">
            <div class="card-body">
              <h3 class="card-title text-lg flex items-center gap-2">
                🗺️ Tu Viaje
              </h3>
              
              <div class="journey-steps mt-4 space-y-2 max-h-96 overflow-y-auto">
                <div
                  v-for="(step, index) in journeyPath"
                  :key="step.id"
                  class="step p-3 bg-base-200 rounded-lg transition-all hover:bg-base-300"
                >
                  <div class="flex items-start gap-2">
                    <span class="badge badge-sm badge-primary">{{ index + 1 }}</span>
                    <div class="flex-1">
                      <div class="font-semibold text-sm">{{ step.titulo }}</div>
                      <div v-if="step.proceso" class="text-xs mt-1 opacity-70">
                        → {{ getProcesoLabel(step.proceso) }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div v-if="journeyPath.length === 0" class="text-center text-base-content/50 py-8">
                  Tu viaje comenzará pronto...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Question Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="currentQuestion"
          class="modal modal-open"
        >
          <div class="modal-box max-w-2xl">
            <h3 class="font-bold text-2xl mb-4">💭 Pregunta</h3>
            <p class="text-lg mb-6">{{ currentQuestion.texto }}</p>
            
            <div class="quiz-options space-y-3">
              <button
                v-for="(opc, i) in currentQuestion.opciones"
                :key="i"
                @click="answerQuestion(i)"
                class="btn btn-lg btn-outline w-full justify-start text-left hover:btn-primary"
              >
                {{ opc }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Experiment Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showExperiment && experimentData"
          class="modal modal-open"
        >
          <div class="modal-box max-w-2xl">
            <button
              @click="closeExperiment"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            
            <h3 class="font-bold text-2xl mb-2">{{ experimentData.titulo }}</h3>
            <p class="mb-6">{{ experimentData.descripcion }}</p>
            
            <div v-if="experimentData.tipo === 'slider'" class="experiment-slider space-y-4">
              <div class="form-control">
                <label class="label">
                  <span class="label-text text-lg font-semibold">Temperatura: {{ tempValue }}°C</span>
                </label>
                <input
                  type="range"
                  v-model.number="tempValue"
                  :min="experimentData.minTemp"
                  :max="experimentData.maxTemp"
                  class="range range-primary"
                />
                <div class="w-full flex justify-between text-xs px-2 mt-1">
                  <span>{{ experimentData.minTemp }}°C</span>
                  <span>{{ experimentData.maxTemp }}°C</span>
                </div>
              </div>
              
              <div class="simulation bg-gradient-to-b from-sky-100 to-blue-200 rounded-lg p-8 min-h-[200px] flex items-center justify-center">
                <div class="water-container relative" :class="getEvaporationClass(tempValue)">
                  <div class="text-6xl">💧💧💧</div>
                  <div v-if="tempValue > 30" class="vapor-effect">
                    <div class="text-4xl opacity-60 animate-pulse">☁️ ☁️</div>
                  </div>
                </div>
              </div>
              
              <div class="alert alert-info">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{{ experimentData.observacion }}</span>
              </div>
            </div>
            
            <div class="modal-action">
              <button @click="closeExperiment" class="btn btn-primary">
                Continuar mi viaje
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Summary Modal (Journey Complete) -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="journeyComplete"
          class="modal modal-open"
        >
          <div class="modal-box max-w-3xl">
            <h2 class="text-4xl font-bold text-center mb-6">
              🌍 ¡Completaste el Ciclo del Agua! 🎉
            </h2>
            
            <div class="journey-summary space-y-6">
              <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div class="stat">
                  <div class="stat-figure text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  <div class="stat-title">Etapas visitadas</div>
                  <div class="stat-value text-primary">{{ journeyPath.length }}</div>
                </div>
              </div>
              
              <div>
                <h3 class="text-xl font-semibold mb-3">🔬 Procesos experimentados:</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="proceso in uniqueProcesses"
                    :key="proceso"
                    class="badge badge-lg badge-primary"
                  >
                    {{ proceso }}
                  </span>
                </div>
              </div>
              
              <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>¡Excelente! Ahora comprendes cómo el agua viaja en un ciclo continuo por nuestro planeta.</span>
              </div>
            </div>
            
            <div class="modal-action justify-center gap-4">
              <button @click="restartJourney" class="btn btn-primary btn-lg">
                🔄 Nueva aventura
              </button>
              <button @click="finishGame" class="btn btn-outline btn-lg">
                Terminar
              </button>
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
.stage-image {
  position: relative;
  transition: all 0.3s ease;
}

.animation-layer {
  pointer-events: none;
}

.choice-btn {
  transition: all 0.2s ease;
}

.choice-btn:hover {
  transform: translateX(8px);
}

.step {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

.water-container {
  transition: all 0.5s ease;
}

.evaporation-slow {
  filter: none;
}

.evaporation-medium {
  filter: blur(0.5px);
  animation: mediumEvap 2s ease-in-out infinite;
}

.evaporation-fast {
  filter: blur(1px);
  animation: fastEvap 1s ease-in-out infinite;
}

@keyframes mediumEvap {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes fastEvap {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px) scale(0.95);
    opacity: 0.8;
  }
}

.vapor-effect {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  animation: riseUp 2s ease-out infinite;
}

@keyframes riseUp {
  0% {
    transform: translateX(-50%) translateY(0);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(-50%) translateY(-20px);
    opacity: 0;
  }
}
</style>
