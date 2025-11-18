<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import GameLayout from '../../components/game/GameLayout.vue'
import FeedbackModal from '../../components/game/FeedbackModal.vue'
import poemasData from './poemas.json'

// Types
interface Recurso {
  texto: string
  tipo: string
  explicacion: string
  inicio: number
  fin: number
}

interface Poema {
  id: number
  titulo: string
  versos: string[]
  dificultad: string
  recursos: Recurso[]
}

// State
const currentPoemIndex = ref(0)
const foundResources = ref<Recurso[]>([])
const score = ref(0)
const showContextMenu = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const selectedText = ref('')

const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const errorCount = ref(0)
const showHints = ref(false)
const resourceTypeCount = ref<Record<string, number>>({})

// Computed
const poemas = computed(() => poemasData as Poema[])
const currentPoem = computed(() => poemas.value[currentPoemIndex.value])
const totalResources = computed(() => currentPoem.value?.recursos.length || 0)
const allFound = computed(() => foundResources.value.length === totalResources.value)
const poemText = computed(() => currentPoem.value?.versos.join('\n') || '')

// Resource type labels
const resourceTypeLabels: Record<string, string> = {
  comparacion: 'Comparación',
  personificacion: 'Personificación',
  hiperbole: 'Hipérbole',
  imagen_sensorial: 'Imagen Sensorial'
}

// Resource type colors
const resourceTypeColors: Record<string, string> = {
  comparacion: 'badge-primary',
  personificacion: 'badge-secondary',
  hiperbole: 'badge-accent',
  imagen_sensorial: 'badge-info'
}

// Instructions
const instructions = `🔍 ¡Bienvenido Detective Poético!

1. Lee el poema completo con atención
2. Selecciona con el mouse un fragmento que creas que contiene un recurso literario
3. Aparecerá un menú con 4 opciones de recursos
4. Elige el recurso correcto
5. ¡Descubre todos los recursos del poema!

💡 Tipos de recursos:
• Comparación: compara dos cosas usando "como" o "es"
• Personificación: da características humanas a objetos o animales
• Hipérbole: exagera algo para dar énfasis
• Imagen Sensorial: apela a los sentidos (vista, oído, tacto, olfato, gusto)

📊 Sistema de puntos:
• Primera vez que encuentras un tipo: +15 puntos
• Segunda vez: +10 puntos
• Tercera vez o más: +5 puntos

🎯 Después de 3 errores, aparecerán pistas sutiles`

// Methods


const checkResource = (tipo: string) => {
  showContextMenu.value = false
  
  if (!currentPoem.value) return
  
  // Find matching resource
  const matchingResource = currentPoem.value.recursos.find(recurso => {
    // Check if the selected text is within or matches the resource text
    const resourceText = recurso.texto.toLowerCase().trim()
    const selected = selectedText.value.toLowerCase().trim()
    
    // Check if selected text is part of the resource or vice versa
    const isMatch = resourceText.includes(selected) || selected.includes(resourceText)
    
    return isMatch && recurso.tipo === tipo && !foundResources.value.includes(recurso)
  })
  
  if (matchingResource) {
    // Correct answer
    foundResources.value.push(matchingResource)
    
    // Calculate points based on how many times this type has been found
    const typeCount = resourceTypeCount.value[tipo] || 0
    resourceTypeCount.value[tipo] = typeCount + 1
    
    let points = 5
    if (typeCount === 0) points = 15
    else if (typeCount === 1) points = 10
    
    score.value += points
    
    feedbackCorrect.value = true
    feedbackMessage.value = `¡Excelente! +${points} puntos\n\n${matchingResource.explicacion}`
    showFeedback.value = true
    
    // Highlight the correct text briefly
    highlightCorrectText(matchingResource)
    
    // Reset error count on correct answer
    errorCount.value = 0
  } else {
    // Incorrect answer
    errorCount.value++
    
    feedbackCorrect.value = false
    feedbackMessage.value = `¡Sigue intentando! Ese no es el recurso correcto para el texto seleccionado.\n\n💡 Pista: Lee nuevamente el fragmento y piensa en qué recurso literario se está usando.`
    showFeedback.value = true
    
    // Show hints after 3 errors
    if (errorCount.value >= 3) {
      showHints.value = true
    }
  }
  
  selectedText.value = ''
}

const highlightCorrectText = (recurso: Recurso) => {
  // This would ideally highlight the text in the poem
  // For now, we'll just show feedback
  console.log('Highlighting:', recurso.texto)
}

const closeFeedback = () => {
  showFeedback.value = false
}

const nextPoem = () => {
  if (currentPoemIndex.value < poemas.value.length - 1) {
    currentPoemIndex.value++
    foundResources.value = []
    selectedText.value = ''
    showContextMenu.value = false
    errorCount.value = 0
    showHints.value = false
  }
}

const resetGame = () => {
  currentPoemIndex.value = 0
  foundResources.value = []
  score.value = 0
  selectedText.value = ''
  showContextMenu.value = false
  errorCount.value = 0
  showHints.value = false
  resourceTypeCount.value = {}
}

const handleSelectionChange = () => {
  const selection = window.getSelection()
  console.log('Selection changed:', selection?.toString())
  
  if (!selection || selection.toString().trim().length < 3) {
    showContextMenu.value = false
    return
  }

  const selected = selection.toString().trim()
  
  // Check if the selection is within the poem container
  const range = selection.getRangeAt(0)
  const poemContainer = document.querySelector('.poem-container')
  if (!poemContainer || !poemContainer.contains(range.commonAncestorContainer)) {
    console.log('Selection not in poem container')
    showContextMenu.value = false
    return
  }

  console.log('Showing context menu for:', selected)
  selectedText.value = selected
  
  // Position the context menu
  const rect = range.getBoundingClientRect()
  const container = poemContainer.getBoundingClientRect()
  
  contextMenuPosition.value = {
    x: rect.left - container.left + rect.width / 2,
    y: rect.bottom - container.top + 10
  }
  
  showContextMenu.value = true
}

const closeContextMenu = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  // Don't close if clicking on the context menu itself or its buttons
  if (!target.closest('.context-menu')) {
    showContextMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', closeContextMenu)
  document.addEventListener('selectionchange', handleSelectionChange)
})

onUnmounted(() => {
  document.removeEventListener('click', closeContextMenu)
  document.removeEventListener('selectionchange', handleSelectionChange)
})
</script>

<template>
  <GameLayout
    title="🔍 Detectivismo Poético"
    :instructions="instructions"
  >
    <div class="space-y-6">
      <!-- Score and Progress -->
      <div class="flex justify-between items-center bg-base-100 p-4 rounded-lg shadow-md">
        <div class="flex items-center gap-4">
          <div class="badge badge-lg badge-primary">
            Poema {{ currentPoemIndex + 1 }}/{{ poemas.length }}
          </div>
          <div class="badge badge-lg badge-accent">
            Puntos: {{ score }}
          </div>
        </div>
        <div class="text-sm">
          <span class="font-semibold">Encontrados: </span>
          <span :class="allFound ? 'text-success' : 'text-base-content'">
            {{ foundResources.length }}/{{ totalResources }}
          </span>
        </div>
      </div>

      <!-- Poem Container -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Main Poem Display -->
        <div class="lg:col-span-2">
          <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
              <h2 class="card-title text-2xl mb-4 text-primary">
                {{ currentPoem?.titulo }}
              </h2>
              
              <div
                class="poem-container relative bg-base-200 p-6 rounded-lg"
                :class="{ 'hints-active': showHints }"
              >
                <div class="poem-text text-lg leading-relaxed font-display whitespace-pre-line select-text">
                  {{ poemText }}
                </div>
                
                <!-- Context Menu -->
                <Transition name="fade">
                  <div
                    v-if="showContextMenu"
                    class="context-menu absolute z-50 bg-base-100 shadow-2xl rounded-lg p-2 border-2 border-primary"
                    :style="{ 
                      left: contextMenuPosition.x + 'px', 
                      top: contextMenuPosition.y + 'px',
                      transform: 'translateX(-50%)'
                    }"
                  >
                    <div class="flex flex-col gap-1">
                      <div class="text-xs text-center mb-2 font-semibold text-base-content/70">
                        "{{ selectedText.substring(0, 30) }}{{ selectedText.length > 30 ? '...' : '' }}"
                      </div>
                      <button
                        v-for="(label, tipo) in resourceTypeLabels"
                        :key="tipo"
                        class="btn btn-sm justify-start hover:btn-primary"
                        :class="resourceTypeColors[tipo]"
                        @click="checkResource(tipo)"
                      >
                        {{ label }}
                      </button>
                    </div>
                  </div>
                </Transition>
                
                <!-- Hints overlay -->
                <div v-if="showHints && currentPoem" class="hints-overlay">
                  <div
                    v-for="recurso in currentPoem.recursos"
                    :key="recurso.inicio"
                    class="hint-marker"
                    :class="{ 'found': foundResources.includes(recurso) }"
                  ></div>
                </div>
              </div>

              <!-- Hint Message -->
              <div v-if="showHints" class="alert alert-info mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>💡 Las zonas con recursos están sutilmente resaltadas. ¡Búscalas con atención!</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar: Found Resources -->
        <div class="lg:col-span-1">
          <div class="card bg-base-100 shadow-xl sticky top-20">
            <div class="card-body">
              <h3 class="card-title text-lg">
                📚 Recursos Encontrados
              </h3>
              
              <div class="space-y-2 mt-4">
                <div
                  v-for="recurso in foundResources"
                  :key="recurso.inicio"
                  class="badge-resource p-3 rounded-lg bg-base-200"
                >
                  <div class="flex items-start gap-2">
                    <span class="badge badge-sm" :class="resourceTypeColors[recurso.tipo]">
                      {{ resourceTypeLabels[recurso.tipo] }}
                    </span>
                  </div>
                  <p class="text-sm mt-2 italic">"{{ recurso.texto }}"</p>
                </div>
                
                <div v-if="foundResources.length === 0" class="text-center text-base-content/50 py-8">
                  Selecciona texto del poema para comenzar
                </div>
              </div>

              <!-- Next Poem Button -->
              <div v-if="allFound" class="mt-6">
                <button
                  v-if="currentPoemIndex < poemas.length - 1"
                  class="btn btn-primary btn-block"
                  @click="nextPoem"
                >
                  Siguiente Poema →
                </button>
                <div v-else class="space-y-2">
                  <div class="alert alert-success">
                    <span>🎉 ¡Has completado todos los poemas!</span>
                  </div>
                  <button
                    class="btn btn-primary btn-block"
                    @click="resetGame"
                  >
                    Jugar de Nuevo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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
.poem-container {
  position: relative;
  min-height: 300px;
}

.poem-text {
  user-select: text;
  cursor: text;
  line-height: 2;
}

.select-text {
  user-select: text;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
}

.context-menu {
  animation: fadeIn 0.2s ease;
  min-width: 180px;
  pointer-events: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
  user-select: none;
}

.context-menu .btn {
  transition: all 0.2s ease;
  border: none;
}

.context-menu .btn:hover {
  transform: translateX(4px);
  background-color: rgba(79, 70, 229, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.badge-resource {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.badge-resource:hover {
  border-color: var(--fallback-p, oklch(var(--p)));
  transform: translateY(-2px);
}

/* Hints styling */
.hints-active .poem-text {
  position: relative;
}

.hint-marker {
  position: absolute;
  border: 2px dashed rgba(79, 70, 229, 0.3);
  border-radius: 4px;
  pointer-events: none;
  animation: pulse 2s infinite;
}

.hint-marker.found {
  border-color: rgba(16, 185, 129, 0.5);
  background-color: rgba(16, 185, 129, 0.1);
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.6;
  }
}

/* Make the poem more readable */
.poem-text::selection {
  background-color: rgba(79, 70, 229, 0.3);
  color: inherit;
}

.poem-text::-moz-selection {
  background-color: rgba(79, 70, 229, 0.3);
  color: inherit;
}
</style>
