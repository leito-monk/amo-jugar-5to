<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '../../components/game/GameLayout.vue'
import ScoreBoard from '../../components/game/ScoreBoard.vue'
import ProgressTracker from '../../components/game/ProgressTracker.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
// @ts-ignore
import * as gameState from '../../../composables/useGameState.js'
import mundosData from './mundos.json'
import vocabularioData from './vocabulario.json'

interface Opcion {
  texto: string
  correcto: boolean
}

interface ParEmparejamiento {
  personaje: string
  deseo: string
}

interface Pregunta {
  texto: string
  tipo?: string
  opciones?: Opcion[]
  pares?: ParEmparejamiento[]
  explicacion?: string
}

interface Escena {
  id: string
  titulo: string
  descripcion: string
  imagen: string
  pregunta: Pregunta
  palabrasNuevas: string[]
  siguienteEscena: string | null
}

interface Mundo {
  id: string
  nombre: string
  personaje: string
  escenas: Escena[]
}

interface Palabra {
  palabra: string
  definicion: string
  ejemplo: string
  sinonimos: string[]
}

interface NuevoMundo {
  nombre: string
  portal: string
  descripcion: string
  personaje: string
}

const router = useRouter()
const mundos = ref<Mundo[]>(mundosData.mundos)
const mundoSeleccionado = ref<Mundo | null>(null)
const currentSceneIndex = ref(0)
const sceneAnswered = ref(false)
const score = ref(0)
const palabrasAprendidas = ref<Palabra[]>([])
const showVocabulario = ref(false)
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const showFinalActivity = ref(false)
const nuevoMundo = ref<NuevoMundo>({
  nombre: '',
  portal: '',
  descripcion: '',
  personaje: ''
})

// Estado para el juego de emparejamiento
const matchingPairs = ref<Record<string, string>>({})
const shuffledDeseos = ref<string[]>([])

const instructions = `🌟 Portal Mágico: Oz y Narnia

¡Explora mundos fantásticos y aprende nuevas palabras!

📚 Cómo jugar:
• Elige entre el Mundo de Oz o el Reino de Narnia
• Lee cada escena con atención
• Responde preguntas de comprensión lectora
• Colecciona palabras nuevas en tu banco de vocabulario
• Al final, crea tu propio mundo fantástico

🎯 Objetivos:
• Mejorar tu comprensión lectora
• Aprender vocabulario nuevo
• Desarrollar tu creatividad e imaginación

¡Que comience la aventura! 🚪✨`

const currentScene = computed(() => {
  return mundoSeleccionado.value?.escenas[currentSceneIndex.value]
})

const totalScenes = computed(() => {
  return mundoSeleccionado.value?.escenas.length || 0
})

const hasNextScene = computed(() => {
  return currentSceneIndex.value < totalScenes.value - 1
})

const wordCount = computed(() => {
  return nuevoMundo.value.descripcion.trim().split(/\s+/).filter(w => w.length > 0).length
})

const canSubmitWorld = computed(() => {
  return nuevoMundo.value.nombre.length > 0 &&
         nuevoMundo.value.portal.length > 0 &&
         wordCount.value >= 50 &&
         nuevoMundo.value.personaje.length > 0
})

const selectWorld = (mundo: Mundo) => {
  mundoSeleccionado.value = mundo
  currentSceneIndex.value = 0
  sceneAnswered.value = false
  gameState.loadState('portal-magico')
  gameState.startGame()
}

const backToSelection = () => {
  mundoSeleccionado.value = null
  currentSceneIndex.value = 0
  sceneAnswered.value = false
  matchingPairs.value = {}
}

const answerQuestion = (opcion: Opcion) => {
  if (opcion.correcto) {
    sceneAnswered.value = true
    score.value += 15
    gameState.addScore(15)
    gameState.recordAnswer(true)
    
    // Agregar palabras nuevas al banco
    if (currentScene.value) {
      currentScene.value.palabrasNuevas.forEach(palabra => {
        const palabraData = vocabularioData.palabras.find((p: Palabra) => p.palabra === palabra)
        if (palabraData && !palabrasAprendidas.value.find(p => p.palabra === palabra)) {
          palabrasAprendidas.value.push(palabraData)
        }
      })
    }
  } else {
    gameState.recordAnswer(false)
    feedbackCorrect.value = false
    feedbackMessage.value = 'Intenta de nuevo. Relee el texto con atención.'
    showFeedback.value = true
  }
}

const initMatchingGame = () => {
  if (currentScene.value?.pregunta.pares) {
    const deseos = currentScene.value.pregunta.pares.map(p => p.deseo)
    shuffledDeseos.value = [...deseos].sort(() => Math.random() - 0.5)
    matchingPairs.value = {}
  }
}

const selectDeseo = (deseo: string) => {
  if (!currentScene.value?.pregunta.pares) return
  
  // Encontrar el primer personaje sin emparejar
  const personajeSinEmparejar = currentScene.value.pregunta.pares.find(
    p => !matchingPairs.value[p.personaje]
  )
  
  if (personajeSinEmparejar) {
    matchingPairs.value[personajeSinEmparejar.personaje] = deseo
    
    // Verificar si se completaron todos los emparejamientos
    if (Object.keys(matchingPairs.value).length === currentScene.value.pregunta.pares.length) {
      checkMatchingAnswers()
    }
  }
}

const checkMatchingAnswers = () => {
  if (!currentScene.value?.pregunta.pares) return
  
  const allCorrect = currentScene.value.pregunta.pares.every(
    par => matchingPairs.value[par.personaje] === par.deseo
  )
  
  if (allCorrect) {
    sceneAnswered.value = true
    score.value += 15
    gameState.addScore(15)
    gameState.recordAnswer(true)
    
    // Agregar palabras nuevas al banco
    currentScene.value.palabrasNuevas.forEach(palabra => {
      const palabraData = vocabularioData.palabras.find((p: Palabra) => p.palabra === palabra)
      if (palabraData && !palabrasAprendidas.value.find(p => p.palabra === palabra)) {
        palabrasAprendidas.value.push(palabraData)
      }
    })
  } else {
    gameState.recordAnswer(false)
    matchingPairs.value = {}
    feedbackCorrect.value = false
    feedbackMessage.value = 'Los emparejamientos no son correctos. Intenta de nuevo.'
    showFeedback.value = true
  }
}

const showWordDefinition = (palabra: string) => {
  const palabraData = vocabularioData.palabras.find((p: Palabra) => p.palabra === palabra)
  if (palabraData) {
    feedbackCorrect.value = true
    feedbackMessage.value = `${palabraData.palabra}: ${palabraData.definicion}\n\nEjemplo: ${palabraData.ejemplo}`
    showFeedback.value = true
  }
}

const nextScene = () => {
  currentSceneIndex.value++
  sceneAnswered.value = false
  matchingPairs.value = {}
  
  // Inicializar juego de emparejamiento si la siguiente escena lo requiere
  if (currentScene.value?.pregunta.tipo === 'emparejamiento') {
    initMatchingGame()
  }
}

const completeWorld = () => {
  gameState.levelUp()
  showFinalActivity.value = true
}

const submitWorld = () => {
  // Guardar mundo creado
  const savedWorlds = JSON.parse(localStorage.getItem('mundosCreados') || '[]')
  savedWorlds.push({
    ...nuevoMundo.value,
    fecha: new Date().toISOString()
  })
  localStorage.setItem('mundosCreados', JSON.stringify(savedWorlds))
  
  score.value += 50
  gameState.addScore(50)
  gameState.markCompleted()
  
  feedbackCorrect.value = true
  feedbackMessage.value = '¡Increíble mundo! Has completado la aventura.'
  showFeedback.value = true
  showFinalActivity.value = false
  
  setTimeout(() => {
    router.push('/juegos')
  }, 3000)
}

</script>

<template>
  <GameLayout title="Portal Mágico: Oz y Narnia" :instructions="instructions">
    <div class="portal-container max-w-5xl mx-auto">

      <div v-if="!mundoSeleccionado" class="world-selection">
        <h2 class="text-3xl font-display font-bold text-center mb-8">
          ¿Qué mundo quieres explorar?
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="mundo in mundos" :key="mundo.id" 
               class="world-card card-edu cursor-pointer hover:scale-105 transition-transform bg-base-100 shadow-xl p-8 rounded-lg"
               @click="selectWorld(mundo)">
            <div class="text-6xl text-center mb-4">{{ mundo.id === 'oz' ? '🌪️' : '🚪' }}</div>
            <h3 class="text-2xl font-display font-bold text-center mb-2">
              {{ mundo.nombre }}
            </h3>
            <p class="text-center text-gray-600">
              Sigue a {{ mundo.personaje }} en su aventura
            </p>
          </div>
        </div>
      </div>

      <div v-else class="adventure-area">
        <div class="adventure-header flex justify-between items-center mb-6">
          <button @click="backToSelection" class="btn btn-ghost btn-sm">← Cambiar mundo</button>
          <ScoreBoard :score="score" />
          <button @click="showVocabulario = true" class="btn btn-info btn-sm">
            📖 Palabras ({{ palabrasAprendidas.length }})
          </button>
        </div>

        <div class="scene-container bg-base-100 shadow-xl p-6 rounded-lg">
          <div class="scene-image mb-4 text-center">
            <div class="text-9xl">{{ currentScene?.imagen }}</div>
          </div>

          <h3 class="text-2xl font-display font-bold mb-4">{{ currentScene?.titulo }}</h3>
          
          <div class="scene-text prose prose-lg mb-6">
            <p>{{ currentScene?.descripcion }}</p>
          </div>

          <div v-if="!sceneAnswered" class="question-section">
            <h4 class="font-semibold mb-3 text-lg">{{ currentScene?.pregunta.texto }}</h4>
            
            <div v-if="currentScene?.pregunta.tipo !== 'emparejamiento'" class="options space-y-2">
              <button v-for="opc in currentScene?.pregunta.opciones"
                      :key="opc.texto"
                      @click="answerQuestion(opc)"
                      class="btn btn-outline btn-block text-left justify-start">
                {{ opc.texto }}
              </button>
            </div>

            <div v-else class="matching-game">
              <p class="text-sm text-gray-600 mb-4">Haz clic en cada deseo para emparejar con el personaje</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="personajes">
                  <h5 class="font-semibold mb-2">Personajes:</h5>
                  <div v-for="par in currentScene?.pregunta.pares" :key="par.personaje"
                       class="match-item bg-blue-50 p-3 rounded mb-2 flex justify-between items-center">
                    <span>{{ par.personaje }}</span>
                    <span v-if="matchingPairs[par.personaje]" class="text-sm text-green-600">
                      → {{ matchingPairs[par.personaje] }}
                    </span>
                  </div>
                </div>
                <div class="deseos">
                  <h5 class="font-semibold mb-2">Deseos:</h5>
                  <div v-for="deseo in shuffledDeseos" :key="deseo"
                       class="match-item bg-green-50 p-3 rounded mb-2 cursor-pointer hover:bg-green-100 transition"
                       :class="{ 'opacity-50': Object.values(matchingPairs).includes(deseo) }"
                       @click="selectDeseo(deseo)">
                    {{ deseo }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="scene-complete">
            <div class="success-message p-4 bg-green-50 rounded-lg mb-4">
              <p class="text-green-700 font-semibold">✓ ¡Correcto!</p>
              <p v-if="currentScene?.pregunta.explicacion" class="text-sm mt-2">
                {{ currentScene?.pregunta.explicacion }}
              </p>
            </div>

            <div class="new-words mb-4">
              <h4 class="font-semibold mb-2">📚 Palabras nuevas de esta escena:</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="palabra in currentScene?.palabrasNuevas" 
                      :key="palabra"
                      @click="showWordDefinition(palabra)"
                      class="badge badge-lg badge-primary cursor-pointer hover:badge-secondary transition">
                  {{ palabra }}
                </span>
              </div>
            </div>

            <button v-if="hasNextScene" @click="nextScene" class="btn btn-primary">
              Continuar aventura →
            </button>
            <button v-else @click="completeWorld" class="btn btn-success">
              Completar mundo 🌟
            </button>
          </div>
        </div>

        <ProgressTracker 
          :current="currentSceneIndex + 1" 
          :total="totalScenes"
          label="Escenas" 
          class="mt-6"
        />
      </div>

      <!-- Modal vocabulario -->
      <div v-if="showVocabulario" class="modal modal-open">
        <div class="modal-box max-w-2xl">
          <h3 class="font-display text-2xl font-bold mb-4">📖 Banco de Palabras</h3>
          
          <div class="words-list space-y-4 max-h-96 overflow-y-auto">
            <div v-for="palabra in palabrasAprendidas" :key="palabra.palabra"
                 class="word-card p-4 bg-base-200 rounded-lg transition-all hover:shadow-md">
              <h4 class="font-bold text-lg">{{ palabra.palabra }}</h4>
              <p class="text-sm mb-2">{{ palabra.definicion }}</p>
              <p class="text-sm italic text-gray-600">
                Ejemplo: "{{ palabra.ejemplo }}"
              </p>
              <div v-if="palabra.sinonimos.length" class="mt-2">
                <span class="text-xs font-semibold">Sinónimos: </span>
                <span class="text-xs">{{ palabra.sinonimos.join(', ') }}</span>
              </div>
            </div>
          </div>

          <div class="modal-action">
            <button @click="showVocabulario = false" class="btn">Cerrar</button>
          </div>
        </div>
      </div>

      <!-- Actividad final: Crear tu mundo -->
      <div v-if="showFinalActivity" class="modal modal-open">
        <div class="modal-box max-w-3xl">
          <h2 class="font-display text-2xl font-bold mb-4">
            ✨ Crea tu propio mundo fantástico
          </h2>
          
          <div class="space-y-4">
            <div>
              <label class="label">
                <span class="label-text">Nombre de tu mundo:</span>
              </label>
              <input v-model="nuevoMundo.nombre" 
                     type="text" 
                     placeholder="Ej: El Reino de las Nubes Doradas"
                     class="input input-bordered w-full" />
            </div>

            <div>
              <label class="label">
                <span class="label-text">¿Cómo se llega a tu mundo?</span>
              </label>
              <input v-model="nuevoMundo.portal" 
                     type="text" 
                     placeholder="Ej: A través de un espejo mágico"
                     class="input input-bordered w-full" />
            </div>

            <div>
              <label class="label">
                <span class="label-text">Describe tu mundo (mínimo 50 palabras):</span>
              </label>
              <textarea v-model="nuevoMundo.descripcion"
                        rows="5"
                        placeholder="Escribe sobre los lugares, criaturas, clima, y aventuras..."
                        class="textarea textarea-bordered w-full"></textarea>
              <div class="text-xs text-right mt-1" :class="wordCount >= 50 ? 'text-success' : 'text-warning'">
                {{ wordCount }} palabras
              </div>
            </div>

            <div>
              <label class="label">
                <span class="label-text">Personaje principal:</span>
              </label>
              <input v-model="nuevoMundo.personaje"
                     type="text"
                     placeholder="¿Quién vive la aventura?"
                     class="input input-bordered w-full" />
            </div>
          </div>

          <div class="modal-action">
            <button @click="showFinalActivity = false" class="btn btn-ghost">Cancelar</button>
            <button @click="submitWorld" 
                    :disabled="!canSubmitWorld"
                    class="btn btn-primary">
              Guardar mi mundo ✨
            </button>
          </div>
        </div>
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

<style scoped>
.world-card {
  @apply transition-all;
}

.world-card:hover {
  @apply shadow-2xl;
}

.match-item {
  @apply transition-all;
}

.word-card:hover {
  @apply transform -translate-y-1;
}
</style>
