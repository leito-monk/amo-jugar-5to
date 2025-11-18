<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GameLayout from '../../components/game/GameLayout.vue'
import ProgressTracker from '../../components/game/ProgressTracker.vue'
import challengesData from './challenges.json'
import { 
  detectChangedDigits, 
  getPositionName, 
  formatWithSeparators,
  generateExplanation,
  calculate,
  isValidNumber
// @ts-ignore
} from './calculatorLogic.js'

// Types
interface Challenge {
  instruccion: string
  numeroInicial: number
  numeroObjetivo: number
  operacion: string
  valor: number
  explicacion?: string
}

// State
const mode = ref<'libre' | 'desafio'>('libre')
const displayNumber = ref('0')
const currentOperation = ref<'+' | '-' | null>(null)
const previousNumber = ref<number | null>(null)
const changedPositions = ref<number[]>([])
const showExplanation = ref(false)
const currentChallengeIndex = ref(0)
const userOperation = ref('+')
const userValue = ref<number | null>(null)
const challengeFeedback = ref('')
const score = ref(0)
const beforeNumber = ref('0')
const afterNumber = ref('0')

// Computed
const challenges = computed(() => challengesData.desafios as Challenge[])
const currentChallenge = computed(() => challenges.value[currentChallengeIndex.value])
const displayDigits = computed(() => {
  return displayNumber.value.padStart(7, '0').split('')
})

// Instructions
const instructions = `🔢 Transformador de Calculadora

MODO PRÁCTICA LIBRE:
• Usa la calculadora para hacer operaciones
• Observa qué cifras cambian al sumar o restar
• Usa los botones rápidos para operaciones comunes

MODO DESAFÍOS:
• Transforma el número inicial en el objetivo
• Identifica qué operación debes hacer
• ¡Completa los 15 desafíos para ganar!

📊 Sistema de puntos:
• Desafío correcto: +20 puntos
• Intenta descubrir la relación entre el valor y la posición que cambia`

// Methods
const inputDigit = (digit: number) => {
  if (displayNumber.value === '0' || displayNumber.value.length === 0) {
    displayNumber.value = digit.toString()
  } else if (displayNumber.value.length < 7) {
    displayNumber.value += digit.toString()
  }
}

const setOperation = (op: '+' | '-') => {
  if (displayNumber.value !== '') {
    previousNumber.value = parseInt(displayNumber.value) || 0
    currentOperation.value = op
    displayNumber.value = ''
    showExplanation.value = false
  }
}

const performCalculation = () => {
  if (previousNumber.value !== null && currentOperation.value && displayNumber.value !== '') {
    const current = parseInt(displayNumber.value) || 0
    const before = previousNumber.value
    const result = calculate(before, currentOperation.value, current)
    
    if (!isValidNumber(result)) {
      alert('Resultado fuera de rango (0-9.999.999)')
      return
    }
    
    // Store for explanation
    beforeNumber.value = before.toString()
    afterNumber.value = result.toString()
    
    // Detect changed positions
    changedPositions.value = detectChangedDigits(before, result)
    
    // Update display
    displayNumber.value = result.toString()
    
    // Show explanation
    showExplanation.value = true
    
    // Reset operation
    previousNumber.value = null
    currentOperation.value = null
  }
}

const clear = () => {
  displayNumber.value = '0'
  currentOperation.value = null
  previousNumber.value = null
  changedPositions.value = []
  showExplanation.value = false
}

const quickAdd = (value: number) => {
  const current = parseInt(displayNumber.value) || 0
  const before = current
  const result = current + value
  
  if (!isValidNumber(result)) {
    alert('Resultado fuera de rango (0-9.999.999)')
    return
  }
  
  beforeNumber.value = before.toString()
  afterNumber.value = result.toString()
  changedPositions.value = detectChangedDigits(before, result)
  displayNumber.value = result.toString()
  showExplanation.value = true
}

const quickSubtract = (value: number) => {
  const current = parseInt(displayNumber.value) || 0
  const before = current
  const result = current - value
  
  if (!isValidNumber(result) || result < 0) {
    alert('Resultado fuera de rango (0-9.999.999)')
    return
  }
  
  beforeNumber.value = before.toString()
  afterNumber.value = result.toString()
  changedPositions.value = detectChangedDigits(before, result)
  displayNumber.value = result.toString()
  showExplanation.value = true
}

const checkChallenge = () => {
  if (!userValue.value) {
    challengeFeedback.value = '⚠️ Ingresa un valor para la operación'
    return
  }
  
  const challenge = currentChallenge.value
  if (!challenge) return
  
  const result = userOperation.value === '+' 
    ? challenge.numeroInicial + userValue.value
    : challenge.numeroInicial - userValue.value
  
  if (result === challenge.numeroObjetivo) {
    // Correct!
    score.value += 20
    challengeFeedback.value = '✅ ¡Correcto! +20 puntos'
    
    // Show what changed
    changedPositions.value = detectChangedDigits(
      challenge.numeroInicial, 
      challenge.numeroObjetivo
    )
    
    // Move to next challenge after a delay
    setTimeout(() => {
      nextChallenge()
    }, 2000)
  } else {
    // Incorrect
    challengeFeedback.value = `❌ No es correcto. Pista: ${challenge.explicacion || 'Piensa en qué posición debe cambiar'}`
  }
}

const nextChallenge = () => {
  if (currentChallengeIndex.value < challenges.value.length - 1) {
    currentChallengeIndex.value++
    userOperation.value = '+'
    userValue.value = null
    challengeFeedback.value = ''
    changedPositions.value = []
  } else {
    challengeFeedback.value = '🎉 ¡Felicitaciones! Has completado todos los desafíos'
  }
}

const resetChallenges = () => {
  currentChallengeIndex.value = 0
  score.value = 0
  userOperation.value = '+'
  userValue.value = null
  challengeFeedback.value = ''
  changedPositions.value = []
}

const switchMode = (newMode: 'libre' | 'desafio') => {
  mode.value = newMode
  clear()
  challengeFeedback.value = ''
  if (newMode === 'libre') {
    changedPositions.value = []
  }
}

onMounted(() => {
  // Initialize
  displayNumber.value = '0'
})
</script>

<template>
  <GameLayout
    title="🔢 Transformador de Calculadora"
    :instructions="instructions"
  >
    <div class="space-y-6">
      <!-- Mode Tabs -->
      <div class="flex gap-2 bg-base-100 p-2 rounded-lg shadow-md">
        <button 
          @click="switchMode('libre')"
          class="btn flex-1"
          :class="mode === 'libre' ? 'btn-primary' : 'btn-ghost'"
        >
          📝 Práctica Libre
        </button>
        <button 
          @click="switchMode('desafio')"
          class="btn flex-1"
          :class="mode === 'desafio' ? 'btn-primary' : 'btn-ghost'"
        >
          🎯 Desafíos
        </button>
      </div>

      <!-- Calculator Section -->
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <!-- Display -->
          <div class="calculator-display bg-black text-green-400 p-6 rounded-lg mb-4 font-mono text-4xl text-right overflow-hidden">
            <div class="flex justify-end items-center min-h-[60px]">
              <span v-for="(digit, idx) in displayDigits" 
                    :key="idx"
                    class="digit transition-all duration-300"
                    :class="{ 'changed-digit': changedPositions.includes(idx) }">
                {{ digit }}
              </span>
            </div>
            <div class="text-xs text-green-400/50 mt-2 flex justify-between px-1">
              <span>millones</span>
              <span>miles</span>
              <span>unos</span>
            </div>
          </div>

          <!-- Calculator Buttons -->
          <div class="calc-buttons grid grid-cols-4 gap-2 mb-4">
            <button v-for="num in [7, 8, 9, 4, 5, 6, 1, 2, 3]" 
                    :key="num"
                    @click="inputDigit(num)"
                    class="btn btn-lg btn-outline">
              {{ num }}
            </button>
            <button @click="inputDigit(0)" class="btn btn-lg btn-outline col-span-2">0</button>
            <button @click="setOperation('+')" class="btn btn-lg btn-primary">+</button>
            <button @click="setOperation('-')" class="btn btn-lg btn-secondary">-</button>
            <button @click="performCalculation" class="btn btn-lg btn-accent col-span-2">=</button>
            <button @click="clear" class="btn btn-lg btn-error col-span-2">C</button>
          </div>

          <!-- Quick Operations (Free Mode Only) -->
          <div v-if="mode === 'libre'" class="quick-ops">
            <h3 class="text-sm font-semibold mb-2">Operaciones Rápidas:</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
              <button @click="quickAdd(100000)" class="btn btn-sm btn-success">+100.000</button>
              <button @click="quickAdd(10000)" class="btn btn-sm btn-success">+10.000</button>
              <button @click="quickSubtract(100000)" class="btn btn-sm btn-warning">-100.000</button>
              <button @click="quickSubtract(10000)" class="btn btn-sm btn-warning">-10.000</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Challenge Panel (Challenge Mode Only) -->
      <div v-if="mode === 'desafio'" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h3 class="card-title">
              🎯 Desafío {{ currentChallengeIndex + 1 }}/{{ challenges.length }}
            </h3>
            <div class="badge badge-lg badge-primary">
              Puntos: {{ score }}
            </div>
          </div>

          <ProgressTracker 
            :current="currentChallengeIndex" 
            :total="challenges.length"
            label="Progreso"
          />

          <div v-if="currentChallenge" class="alert alert-info mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ currentChallenge.instruccion }}</span>
          </div>

          <div v-if="currentChallenge" class="transformation bg-base-200 p-4 rounded-lg my-4">
            <div class="flex items-center justify-center gap-4 text-2xl font-bold">
              <span class="text-primary">{{ formatWithSeparators(currentChallenge.numeroInicial) }}</span>
              <span class="text-2xl">➜</span>
              <span class="text-accent">{{ formatWithSeparators(currentChallenge.numeroObjetivo) }}</span>
            </div>
          </div>

          <div class="operation-input flex gap-2 items-center">
            <label class="label">
              <span class="label-text font-semibold">Tu respuesta:</span>
            </label>
            <select v-model="userOperation" class="select select-bordered">
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <input 
              v-model.number="userValue" 
              type="number" 
              placeholder="Valor"
              class="input input-bordered flex-1"
            />
            <button @click="checkChallenge" class="btn btn-primary">
              Verificar ✓
            </button>
          </div>

          <div v-if="challengeFeedback" class="feedback mt-4">
            <div class="alert" :class="{
              'alert-success': challengeFeedback.includes('✅'),
              'alert-error': challengeFeedback.includes('❌'),
              'alert-warning': challengeFeedback.includes('⚠️'),
              'alert-info': challengeFeedback.includes('🎉')
            }">
              <span>{{ challengeFeedback }}</span>
            </div>
          </div>

          <div v-if="currentChallengeIndex === challenges.length - 1 && score >= (challenges.length * 20)" class="mt-4">
            <button @click="resetChallenges" class="btn btn-outline btn-block">
              🔄 Reiniciar Desafíos
            </button>
          </div>
        </div>
      </div>

      <!-- Explanation Panel -->
      <div v-if="showExplanation && changedPositions.length > 0" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h4 class="card-title text-lg">💡 ¿Qué cambió?</h4>
          
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
                  <th>Posición</th>
                  <th>Antes</th>
                  <th>Después</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pos in changedPositions" :key="pos">
                  <td class="font-semibold">{{ getPositionName(pos) }}</td>
                  <td>{{ beforeNumber.padStart(7, '0')[pos] }}</td>
                  <td class="text-accent font-bold">{{ afterNumber.padStart(7, '0')[pos] }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="mode === 'libre'" class="alert alert-info mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              {{ generateExplanation(
                currentOperation || '+', 
                parseInt(displayNumber) - parseInt(beforeNumber), 
                changedPositions
              ) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </GameLayout>
</template>

<style scoped>
.calculator-display {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.1em;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.5);
}

.digit {
  display: inline-block;
  min-width: 0.6em;
  text-align: center;
}

.changed-digit {
  color: #fbbf24 !important;
  font-weight: bold;
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.calc-buttons button {
  min-height: 3rem;
}

.quick-ops {
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.transformation {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
