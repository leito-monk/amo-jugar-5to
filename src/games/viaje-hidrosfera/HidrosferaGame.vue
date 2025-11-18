<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LTooltip } from '@vue-leaflet/vue-leaflet'
import GameLayout from '../../components/game/GameLayout.vue'
import ProgressTracker from '../../components/game/ProgressTracker.vue'
import locationsData from './locations.json'
// @ts-ignore
import { loadState, startGame, addScore, markCompleted } from '../../../composables/useGameState.js'

// Types
interface InfoExtra {
  extension: string
  paises: string[]
  importancia: string
}

interface Location {
  id: string
  nombre: string
  coordenadas: { lat: number; lng: number }
  descripcion: string
  tieneAgua: boolean
  estado: 'liquido' | 'solido' | 'gaseoso'
  tipo: 'dulce' | 'salada'
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
const currentProgressMessage = computed(() => {
  if (discoveries.value === 0) return '¡Comienza tu viaje por la hidrosfera!'
  if (discoveries.value < 5) return '¡Buen comienzo! Sigue explorando...'
  if (discoveries.value < 10) return '¡Excelente! Ya vas por la mitad...'
  if (discoveries.value === 10) return '¡Felicitaciones! ¡Completaste el viaje!'
  return ''
})

const canSubmit = computed(() => {
  if (userAnswers.value.tieneAgua === false) return true
  if (userAnswers.value.tieneAgua && !userAnswers.value.estado) return false
  if (userAnswers.value.estado === 'liquido' && !userAnswers.value.tipo) return false
  return true
})

// Instructions
const instructions = `🌊 Viaje por la Hidrosfera

Explora 10 ubicaciones del planeta para aprender sobre el agua en la Tierra:

1. Haz clic en los puntos del mapa (❓) para explorar cada ubicación
2. Responde correctamente las preguntas sobre el agua:
   - ¿Hay agua aquí?
   - ¿En qué estado? (líquido, sólido o gaseoso)
   - Si es líquido: ¿Es dulce o salada?
3. Marca cada ubicación como "descubierta" (✅) al responder correctamente
4. Descubre información especial sobre el Acuífero Guaraní
5. Obtén tu certificado de explorador al completar las 10 ubicaciones

¡Aprende sobre la hidrosfera mientras viajas por el mundo!`

// Methods
function openLocation(loc: Location) {
  currentLocation.value = loc
  showModal.value = true
  userAnswers.value = {
    tieneAgua: null,
    estado: null,
    tipo: null
  }
  feedbackMessage.value = ''
  showFeedback.value = false
}

function closeModal() {
  showModal.value = false
  currentLocation.value = null
}

function submitAnswers() {
  if (!currentLocation.value || !canSubmit.value) return

  const loc = currentLocation.value

  // Verificar si tiene agua
  if (userAnswers.value.tieneAgua !== loc.tieneAgua) {
    feedbackMessage.value = loc.tieneAgua
      ? '❌ ¡Incorrecto! En este lugar sí hay agua. Intenta de nuevo.'
      : '❌ ¡Incorrecto! En este lugar no hay agua como se describe. Intenta de nuevo.'
    showFeedback.value = true
    return
  }

  // Si no tiene agua, la respuesta es correcta
  if (!loc.tieneAgua) {
    markLocationAsVisited(loc)
    return
  }

  // Verificar estado del agua
  if (userAnswers.value.estado !== loc.estado) {
    feedbackMessage.value = `❌ ¡Incorrecto! El agua aquí está en estado ${loc.estado}. Intenta de nuevo.`
    showFeedback.value = true
    return
  }

  // Verificar tipo (solo si es líquido)
  if (loc.estado === 'liquido' && userAnswers.value.tipo !== loc.tipo) {
    feedbackMessage.value = `❌ ¡Incorrecto! El agua aquí es ${loc.tipo}. Intenta de nuevo.`
    showFeedback.value = true
    return
  }

  // Si llegamos aquí, todas las respuestas son correctas
  markLocationAsVisited(loc)
}

function markLocationAsVisited(loc: Location) {
  // Encontrar la ubicación en el array y marcarla como visitada
  const index = locations.value.findIndex(l => l.id === loc.id)
  if (index !== -1) {
    const location = locations.value[index]
    if (location && !location.visitado) {
      location.visitado = true
      discoveries.value++
      addScore(10)
    
      feedbackMessage.value = '✅ ¡Correcto! Has descubierto esta ubicación.'
      showFeedback.value = true
      
      // Si se descubrieron todas las ubicaciones
      if (discoveries.value === locations.value.length) {
        setTimeout(() => {
          showModal.value = false
          showCertificate.value = true
          markCompleted()
        }, 1500)
      }
    }
  }
}

function finishGame() {
  showCertificate.value = false
  // Podríamos navegar a otra vista o resetear el juego
}

// Lifecycle
onMounted(() => {
  loadState('viaje-hidrosfera')
  startGame()
  
  // Cargar ubicaciones y agregar la propiedad visitado
  locations.value = locationsData.ubicaciones.map((loc: any) => ({
    ...loc,
    visitado: false
  })) as Location[]
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
      <div class="map-container rounded-xl overflow-hidden shadow-xl" style="height: 600px;">
        <l-map
          :zoom="2"
          :center="[20, 0]"
          style="height: 100%; width: 100%;"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <!-- Location Markers -->
          <l-marker
            v-for="loc in locations"
            :key="loc.id"
            :lat-lng="[loc.coordenadas.lat, loc.coordenadas.lng]"
            @click="openLocation(loc)"
          >
            <l-tooltip>{{ loc.nombre }}</l-tooltip>
          </l-marker>
        </l-map>
      </div>
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
              @click="closeModal"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>

            <!-- Location Header -->
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
              <span v-if="currentLocation.esEspecial">⭐</span>
              {{ currentLocation.nombre }}
            </h2>

            <!-- Location Description -->
            <p class="text-base-content/80 mb-4">{{ currentLocation.descripcion }}</p>

            <!-- Quiz Section (if not visited) -->
            <div v-if="!currentLocation.visitado" class="quiz space-y-4">
              <!-- Question 1: ¿Hay agua? -->
              <div class="question bg-base-200 p-4 rounded-lg">
                <p class="font-semibold mb-3">¿Hay agua aquí?</p>
                <div class="flex gap-2">
                  <button 
                    class="btn btn-sm"
                    :class="userAnswers.tieneAgua === true ? 'btn-primary' : 'btn-outline'"
                    @click="userAnswers.tieneAgua = true"
                  >
                    Sí
                  </button>
                  <button 
                    class="btn btn-sm"
                    :class="userAnswers.tieneAgua === false ? 'btn-primary' : 'btn-outline'"
                    @click="userAnswers.tieneAgua = false; userAnswers.estado = null; userAnswers.tipo = null"
                  >
                    No
                  </button>
                </div>
              </div>

              <!-- Question 2: ¿En qué estado? (only if tieneAgua is true) -->
              <div v-if="userAnswers.tieneAgua === true" class="question bg-base-200 p-4 rounded-lg">
                <p class="font-semibold mb-3">¿En qué estado se encuentra el agua?</p>
                <div class="flex flex-wrap gap-2">
                  <button 
                    class="btn btn-sm"
                    :class="userAnswers.estado === 'liquido' ? 'btn-secondary' : 'btn-outline'"
                    @click="userAnswers.estado = 'liquido'; userAnswers.tipo = null"
                  >
                    💧 Líquido
                  </button>
                  <button 
                    class="btn btn-sm"
                    :class="userAnswers.estado === 'solido' ? 'btn-secondary' : 'btn-outline'"
                    @click="userAnswers.estado = 'solido'; userAnswers.tipo = 'dulce'"
                  >
                    ❄️ Sólido
                  </button>
                  <button 
                    class="btn btn-sm"
                    :class="userAnswers.estado === 'gaseoso' ? 'btn-secondary' : 'btn-outline'"
                    @click="userAnswers.estado = 'gaseoso'; userAnswers.tipo = 'dulce'"
                  >
                    ☁️ Gaseoso
                  </button>
                </div>
              </div>

              <!-- Question 3: ¿Dulce o salada? (only if estado is liquido) -->
              <div v-if="userAnswers.estado === 'liquido'" class="question bg-base-200 p-4 rounded-lg">
                <p class="font-semibold mb-3">¿El agua es dulce o salada?</p>
                <div class="flex gap-2">
                  <button 
                    class="btn btn-sm"
                    :class="userAnswers.tipo === 'dulce' ? 'btn-accent' : 'btn-outline'"
                    @click="userAnswers.tipo = 'dulce'"
                  >
                    🚰 Dulce
                  </button>
                  <button 
                    class="btn btn-sm"
                    :class="userAnswers.tipo === 'salada' ? 'btn-accent' : 'btn-outline'"
                    @click="userAnswers.tipo = 'salada'"
                  >
                    🌊 Salada
                  </button>
                </div>
              </div>

              <!-- Feedback Message -->
              <div v-if="showFeedback" class="alert" :class="feedbackMessage.includes('✅') ? 'alert-success' : 'alert-error'">
                {{ feedbackMessage }}
              </div>

              <!-- Submit Button -->
              <button 
                @click="submitAnswers" 
                :disabled="!canSubmit"
                class="btn btn-primary w-full"
                :class="{ 'btn-disabled': !canSubmit }"
              >
                Verificar Respuestas
              </button>
            </div>

            <!-- Result Section (if visited) -->
            <div v-else class="result space-y-4">
              <div class="alert alert-success">
                <span class="text-xl">✅</span>
                <span>¡Descubierto! Has explorado esta ubicación correctamente.</span>
              </div>

              <!-- Dato Curioso -->
              <div class="dato-curioso bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <p class="font-semibold text-blue-900 mb-2">💡 Dato Curioso:</p>
                <p class="text-blue-800">{{ currentLocation.datoCurioso }}</p>
              </div>

              <!-- Special Info for Acuífero Guaraní -->
              <div v-if="currentLocation.esEspecial && currentLocation.infoExtra" class="special-info bg-warning/10 border-2 border-warning p-4 rounded-lg">
                <h4 class="font-bold text-lg mb-3 flex items-center gap-2">
                  <span>ℹ️</span>
                  Información Especial: {{ currentLocation.nombre }}
                </h4>
                <ul class="space-y-2 list-none">
                  <li><strong>Extensión:</strong> {{ currentLocation.infoExtra.extension }}</li>
                  <li><strong>Países:</strong> {{ currentLocation.infoExtra.paises.join(', ') }}</li>
                  <li><strong>Importancia:</strong> {{ currentLocation.infoExtra.importancia }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Certificate Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showCertificate"
          class="modal modal-open"
          @click.self="finishGame"
        >
          <div class="modal-box max-w-2xl certificate text-center bg-gradient-to-br from-primary/20 to-secondary/20">
            <h2 class="text-3xl font-bold mb-4">🏆 Certificado de Explorador</h2>
            <div class="text-6xl mb-4">🌊</div>
            <p class="text-xl mb-4">¡Felicitaciones!</p>
            <p class="text-lg mb-6">Has explorado exitosamente toda la hidrosfera terrestre.</p>
            <div class="stats stats-vertical lg:stats-horizontal shadow mb-6">
              <div class="stat">
                <div class="stat-title">Descubrimientos</div>
                <div class="stat-value text-primary">10/10</div>
                <div class="stat-desc">✓ Completado</div>
              </div>
            </div>
            <p class="text-base-content/70 mb-6">
              Ahora conoces los diferentes estados del agua, sus tipos y ubicaciones importantes en nuestro planeta.
            </p>
            <button @click="finishGame" class="btn btn-primary btn-lg">
              ¡Genial!
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </GameLayout>
</template>

<style scoped>
.map-wrapper {
  margin: 0 auto;
}

.map-container {
  overflow: hidden;
}

.aspect-ratio-box {
  position: relative;
  width: 100%;
  /* 16:9 aspect ratio for world map */
  padding-bottom: 56.25%;
}

.aspect-ratio-box > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hotspot {
  touch-action: manipulation;
  font-weight: 600;
}

.hotspot:hover {
  transform: translate(-50%, -50%) scale(1.15);
  z-index: 20;
}

.hotspot:not(.bg-success) {
  animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
}

.glow-gold {
  box-shadow: 0 0 20px rgba(234, 179, 8, 0.6);
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

/* Leaflet marker styles */
.custom-marker {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.marker-visited {
  background-color: #10b981;
  color: white;
}

.marker-special {
  background-color: #fbbf24;
  color: white;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.6);
  animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.marker-special-visited {
  background-color: #059669;
  color: white;
}

.custom-marker:not(.marker-visited) {
  background-color: #3b82f6;
  color: white;
}

.custom-marker:hover {
  transform: scale(1.2);
  z-index: 1000 !important;
}
</style>
