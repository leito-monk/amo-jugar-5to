<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import GameLayout from '../../components/game/GameLayout.vue'
import ProgressTracker from '../../components/game/ProgressTracker.vue'
import locationsData from './locations.json'
// @ts-ignore
import { loadState, startGame, addScore, markCompleted } from '../../../composables/useGameState.js'
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
interface InfoExtra {
  extension?: string
  paises?: string[]
  importancia?: string
  profundidad?: string
  edad?: string
  superficie?: string
  espesura_hielo?: string
}

interface Location {
  id: string
  nombre: string
  coordenadas: { lat: number; lng: number }
  descripcion: string
  tieneAgua: boolean
  estado?: 'liquido' | 'solido' | 'gaseoso'
  tipo?: 'dulce' | 'salada'
  datoCurioso: string
  esEspecial?: boolean
  infoExtra?: InfoExtra
  visitado?: boolean
}

interface UserAnswers {
  tieneAgua: boolean | null
  estado: string | null
  tipo: string | null
}

// State
const mapContainer = ref<HTMLElement | null>(null)
let map: L.Map | null = null
const markers: L.Marker[] = []

const locations = ref<Location[]>([])
const currentLocation = ref<Location | null>(null)
const showModal = ref(false)
const showCertificate = ref(false)
const userAnswers = ref<UserAnswers>({
  tieneAgua: null,
  estado: null,
  tipo: null
})
const discoveries = ref(0)
const feedbackMessage = ref('')
const showFeedback = ref(false)

// Computed
const canSubmit = computed(() => {
  if (userAnswers.value.tieneAgua === null) return false
  if (!userAnswers.value.tieneAgua) return true
  if (userAnswers.value.estado === null) return false
  if (userAnswers.value.estado === 'liquido' && userAnswers.value.tipo === null) return false
  return true
})

const progress = computed(() => {
  const total = locations.value.length
  return total > 0 ? Math.round((discoveries.value / total) * 100) : 0
})

const currentProgressMessage = computed(() => {
  if (discoveries.value === 0) return '¡Comienza tu viaje por la hidrosfera!'
  if (discoveries.value < locations.value.length / 2) return '¡Buen progreso! Continúa explorando.'
  if (discoveries.value < locations.value.length) return '¡Casi terminas! Solo quedan algunas ubicaciones.'
  return '¡Felicitaciones! Has completado el viaje.'
})

const instructions = `
🗺️ **Explora la Hidrosfera del Planeta**

Haz clic en los marcadores del mapa para descubrir diferentes ubicaciones relacionadas con el agua en la Tierra.

**En cada ubicación debes identificar:**
- ¿Hay agua en este lugar?
- Si hay agua, ¿en qué estado se encuentra? (líquido, sólido, gaseoso)
- Si está en estado líquido, ¿es agua dulce o salada?

**Objetivo:** Descubrir y analizar las 10 ubicaciones del mapa para completar tu viaje por la hidrosfera.
`

// Methods
function initializeMap() {
  if (!mapContainer.value) return

  map = L.map(mapContainer.value).setView([20, 0], 2)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map)

  // Add markers
  locations.value.forEach(loc => {
    const marker = L.marker([loc.coordenadas.lat, loc.coordenadas.lng])
      .addTo(map!)
      .bindTooltip(loc.nombre)
      .on('click', () => openLocation(loc))
    
    markers.push(marker)
  })
}

function openLocation(location: Location) {
  if (location.visitado) {
    feedbackMessage.value = '✅ Ya visitaste esta ubicación.'
    showFeedback.value = true
    return
  }

  currentLocation.value = location
  userAnswers.value = {
    tieneAgua: null,
    estado: null,
    tipo: null
  }
  showModal.value = true
  showFeedback.value = false
}

function closeModal() {
  showModal.value = false
  currentLocation.value = null
}

function resetAnswers() {
  userAnswers.value = {
    tieneAgua: null,
    estado: null,
    tipo: null
  }
  showFeedback.value = false
}

function submitAnswers() {
  if (!currentLocation.value || !canSubmit.value) return

  const loc = currentLocation.value

  if (userAnswers.value.tieneAgua !== loc.tieneAgua) {
    feedbackMessage.value = loc.tieneAgua
      ? '❌ ¡Incorrecto! En este lugar sí hay agua. Intenta de nuevo.'
      : '❌ ¡Incorrecto! En este lugar no hay agua como se describe. Intenta de nuevo.'
    showFeedback.value = true
    return
  }

  if (!loc.tieneAgua) {
    markLocationAsVisited(loc)
    return
  }

  if (userAnswers.value.estado !== loc.estado) {
    feedbackMessage.value = `❌ ¡Incorrecto! El agua aquí está en estado ${loc.estado}. Intenta de nuevo.`
    showFeedback.value = true
    return
  }

  if (loc.estado === 'liquido' && userAnswers.value.tipo !== loc.tipo) {
    feedbackMessage.value = `❌ ¡Incorrecto! El agua aquí es ${loc.tipo}. Intenta de nuevo.`
    showFeedback.value = true
    return
  }

  markLocationAsVisited(loc)
}

function markLocationAsVisited(loc: Location) {
  const index = locations.value.findIndex(l => l.id === loc.id)
  if (index !== -1) {
    const location = locations.value[index]
    if (location && !location.visitado) {
      location.visitado = true
      discoveries.value++
      addScore(10)
    
      feedbackMessage.value = '✅ ¡Correcto! Has descubierto esta ubicación.'
      showFeedback.value = true

      setTimeout(() => {
        showModal.value = false
        currentLocation.value = null

        if (discoveries.value === locations.value.length) {
          setTimeout(() => {
            showCertificate.value = true
            markCompleted()
          }, 500)
        }
      }, 1500)
    }
  }
}

function closeCertificate() {
  showCertificate.value = false
}

onMounted(() => {
  loadState()
  startGame()

  locations.value = locationsData.ubicaciones.map(loc => ({
    ...loc,
    estado: loc.estado as 'liquido' | 'solido' | 'gaseoso' | undefined,
    tipo: loc.tipo as 'dulce' | 'salada' | undefined,
    visitado: false
  })) as Location[]

  setTimeout(() => {
    initializeMap()
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
  <GameLayout 
    title="Viaje por la Hidrosfera" 
    :instructions="instructions"
  >
    <!-- Progress Header -->
    <div class="progress-header mb-6 bg-base-100 rounded-lg p-4 shadow-md">
      <h3 class="text-lg font-semibold mb-3 text-center">{{ currentProgressMessage }}</h3>
      <ProgressTracker 
        :current="discoveries" 
        :total="locations.length"
        label="Hidrosfera explorada"
      />
    </div>

    <!-- Map Container -->
    <div class="map-wrapper max-w-6xl mx-auto">
      <div 
        ref="mapContainer" 
        class="map-container rounded-xl overflow-hidden shadow-xl" 
        style="height: 600px; width: 100%;"
      ></div>
    </div>

    <!-- Location Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showModal && currentLocation"
          class="modal modal-open"
          @click.self="closeModal"
        >
          <div class="modal-box max-w-2xl">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              @click="closeModal"
            >✕</button>

            <h3 class="font-bold text-2xl mb-4">{{ currentLocation.nombre }}</h3>
            
            <p class="py-4 text-base">{{ currentLocation.descripcion }}</p>

            <div class="divider"></div>

            <h4 class="font-semibold text-lg mb-3">Responde las siguientes preguntas:</h4>

            <!-- Pregunta 1: ¿Tiene agua? -->
            <div class="form-control mb-4">
              <label class="label">
                <span class="label-text font-semibold">¿Hay agua en este lugar?</span>
              </label>
              <div class="flex gap-3">
                <button
                  class="btn flex-1"
                  :class="userAnswers.tieneAgua === true ? 'btn-primary' : 'btn-outline'"
                  @click="userAnswers.tieneAgua = true"
                >
                  Sí
                </button>
                <button
                  class="btn flex-1"
                  :class="userAnswers.tieneAgua === false ? 'btn-primary' : 'btn-outline'"
                  @click="userAnswers.tieneAgua = false"
                >
                  No
                </button>
              </div>
            </div>

            <!-- Pregunta 2: Estado (solo si tiene agua) -->
            <div v-if="userAnswers.tieneAgua === true" class="form-control mb-4">
              <label class="label">
                <span class="label-text font-semibold">¿En qué estado se encuentra el agua?</span>
              </label>
              <div class="flex gap-2">
                <button
                  class="btn flex-1"
                  :class="userAnswers.estado === 'liquido' ? 'btn-primary' : 'btn-outline'"
                  @click="userAnswers.estado = 'liquido'"
                >
                  Líquido
                </button>
                <button
                  class="btn flex-1"
                  :class="userAnswers.estado === 'solido' ? 'btn-primary' : 'btn-outline'"
                  @click="userAnswers.estado = 'solido'"
                >
                  Sólido
                </button>
                <button
                  class="btn flex-1"
                  :class="userAnswers.estado === 'gaseoso' ? 'btn-primary' : 'btn-outline'"
                  @click="userAnswers.estado = 'gaseoso'"
                >
                  Gaseoso
                </button>
              </div>
            </div>

            <!-- Pregunta 3: Tipo (solo si es líquido) -->
            <div v-if="userAnswers.estado === 'liquido'" class="form-control mb-4">
              <label class="label">
                <span class="label-text font-semibold">¿Qué tipo de agua es?</span>
              </label>
              <div class="flex gap-3">
                <button
                  class="btn flex-1"
                  :class="userAnswers.tipo === 'dulce' ? 'btn-primary' : 'btn-outline'"
                  @click="userAnswers.tipo = 'dulce'"
                >
                  Dulce
                </button>
                <button
                  class="btn flex-1"
                  :class="userAnswers.tipo === 'salada' ? 'btn-primary' : 'btn-outline'"
                  @click="userAnswers.tipo = 'salada'"
                >
                  Salada
                </button>
              </div>
            </div>

            <!-- Feedback -->
            <div v-if="showFeedback" class="alert mb-4" :class="feedbackMessage.startsWith('✅') ? 'alert-success' : 'alert-error'">
              <span>{{ feedbackMessage }}</span>
            </div>

            <!-- Actions -->
            <div class="modal-action">
              <button class="btn btn-ghost" @click="resetAnswers">Reintentar</button>
              <button 
                class="btn btn-primary" 
                :disabled="!canSubmit"
                @click="submitAnswers"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Certificate Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showCertificate" class="modal modal-open">
          <div class="modal-box max-w-3xl certificate">
            <h2 class="text-3xl font-bold text-center mb-6 text-yellow-600">
              🏆 ¡Felicitaciones! 🏆
            </h2>
            <div class="text-center mb-6">
              <p class="text-xl mb-4">Has completado exitosamente</p>
              <p class="text-2xl font-bold mb-4">Viaje por la Hidrosfera</p>
              <p class="text-lg mb-4">Has explorado todas las ubicaciones y comprendes mejor la distribución del agua en nuestro planeta.</p>
              <div class="stats shadow">
                <div class="stat">
                  <div class="stat-title">Ubicaciones descubiertas</div>
                  <div class="stat-value text-primary">{{ discoveries }}</div>
                </div>
                <div class="stat">
                  <div class="stat-title">Progreso</div>
                  <div class="stat-value text-success">{{ progress }}%</div>
                </div>
              </div>
            </div>
            <div class="modal-action justify-center">
              <button class="btn btn-primary" @click="closeCertificate">Cerrar</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </GameLayout>
</template>

<style scoped>
.map-container {
  background: #e0e0e0;
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

.certificate {
  border: 4px solid #fbbf24;
}
</style>
