<template>
  <GameLayout 
    title="Aventura en Misiones" 
    :instructions="instructions"
  >
    <div class="misiones-container max-w-6xl mx-auto">
      
      <div class="game-header flex justify-between items-center mb-6">
        <ScoreBoard :score="score" />
        <ProgressTracker :current="currentLevel + 1" :total="5" label="Nivel" />
      </div>

      <div v-if="!gameStarted" class="intro-screen card-edu text-center p-8 bg-base-100 rounded-lg shadow-lg">
        <h2 class="text-3xl font-display font-bold mb-4">
          🌿 Aventura en la Selva Misionera
        </h2>
        <div class="mb-6">
          <div class="w-32 h-32 rounded-full mx-auto mb-4 bg-primary/20 flex items-center justify-center text-6xl">
            📚
          </div>
          <p class="text-lg mb-2">
            Conoce los cuentos de <strong>Horacio Quiroga</strong>
          </p>
          <p class="text-gray-600">
            Escritor que vivió en la selva de Misiones y escribió historias sobre sus animales
          </p>
        </div>
        <button @click="startGame" class="btn btn-primary btn-lg">
          Comenzar aventura 🚀
        </button>
      </div>

      <div v-else class="game-area">
        <div class="level-info card-edu mb-6 bg-base-100 rounded-lg shadow p-6">
          <h3 class="text-2xl font-display font-bold mb-2">
            Nivel {{ currentLevel + 1 }}: {{ currentLevelData.titulo }}
          </h3>
          <p class="text-gray-600">{{ currentLevelData.descripcion }}</p>
          <div v-if="currentLevelData.cuento" class="badge badge-secondary mt-2">
            📖 {{ currentLevelData.cuento }}
          </div>
        </div>

        <!-- Escenario del juego -->
        <div v-if="currentLevelData.tipo !== 'geografia'" class="game-canvas bg-base-100 rounded-lg shadow-lg p-6">
          <div class="escenario relative h-96 overflow-hidden rounded-lg bg-gradient-to-br from-green-100 to-green-200"
               :style="getEscenarioStyle()">
            
            <!-- Objetos recolectables -->
            <div v-for="objeto in objetosRestantes" 
                 :key="objeto.id"
                 class="objeto-recolectable absolute cursor-pointer hover:scale-110 transition-transform"
                 :style="{left: objeto.posicion.x+'px', top: objeto.posicion.y+'px'}"
                 @click="recolectarObjeto(objeto)">
              <div class="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl">
                {{ getObjetoIcon(objeto.id) }}
              </div>
            </div>

            <!-- Personaje jugador -->
            <div class="personaje absolute bottom-4 text-5xl"
                 :style="{left: playerPosition + 'px'}">
              🧒
            </div>
          </div>

          <!-- Controles -->
          <div class="controls flex justify-center gap-4 mt-4">
            <button @click="movePlayer(-50)" class="btn btn-circle">←</button>
            <button @click="movePlayer(50)" class="btn btn-circle">→</button>
          </div>

          <!-- Objetos recolectados -->
          <div v-if="objetosRecolectados.length" class="mt-4">
            <h4 class="font-semibold mb-2">Objetos recolectados:</h4>
            <div class="flex gap-2">
              <span v-for="obj in objetosRecolectados" :key="obj.id" class="badge badge-lg">
                {{ obj.nombre }}
              </span>
            </div>
          </div>
        </div>

        <!-- Nivel geografía: Mapa de Misiones -->
        <div v-else class="mapa-misiones bg-base-100 rounded-lg shadow-lg p-6">
          <h3 class="text-xl font-bold mb-4">🗺️ Provincia de Misiones</h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="mapa-interactivo relative">
              <div class="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center text-6xl relative">
                🗺️
                <button v-for="marcador in currentLevelData.actividad.marcadores"
                        :key="marcador.nombre"
                        class="marcador absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold hover:scale-125 transition-transform cursor-pointer"
                        :style="{left: marcador.x+'%', top: marcador.y+'%'}"
                        @click="showMarcadorInfo(marcador)">
                  📍
                </button>
              </div>
            </div>

            <div class="info-misiones">
              <h4 class="font-bold mb-2">Datos de Misiones:</h4>
              <ul class="space-y-2">
                <li><strong>Ubicación:</strong> {{ currentLevelData.infoMisiones.ubicacion }}</li>
                <li><strong>Capital:</strong> {{ currentLevelData.infoMisiones.capital }}</li>
                <li><strong>Ríos:</strong> {{ currentLevelData.infoMisiones.rios.join(', ') }}</li>
                <li><strong>Atracciones:</strong></li>
                <ul class="ml-4">
                  <li v-for="atraccion in currentLevelData.infoMisiones.atracciones" :key="atraccion">
                    • {{ atraccion }}
                  </li>
                </ul>
                <li><strong>Fauna:</strong> {{ currentLevelData.infoMisiones.fauna.join(', ') }}</li>
              </ul>
              
              <div class="curiosidad mt-4 p-3 bg-blue-50 rounded-lg">
                <p class="text-sm">💡 <strong>Curiosidad:</strong></p>
                <p class="text-sm">{{ currentLevelData.infoMisiones.curiosidad }}</p>
              </div>

              <button @click="completeGeografia" class="btn btn-primary w-full mt-4">
                ¡Aprendí sobre Misiones! ✓
              </button>
            </div>
          </div>
        </div>

        <!-- Pregunta del nivel -->
        <Teleport to="body">
          <Transition name="modal">
            <div v-if="showPregunta" class="modal modal-open" @click.self="() => {}">
              <div class="modal-box max-w-2xl">
                <h3 class="font-display text-xl font-bold mb-4">
                  {{ currentLevelData.pregunta.texto }}
                </h3>

                <!-- Fragmento del cuento si aplica -->
                <div v-if="currentLevelData.pregunta.fragmento" 
                     class="fragmento p-4 bg-base-200 rounded-lg mb-4 italic">
                  "{{ currentLevelData.pregunta.fragmento }}"
                </div>

                <!-- Opciones múltiples -->
                <div v-if="currentLevelData.pregunta.tipo !== 'secuencia'" class="options space-y-2">
                  <button v-for="opc in currentLevelData.pregunta.opciones"
                          :key="opc.texto"
                          @click="answerPregunta(opc)"
                          class="btn btn-outline btn-block text-left justify-start">
                    {{ opc.texto }}
                  </button>
                </div>

                <!-- Ordenar secuencia -->
                <div v-else class="secuencia-ordenar">
                  <div class="space-y-2">
                    <div v-for="(evento, idx) in eventosOrdenados" :key="idx"
                         class="evento-card p-3 bg-base-200 rounded cursor-move">
                      {{ idx + 1 }}. {{ evento }}
                    </div>
                  </div>
                  <button @click="verificarSecuencia" class="btn btn-primary w-full mt-4">
                    Verificar orden
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>

        <!-- Comparaciones -->
        <Teleport to="body">
          <Transition name="modal">
            <div v-if="showComparacion" class="modal modal-open" @click.self="() => {}">
              <div class="modal-box">
                <h3 class="font-bold mb-4">🔍 Identifica la comparación</h3>
                <div class="fragmento p-4 bg-base-200 rounded-lg mb-4 italic">
                  "{{ currentLevelData.comparacion.texto }}"
                </div>
                <p class="mb-3">{{ currentLevelData.comparacion.pregunta }}</p>
                <input v-model="respuestaComparacion" 
                       type="text"
                       placeholder="Escribe tu respuesta..."
                       class="input input-bordered w-full mb-4" />
                <button @click="verificarComparacion" class="btn btn-primary w-full">
                  Verificar
                </button>
              </div>
            </div>
          </Transition>
        </Teleport>

        <!-- Nivel completado -->
        <Teleport to="body">
          <Transition name="modal">
            <div v-if="levelCompleted" class="modal modal-open" @click.self="() => {}">
              <div class="modal-box">
                <h2 class="font-display text-2xl font-bold mb-4">
                  {{ currentLevel === 4 ? '🎉 ¡Aventura Completa!' : '✨ ¡Nivel Completado!' }}
                </h2>
                <div class="stats space-y-2 mb-4">
                  <p>Puntuación: <strong>{{ levelScore }}</strong></p>
                </div>
                <div class="modal-action">
                  <button v-if="currentLevel < 4" @click="nextLevel" class="btn btn-primary">
                    Siguiente nivel →
                  </button>
                  <button v-else @click="finishGame" class="btn btn-success">
                    ¡Terminar! 🏆
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </Teleport>
      </div>
    </div>

    <FeedbackModal 
      v-if="showFeedback"
      :show="showFeedback"
      :isCorrect="feedbackCorrect"
      :message="feedbackMessage"
      @close="showFeedback = false"
    />
  </GameLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '../../components/game/GameLayout.vue'
import ScoreBoard from '../../components/game/ScoreBoard.vue'
import ProgressTracker from '../../components/game/ProgressTracker.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
import nivelesData from './niveles.json'

const router = useRouter()
const gameStarted = ref(false)
const currentLevel = ref(0)
const score = ref(0)
const playerPosition = ref(100)
const objetosRecolectados = ref([])
const objetosRestantes = ref([])
const showPregunta = ref(false)
const showComparacion = ref(false)
const respuestaComparacion = ref('')
const levelCompleted = ref(false)
const levelScore = ref(0)
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const eventosOrdenados = ref([])

const instructions = `🎮 Cómo jugar:

• Explora la selva misionera y conoce los cuentos de Horacio Quiroga
• Usa las flechas ← → para mover al personaje
• Haz clic en los objetos brillantes para recolectarlos
• Responde preguntas sobre los cuentos para avanzar
• Identifica comparaciones literarias en los textos
• Completa 5 niveles para terminar la aventura

📚 Contenido educativo:
• "El loro pelado" y otros cuentos de la selva
• "Rikki-Tikki-Tavi" de Rudyard Kipling
• Comprensión narrativa y descripción de personajes
• Identificación de comparaciones literarias
• Geografía de la provincia de Misiones

¡Buena suerte, explorador! 🌿`

const currentLevelData = computed(() => nivelesData.niveles[currentLevel.value])

const startGame = () => {
  gameStarted.value = true
  initLevel()
}

const initLevel = () => {
  levelCompleted.value = false
  levelScore.value = 0
  objetosRecolectados.value = []
  showPregunta.value = false
  showComparacion.value = false
  respuestaComparacion.value = ''
  
  if (currentLevelData.value.objetosRecolectar) {
    objetosRestantes.value = [...currentLevelData.value.objetosRecolectar]
  } else {
    objetosRestantes.value = []
    // Si no hay objetos, mostrar pregunta directamente
    if (currentLevelData.value.pregunta) {
      if (currentLevelData.value.pregunta.tipo === 'secuencia') {
        eventosOrdenados.value = [...currentLevelData.value.pregunta.eventos]
      }
      showPregunta.value = true
    }
  }
}

const getEscenarioStyle = () => {
  // Simple gradient backgrounds for different scenarios
  const escenarios = {
    'casa_quiroga': 'background: linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)',
    'selva': 'background: linear-gradient(135deg, #2d5016 0%, #4a7c59 100%)',
    'jardin': 'background: linear-gradient(135deg, #7cb342 0%, #558b2f 100%)',
    'jardin_noche': 'background: linear-gradient(135deg, #1a237e 0%, #283593 100%)'
  }
  return escenarios[currentLevelData.value.escenario] || 'background: linear-gradient(135deg, #81c784 0%, #66bb6a 100%)'
}

const movePlayer = (delta) => {
  playerPosition.value = Math.max(0, Math.min(700, playerPosition.value + delta))
}

const recolectarObjeto = (objeto) => {
  objetosRecolectados.value.push(objeto)
  objetosRestantes.value = objetosRestantes.value.filter(o => o.id !== objeto.id)
  
  score.value += 10
  
  if (objetosRestantes.value.length === 0) {
    if (currentLevelData.value.pregunta.tipo === 'secuencia') {
      eventosOrdenados.value = [...currentLevelData.value.pregunta.eventos]
    }
    showPregunta.value = true
  }
}

const getObjetoIcon = (id) => {
  const icons = {
    'loro': '🦜',
    'tigre': '🐅',
    'mangosta': '🦡',
    'serpiente': '🐍'
  }
  return icons[id] || '⭐'
}

const answerPregunta = (opcion) => {
  if (opcion.correcto) {
    showPregunta.value = false
    score.value += 20
    
    if (currentLevelData.value.comparacion) {
      showComparacion.value = true
    } else {
      completeLevel()
    }
  } else {
    feedbackCorrect.value = false
    feedbackMessage.value = 'Intenta de nuevo. Relee el fragmento con atención.'
    showFeedback.value = true
  }
}

const verificarSecuencia = () => {
  const ordenCorrecto = currentLevelData.value.pregunta.orden_correcto
  const ordenUsuario = eventosOrdenados.value.map(evento => 
    currentLevelData.value.pregunta.eventos.indexOf(evento)
  )
  
  const esCorrecto = JSON.stringify(ordenUsuario) === JSON.stringify(ordenCorrecto)
  
  if (esCorrecto) {
    showPregunta.value = false
    score.value += 20
    feedbackCorrect.value = true
    feedbackMessage.value = '¡Excelente! Ordenaste los eventos correctamente.'
    showFeedback.value = true
    setTimeout(() => {
      completeLevel()
    }, 2000)
  } else {
    feedbackCorrect.value = false
    feedbackMessage.value = 'El orden no es correcto. Intenta de nuevo pensando en la secuencia de los eventos.'
    showFeedback.value = true
  }
}

const verificarComparacion = () => {
  const respuesta = respuestaComparacion.value.toLowerCase().trim()
  const correcta = currentLevelData.value.comparacion.respuesta.toLowerCase()
  
  if (respuesta.includes(correcta) || correcta.includes(respuesta)) {
    showComparacion.value = false
    score.value += 15
    
    feedbackCorrect.value = true
    feedbackMessage.value = `¡Correcto! ${currentLevelData.value.comparacion.explicacion}`
    showFeedback.value = true
    
    setTimeout(() => {
      completeLevel()
    }, 2000)
  } else {
    feedbackCorrect.value = false
    feedbackMessage.value = 'No es correcto. Fíjate qué se compara con qué usando "como".'
    showFeedback.value = true
  }
}

const showMarcadorInfo = (marcador) => {
  feedbackCorrect.value = true
  feedbackMessage.value = `📍 ${marcador.nombre}: Un lugar importante en Misiones!`
  showFeedback.value = true
}

const completeGeografia = () => {
  score.value += 30
  completeLevel()
}

const completeLevel = () => {
  levelScore.value = 50
  score.value += levelScore.value
  levelCompleted.value = true
}

const nextLevel = () => {
  currentLevel.value++
  initLevel()
}

const finishGame = () => {
  router.push('/juegos')
}
</script>

<style scoped>
.escenario {
  background-size: cover;
  background-position: center;
}
.personaje {
  transition: left 0.3s ease;
}
.objeto-recolectable {
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.marcador {
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
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
