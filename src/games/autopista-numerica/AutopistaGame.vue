<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import GameLayout from '../../components/game/GameLayout.vue';
import ScoreBoard from '../../components/game/ScoreBoard.vue';
import * as gameState from '../../../composables/useGameState.js';
import * as sound from '../../../composables/useSound.js';
import {
  formatNumber,
  numberToWords,
  wordsToNumber,
  selectRandomQuestions,
  validateTextAnswer,
  calculateNumberLineValue,
  validateNumberLine,
  randomAISpeed
} from './gameLogic.js';
import questionsData from './questions.json';

const router = useRouter();

// Instrucciones del juego
const instructions = `🏁 Autopista Numérica

¡Compite en una carrera de 4 autos respondiendo preguntas sobre números grandes!

📋 Cómo jugar:
• Responde 10 preguntas sobre números hasta 9.999.999
• Por cada respuesta correcta, tu auto avanza un 10%
• Los autos IA avanzan automáticamente
• Ganas puntos extras por velocidad y precisión

🎯 Tipos de preguntas:
• Lectura: Cómo se escribe un número en palabras
• Escritura: Cómo se lee un número
• Comparación: Ordenar y comparar números
• Recta numérica: Ubicar números en una recta
• Valor posicional: Identificar el valor de cada dígito

¡El primero en llegar a la meta gana! 🏆`;

// Estado del juego
const autopistas = ref([
  { nombre: 'TÚ', trafico: 2500000, progress: 0, velocidad: 1.0, isPlayer: true },
  { nombre: 'IA-1', trafico: 3456789, progress: 0, velocidad: randomAISpeed(), isPlayer: false },
  { nombre: 'IA-2', trafico: 1234567, progress: 0, velocidad: randomAISpeed(), isPlayer: false },
  { nombre: 'IA-3', trafico: 4567890, progress: 0, velocidad: randomAISpeed(), isPlayer: false }
]);

const currentQuestionIndex = ref(0);
const questions = ref([]);
const userAnswer = ref('');
const userNumberLineValue = ref(null);
const raceInterval = ref(null);
const gameOver = ref(false);
const playerWon = ref(false);
const showExplanation = ref(false);
const currentExplanation = ref('');
const feedbackMessage = ref('');
const showFeedback = ref(false);

// Computed
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const currentScore = computed(() => gameState.getState().score);
const correctAnswers = computed(() => gameState.getState().correctAnswers);
const totalQuestions = computed(() => questions.value.length);
const progressPercentage = computed(() => 
  totalQuestions.value > 0 ? Math.round((currentQuestionIndex.value / totalQuestions.value) * 100) : 0
);

// Métodos
function initGame() {
  // Cargar estado del juego
  gameState.loadState('autopista-numerica');
  gameState.startGame();
  
  // Seleccionar preguntas aleatorias
  questions.value = selectRandomQuestions(questionsData.preguntas, 10);
  
  // Resetear estado
  currentQuestionIndex.value = 0;
  userAnswer.value = '';
  gameOver.value = false;
  playerWon.value = false;
  showExplanation.value = false;
  showFeedback.value = false;
  
  // Resetear progreso de autos
  autopistas.value.forEach(auto => {
    auto.progress = 0;
    if (!auto.isPlayer) {
      auto.velocidad = randomAISpeed();
    }
  });
  
  // Iniciar carrera
  startRace();
}

function startRace() {
  // Intervalo para avanzar autos IA
  raceInterval.value = setInterval(() => {
    if (gameOver.value) return;
    
    autopistas.value.forEach((auto, idx) => {
      if (!auto.isPlayer && auto.progress < 100) {
        // Autos IA avanzan automáticamente
        const baseSpeed = 0.1;
        const randomFactor = Math.random() * 0.05;
        auto.progress += (baseSpeed + randomFactor) * auto.velocidad;
        
        // Limitar a 100%
        if (auto.progress >= 100) {
          auto.progress = 100;
        }
      }
    });
    
    checkWinner();
  }, 1000);
}

function checkWinner() {
  const winner = autopistas.value.find(auto => auto.progress >= 100);
  
  if (winner) {
    gameOver.value = true;
    playerWon.value = winner.isPlayer;
    
    if (raceInterval.value) {
      clearInterval(raceInterval.value);
    }
    
    if (playerWon.value) {
      sound.playComplete();
      gameState.addScore(50); // Bonus por ganar
      gameState.markCompleted();
    } else {
      sound.playWrong();
    }
  }
}

function checkAnswer(opcion) {
  const isCorrect = opcion.correcto;
  
  if (isCorrect) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer(currentQuestion.value.explicacion);
  }
}

function checkTextAnswer() {
  if (!userAnswer.value.trim()) return;
  
  const isCorrect = validateTextAnswer(
    userAnswer.value,
    currentQuestion.value.respuestaCorrecta
  );
  
  if (isCorrect) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer(currentQuestion.value.explicacion);
  }
  
  userAnswer.value = '';
}

function handleNumberLineClick(event) {
  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const rectaWidth = rect.width;
  
  const valor = calculateNumberLineValue(
    clickX,
    rectaWidth,
    currentQuestion.value.rangoMin,
    currentQuestion.value.rangoMax
  );
  
  userNumberLineValue.value = valor;
  
  // Validar
  const isCorrect = validateNumberLine(
    valor,
    currentQuestion.value.valorCorrecto,
    currentQuestion.value.tolerancia
  );
  
  if (isCorrect) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer(currentQuestion.value.explicacion);
  }
}

function handleCorrectAnswer() {
  sound.playCorrect();
  
  // Avanzar auto del jugador
  autopistas.value[0].progress += 10;
  if (autopistas.value[0].progress > 100) {
    autopistas.value[0].progress = 100;
  }
  
  // Sumar puntos
  gameState.addScore(15);
  gameState.recordAnswer(true);
  
  // Mostrar feedback
  feedbackMessage.value = '¡Correcto! 🎉';
  showFeedback.value = true;
  
  setTimeout(() => {
    showFeedback.value = false;
    nextQuestion();
  }, 1500);
}

function handleWrongAnswer(explicacion) {
  sound.playWrong();
  gameState.recordAnswer(false);
  
  // Mostrar explicación
  currentExplanation.value = explicacion;
  showExplanation.value = true;
  
  // Mostrar feedback
  feedbackMessage.value = '❌ Incorrecto';
  showFeedback.value = true;
  
  setTimeout(() => {
    showFeedback.value = false;
    showExplanation.value = false;
    nextQuestion();
  }, 3000);
}

function nextQuestion() {
  userNumberLineValue.value = null;
  
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    // Juego terminado
    gameOver.value = true;
    
    // Verificar si el jugador ganó por completar todas las preguntas
    if (autopistas.value[0].progress >= 100) {
      playerWon.value = true;
      gameState.markCompleted();
    }
    
    if (raceInterval.value) {
      clearInterval(raceInterval.value);
    }
  }
}

function restartGame() {
  gameState.resetGame();
  initGame();
}

function handleBack() {
  if (raceInterval.value) {
    clearInterval(raceInterval.value);
  }
  router.push('/juegos');
}

// Lifecycle
onMounted(() => {
  initGame();
});

onUnmounted(() => {
  if (raceInterval.value) {
    clearInterval(raceInterval.value);
  }
});
</script>

<template>
  <GameLayout title="Autopista Numérica" :instructions="instructions" @back="handleBack">
    <div class="space-y-6">
      <!-- ScoreBoard -->
      <ScoreBoard 
        :score="currentScore" 
        :correct-count="correctAnswers"
        :total-count="totalQuestions"
      />

      <!-- Race Track -->
      <div class="race-track bg-base-100 rounded-lg shadow-lg p-6">
        <div class="space-y-4">
          <div 
            v-for="(auto, idx) in autopistas" 
            :key="idx"
            class="lane"
            :class="{ 'player-lane': auto.isPlayer }"
          >
            <!-- Auto info -->
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-lg" :class="{ 'text-primary': auto.isPlayer }">
                {{ auto.nombre }}
              </span>
              <span class="text-sm text-base-content/60">
                {{ formatNumber(auto.trafico) }} autos/sem
              </span>
            </div>
            
            <!-- Road -->
            <div class="road relative bg-base-300 rounded-lg h-12 overflow-hidden">
              <!-- Finish line pattern -->
              <div 
                class="finish-line absolute right-0 top-0 bottom-0 w-2"
                :class="{ 'checkered': auto.progress >= 95 }"
              ></div>
              
              <!-- Car -->
              <div 
                class="car absolute top-1/2 transform -translate-y-1/2 text-3xl transition-all duration-500"
                :style="{ left: auto.progress + '%' }"
                :class="{ 'player-car': auto.isPlayer }"
              >
                🚗
              </div>
            </div>
            
            <!-- Progress bar -->
            <div class="mt-1 text-xs text-right text-base-content/60">
              {{ Math.round(auto.progress) }}%
            </div>
          </div>
        </div>
      </div>

      <!-- Question Panel -->
      <div v-if="!gameOver" class="question-panel bg-base-100 rounded-lg shadow-lg p-6">
        <div class="mb-4">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-2xl font-bold">
              Pregunta {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}
            </h3>
            <div class="badge badge-primary">{{ currentQuestion?.tipo }}</div>
          </div>
          <progress 
            class="progress progress-primary w-full" 
            :value="progressPercentage" 
            max="100"
          ></progress>
        </div>

        <div class="question-content">
          <p class="text-xl mb-6">{{ currentQuestion?.pregunta }}</p>

          <!-- Opciones múltiples -->
          <div v-if="currentQuestion?.opciones" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              v-for="(opc, idx) in currentQuestion.opciones"
              :key="idx"
              @click="checkAnswer(opc)"
              class="btn btn-outline btn-lg h-auto min-h-[4rem] whitespace-normal text-left justify-start"
            >
              {{ opc.texto }}
            </button>
          </div>

          <!-- Input de texto -->
          <div v-else-if="currentQuestion?.tipo === 'escritura'" class="space-y-4">
            <input
              v-model="userAnswer"
              @keyup.enter="checkTextAnswer"
              type="text"
              placeholder="Escribe tu respuesta..."
              class="input input-bordered input-lg w-full"
              autofocus
            />
            <button @click="checkTextAnswer" class="btn btn-primary btn-lg w-full">
              Verificar Respuesta
            </button>
          </div>

          <!-- Recta numérica -->
          <div v-else-if="currentQuestion?.tipo === 'recta'" class="space-y-4">
            <svg 
              @click="handleNumberLineClick"
              class="number-line w-full cursor-crosshair bg-base-200 rounded-lg p-4"
              viewBox="0 0 600 100"
            >
              <!-- Línea principal -->
              <line x1="50" y1="50" x2="550" y2="50" stroke="currentColor" stroke-width="3"/>
              
              <!-- Marcas -->
              <line x1="50" y1="40" x2="50" y2="60" stroke="currentColor" stroke-width="2"/>
              <text x="50" y="80" text-anchor="middle" font-size="14">
                {{ formatNumber(currentQuestion.rangoMin) }}
              </text>
              
              <line x1="300" y1="40" x2="300" y2="60" stroke="currentColor" stroke-width="2"/>
              <text x="300" y="80" text-anchor="middle" font-size="14">
                {{ formatNumber((currentQuestion.rangoMin + currentQuestion.rangoMax) / 2) }}
              </text>
              
              <line x1="550" y1="40" x2="550" y2="60" stroke="currentColor" stroke-width="2"/>
              <text x="550" y="80" text-anchor="middle" font-size="14">
                {{ formatNumber(currentQuestion.rangoMax) }}
              </text>
              
              <!-- Valor seleccionado -->
              <circle 
                v-if="userNumberLineValue !== null"
                :cx="50 + ((userNumberLineValue - currentQuestion.rangoMin) / (currentQuestion.rangoMax - currentQuestion.rangoMin)) * 500"
                cy="50"
                r="8"
                fill="var(--p)"
              />
            </svg>
            <p class="text-center text-sm text-base-content/60">
              Haz clic en la recta para ubicar el número
              <span v-if="userNumberLineValue !== null" class="font-bold text-primary">
                ({{ formatNumber(userNumberLineValue) }})
              </span>
            </p>
          </div>
        </div>

        <!-- Explicación -->
        <div v-if="showExplanation" class="alert alert-info mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ currentExplanation }}</span>
        </div>

        <!-- Feedback -->
        <div v-if="showFeedback" class="alert mt-4" :class="feedbackMessage.includes('Correcto') ? 'alert-success' : 'alert-error'">
          <span class="text-lg font-bold">{{ feedbackMessage }}</span>
        </div>
      </div>

      <!-- Game Over Modal -->
      <Teleport to="body">
        <div v-if="gameOver" class="modal modal-open">
          <div class="modal-box max-w-2xl">
            <h2 class="text-4xl font-bold text-center mb-6">
              {{ playerWon ? '🏆 ¡Ganaste!' : '💪 ¡Buen Intento!' }}
            </h2>
            
            <div class="text-center space-y-4 mb-6">
              <p class="text-xl">
                {{ playerWon 
                  ? '¡Felicitaciones! Llegaste a la meta primero.' 
                  : 'Un auto IA llegó primero, pero lo hiciste muy bien.' 
                }}
              </p>
              
              <div class="stats stats-vertical lg:stats-horizontal shadow">
                <div class="stat">
                  <div class="stat-title">Puntos</div>
                  <div class="stat-value text-primary">{{ currentScore }}</div>
                </div>
                <div class="stat">
                  <div class="stat-title">Correctas</div>
                  <div class="stat-value text-success">{{ correctAnswers }}/{{ totalQuestions }}</div>
                </div>
                <div class="stat">
                  <div class="stat-title">Precisión</div>
                  <div class="stat-value text-secondary">
                    {{ Math.round((correctAnswers / totalQuestions) * 100) }}%
                  </div>
                </div>
              </div>

              <!-- Clasificación final -->
              <div class="bg-base-200 rounded-lg p-4">
                <h3 class="font-bold mb-2">Clasificación Final</h3>
                <div class="space-y-2">
                  <div 
                    v-for="(auto, idx) in [...autopistas].sort((a, b) => b.progress - a.progress)"
                    :key="idx"
                    class="flex justify-between items-center p-2 rounded"
                    :class="{ 'bg-primary/20': auto.isPlayer }"
                  >
                    <span class="font-bold">{{ idx + 1 }}. {{ auto.nombre }}</span>
                    <span>{{ Math.round(auto.progress) }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal-action justify-center">
              <button @click="restartGame" class="btn btn-primary btn-lg">
                🔄 Revancha
              </button>
              <button @click="handleBack" class="btn btn-outline btn-lg">
                🏠 Volver a Juegos
              </button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </GameLayout>
</template>

<style scoped>
.lane {
  position: relative;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
}

.lane:nth-child(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.player-lane {
  border: 2px solid var(--p);
  background-color: rgba(var(--p), 0.1) !important;
}

.road {
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.car {
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  z-index: 10;
}

.player-car {
  filter: drop-shadow(0 0 8px var(--p)) drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
  transform: scale(1.1) translateY(-50%);
}

.finish-line {
  background: linear-gradient(45deg, 
    #000 25%, 
    #fff 25%, 
    #fff 50%, 
    #000 50%, 
    #000 75%, 
    #fff 75%, 
    #fff
  );
  background-size: 20px 20px;
}

.checkered {
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.number-line {
  height: 120px;
  border: 2px solid currentColor;
}

.number-line:hover {
  background-color: rgba(var(--p), 0.05);
}
</style>
