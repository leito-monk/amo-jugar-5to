<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import * as gameState from '../../../composables/useGameState.js';
import * as sound from '../../../composables/useSound.js';
import GameLayout from '../../components/game/GameLayout.vue';
import ScoreBoard from '../../components/game/ScoreBoard.vue';
import ProgressTracker from '../../components/game/ProgressTracker.vue';
import { shuffleArray, checkPosition, calculateScore, getRandomMotivationalMessage } from './gameLogic.js';
import caligramasData from './caligramas-content.json';

const router = useRouter();

// Estado reactivo
const currentLevel = ref(1);
const levelCompleted = ref(false);
const availableVerses = ref([]);
const placedVerses = ref([]);
const draggedVerse = ref(null);
const hintsRemaining = ref(3);
const currentHint = ref('');
const errorCount = ref(0);
const startTime = ref(null);
const elapsedTime = ref(0);
const motivationalMessage = ref('');
const showCompletionModal = ref(false);
const levelStats = ref({});
let timerInterval = null;

// Computed properties
const currentCaligrama = computed(() => {
  return caligramasData.caligramas[currentLevel.value - 1];
});

const totalLevels = computed(() => {
  return caligramasData.caligramas.length;
});

const isLastLevel = computed(() => {
  return currentLevel.value >= totalLevels.value;
});

const gridStyle = computed(() => {
  const { rows, cols } = currentCaligrama.value.gridSize;
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gap: '4px'
  };
});

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedTime.value / 60);
  const seconds = elapsedTime.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const currentScore = computed(() => gameState.getState().score);
const totalPlaced = computed(() => placedVerses.value.length);
const totalVerses = computed(() => currentCaligrama.value.versos.length);

// Métodos
function initLevel() {
  const caligrama = currentCaligrama.value;
  
  // Reset estado
  placedVerses.value = [];
  errorCount.value = 0;
  hintsRemaining.value = 3;
  currentHint.value = '';
  levelCompleted.value = false;
  motivationalMessage.value = '';
  showCompletionModal.value = false;
  
  // Mezclar versos
  availableVerses.value = shuffleArray(caligrama.versos.map(v => ({
    ...v,
    placed: false
  })));
  
  // Iniciar timer
  startTime.value = Date.now();
  elapsedTime.value = 0;
  
  // Iniciar intervalo del timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  timerInterval = setInterval(() => {
    elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000);
  }, 1000);
}

function hasVerseAt(row, col) {
  return placedVerses.value.some(v => v.posicion[0] === row && v.posicion[1] === col);
}

function getVerseAt(row, col) {
  const verse = placedVerses.value.find(v => v.posicion[0] === row && v.posicion[1] === col);
  return verse ? verse.texto : '';
}

function isSilhouetteActive(row, col) {
  return currentCaligrama.value.silueta[row][col] === 1;
}

// Drag & Drop handlers
function handleDragStart(verse) {
  if (!verse.placed) {
    draggedVerse.value = verse;
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDragEnter(event) {
  event.preventDefault();
}

function handleDrop(event, row, col) {
  event.preventDefault();
  
  if (!draggedVerse.value) return;
  
  // Verificar si la celda es parte de la silueta
  if (!isSilhouetteActive(row, col)) {
    draggedVerse.value = null;
    return;
  }
  
  // Verificar si ya hay un verso en esta posición
  if (hasVerseAt(row, col)) {
    draggedVerse.value = null;
    return;
  }
  
  // Verificar posición correcta
  const isCorrect = checkPosition([row, col], draggedVerse.value.posicion);
  
  if (isCorrect) {
    // Posición correcta
    draggedVerse.value.placed = true;
    placedVerses.value.push(draggedVerse.value);
    
    // Agregar puntos
    gameState.addScore(15);
    
    // Mostrar mensaje motivacional
    motivationalMessage.value = getRandomMotivationalMessage(caligramasData.mensajesMotivationales);
    sound.playCorrect();
    
    setTimeout(() => {
      motivationalMessage.value = '';
    }, 2000);
    
    // Verificar si se completó el nivel
    if (placedVerses.value.length === currentCaligrama.value.versos.length) {
      completeLevel();
    }
  } else {
    // Posición incorrecta
    errorCount.value++;
    sound.playWrong();
    motivationalMessage.value = '¡Intenta de nuevo! 🤔';
    
    setTimeout(() => {
      motivationalMessage.value = '';
    }, 2000);
  }
  
  draggedVerse.value = null;
}

// Touch support for mobile
function handleTouchStart(event, verse) {
  if (!verse.placed) {
    draggedVerse.value = verse;
    event.target.classList.add('dragging');
  }
}

function handleTouchMove(event) {
  event.preventDefault();
}

function handleTouchEnd(event) {
  event.preventDefault();
  
  if (!draggedVerse.value) return;
  
  // Obtener el elemento en las coordenadas del touch
  const touch = event.changedTouches[0];
  const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
  
  if (elementBelow && elementBelow.classList.contains('grid-cell')) {
    const row = parseInt(elementBelow.dataset.row);
    const col = parseInt(elementBelow.dataset.col);
    
    // Simular drop
    handleDrop({ preventDefault: () => {} }, row, col);
  }
  
  event.target.classList.remove('dragging');
  draggedVerse.value = null;
}

function showHint() {
  if (hintsRemaining.value > 0) {
    const hintIndex = 3 - hintsRemaining.value;
    currentHint.value = currentCaligrama.value.pistas[hintIndex];
    hintsRemaining.value--;
  }
}

function completeLevel() {
  // Detener timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  levelCompleted.value = true;
  
  // Calcular puntaje del nivel
  const timeElapsed = Math.floor((Date.now() - startTime.value) / 1000);
  const hintsUsed = 3 - hintsRemaining.value;
  const levelScore = calculateScore(errorCount.value, hintsUsed, timeElapsed);
  
  // Actualizar estado del juego
  gameState.addScore(levelScore);
  gameState.recordAnswer(true);
  
  // Guardar stats del nivel
  levelStats.value = {
    nivel: currentLevel.value,
    tiempo: formattedTime.value,
    errores: errorCount.value,
    pistas: hintsUsed,
    puntaje: levelScore
  };
  
  // Tocar sonido de completado
  sound.playComplete();
  
  // Mostrar modal
  showCompletionModal.value = true;
}

function nextLevel() {
  if (!isLastLevel.value) {
    currentLevel.value++;
    gameState.levelUp();
    showCompletionModal.value = false;
    initLevel();
  } else {
    finishGame();
  }
}

function finishGame() {
  gameState.markCompleted();
  router.push('/juegos');
}

function closeModal() {
  showCompletionModal.value = false;
}

// Lifecycle hooks
onMounted(() => {
  gameState.loadState('cazador-caligramas');
  gameState.startGame();
  initLevel();
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script>

<template>
  <GameLayout 
    title="Cazador de Caligramas"
    instructions="Arrastra cada verso a su posición correcta en la figura. Los versos forman un caligrama (poema con forma visual). Puedes usar hasta 3 pistas si necesitas ayuda."
  >
    <!-- Header con ScoreBoard y ProgressTracker -->
    <div class="mb-6 space-y-4">
      <ScoreBoard :score="currentScore" />
      <ProgressTracker 
        :current="currentLevel" 
        :total="totalLevels"
        :label="`Nivel ${currentLevel} de ${totalLevels}: ${currentCaligrama.titulo}`"
      />
      <ProgressTracker 
        :current="totalPlaced" 
        :total="totalVerses"
        label="Versos colocados"
      />
    </div>

    <!-- Timer y mensajes -->
    <div class="flex justify-between items-center mb-4">
      <div class="text-lg font-semibold">
        ⏱️ Tiempo: {{ formattedTime }}
      </div>
      <div v-if="motivationalMessage" class="text-lg font-bold text-primary animate-bounce">
        {{ motivationalMessage }}
      </div>
    </div>

    <!-- Layout principal: Grid + Banco de versos -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Grid del caligrama (izquierda) -->
      <div class="flex flex-col items-center">
        <h3 class="text-xl font-bold mb-4">{{ currentCaligrama.titulo }}</h3>
        <div 
          class="caligrama-grid w-full max-w-md"
          :style="gridStyle"
        >
          <template
            v-for="(row, rowIndex) in currentCaligrama.silueta"
            :key="`row-${rowIndex}`"
          >
            <div
              v-for="(cell, colIndex) in row"
              :key="`cell-${rowIndex}-${colIndex}`"
              :class="[
                'grid-cell',
                {
                  'silhouette-active': isSilhouetteActive(rowIndex, colIndex),
                  'has-verse': hasVerseAt(rowIndex, colIndex)
                }
              ]"
              :data-row="rowIndex"
              :data-col="colIndex"
              @dragover="handleDragOver"
              @dragenter="handleDragEnter"
              @drop="handleDrop($event, rowIndex, colIndex)"
            >
              <span v-if="hasVerseAt(rowIndex, colIndex)" class="verse-text">
                {{ getVerseAt(rowIndex, colIndex) }}
              </span>
            </div>
          </template>
        </div>

        <!-- Botón de pistas -->
        <div class="mt-4">
          <button 
            class="btn btn-secondary"
            :disabled="hintsRemaining === 0"
            @click="showHint"
          >
            💡 Pista ({{ hintsRemaining }} disponibles)
          </button>
        </div>

        <!-- Mostrar pista actual -->
        <div v-if="currentHint" class="alert alert-info mt-4 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>{{ currentHint }}</span>
        </div>
      </div>

      <!-- Banco de versos (derecha) -->
      <div class="flex flex-col">
        <h3 class="text-xl font-bold mb-4">📝 Banco de Versos</h3>
        <div class="space-y-3">
          <div
            v-for="verse in availableVerses"
            :key="verse.id"
            :class="[
              'verse-card',
              { 'verse-placed': verse.placed }
            ]"
            :draggable="!verse.placed"
            @dragstart="handleDragStart(verse)"
            @touchstart="handleTouchStart($event, verse)"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
          >
            {{ verse.texto }}
          </div>
        </div>

        <!-- Stats del nivel actual -->
        <div class="mt-6 p-4 bg-base-200 rounded-lg">
          <h4 class="font-bold mb-2">📊 Estadísticas</h4>
          <div class="space-y-1 text-sm">
            <div>❌ Errores: {{ errorCount }}</div>
            <div>💡 Pistas usadas: {{ 3 - hintsRemaining }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de completado de nivel -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showCompletionModal"
          class="modal modal-open"
          @click.self="closeModal"
        >
          <div class="modal-box relative max-w-2xl">
            <h3 class="font-bold text-2xl mb-4 text-center">
              🎉 ¡Nivel {{ currentLevel }} Completado! 🎉
            </h3>
            
            <div class="py-6 space-y-4">
              <!-- Stats del nivel -->
              <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div class="stat">
                  <div class="stat-title">Tiempo</div>
                  <div class="stat-value text-2xl">{{ levelStats.tiempo }}</div>
                </div>
                
                <div class="stat">
                  <div class="stat-title">Errores</div>
                  <div class="stat-value text-2xl">{{ levelStats.errores }}</div>
                </div>
                
                <div class="stat">
                  <div class="stat-title">Pistas usadas</div>
                  <div class="stat-value text-2xl">{{ levelStats.pistas }}</div>
                </div>
                
                <div class="stat">
                  <div class="stat-title">Puntos ganados</div>
                  <div class="stat-value text-2xl text-primary">+{{ levelStats.puntaje }}</div>
                </div>
              </div>

              <!-- Puntuación total -->
              <div class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-lg font-bold">Puntuación Total: {{ currentScore }} puntos</span>
              </div>
            </div>
            
            <div class="modal-action">
              <button 
                v-if="!isLastLevel"
                @click="nextLevel" 
                class="btn btn-primary btn-lg"
              >
                Siguiente Nivel →
              </button>
              <button 
                v-else
                @click="finishGame" 
                class="btn btn-success btn-lg"
              >
                ¡Finalizar Juego! 🏆
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </GameLayout>
</template>

<style scoped>
.caligrama-grid {
  padding: 1rem;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(245, 158, 11, 0.1));
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.grid-cell {
  border: 2px solid transparent;
  border-radius: 0.5rem;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  transition: all 0.3s ease;
}

.silhouette-active {
  background-color: rgba(156, 163, 175, 0.2);
  border-color: rgba(156, 163, 175, 0.3);
}

.has-verse {
  background-color: rgba(79, 70, 229, 0.2);
  border-color: rgba(79, 70, 229, 0.5);
}

.verse-text {
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
  color: rgba(79, 70, 229, 1);
}

.verse-card {
  background: linear-gradient(135deg, #ffffff, #f9fafb);
  border: 2px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
  font-weight: 600;
  cursor: move;
  transition: all 0.3s ease;
  user-select: none;
}

.verse-card:hover:not(.verse-placed) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.2);
  border-color: rgba(79, 70, 229, 0.5);
}

.verse-card:active:not(.verse-placed) {
  transform: scale(0.98);
}

.verse-placed {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f3f4f6;
  text-decoration: line-through;
}

.dragging {
  opacity: 0.5;
  transform: scale(0.95);
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

/* Responsive adjustments */
@media (max-width: 768px) {
  .verse-text {
    font-size: 0.65rem;
  }
  
  .grid-cell {
    min-height: 40px;
  }
  
  .caligrama-grid {
    max-width: 100%;
  }
}
</style>
