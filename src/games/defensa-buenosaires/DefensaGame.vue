<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '../../components/game/GameLayout.vue'
import ScoreBoard from '../../components/game/ScoreBoard.vue'
import ProgressTracker from '../../components/game/ProgressTracker.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
// @ts-ignore - useGameState is a JS file
import * as gameState from '../../../composables/useGameState.js'
import invasionesData from './invasiones.json'
import personajesData from './personajes.json'
import lugaresData from './lugares-historicos.json'
// @ts-ignore
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix Leaflet default icon issue
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Types
interface Opcion {
  texto: string
  correcto: boolean
}

interface Pregunta {
  texto: string
  opciones: Opcion[]
  explicacion?: string
}

interface Evento {
  fecha: string
  descripcion: string
  pregunta: Pregunta
}

interface Invasion {
  id: string
  año: number
  titulo: string
  comandante_ingles: string
  defensor: string
  contexto?: string
  eventos: Evento[]
  resultado: string
  consecuencias: string[]
}

interface Defensa {
  id: number
  tipo: string
  x: number
  y: number
}

interface Enemigo {
  id: number
  x: number
  y: number
}

// State
const router = useRouter()
const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
const markers: L.Marker[] = []

const invasionSeleccionada = ref<Invasion | null>(null)
const eventoActual = ref(0)
const eventoRespondido = ref(false)
const score = ref(0)
const showPersonajes = ref(false)
const showResultado = ref(false)
const defensasColocadas = ref<Defensa[]>([])
const enemigos = ref<Enemigo[]>([])
const recursosDisponibles = ref({ milicias: 5, barricadas: 8 })
const invasionesCompletadas = ref<string[]>([])
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')

const instructions = `
Defiende Buenos Aires de las Invasiones Inglesas (1806-1807).

📖 Cómo jugar:
1. Elige qué invasión defender (1806 o 1807)
2. Lee el contexto histórico de cada evento
3. Responde preguntas sobre los hechos históricos
4. Coloca milicias y barricadas en el mapa de Buenos Aires
5. Completa todos los eventos para ver el resultado

🎯 Sistema de puntos:
• Respuesta correcta: +20 puntos
• Desbloqueas recursos de defensa con cada acierto

📚 Objetivo:
Aprender sobre las Invasiones Inglesas, sus personajes y consecuencias históricas.
`

// Computed
const currentEvento = computed(() => {
  return invasionSeleccionada.value?.eventos[eventoActual.value]
})

const totalEventos = computed(() => {
  return invasionSeleccionada.value?.eventos.length || 0
})

const hasNextEvento = computed(() => {
  return eventoActual.value < totalEventos.value - 1
})

const allInvasionsCompleted = computed(() => {
  return invasionesCompletadas.value.length === invasionesData.invasiones.length
})

// Methods
const selectInvasion = (invasion: Invasion) => {
  invasionSeleccionada.value = invasion
  eventoActual.value = 0
  eventoRespondido.value = false
  defensasColocadas.value = []
  recursosDisponibles.value = { milicias: 5, barricadas: 8 }
  
  // Simular enemigos
  enemigos.value = Array.from({length: 5}, (_, i) => ({
    id: i,
    x: Math.random() * 20 + 80,
    y: Math.random() * 80 + 10
  }))
  
  // Initialize game state
  gameState.loadState('defensa-buenosaires')
  gameState.startGame()
  
  // Initialize map after DOM update
  setTimeout(() => {
    initializeMap()
  }, 100)
}

const backToSelection = () => {
  invasionSeleccionada.value = null
  showResultado.value = false
}

const colocarDefensa = (tipo: string) => {
  if (tipo === 'milicia' && recursosDisponibles.value.milicias > 0) {
    defensasColocadas.value.push({
      id: Math.random(),
      tipo: 'milicia',
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20
    })
    recursosDisponibles.value.milicias--
  } else if (tipo === 'barricada' && recursosDisponibles.value.barricadas > 0) {
    defensasColocadas.value.push({
      id: Math.random(),
      tipo: 'barricada',
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20
    })
    recursosDisponibles.value.barricadas--
  }
}

const answerEvento = (opcion: Opcion) => {
  if (opcion.correcto) {
    eventoRespondido.value = true
    score.value += 20
    gameState.addScore(20)
    gameState.recordAnswer(true)
    
    // Desbloquear recursos
    recursosDisponibles.value.milicias += 2
    recursosDisponibles.value.barricadas += 3
  } else {
    gameState.recordAnswer(false)
    feedbackCorrect.value = false
    feedbackMessage.value = 'Intenta de nuevo. Revisa la información histórica.'
    showFeedback.value = true
  }
}

const nextEvento = () => {
  eventoActual.value++
  eventoRespondido.value = false
}

const completeInvasion = () => {
  if (invasionSeleccionada.value) {
    invasionesCompletadas.value.push(invasionSeleccionada.value.id)
    gameState.levelUp()
    showResultado.value = true
  }
}

const finishGame = () => {
  gameState.markCompleted()
  router.push('/juegos')
}

// Map functions
const initializeMap = () => {
  if (!mapContainer.value) return

  // Initialize map without setting view yet
  map = L.map(mapContainer.value)

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  // Collect all marker coordinates for bounds calculation
  const bounds = L.latLngBounds([])

  // Add historical places markers
  lugaresData.lugares.forEach(lugar => {
    const iconColor = getIconColor(lugar.tipo)
    const icon = L.divIcon({
      className: 'custom-marker-defensa',
      html: `<div class="marker-content" style="background-color: ${iconColor}">${getIconEmoji(lugar.tipo)}</div>`,
      iconSize: [35, 35],
      iconAnchor: [17, 17]
    })

    const latLng = L.latLng(lugar.coordenadas.lat, lugar.coordenadas.lng)
    const marker = L.marker(latLng, { icon })
      .addTo(map!)
      .bindPopup(`
        <div class="text-sm">
          <strong>${lugar.nombre}</strong><br>
          <em class="text-xs">${lugar.descripcion}</em>
        </div>
      `)
    
    markers.push(marker)
    bounds.extend(latLng)
  })

  // Fit map to show all markers with padding
  if (bounds.isValid()) {
    map.fitBounds(bounds, { padding: [50, 50] })
  }
}

const getIconColor = (tipo: string) => {
  const colors: Record<string, string> = {
    'estrategico': '#ef4444',
    'militar': '#f59e0b',
    'batalla': '#dc2626',
    'defensa': '#10b981',
    'ruta': '#6366f1',
    'civil': '#8b5cf6',
    'geografico': '#06b6d4'
  }
  return colors[tipo] || '#3b82f6'
}

const getIconEmoji = (tipo: string) => {
  const emojis: Record<string, string> = {
    'estrategico': '⭐',
    'militar': '⚔️',
    'batalla': '💥',
    'defensa': '🛡️',
    'ruta': '➡️',
    'civil': '🏛️',
    'geografico': '🌊'
  }
  return emojis[tipo] || '📍'
}

onMounted(() => {
  gameState.loadState()
  gameState.startGame()
  
  setTimeout(() => {
    if (invasionSeleccionada.value) {
      initializeMap()
    }
  }, 100)
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
  }
})
</script>

<template>
  <GameLayout title="Defensa de Buenos Aires" :instructions="instructions">
    <div class="defensa-container max-w-6xl mx-auto">

      <div v-if="!invasionSeleccionada" class="invasion-selection">
        <h2 class="text-3xl font-display font-bold text-center mb-8">
          Elige qué invasión defender
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="invasion in invasionesData.invasiones" :key="invasion.id"
               class="invasion-card card-edu cursor-pointer hover:scale-105 transition-transform bg-base-100 shadow-xl p-6 rounded-lg"
               @click="selectInvasion(invasion)">
            <div class="text-6xl text-center mb-4">
              {{ invasion.id === 'primera_invasion' ? '⚔️' : '🛡️' }}
            </div>
            <h3 class="text-2xl font-display font-bold text-center mb-2">
              {{ invasion.titulo }}
            </h3>
            <p class="text-center text-gray-600 mb-4">{{ invasion.año }}</p>
            <div class="info-preview text-sm">
              <p><strong>Comandante inglés:</strong> {{ invasion.comandante_ingles }}</p>
              <p><strong>Defensor:</strong> {{ invasion.defensor }}</p>
            </div>
          </div>
        </div>

        <button @click="showPersonajes = true" class="btn btn-secondary btn-block mt-8">
          📜 Ver personajes históricos
        </button>
      </div>

      <div v-else class="game-area">
        <div class="game-header flex justify-between items-center mb-6">
          <button @click="backToSelection" class="btn btn-ghost btn-sm">← Cambiar invasión</button>
          <ScoreBoard :score="score" />
          <ProgressTracker :current="eventoActual + 1" :total="totalEventos" label="Eventos" />
        </div>

        <div class="contexto-historico card-edu mb-6 bg-base-100 p-4 rounded-lg shadow-md">
          <h3 class="font-bold mb-2">📖 Contexto histórico</h3>
          <p class="text-sm">{{ invasionSeleccionada.contexto }}</p>
        </div>

        <div class="mapa-defensa card-edu mb-6 bg-base-100 p-4 rounded-lg shadow-md">
          <h3 class="font-bold mb-4">🗺️ Mapa Histórico de Buenos Aires (1806-1807)</h3>
          
          <div 
            ref="mapContainer" 
            class="leaflet-map-container rounded-lg overflow-hidden shadow-lg" 
            style="height: 500px; width: 100%;"
          ></div>

          <div class="map-legend mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div class="flex items-center gap-1">
              <span>⭐</span> <span>Estratégico</span>
            </div>
            <div class="flex items-center gap-1">
              <span>⚔️</span> <span>Militar</span>
            </div>
            <div class="flex items-center gap-1">
              <span>💥</span> <span>Batalla</span>
            </div>
            <div class="flex items-center gap-1">
              <span>🛡️</span> <span>Defensa</span>
            </div>
            <div class="flex items-center gap-1">
              <span>➡️</span> <span>Ruta</span>
            </div>
            <div class="flex items-center gap-1">
              <span>🏛️</span> <span>Civil</span>
            </div>
            <div class="flex items-center gap-1">
              <span>🌊</span> <span>Geográfico</span>
            </div>
          </div>
        </div>

        <div class="recursos-info card-edu mb-6 bg-base-100 p-4 rounded-lg shadow-md">
          <h3 class="font-bold mb-2">📦 Recursos Disponibles</h3>
          <div class="defensa-controls flex gap-4">
            <button @click="colocarDefensa('milicia')" 
                    :disabled="recursosDisponibles.milicias <= 0"
                    class="btn btn-primary btn-sm">
              🛡️ Milicia ({{ recursosDisponibles.milicias }})
            </button>
            <button @click="colocarDefensa('barricada')"
                    :disabled="recursosDisponibles.barricadas <= 0"
                    class="btn btn-secondary btn-sm">
              🧱 Barricada ({{ recursosDisponibles.barricadas }})
            </button>
          </div>
        </div>

        <div class="evento-actual card-edu bg-base-100 p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-bold mb-2">{{ currentEvento?.fecha }}</h3>
          <p class="mb-4">{{ currentEvento?.descripcion }}</p>

          <div v-if="!eventoRespondido" class="pregunta-evento">
            <h4 class="font-semibold mb-3">{{ currentEvento?.pregunta.texto }}</h4>
            <div class="options space-y-2">
              <button v-for="opc in currentEvento?.pregunta.opciones"
                      :key="opc.texto"
                      @click="answerEvento(opc)"
                      class="btn btn-outline btn-block text-left justify-start">
                {{ opc.texto }}
              </button>
            </div>
          </div>

          <div v-else class="evento-completado">
            <div class="success-message p-4 bg-green-50 rounded-lg mb-4 border border-green-200">
              <p class="text-green-700 font-semibold">✓ ¡Correcto!</p>
              <p v-if="currentEvento?.pregunta.explicacion" class="text-sm mt-2 text-green-600">
                {{ currentEvento.pregunta.explicacion }}
              </p>
            </div>

            <button v-if="hasNextEvento" @click="nextEvento" class="btn btn-primary">
              Siguiente evento →
            </button>
            <button v-else @click="completeInvasion" class="btn btn-success">
              Ver resultado 🏆
            </button>
          </div>
        </div>
      </div>

      <!-- Modal resultado final -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showResultado" class="modal modal-open">
            <div class="modal-box max-w-2xl">
              <h2 class="font-display text-3xl font-bold mb-4">
                🎉 {{ invasionSeleccionada?.resultado }}
              </h2>
              
              <div class="consecuencias mb-6">
                <h3 class="font-bold mb-2">Consecuencias históricas:</h3>
                <ul class="list-disc list-inside space-y-1">
                  <li v-for="cons in invasionSeleccionada?.consecuencias" :key="cons">
                    {{ cons }}
                  </li>
                </ul>
              </div>

              <div class="stats space-y-2 mb-4">
                <p>Puntuación total: <strong>{{ score }}</strong></p>
                <p>Eventos completados: <strong>{{ totalEventos }}</strong></p>
              </div>

              <div class="modal-action">
                <button v-if="!allInvasionsCompleted" @click="backToSelection" class="btn btn-primary">
                  Jugar otra invasión →
                </button>
                <button v-else @click="finishGame" class="btn btn-success">
                  ¡Terminar! 🏆
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>

      <!-- Modal personajes -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showPersonajes" class="modal modal-open">
            <div class="modal-box max-w-4xl">
              <h2 class="font-display text-2xl font-bold mb-6">📜 Personajes Históricos</h2>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div v-for="personaje in personajesData.personajes" :key="personaje.id"
                     class="personaje-card p-4 bg-base-200 rounded-lg">
                  <div class="flex gap-4">
                    <div class="avatar">
                      <div class="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl">
                        {{ personaje.nombre[0] }}
                      </div>
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold">{{ personaje.nombre }}</h4>
                      <p class="text-sm text-gray-600">{{ personaje.rol }}</p>
                      <p class="text-sm mt-2">{{ personaje.descripcion }}</p>
                      
                      <div v-if="personaje.logros" class="mt-2">
                        <p class="text-xs font-semibold">Logros:</p>
                        <ul class="text-xs list-disc list-inside">
                          <li v-for="logro in personaje.logros" :key="logro">{{ logro }}</li>
                        </ul>
                      </div>
                      
                      <div v-if="personaje.resultado" class="mt-2">
                        <p class="text-xs"><strong>Resultado:</strong> {{ personaje.resultado }}</p>
                      </div>
                      
                      <div v-if="personaje.reconocimiento" class="mt-2">
                        <p class="text-xs"><strong>Reconocimiento:</strong> {{ personaje.reconocimiento }}</p>
                      </div>
                      
                      <div v-if="personaje.accion" class="mt-2">
                        <p class="text-xs"><strong>Acción:</strong> {{ personaje.accion }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-action">
                <button @click="showPersonajes = false" class="btn">Cerrar</button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
    </div>

    <FeedbackModal 
      v-if="showFeedback"
      :show="showFeedback"
      :is-correct="feedbackCorrect"
      :message="feedbackMessage"
      @close="showFeedback = false"
    />
  </GameLayout>
</template>

<style scoped>
.mapa-container {
  min-height: 400px;
}

.defensa-icon, .enemigo-icon {
  font-size: 2rem;
  animation: float 2s ease-in-out infinite;
  transform: translate(-50%, -50%);
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%) translateY(0); }
  50% { transform: translate(-50%, -50%) translateY(-10px); }
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

/* Leaflet custom markers */
.custom-marker-defensa {
  background: transparent;
  border: none;
}

.custom-marker-defensa .marker-content {
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 18px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border: 2px solid white;
}

.custom-marker-defensa .marker-content:hover {
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.leaflet-map-container {
  background: #e0e0e0;
}
</style>
