<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import GameLayout from '../../components/game/GameLayout.vue'
import ScoreBoard from '../../components/game/ScoreBoard.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
import palabrasData from './palabras.json'

// Types
interface Palabra {
  palabra: string
  tipo: 'aguda' | 'grave' | 'esdrujula'
  silaba_tonica: string
  tiene_tilde: boolean
  nivel: number
  explicacion: string
  especial?: string
  x?: number
  y?: number
}

// State
const currentLevel = ref(1)
const score = ref(0)
const timeLeft = ref(60)
const words = ref<Palabra[]>([])
const selectedWord = ref<Palabra | null>(null)
const correctCount = ref(0)
const totalWords = ref(0)

const containers = ref({
  agudas: [] as string[],
  graves: [] as string[],
  esdrujulas: [] as string[]
})

const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')

const gameStarted = ref(false)
const gameFinished = ref(false)

let timerInterval: number | null = null
let animationInterval: number | null = null

// Computed
const palabras = computed(() => palabrasData.palabras as Palabra[])

const levelWords = computed(() => {
  // Level 1-2: Only agudas and graves
  if (currentLevel.value <= 2) {
    return palabras.value.filter(p => p.nivel <= 2 && !p.especial)
  }
  // Level 3: All three types
  if (currentLevel.value === 3) {
    return palabras.value.filter(p => p.nivel <= 3 && !p.especial)
  }
  // Level 4: Include diptongo
  if (currentLevel.value === 4) {
    return palabras.value.filter(p => p.nivel <= 4)
  }
  // Level 5: Include hiato
  return palabras.value.filter(p => p.nivel <= 5)
})

const progressPercent = computed(() => {
  if (totalWords.value === 0) return 0
  return Math.round((correctCount.value / totalWords.value) * 100)
})

const timerColor = computed(() => {
  if (timeLeft.value <= 10) return 'text-error'
  if (timeLeft.value <= 20) return 'text-warning'
  return 'text-primary'
})

// Instructions
const instructions = `🧪 ¡Bienvenido al Laboratorio de Acentuación!

1. Observa las palabras que flotan en la pantalla
2. Arrastra cada palabra al recipiente correcto según su acentuación:
   • Agudas: última sílaba (co-ra-ZÓN)
   • Graves: penúltima sílaba (CA-sa)
   • Esdrújulas: antepenúltima sílaba (MÚ-si-ca)
3. Tienes 60 segundos por nivel
4. Completa las 10 palabras antes de que termine el tiempo
5. En niveles 4 y 5 encontrarás palabras con diptongo e hiato

💡 Sistema de puntos:
• Respuesta correcta: +10 puntos
• Respuesta incorrecta: -5 puntos

🎯 ¡Clasifica correctamente todas las palabras para avanzar de nivel!`

// Methods
const startGame = () => {
  gameStarted.value = true
  gameFinished.value = false
  loadLevel()
  startTimer()
  startAnimation()
}

const loadLevel = () => {
  // Get 10 random words for current level
  const shuffled = [...levelWords.value].sort(() => Math.random() - 0.5)
  const selected = shuffled.slice(0, 10)
  
  // Position words randomly
  words.value = selected.map(word => ({
    ...word,
    x: Math.random() * 70 + 5, // 5% to 75% of container width
    y: Math.random() * 60 + 10 // 10% to 70% of container height
  }))
  
  totalWords.value = words.value.length
  correctCount.value = 0
  timeLeft.value = 60
  
  containers.value = {
    agudas: [],
    graves: [],
    esdrujulas: []
  }
}

const startTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  
  timerInterval = window.setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      finishLevel(false)
    }
  }, 1000)
}

const startAnimation = () => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
  
  // Subtle floating animation for words
  animationInterval = window.setInterval(() => {
    words.value.forEach(word => {
      if (word.x !== undefined && word.y !== undefined) {
        // Small random movement
        word.x = Math.max(5, Math.min(75, word.x + (Math.random() - 0.5) * 2))
        word.y = Math.max(10, Math.min(70, word.y + (Math.random() - 0.5) * 2))
      }
    })
  }, 2000)
}

const selectWord = (word: Palabra, event: DragEvent) => {
  selectedWord.value = word
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', word.palabra)
  }
}

const allowDrop = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const dropWord = (tipo: 'aguda' | 'grave' | 'esdrujula', event: DragEvent) => {
  event.preventDefault()
  
  if (!selectedWord.value) return
  
  const word = selectedWord.value
  
  // Check if correct
  if (word.tipo === tipo) {
    // Correct answer
    containers.value[tipo === 'aguda' ? 'agudas' : tipo === 'grave' ? 'graves' : 'esdrujulas'].push(word.palabra)
    score.value += 10
    correctCount.value++
    
    feedbackCorrect.value = true
    feedbackMessage.value = `¡Excelente! +10 puntos\n\n${word.explicacion}`
    
    // Remove word from floating words
    const index = words.value.findIndex(w => w.palabra === word.palabra)
    if (index !== -1) {
      words.value.splice(index, 1)
    }
    
    showFeedback.value = true
    
    // Check if level complete
    if (words.value.length === 0) {
      finishLevel(true)
    }
  } else {
    // Incorrect answer
    score.value = Math.max(0, score.value - 5)
    
    feedbackCorrect.value = false
    feedbackMessage.value = `¡Sigue intentando! Esta palabra es ${word.tipo}.\n\n💡 ${word.explicacion}`
    showFeedback.value = true
  }
  
  selectedWord.value = null
}

const closeFeedback = () => {
  showFeedback.value = false
}

const finishLevel = (success: boolean) => {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
  
  if (success && currentLevel.value < 5) {
    // Level complete, show success message
    feedbackCorrect.value = true
    feedbackMessage.value = `🎉 ¡Nivel ${currentLevel.value} completado!\n\nPuntuación: ${score.value}\nPrecisión: ${progressPercent.value}%\n\n¡Prepárate para el siguiente nivel!`
    showFeedback.value = true
    
    setTimeout(() => {
      showFeedback.value = false
      currentLevel.value++
      loadLevel()
      startTimer()
      startAnimation()
    }, 3000)
  } else if (success && currentLevel.value === 5) {
    // Game complete
    gameFinished.value = true
    feedbackCorrect.value = true
    feedbackMessage.value = `🏆 ¡Felicitaciones!\n\n¡Has completado todos los niveles!\n\nPuntuación Final: ${score.value}\nNiveles completados: 5`
    showFeedback.value = true
  } else {
    // Time's up
    gameFinished.value = true
    feedbackCorrect.value = false
    feedbackMessage.value = `⏰ ¡Se acabó el tiempo!\n\nPuntuación: ${score.value}\nNivel alcanzado: ${currentLevel.value}\n\n¡Intenta de nuevo!`
    showFeedback.value = true
  }
}

const resetGame = () => {
  currentLevel.value = 1
  score.value = 0
  correctCount.value = 0
  totalWords.value = 0
  gameStarted.value = false
  gameFinished.value = false
  words.value = []
  
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
}

// Lifecycle
onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval)
  }
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<template>
  <GameLayout
    title="🧪 Laboratorio de Acentuación"
    :instructions="instructions"
  >
    <div class="space-y-6">
      <!-- Start Screen -->
      <div v-if="!gameStarted" class="text-center py-12">
        <div class="text-7xl mb-6">🧪</div>
        <h2 class="text-3xl font-bold mb-4">¡Bienvenido al Laboratorio!</h2>
        <p class="text-lg mb-8 text-base-content/70">
          Clasifica palabras según su acentuación
        </p>
        <button @click="startGame" class="btn btn-primary btn-lg">
          Comenzar Nivel 1
        </button>
      </div>

      <!-- Game Area -->
      <div v-else-if="gameStarted && !gameFinished" class="space-y-6">
        <!-- Header with Score and Timer -->
        <div class="lab-header flex flex-col md:flex-row justify-between items-center gap-4 bg-base-100 p-4 rounded-lg shadow-md">
          <ScoreBoard :score="score" />
          
          <div class="flex items-center gap-6">
            <div class="badge badge-lg badge-primary">
              Nivel {{ currentLevel }}/5
            </div>
            <div class="text-3xl font-bold" :class="timerColor">
              ⏱️ {{ timeLeft }}s
            </div>
            <div class="text-sm">
              <span class="font-semibold">Correctas: </span>
              <span :class="words.length === 0 ? 'text-success' : 'text-base-content'">
                {{ correctCount }}/{{ totalWords }}
              </span>
            </div>
          </div>
        </div>

        <!-- Lab Area -->
        <div class="lab-area bg-base-200 rounded-lg p-4 min-h-[600px]">
          <!-- Floating Words Space -->
          <div class="words-space relative bg-gradient-to-br from-base-100 to-base-200 rounded-lg p-6 mb-4" style="min-height: 350px; position: relative;">
            <div
              v-for="word in words"
              :key="word.palabra"
              class="floating-word"
              :draggable="true"
              @dragstart="selectWord(word, $event)"
              :style="{
                position: 'absolute',
                top: word.y + '%',
                left: word.x + '%',
                transform: 'translate(-50%, -50%)'
              }"
            >
              {{ word.palabra }}
            </div>
            
            <div v-if="words.length === 0" class="absolute inset-0 flex items-center justify-center">
              <div class="text-center text-success">
                <div class="text-6xl mb-4">✅</div>
                <p class="text-xl font-bold">¡Todas las palabras clasificadas!</p>
              </div>
            </div>
          </div>

          <!-- Containers -->
          <div class="containers grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Agudas Container -->
            <div
              class="container agudas"
              @drop="dropWord('aguda', $event)"
              @dragover="allowDrop"
            >
              <h3 class="text-xl font-bold mb-3 text-primary">📌 Agudas</h3>
              <div class="dropped-words space-y-2">
                <span
                  v-for="(w, index) in containers.agudas"
                  :key="index"
                  class="badge badge-primary badge-lg block"
                >
                  {{ w }}
                </span>
              </div>
              <p v-if="containers.agudas.length === 0" class="text-sm text-base-content/50 mt-4">
                Última sílaba
              </p>
            </div>

            <!-- Graves Container -->
            <div
              class="container graves"
              @drop="dropWord('grave', $event)"
              @dragover="allowDrop"
            >
              <h3 class="text-xl font-bold mb-3 text-secondary">📍 Graves</h3>
              <div class="dropped-words space-y-2">
                <span
                  v-for="(w, index) in containers.graves"
                  :key="index"
                  class="badge badge-secondary badge-lg block"
                >
                  {{ w }}
                </span>
              </div>
              <p v-if="containers.graves.length === 0" class="text-sm text-base-content/50 mt-4">
                Penúltima sílaba
              </p>
            </div>

            <!-- Esdrújulas Container -->
            <div
              class="container esdrujulas"
              @drop="dropWord('esdrujula', $event)"
              @dragover="allowDrop"
            >
              <h3 class="text-xl font-bold mb-3 text-accent">📎 Esdrújulas</h3>
              <div class="dropped-words space-y-2">
                <span
                  v-for="(w, index) in containers.esdrujulas"
                  :key="index"
                  class="badge badge-accent badge-lg block"
                >
                  {{ w }}
                </span>
              </div>
              <p v-if="containers.esdrujulas.length === 0" class="text-sm text-base-content/50 mt-4">
                Antepenúltima sílaba
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Game Finished Screen -->
      <div v-else-if="gameFinished" class="text-center py-12">
        <div class="text-7xl mb-6">{{ score > 0 ? '🏆' : '😊' }}</div>
        <h2 class="text-3xl font-bold mb-4">
          {{ score > 0 ? '¡Excelente trabajo!' : '¡Sigue practicando!' }}
        </h2>
        <div class="stats shadow mb-8">
          <div class="stat">
            <div class="stat-title">Puntuación Final</div>
            <div class="stat-value text-primary">{{ score }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">Nivel Alcanzado</div>
            <div class="stat-value text-secondary">{{ currentLevel }}/5</div>
          </div>
        </div>
        <button @click="resetGame" class="btn btn-primary btn-lg">
          Jugar de Nuevo
        </button>
      </div>
    </div>

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
.floating-word {
  cursor: move;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06);
  animation: float 3s ease-in-out infinite;
  user-select: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.floating-word:hover {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1);
}

.floating-word:active {
  cursor: grabbing;
}

@keyframes float {
  0%, 100% {
    transform: translate(-50%, -50%) translateY(0px);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-10px);
  }
}

.container {
  border: 3px dashed;
  border-radius: 1rem;
  padding: 1.5rem;
  min-height: 200px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
}

.container.agudas {
  border-color: oklch(var(--p));
  background: linear-gradient(135deg, oklch(var(--p) / 0.1) 0%, oklch(var(--p) / 0.05) 100%);
}

.container.graves {
  border-color: oklch(var(--s));
  background: linear-gradient(135deg, oklch(var(--s) / 0.1) 0%, oklch(var(--s) / 0.05) 100%);
}

.container.esdrujulas {
  border-color: oklch(var(--a));
  background: linear-gradient(135deg, oklch(var(--a) / 0.1) 0%, oklch(var(--a) / 0.05) 100%);
}

.container:hover {
  border-style: solid;
  transform: scale(1.02);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.dropped-words {
  min-height: 80px;
}

/* Timer color transitions */
.text-error {
  animation: pulse-red 1s infinite;
}

@keyframes pulse-red {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>
