# 📚 Documento Completo de Prompts - Minijuegos Educativos

---

## ÍNDICE

### Prompts Base
- [PROMPT-000: Setup Inicial](#prompt-000-setup-inicial)
- [PROMPT-001: Composables Core](#prompt-001-composables-core)
- [PROMPT-002: Componentes UI Base](#prompt-002-componentes-ui-base)

### Juegos de Lengua
- [PROMPT-L01: Cazador de Caligramas](#prompt-l01-cazador-de-caligramas)
- [PROMPT-L02: Detectivismo Poético](#prompt-l02-detectivismo-poético)
- [PROMPT-L03: Laboratorio de Acentuación](#prompt-l03-laboratorio-de-acentuación)
- [PROMPT-L04: Portal Mágico Oz y Narnia](#prompt-l04-portal-mágico-oz-y-narnia)
- [PROMPT-L05: Aventura en Misiones](#prompt-l05-aventura-en-misiones)

### Juegos de Matemática
- [PROMPT-M01: Autopista Numérica](#prompt-m01-autopista-numérica)
- [PROMPT-M02: Transformador de Calculadora](#prompt-m02-transformador-de-calculadora)

### Juegos de Ciencias Sociales
- [PROMPT-CS01: Línea del Tiempo Interactiva](#prompt-cs01-línea-del-tiempo-interactiva)
- [PROMPT-CS02: Defensa de Buenos Aires](#prompt-cs02-defensa-de-buenos-aires)

### Juegos de Ciencias Naturales
- [PROMPT-CN01: Viaje por la Hidrosfera](#prompt-cn01-viaje-por-la-hidrosfera)
- [PROMPT-CN02: Ciclo del Agua](#prompt-cn02-ciclo-del-agua)
- [PROMPT-CN03: Detector de Humedad](#prompt-cn03-detector-de-humedad)

### Juegos Transversales
- [PROMPT-T01: Quiz Rápido Unidad 1](#prompt-t01-quiz-rápido-unidad-1)

### Integración
- [PROMPT-INT01: Sistema de Monetización](#prompt-int01-sistema-de-monetización)
- [PROMPT-INT02: PWA y Modo Offline](#prompt-int02-pwa-y-modo-offline)

---

## PROMPT-000: Setup Inicial

```
Eres un desarrollador experto en Vue 3. Crea el setup inicial del proyecto "Yo Amo Aprender Digital".

OBJETIVO:
Crear proyecto Vue 3 + Vite + Tailwind CSS + DaisyUI con estructura base completa.

PASOS:

1. INICIALIZAR PROYECTO:
npm create vite@latest yo-amo-aprender-digital -- --template vue
cd yo-amo-aprender-digital
npm install

2. INSTALAR DEPENDENCIAS:
npm install vue-router@4
npm install -D tailwindcss@3 postcss autoprefixer
npm install daisyui
npx tailwindcss init -p

3. CONFIGURAR TAILWIND (tailwind.config.js):
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'edu-primary': '#4F46E5',
        'edu-secondary': '#F59E0B',
        'edu-success': '#10B981',
        'edu-error': '#EF4444',
        'edu-info': '#3B82F6'
      },
      fontFamily: {
        'sans': ['Quicksand', 'system-ui', 'sans-serif'],
        'display': ['"Comic Neue"', 'cursive']
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      mytheme: {
        "primary": "#4F46E5",
        "secondary": "#F59E0B",
        "accent": "#10B981",
        "neutral": "#3D4451",
        "base-100": "#FFFFFF"
      }
    }]
  }
}

4. CREAR ESTRUCTURA DE CARPETAS:
src/
├── components/
├── composables/
├── games/
├── router/
├── views/
├── utils/
└── assets/
    ├── images/
    ├── data/
    └── styles/

5. ESTILOS GLOBALES (src/assets/styles/main.css):
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400;700&family=Quicksand:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body { @apply font-sans bg-base-100; }
  h1, h2, h3 { @apply font-display; }
}

@layer components {
  .btn-edu {
    @apply px-6 py-3 rounded-lg font-semibold transition-all duration-200 
           hover:scale-105 active:scale-95 shadow-md;
  }
  .card-edu {
    @apply bg-white rounded-xl shadow-lg p-6 hover:shadow-xl 
           transition-shadow duration-200;
  }
}

6. ACTUALIZAR main.js:
import { createApp } from 'vue'
import './assets/styles/main.css'
import App from './App.vue'

createApp(App).mount('#app')

7. .gitignore:
node_modules
dist
.DS_Store
*.local
.env

8. SCRIPTS en package.json:
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

VALIDACIÓN:
- npm run dev debe abrir en http://localhost:5173
- Tailwind debe aplicar estilos
- Fuentes Google deben cargar

SIGUIENTE PASO: PROMPT-001
```

---

## PROMPT-001: Composables Core

```
Eres un desarrollador experto en Vue 3. Crea los composables reutilizables del proyecto.

PRERREQUISITO: PROMPT-000 completado

ARCHIVOS A CREAR:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 1: src/composables/useLocalStorage.js

/**
 * Composable para localStorage con prefijo 'yoAmoAprender_'
 * Evita conflictos con otros sitios
 */
export function useLocalStorage() {
  const STORAGE_PREFIX = 'yoAmoAprender_'

  const save = (key, data) => {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data))
      return true
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      return false
    }
  }

  const load = (key) => {
    try {
      const item = localStorage.getItem(STORAGE_PREFIX + key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return null
    }
  }

  const remove = (key) => {
    try {
      localStorage.removeItem(STORAGE_PREFIX + key)
      return true
    } catch (error) {
      console.error('Error removing from localStorage:', error)
      return false
    }
  }

  const clear = () => {
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(STORAGE_PREFIX))
        .forEach(key => localStorage.removeItem(key))
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }

  const getAllKeys = () => {
    return Object.keys(localStorage)
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .map(key => key.replace(STORAGE_PREFIX, ''))
  }

  return { save, load, remove, clear, getAllKeys }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 2: src/composables/useGameState.js

import { ref, computed } from 'vue'
import { useLocalStorage } from './useLocalStorage'

/**
 * Composable para estado de juego con guardado automático
 * @param {string} gameId - ID único del juego
 */
export function useGameState(gameId) {
  const { save, load } = useLocalStorage()
  
  const defaultState = {
    gameId,
    score: 0,
    completed: false,
    attemptsCount: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeSpent: 0,
    startTime: null,
    lastPlayed: null,
    achievements: [],
    currentLevel: 1,
    maxLevel: 1
  }

  const state = ref({ ...defaultState })

  const loadState = () => {
    const saved = load(gameId)
    if (saved) {
      state.value = { ...defaultState, ...saved }
    }
    return state.value
  }

  const saveState = () => {
    save(gameId, {
      ...state.value,
      lastPlayed: new Date().toISOString()
    })
  }

  const startGame = () => {
    state.value.startTime = Date.now()
    state.value.attemptsCount++
    saveState()
  }

  const addScore = (points) => {
    if (points > 0) {
      state.value.score += points
      saveState()
    }
  }

  const recordAnswer = (isCorrect) => {
    state.value.totalQuestions++
    if (isCorrect) state.value.correctAnswers++
    saveState()
  }

  const levelUp = () => {
    state.value.currentLevel++
    if (state.value.currentLevel > state.value.maxLevel) {
      state.value.maxLevel = state.value.currentLevel
    }
    saveState()
  }

  const markCompleted = () => {
    state.value.completed = true
    if (state.value.startTime) {
      state.value.timeSpent += Math.floor((Date.now() - state.value.startTime) / 1000)
    }
    saveState()
  }

  const resetGame = () => {
    const attemptsCount = state.value.attemptsCount
    state.value = { ...defaultState, attemptsCount }
    saveState()
  }

  const unlockAchievement = (achievementId) => {
    if (!state.value.achievements.includes(achievementId)) {
      state.value.achievements.push(achievementId)
      saveState()
      return true
    }
    return false
  }

  const accuracy = computed(() => {
    if (state.value.totalQuestions === 0) return 0
    return Math.round((state.value.correctAnswers / state.value.totalQuestions) * 100)
  })

  const hasPlayed = computed(() => state.value.attemptsCount > 0)

  const formattedTime = computed(() => {
    const minutes = Math.floor(state.value.timeSpent / 60)
    const seconds = state.value.timeSpent % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  })

  return {
    state,
    loadState,
    saveState,
    startGame,
    addScore,
    recordAnswer,
    levelUp,
    markCompleted,
    resetGame,
    unlockAchievement,
    accuracy,
    hasPlayed,
    formattedTime
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VALIDACIÓN:
- Ambos composables exportan correctamente
- useLocalStorage funciona con save/load/remove
- useGameState persiste datos al recargar
- No hay errores en consola

SIGUIENTE PASO: PROMPT-002
```

---

## PROMPT-002: Componentes UI Base

```
Eres un desarrollador experto en Vue 3. Crea los componentes UI reutilizables.

PRERREQUISITO: PROMPT-001 completado

ARCHIVOS A CREAR:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 1: src/components/GameLayout.vue

<template>
  <div class="game-layout min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
    <header class="game-header bg-white shadow-md sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <button @click="handleBack" class="btn btn-ghost btn-sm gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <h1 class="text-xl md:text-2xl font-display font-bold text-edu-primary text-center flex-1">
          {{ title }}
        </h1>

        <button @click="showInstructionsModal = true" class="btn btn-circle btn-sm btn-info">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </header>

    <div v-if="showInstructionsModal" class="modal modal-open">
      <div class="modal-box max-w-2xl">
        <h2 class="font-display text-2xl font-bold mb-4">📖 ¿Cómo jugar?</h2>
        <div class="prose prose-lg">
          <p v-html="instructions"></p>
        </div>
        <div class="modal-action">
          <button @click="showInstructionsModal = false" class="btn btn-primary">
            ¡Entendido!
          </button>
        </div>
      </div>
    </div>

    <main class="game-content container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="game-footer mt-8 py-4 bg-white border-t">
      <slot name="footer">
        <div class="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>Yo Amo Aprender Digital - Ministerio de Educación CABA</p>
        </div>
      </slot>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  title: { type: String, required: true },
  instructions: { type: String, required: true }
})

const emit = defineEmits(['back'])
const router = useRouter()
const showInstructionsModal = ref(false)

const handleBack = () => {
  emit('back')
  router.push('/juegos')
}
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 2: src/components/ScoreBoard.vue

<template>
  <div class="scoreboard bg-white rounded-lg shadow-md p-4 inline-flex items-center gap-4">
    <div class="score-item">
      <span class="text-3xl">⭐</span>
      <span class="text-2xl font-bold text-edu-primary">{{ score }}</span>
      <span class="text-xs text-gray-600">puntos</span>
    </div>

    <div v-if="showAccuracy" class="score-item border-l pl-4">
      <span class="text-3xl">🎯</span>
      <span class="text-2xl font-bold text-edu-success">{{ accuracy }}%</span>
      <span class="text-xs text-gray-600">aciertos</span>
    </div>

    <div v-if="correctCount !== undefined" class="score-item border-l pl-4">
      <span class="text-sm text-gray-700">
        {{ correctCount }}/{{ totalCount }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  score: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  correctCount: Number,
  totalCount: Number,
  showAccuracy: { type: Boolean, default: false }
})
</script>

<style scoped>
.score-item {
  @apply flex flex-col items-center gap-1;
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 3: src/components/ProgressTracker.vue

<template>
  <div class="progress-tracker">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-semibold text-gray-700">{{ label }}</span>
      <span class="text-sm font-bold text-edu-primary">{{ current }}/{{ total }}</span>
    </div>

    <div class="progress-bar-container bg-gray-200 rounded-full h-3 overflow-hidden">
      <div 
        class="progress-bar-fill bg-gradient-to-r from-edu-primary to-edu-secondary h-full rounded-full transition-all duration-500 ease-out"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>

    <div v-if="showPercentage" class="text-right mt-1">
      <span class="text-xs text-gray-600">{{ percentage }}% completado</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
  label: { type: String, default: 'Progreso' },
  showPercentage: { type: Boolean, default: true }
})

const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.round((props.current / props.total) * 100)
})
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 4: src/components/FeedbackModal.vue

<template>
  <div v-if="show" class="modal modal-open">
    <div class="modal-box" :class="isCorrect ? 'border-edu-success' : 'border-edu-secondary'">
      <div class="text-center">
        <span class="text-6xl mb-4 inline-block">{{ isCorrect ? '✅' : '💡' }}</span>
        <h3 class="text-2xl font-display font-bold mb-2" :class="isCorrect ? 'text-edu-success' : 'text-edu-secondary'">
          {{ isCorrect ? '¡Correcto!' : 'Intenta de nuevo' }}
        </h3>
        <p class="text-lg mb-4">{{ message }}</p>
        <slot />
      </div>
      <div class="modal-action justify-center">
        <button @click="$emit('close')" class="btn btn-primary">
          {{ isCorrect ? '¡Genial!' : 'Entendido' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: { type: Boolean, default: true },
  isCorrect: { type: Boolean, required: true },
  message: { type: String, required: true }
})

defineEmits(['close'])
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 5: src/components/GameCard.vue

<template>
  <div class="game-card card-edu cursor-pointer" :class="{ 'opacity-50': !game.activo }" @click="handleClick">
    <div class="game-icon text-6xl mb-4 text-center">{{ game.icono }}</div>
    <h3 class="text-xl font-display font-bold mb-2 text-center">{{ game.titulo }}</h3>
    <p class="text-sm text-gray-600 mb-4 text-center">{{ game.descripcion }}</p>
    
    <div class="flex flex-wrap gap-2 justify-center mb-4">
      <span class="badge badge-primary">{{ game.materia }}</span>
      <span class="badge badge-secondary">{{ game.dificultad }}</span>
      <span class="badge badge-accent">{{ game.duracionEstimada }} min</span>
    </div>

    <div v-if="progress > 0" class="mt-4">
      <ProgressTracker :current="progress" :total="100" label="Completado" :showPercentage="false" />
    </div>

    <div v-if="!game.activo" class="absolute top-4 right-4">
      <span class="text-2xl">🔒</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ProgressTracker from './ProgressTracker.vue'

const props = defineProps({
  game: { type: Object, required: true },
  progress: { type: Number, default: 0 }
})

const router = useRouter()

const handleClick = () => {
  if (props.game.activo) {
    router.push(props.game.ruta)
  }
}
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO 6: src/assets/data/games-metadata.json

{
  "juegos": [
    {
      "id": "cazador-caligramas",
      "titulo": "Cazador de Caligramas",
      "materia": "Lengua",
      "unidad": 1,
      "descripcion": "Arma caligramas con versos de poesía",
      "icono": "🦋",
      "color": "#8B5CF6",
      "dificultad": "fácil",
      "duracionEstimada": 10,
      "objetivos": ["Comprender caligramas", "Lectura de poesía"],
      "ruta": "/juego/cazador-caligramas",
      "activo": true
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VALIDACIÓN:
- Todos los componentes renderizan sin errores
- GameLayout muestra header, modal instrucciones, footer
- ScoreBoard muestra puntuación correctamente
- ProgressTracker anima suavemente
- FeedbackModal muestra estilos correcto/incorrecto
- GameCard es clickeable y responsive

LISTO PARA: Empezar con juegos individuales (PROMPT-L01, etc.)
```

---

## PROMPT-L01: Cazador de Caligramas

```
Eres un desarrollador experto en Vue 3. Crea el juego "Cazador de Caligramas".

CONTEXTO PEDAGÓGICO:
- Público: 5to grado (10-11 años)
- Materia: Lengua - Unidad 1 "Estar en poesía"
- Contenido: Caligramas (poemas con forma visual), Fabián Sevilla
- Objetivo: Comprender que la poesía puede tomar formas visuales

MECÁNICA:
1. Mostrar silueta vacía de figura (corazón, mariposa, árbol)
2. Presentar 5-12 versos desordenados
3. Estudiante arrastra versos a posición correcta en grid
4. Feedback inmediato positivo/negativo
5. Sistema de 3 pistas
6. Tres niveles de dificultad

ESTRUCTURA:
src/games/cazador-caligramas/
├── CaligramaGame.vue
├── gameLogic.js
├── caligramas-content.json
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (caligramas-content.json):

{
  "caligramas": [
    {
      "id": "corazon",
      "nivel": 1,
      "titulo": "Corazón de papel",
      "forma": "corazon",
      "gridSize": {"rows": 5, "cols": 5},
      "versos": [
        {"id": "v1", "texto": "Late", "posicion": [2, 1]},
        {"id": "v2", "texto": "mi corazón", "posicion": [2, 2]},
        {"id": "v3", "texto": "de papel", "posicion": [1, 3]},
        {"id": "v4", "texto": "y tinta", "posicion": [3, 3]},
        {"id": "v5", "texto": "eterno", "posicion": [2, 4]}
      ],
      "silueta": [
        [0,0,1,1,0],
        [0,1,1,1,1],
        [1,1,1,1,1],
        [0,1,1,1,0],
        [0,0,1,0,0]
      ],
      "pistas": [
        "Empieza por el verso más corto",
        "El corazón se forma desde arriba",
        "Fijate en la silueta gris"
      ]
    },
    {
      "id": "mariposa",
      "nivel": 2,
      "titulo": "Mariposa de sueños",
      "forma": "mariposa",
      "gridSize": {"rows": 7, "cols": 7},
      "versos": [
        {"id": "v1", "texto": "Vuela", "posicion": [3, 0]},
        {"id": "v2", "texto": "mariposa", "posicion": [3, 1]},
        {"id": "v3", "texto": "de colores", "posicion": [2, 2]},
        {"id": "v4", "texto": "brillantes", "posicion": [4, 2]},
        {"id": "v5", "texto": "entre", "posicion": [1, 3]},
        {"id": "v6", "texto": "las flores", "posicion": [3, 3]},
        {"id": "v7", "texto": "del jardín", "posicion": [5, 3]},
        {"id": "v8", "texto": "bailando", "posicion": [3, 4]}
      ],
      "silueta": [
        [0,1,0,1,0,1,0],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0]
      ],
      "pistas": [
        "Las alas son simétricas",
        "El cuerpo está en el centro",
        "Empieza desde la cabeza"
      ]
    },
    {
      "id": "arbol",
      "nivel": 3,
      "titulo": "Árbol ancestral",
      "forma": "arbol",
      "gridSize": {"rows": 9, "cols": 7},
      "versos": [
        {"id": "v1", "texto": "Árbol", "posicion": [3, 0]},
        {"id": "v2", "texto": "viejo", "posicion": [3, 1]},
        {"id": "v3", "texto": "de ramas", "posicion": [2, 2]},
        {"id": "v4", "texto": "sabias", "posicion": [4, 2]},
        {"id": "v5", "texto": "hojas", "posicion": [1, 3]},
        {"id": "v6", "texto": "verdes", "posicion": [3, 3]},
        {"id": "v7", "texto": "guardas", "posicion": [5, 3]},
        {"id": "v8", "texto": "historias", "posicion": [3, 4]},
        {"id": "v9", "texto": "del", "posicion": [3, 5]},
        {"id": "v10", "texto": "bosque", "posicion": [3, 6]},
        {"id": "v11", "texto": "antiguo", "posicion": [3, 7]},
        {"id": "v12", "texto": "milenario", "posicion": [3, 8]}
      ],
      "silueta": [
        [0,0,0,1,0,0,0],
        [0,0,1,1,1,0,0],
        [0,1,1,1,1,1,0],
        [1,1,1,1,1,1,1],
        [0,1,1,1,1,1,0],
        [0,0,1,1,1,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0],
        [0,0,0,1,0,0,0]
      ],
      "pistas": [
        "La copa del árbol es ancha arriba",
        "El tronco es delgado y vertical",
        "Empieza desde la copa hacia abajo"
      ]
    }
  ],
  "mensajesMotivacion": [
    "¡Excelente! 🌟",
    "¡Muy bien! 🎉",
    "¡Perfecto! ✨",
    "¡Increíble! 🚀",
    "¡Genial! 🎨"
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

LÓGICA (gameLogic.js):

export function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function checkPosition(placedPosition, correctPosition) {
  return (
    placedPosition[0] === correctPosition[0] &&
    placedPosition[1] === correctPosition[1]
  )
}

export function calculateScore(attempts, hintsUsed, timeElapsed) {
  let baseScore = 100
  baseScore -= (attempts * 5)
  baseScore -= (hintsUsed * 10)
  if (timeElapsed < 120) baseScore += 20
  return Math.max(baseScore, 10)
}

export function getRandomMotivationalMessage(messages) {
  return messages[Math.floor(Math.random() * messages.length)]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (CaligramaGame.vue):

<template>
  <GameLayout title="Cazador de Caligramas" :instructions="instructions">
    <div class="game-container max-w-6xl mx-auto">
      
      <div class="game-header flex justify-between items-center mb-6">
        <ScoreBoard :score="gameState.state.score" />
        <ProgressTracker :current="currentLevel" :total="totalLevels" label="Nivel" />
      </div>

      <div class="game-area grid md:grid-cols-2 gap-8">
        
        <div class="caligrama-grid-container card-edu">
          <h3 class="text-lg font-bold mb-4">{{ currentCaligrama.titulo }}</h3>
          
          <div class="caligrama-grid" :style="gridStyle">
            <div v-for="(row, rowIndex) in currentCaligrama.silueta" :key="'row-' + rowIndex">
              <div
                v-for="(cell, colIndex) in row"
                :key="'cell-' + rowIndex + '-' + colIndex"
                class="grid-cell"
                :class="{
                  'silhouette-active': cell === 1,
                  'has-verse': hasVerseAt(rowIndex, colIndex)
                }"
                @drop="handleDrop($event, rowIndex, colIndex)"
                @dragover.prevent
                @dragenter.prevent
              >
                <span v-if="hasVerseAt(rowIndex, colIndex)" class="placed-verse">
                  {{ getVerseAt(rowIndex, colIndex) }}
                </span>
              </div>
            </div>
          </div>

          <button
            v-if="hintsRemaining > 0 && !levelCompleted"
            @click="showHint"
            class="btn btn-sm btn-info mt-4"
          >
            💡 Pista ({{ hintsRemaining }})
          </button>
        </div>

        <div class="verses-container card-edu">
          <h3 class="text-lg font-bold mb-4">Arrastra los versos</h3>
          
          <div class="verses-bank space-y-2">
            <div
              v-for="verso in availableVerses"
              :key="verso.id"
              class="verse-card"
              :class="{ 'verse-placed': verso.placed }"
              :draggable="!verso.placed"
              @dragstart="handleDragStart($event, verso)"
            >
              <span class="verse-text">{{ verso.texto }}</span>
              <span v-if="verso.placed" class="verse-check">✓</span>
            </div>
          </div>

          <div v-if="currentHint" class="hint-box mt-4 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm">💡 {{ currentHint }}</p>
          </div>

          <div v-if="lastActionMessage" class="motivation-message mt-4 p-3 bg-green-50 rounded-lg">
            <p class="text-center font-semibold text-green-700">{{ lastActionMessage }}</p>
          </div>
        </div>
      </div>

      <div v-if="levelCompleted" class="modal modal-open">
        <div class="modal-box">
          <h2 class="font-display text-2xl font-bold mb-4">
            {{ isLastLevel ? '🎉 ¡Juego Completado!' : '✨ ¡Nivel Completado!' }}
          </h2>
          
          <div class="stats space-y-2 mb-6">
            <p>Puntuación: <strong>{{ levelScore }}</strong></p>
            <p>Tiempo: <strong>{{ formattedTime }}</strong></p>
            <p>Errores: <strong>{{ errorCount }}</strong></p>
          </div>

          <div class="modal-action">
            <button v-if="!isLastLevel" @click="nextLevel" class="btn btn-primary">
              Siguiente Nivel →
            </button>
            <button v-else @click="finishGame" class="btn btn-success">
              ¡Terminar! 🏆
            </button>
          </div>
        </div>
      </div>
    </div>
  </GameLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'
import { useGameState } from '@/composables/useGameState'
import caligramasData from './caligramas-content.json'
import { shuffleArray, checkPosition, calculateScore, getRandomMotivationalMessage } from './gameLogic'

const router = useRouter()
const gameState = useGameState('cazador-caligramas')
const currentLevel = ref(1)
const levelCompleted = ref(false)
const availableVerses = ref([])
const placedVerses = ref([])
const draggedVerse = ref(null)
const hintsRemaining = ref(3)
const currentHint = ref('')
const lastActionMessage = ref('')
const errorCount = ref(0)
const startTime = ref(Date.now())
const levelScore = ref(0)

const instructions = `
Arrastra cada verso al lugar correcto del caligrama para formar una figura.
La silueta gris te muestra dónde va cada parte del poema.
Si te trabas, usa las pistas 💡
`

const currentCaligrama = computed(() => caligramasData.caligramas[currentLevel.value - 1])
const totalLevels = computed(() => caligramasData.caligramas.length)
const isLastLevel = computed(() => currentLevel.value === totalLevels.value)

const gridStyle = computed(() => {
  const { rows, cols } = currentCaligrama.value.gridSize
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: '4px'
  }
})

const formattedTime = computed(() => {
  const elapsed = Math.floor((Date.now() - startTime.value) / 1000)
  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const initLevel = () => {
  startTime.value = Date.now()
  errorCount.value = 0
  levelScore.value = 0
  levelCompleted.value = false
  hintsRemaining.value = 3
  currentHint.value = ''
  lastActionMessage.value = ''
  
  const verses = currentCaligrama.value.versos.map(v => ({...v, placed: false}))
  availableVerses.value = shuffleArray(verses)
  placedVerses.value = []
}

const handleDragStart = (event, verso) => {
  if (verso.placed) return
  draggedVerse.value = verso
  event.dataTransfer.effectAllowed = 'move'
}

const handleDrop = (event, row, col) => {
  event.preventDefault()
  if (!draggedVerse.value) return
  
  const isCorrect = checkPosition([row, col], draggedVerse.value.posicion)
  
  if (isCorrect) {
    draggedVerse.value.placed = true
    draggedVerse.value.placedAt = [row, col]
    placedVerses.value.push(draggedVerse.value)
    
    lastActionMessage.value = getRandomMotivationalMessage(caligramasData.mensajesMotivacion)
    setTimeout(() => { lastActionMessage.value = '' }, 2000)
    
    gameState.addScore(15)
    
    if (placedVerses.value.length === currentCaligrama.value.versos.length) {
      completeLevel()
    }
  } else {
    errorCount.value++
    lastActionMessage.value = 'Ese no es el lugar correcto, intenta de nuevo'
    setTimeout(() => { lastActionMessage.value = '' }, 2000)
  }
  
  draggedVerse.value = null
}

const hasVerseAt = (row, col) => {
  return placedVerses.value.some(v => v.placedAt && v.placedAt[0] === row && v.placedAt[1] === col)
}

const getVerseAt = (row, col) => {
  const verse = placedVerses.value.find(v => v.placedAt && v.placedAt[0] === row && v.placedAt[1] === col)
  return verse ? verse.texto : ''
}

const showHint = () => {
  if (hintsRemaining.value > 0) {
    const hints = currentCaligrama.value.pistas
    currentHint.value = hints[3 - hintsRemaining.value]
    hintsRemaining.value--
  }
}

const completeLevel = () => {
  const timeElapsed = Math.floor((Date.now() - startTime.value) / 1000)
  levelScore.value = calculateScore(errorCount.value, 3 - hintsRemaining.value, timeElapsed)
  
  gameState.addScore(levelScore.value)
  gameState.levelUp()
  gameState.recordAnswer(true)
  
  levelCompleted.value = true
}

const nextLevel = () => {
  currentLevel.value++
  initLevel()
}

const finishGame = () => {
  gameState.markCompleted()
  router.push('/juegos')
}

onMounted(() => {
  gameState.loadState()
  gameState.startGame()
  initLevel()
})
</script>

<style scoped>
.grid-cell {
  @apply border-2 border-gray-200 rounded flex items-center justify-center p-1 min-h-[50px] transition-all;
}
.silhouette-active {
  @apply bg-gray-100 border-gray-300;
}
.grid-cell.has-verse {
  @apply bg-edu-primary bg-opacity-20 border-edu-primary;
}
.placed-verse {
  @apply text-sm text-center font-semibold text-edu-primary;
}
.verse-card {
  @apply bg-white border-2 border-edu-secondary rounded-lg p-3 cursor-move 
         hover:shadow-md transition-all hover:-translate-y-1;
}
.verse-card.verse-placed {
  @apply opacity-50 cursor-not-allowed bg-gray-100;
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

README.md:

# Cazador de Caligramas

Juego educativo de Lengua - Unidad 1 para 5to grado.

## Contenido pedagógico
- Caligramas y poesía visual
- Fabián Sevilla
- Estructura de poemas

## Mecánica
Drag & drop de versos sobre grid para formar figuras

## Archivos
- CaligramaGame.vue
- gameLogic.js
- caligramas-content.json

## Uso
Importar en router y agregar a games-metadata.json

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VALIDACIÓN:
✓ Drag & drop funciona desktop/mobile
✓ Pistas funcionan
✓ Puntuación correcta
✓ 3 niveles completables
✓ Guarda progreso
✓ Responsive
```

---

## PROMPT-L02: Detectivismo Poético

```
Eres un desarrollador experto en Vue 3. Crea "Detectivismo Poético".

CONTEXTO:
- 5to grado, Lengua - Unidad 1
- Contenido: Recursos literarios (comparación, personificación, hipérbole, imagen sensorial)
- Objetivo: Identificar recursos en poemas

MECÁNICA:
1. Mostrar poema completo (4-8 versos)
2. Estudiante selecciona texto
3. Menú contextual con 4 opciones de recursos
4. Feedback inmediato con explicación
5. 10 poemas diferentes

ESTRUCTURA:
src/games/detectivismo-poetico/
├── DetectiveGame.vue
├── poemas.json
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (poemas.json):

{
  "poemas": [
    {
      "id": "poema_1",
      "titulo": "La luna enamorada",
      "versos": [
        "La luna, como un globo plateado,",
        "juega al escondite con las nubes.",
        "Sus ojos brillan mil soles",
        "y suspira brisas perfumadas."
      ],
      "recursos": [
        {
          "texto": "como un globo plateado",
          "tipo": "comparacion",
          "explicacion": "Se compara la luna con un globo usando 'como'"
        },
        {
          "texto": "juega al escondite",
          "tipo": "personificacion",
          "explicacion": "La luna (objeto) realiza acción humana: jugar"
        },
        {
          "texto": "brillan mil soles",
          "tipo": "hiperbole",
          "explicacion": "Exageración: no pueden brillar mil soles"
        },
        {
          "texto": "brisas perfumadas",
          "tipo": "imagen_sensorial",
          "explicacion": "Apela al sentido del olfato"
        }
      ],
      "dificultad": "facil"
    },
    {
      "id": "poema_2",
      "titulo": "El río cantor",
      "versos": [
        "El río canta melodías antiguas",
        "mientras corre como una serpiente de plata",
        "entre piedras que parecen gigantes dormidos.",
        "Su voz es un susurro fresco y transparente."
      ],
      "recursos": [
        {
          "texto": "El río canta",
          "tipo": "personificacion",
          "explicacion": "El río (objeto) canta (acción humana)"
        },
        {
          "texto": "como una serpiente de plata",
          "tipo": "comparacion",
          "explicacion": "Compara el río con una serpiente usando 'como'"
        },
        {
          "texto": "gigantes dormidos",
          "tipo": "personificacion",
          "explicacion": "Las piedras (objetos) duermen (acción de seres vivos)"
        },
        {
          "texto": "susurro fresco",
          "tipo": "imagen_sensorial",
          "explicacion": "Apela a los sentidos del oído (susurro) y tacto (fresco)"
        }
      ],
      "dificultad": "facil"
    }
  ],
  "mensajesMotivacion": [
    "¡Excelente detective! 🔍",
    "¡Muy bien observado! ⭐",
    "¡Increíble hallazgo! 🎯",
    "¡Sigue así! 📖",
    "¡Gran trabajo! 🌟"
  ]
}

NOTA: Crear 8 poemas más con variedad de recursos y dificultades (3 fácil, 4 medio, 3 difícil)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (DetectiveGame.vue):

<template>
  <GameLayout title="Detectivismo Poético" :instructions="instructions">
    <div class="game-container max-w-6xl mx-auto">
      
      <div class="game-header flex justify-between items-center mb-6">
        <ScoreBoard :score="score" />
        <ProgressTracker :current="foundResources.length" :total="totalResources" label="Recursos" />
      </div>

      <div class="game-area grid md:grid-cols-2 gap-8">
        
        <div class="poem-container card-edu" @mouseup="handleSelection">
          <h3 class="text-xl font-bold mb-4">{{ currentPoem.titulo }}</h3>
          
          <div v-for="(verso, idx) in currentPoem.versos" :key="idx" class="verse-line">
            {{ verso }}
          </div>

          <div v-if="showContextMenu" 
               class="context-menu fixed z-50 bg-white shadow-2xl rounded-lg p-2"
               :style="{left: contextMenuPosition.x+'px', top: contextMenuPosition.y+'px'}">
            <button @click="checkResource('comparacion')" class="menu-btn">
              Comparación
            </button>
            <button @click="checkResource('personificacion')" class="menu-btn">
              Personificación
            </button>
            <button @click="checkResource('hiperbole')" class="menu-btn">
              Hipérbole
            </button>
            <button @click="checkResource('imagen_sensorial')" class="menu-btn">
              Imagen sensorial
            </button>
          </div>
        </div>

        <div class="resources-panel card-edu">
          <h3 class="text-lg font-bold mb-4">
            Recursos encontrados ({{ foundResources.length }}/{{ totalResources }})
          </h3>
          
          <div class="resource-badges flex flex-wrap gap-2 mb-4">
            <span v-for="r in foundResources" :key="r.id" 
                  :class="'badge badge-lg ' + getBadgeClass(r.tipo)">
              {{ getTipoLabel(r.tipo) }} ✓
            </span>
          </div>

          <div v-if="allFound" class="completion-message p-4 bg-green-50 rounded-lg">
            <p class="text-center font-bold text-green-700 mb-3">
              🎉 ¡Encontraste todos los recursos!
            </p>
            <button @click="nextPoem" class="btn btn-primary w-full">
              Siguiente poema →
            </button>
          </div>

          <div v-if="errorCount >= 3 && !allFound" class="hint-message p-3 bg-yellow-50 rounded-lg mt-4">
            <p class="text-sm">💡 Pista: Fijate bien en las palabras destacadas...</p>
          </div>
        </div>
      </div>
    </div>

    <FeedbackModal 
      v-if="showFeedback"
      :show="showFeedback"
      :isCorrect="feedbackCorrect"
      :message="feedbackMessage"
      @close="showFeedback=false" 
    />
  </GameLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import { useGameState } from '@/composables/useGameState'
import poemasData from './poemas.json'

const router = useRouter()
const gameState = useGameState('detectivismo-poetico')
const currentPoemIndex = ref(0)
const foundResources = ref([])
const score = ref(0)
const showContextMenu = ref(false)
const contextMenuPosition = ref({x: 0, y: 0})
const selectedText = ref('')
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const errorCount = ref(0)

const instructions = `
Lee el poema con atención. Cuando encuentres un recurso literario, 
selecciona el texto con el mouse y elige qué tipo de recurso es.
Encuentra todos los recursos para avanzar al siguiente poema.
`

const currentPoem = computed(() => poemasData.poemas[currentPoemIndex.value])
const totalResources = computed(() => currentPoem.value.recursos.length)
const allFound = computed(() => foundResources.value.length === totalResources.value)

const handleSelection = () => {
  const selection = window.getSelection()
  const text = selection.toString().trim()
  
  if (text.length > 3) {
    selectedText.value = text
    const range = selection.getRangeAt(0)
    const rect = range.getBoundingClientRect()
    contextMenuPosition.value = {
      x: rect.left + window.scrollX,
      y: rect.bottom + window.scrollY + 5
    }
    showContextMenu.value = true
  }
}

const checkResource = (tipo) => {
  showContextMenu.value = false
  
  const recurso = currentPoem.value.recursos.find(r => 
    selectedText.value.toLowerCase().includes(r.texto.toLowerCase()) && r.tipo === tipo
  )
  
  const alreadyFound = foundResources.value.find(f => f.texto === recurso?.texto)
  
  if (recurso && !alreadyFound) {
    foundResources.value.push({...recurso, id: Math.random()})
    
    const puntos = foundResources.value.filter(f => f.tipo === tipo).length === 1 ? 15 : 
                   foundResources.value.filter(f => f.tipo === tipo).length === 2 ? 10 : 5
    score.value += puntos
    gameState.addScore(puntos)
    gameState.recordAnswer(true)
    
    feedbackCorrect.value = true
    feedbackMessage.value = recurso.explicacion
    showFeedback.value = true
  } else {
    errorCount.value++
    gameState.recordAnswer(false)
    
    feedbackCorrect.value = false
    feedbackMessage.value = alreadyFound ? 
      "Ya encontraste ese recurso. Busca otros en el poema." :
      "Ese fragmento no es ese recurso. Intenta con otra opción."
    showFeedback.value = true
  }
  
  selectedText.value = ''
}

const getTipoLabel = (tipo) => {
  const labels = {
    'comparacion': 'Comparación',
    'personificacion': 'Personificación',
    'hiperbole': 'Hipérbole',
    'imagen_sensorial': 'Imagen sensorial'
  }
  return labels[tipo] || tipo
}

const getBadgeClass = (tipo) => {
  const classes = {
    'comparacion': 'badge-primary',
    'personificacion': 'badge-success',
    'hiperbole': 'badge-warning',
    'imagen_sensorial': 'badge-secondary'
  }
  return classes[tipo] || 'badge-neutral'
}

const nextPoem = () => {
  if (currentPoemIndex.value < poemasData.poemas.length - 1) {
    currentPoemIndex.value++
    foundResources.value = []
    errorCount.value = 0
  } else {
    gameState.markCompleted()
    router.push('/juegos')
  }
}

const closeMenuOnClickOutside = (e) => {
  if (!e.target.closest('.context-menu')) {
    showContextMenu.value = false
  }
}

onMounted(() => {
  gameState.loadState()
  gameState.startGame()
  document.addEventListener('click', closeMenuOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside)
})
</script>

<style scoped>
.poem-container {
  user-select: text;
  cursor: text;
}
.verse-line {
  @apply py-2 px-3 text-lg leading-loose hover:bg-gray-50 rounded transition-colors;
}
.context-menu {
  animation: fadeIn 0.2s;
}
.menu-btn {
  @apply w-full text-left px-4 py-2 hover:bg-primary hover:text-white rounded transition-colors;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

README.md:

# Detectivismo Poético

Juego de identificación de recursos literarios en poemas.

## Contenido
- Comparación, personificación, hipérbole, imágenes sensoriales
- 10 poemas variados

## Mecánica
Selección de texto + menú contextual

## Uso
Importar en router, agregar a metadata
```

---

## PROMPT-L03: Laboratorio de Acentuación

```
Eres un desarrollador experto en Vue 3. Crea "Laboratorio de Acentuación".

CONTEXTO:
- 5to grado, Lengua - Unidad 2
- Contenido: Acentuación (agudas, graves, esdrújulas), diptongo, hiato
- Objetivo: Clasificar palabras según acentuación

MECÁNICA:
1. Palabras aparecen flotando/cayendo
2. Capturar y arrastrar a 3 recipientes
3. 60s por nivel, 5 niveles
4. Niveles 4-5 incluyen diptongo/hiato

ESTRUCTURA:
src/games/laboratorio-acentuacion/
├── AcentuacionGame.vue
├── palabras.json
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (palabras.json):

{
  "niveles": [
    {
      "nivel": 1,
      "titulo": "Nivel 1: Agudas y Graves",
      "palabras": [
        {
          "palabra": "corazón",
          "tipo": "aguda",
          "silaba_tonica": "zón",
          "tiene_tilde": true,
          "explicacion": "Termina en 'n' y la fuerza está en la última sílaba"
        },
        {
          "palabra": "árbol",
          "tipo": "grave",
          "silaba_tonica": "ár",
          "tiene_tilde": true,
          "explicacion": "Termina en 'l' (consonante que no es n/s) y lleva tilde"
        },
        {
          "palabra": "papel",
          "tipo": "aguda",
          "tiene_tilde": false,
          "explicacion": "Termina en 'l' y la fuerza está en la última sílaba"
        }
      ]
    },
    {
      "nivel": 2,
      "titulo": "Nivel 2: Más Agudas y Graves",
      "palabras": ["...más palabras..."]
    },
    {
      "nivel": 3,
      "titulo": "Nivel 3: ¡Llegan las Esdrújulas!",
      "palabras": [
        {
          "palabra": "música",
          "tipo": "esdrujula",
          "silaba_tonica": "mú",
          "tiene_tilde": true,
          "explicacion": "Todas las esdrújulas llevan tilde"
        }
      ]
    },
    {
      "nivel": 4,
      "titulo": "Nivel 4: Diptongos",
      "incluye_diptongo": true,
      "palabras": [
        {
          "palabra": "ciudad",
          "tipo": "aguda",
          "tiene_diptongo": true,
          "diptongo": "iu",
          "explicacion": "Tiene diptongo 'iu' (vocal cerrada + cerrada)"
        }
      ]
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (AcentuacionGame.vue):

<template>
  <GameLayout title="Laboratorio de Acentuación" :instructions="instructions">
    <div class="lab-container max-w-6xl mx-auto">
      
      <div class="lab-header flex justify-between items-center mb-6">
        <ScoreBoard :score="score" />
        <div class="timer text-3xl font-bold" :class="timeLeft < 20 ? 'text-orange-500' : 'text-edu-primary'">
          ⏱️ {{ timeLeft }}s
        </div>
        <ProgressTracker :current="currentLevel" :total="5" label="Nivel" />
      </div>

      <div class="lab-area">
        <div class="words-space relative h-96 bg-blue-50 rounded-lg mb-6 overflow-hidden">
          <div v-for="word in floatingWords" 
               :key="word.id"
               class="floating-word"
               :draggable="true"
               @dragstart="selectWord(word)"
               :style="{top: word.y+'px', left: word.x+'%'}">
            {{ word.palabra }}
          </div>
        </div>

        <div class="containers grid grid-cols-3 gap-4">
          <div class="container agudas" 
               @drop="dropWord($event, 'aguda')"
               @dragover.prevent>
            <h3 class="font-display text-xl font-bold mb-2">Agudas</h3>
            <p class="text-xs text-gray-600 mb-3">Última sílaba</p>
            <div class="dropped-words space-y-1">
              <span v-for="w in containers.agudas" :key="w" class="badge badge-primary">
                {{ w }}
              </span>
            </div>
          </div>

          <div class="container graves"
               @drop="dropWord($event, 'grave')"
               @dragover.prevent>
            <h3 class="font-display text-xl font-bold mb-2">Graves</h3>
            <p class="text-xs text-gray-600 mb-3">Penúltima sílaba</p>
            <div class="dropped-words space-y-1">
              <span v-for="w in containers.graves" :key="w" class="badge badge-success">
                {{ w }}
              </span>
            </div>
          </div>

          <div class="container esdrujulas"
               @drop="dropWord($event, 'esdrujula')"
               @dragover.prevent>
            <h3 class="font-display text-xl font-bold mb-2">Esdrújulas</h3>
            <p class="text-xs text-gray-600 mb-3">Antepenúltima</p>
            <div class="dropped-words space-y-1">
              <span v-for="w in containers.esdrujulas" :key="w" class="badge badge-warning">
                {{ w }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="levelCompleted" class="modal modal-open">
        <div class="modal-box">
          <h2 class="font-display text-2xl font-bold mb-4">
            {{ currentLevel === 5 ? '🎉 ¡Laboratorio Completo!' : '✨ ¡Nivel Completado!' }}
          </h2>
          <div class="stats space-y-2 mb-4">
            <p>Palabras correctas: <strong>{{ correctCount }}</strong></p>
            <p>Puntuación nivel: <strong>{{ levelScore }}</strong></p>
          </div>
          <div class="modal-action">
            <button v-if="currentLevel < 5" @click="nextLevel" class="btn btn-primary">
              Siguiente Nivel →
            </button>
            <button v-else @click="finishGame" class="btn btn-success">
              ¡Terminar! 🏆
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
      @close="showFeedback=false" 
    />
  </GameLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import { useGameState } from '@/composables/useGameState'
import palabrasData from './palabras.json'

const router = useRouter()
const gameState = useGameState('laboratorio-acentuacion')
const currentLevel = ref(1)
const floatingWords = ref([])
const selectedWord = ref(null)
const containers = ref({ agudas: [], graves: [], esdrujulas: [] })
const score = ref(0)
const timeLeft = ref(60)
const levelCompleted = ref(false)
const correctCount = ref(0)
const levelScore = ref(0)
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
let timerInterval = null

const instructions = `
Clasifica las palabras según su acentuación.
Arrastra cada palabra al recipiente correcto:
- Agudas: fuerza en última sílaba
- Graves: fuerza en penúltima
- Esdrújulas: fuerza en antepenúltima

¡Tienes 60 segundos por nivel!
`

const currentLevelData = computed(() => palabrasData.niveles[currentLevel.value - 1])

const initLevel = () => {
  timeLeft.value = 60
  levelCompleted.value = false
  correctCount.value = 0
  levelScore.value = 0
  containers.value = { agudas: [], graves: [], esdrujulas: [] }
  
  const palabras = currentLevelData.value.palabras
  floatingWords.value = palabras.map((p, idx) => ({
    ...p,
    id: idx,
    x: Math.random() * 80 + 10,
    y: Math.random() * 300 + 20
  }))
  
  startTimer()
}

const startTimer = () => {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      finishLevel()
    }
  }, 1000)
}

const selectWord = (word) => {
  selectedWord.value = word
}

const dropWord = (event, tipo) => {
  event.preventDefault()
  if (!selectedWord.value) return
  
  const isCorrect = selectedWord.value.tipo === tipo
  
  if (isCorrect) {
    containers.value[`${tipo}s`].push(selectedWord.value.palabra)
    floatingWords.value = floatingWords.value.filter(w => w.id !== selectedWord.value.id)
    
    correctCount.value++
    const puntos = 10
    score.value += puntos
    levelScore.value += puntos
    gameState.addScore(puntos)
    gameState.recordAnswer(true)
    
    if (floatingWords.value.length === 0) {
      finishLevel()
    }
  } else {
    gameState.recordAnswer(false)
    feedbackCorrect.value = false
    feedbackMessage.value = `"${selectedWord.value.palabra}" es ${selectedWord.value.tipo}. ${selectedWord.value.explicacion}`
    showFeedback.value = true
    
    score.value = Math.max(0, score.value - 5)
  }
  
  selectedWord.value = null
}

const finishLevel = () => {
  if (timerInterval) clearInterval(timerInterval)
  levelCompleted.value = true
  gameState.levelUp()
}

const nextLevel = () => {
  currentLevel.value++
  initLevel()
}

const finishGame = () => {
  gameState.markCompleted()
  router.push('/juegos')
}

onMounted(() => {
  gameState.loadState()
  gameState.startGame()
  initLevel()
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.floating-word {
  @apply absolute bg-white px-4 py-2 rounded-lg shadow-md cursor-move font-semibold
         hover:shadow-lg hover:scale-105 transition-all;
  animation: float 3s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
.container {
  @apply min-h-64 p-4 rounded-lg border-4 border-dashed bg-white;
}
.container.agudas { @apply border-primary; }
.container.graves { @apply border-success; }
.container.esdrujulas { @apply border-warning; }
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTA: Completar palabras.json con al menos 15 palabras por nivel (total 75+ palabras)
```

---

# 📚 Documento Completo de Prompts - Minijuegos Educativos (CONTINUACIÓN)

---

## PROMPT-L04: Portal Mágico Oz y Narnia

```
Eres un desarrollador experto en Vue 3. Crea "Portal Mágico: Oz y Narnia".

CONTEXTO:
- 5to grado, Lengua - Unidad 3 "De un mundo a otro"
- Contenido: Comprensión lectora, mundos fantásticos, vocabulario
- Referencia: "El mago de Oz" y "Las crónicas de Narnia"
- Objetivo: Comprensión lectora y vocabulario

MECÁNICA:
1. Aventura narrativa con ramificaciones
2. Dos mundos para explorar (Oz y Narnia)
3. Preguntas de comprensión en cada escena
4. Banco de palabras nuevas que se va completando
5. Minijuego final: escribir cómo sería tu mundo fantástico

ESTRUCTURA:
src/games/portal-magico/
├── PortalGame.vue
├── mundos.json
├── vocabulario.json
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (mundos.json):

{
  "mundos": [
    {
      "id": "oz",
      "nombre": "El Mágico Mundo de Oz",
      "personaje": "Dorothy",
      "escenas": [
        {
          "id": "oz_inicio",
          "titulo": "El Remolino",
          "descripcion": "Dorothy y su perro Totó son atrapados por un poderoso tornado que los lleva lejos de Kansas...",
          "imagen": "/assets/oz_tornado.svg",
          "pregunta": {
            "texto": "¿Qué fenómeno natural lleva a Dorothy a Oz?",
            "opciones": [
              {"texto": "Un tornado", "correcto": true},
              {"texto": "Un terremoto", "correcto": false},
              {"texto": "Una inundación", "correcto": false}
            ],
            "explicacion": "Un tornado es un remolino de viento muy poderoso"
          },
          "palabrasNuevas": ["tornado", "remolino", "fenómeno"],
          "siguienteEscena": "oz_encuentro"
        },
        {
          "id": "oz_encuentro",
          "titulo": "Los Compañeros del Camino",
          "descripcion": "Dorothy conoce al Espantapájaros que desea un cerebro, al Hombre de Hojalata que anhela un corazón, y al León Cobarde que busca valentía...",
          "pregunta": {
            "texto": "¿Qué busca cada compañero de Dorothy?",
            "tipo": "emparejamiento",
            "pares": [
              {"personaje": "Espantapájaros", "deseo": "Un cerebro"},
              {"personaje": "Hombre de Hojalata", "deseo": "Un corazón"},
              {"personaje": "León", "deseo": "Valentía"}
            ]
          },
          "palabrasNuevas": ["anhela", "valentía", "cobarde"],
          "siguienteEscena": "oz_final"
        }
      ]
    },
    {
      "id": "narnia",
      "nombre": "El Reino de Narnia",
      "personaje": "Lucy",
      "escenas": [
        {
          "id": "narnia_armario",
          "titulo": "El Armario Mágico",
          "descripcion": "Lucy explora una casa grande y descubre un viejo armario. Al entrar entre los abrigos, siente ramas de árboles y nieve...",
          "pregunta": {
            "texto": "¿Qué descubre Lucy al fondo del armario?",
            "opciones": [
              {"texto": "Un mundo nevado con árboles", "correcto": true},
              {"texto": "Más ropa y zapatos", "correcto": false},
              {"texto": "Un espejo mágico", "correcto": false}
            ]
          },
          "palabrasNuevas": ["explorar", "armario", "descubre"],
          "siguienteEscena": "narnia_fauno"
        },
        {
          "id": "narnia_fauno",
          "titulo": "El Señor Tumnus",
          "descripcion": "Lucy conoce a Tumnus, un fauno con patas de cabra y cuernos. Él le cuenta sobre Narnia y la Bruja Blanca que ha congelado el reino en un invierno eterno...",
          "pregunta": {
            "texto": "¿Qué es un fauno?",
            "opciones": [
              {"texto": "Una criatura mitad humano, mitad cabra", "correcto": true},
              {"texto": "Un tipo de árbol mágico", "correcto": false},
              {"texto": "Un hechizo de hielo", "correcto": false}
            ]
          },
          "palabrasNuevas": ["fauno", "eterno", "congelado"],
          "siguienteEscena": "narnia_final"
        }
      ]
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (vocabulario.json):

{
  "palabras": [
    {
      "palabra": "tornado",
      "definicion": "Viento muy fuerte que gira en forma de remolino",
      "ejemplo": "El tornado levantó la casa de Dorothy",
      "sinonimos": ["remolino", "torbellino"]
    },
    {
      "palabra": "anhela",
      "definicion": "Desear algo con mucha intensidad",
      "ejemplo": "El Hombre de Hojalata anhela tener un corazón",
      "sinonimos": ["desea", "quiere", "ansía"]
    },
    {
      "palabra": "fauno",
      "definicion": "Criatura mitológica mitad humano, mitad cabra",
      "ejemplo": "Tumnus es un fauno amigable",
      "sinonimos": []
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (PortalGame.vue):

<template>
  <GameLayout title="Portal Mágico: Oz y Narnia" :instructions="instructions">
    <div class="portal-container max-w-5xl mx-auto">

      <div v-if="!mundoSeleccionado" class="world-selection">
        <h2 class="text-3xl font-display font-bold text-center mb-8">
          ¿Qué mundo quieres explorar?
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="mundo in mundos" :key="mundo.id" 
               class="world-card card-edu cursor-pointer hover:scale-105 transition-transform"
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

        <div class="scene-container card-edu">
          <div class="scene-image mb-4">
            <img :src="currentScene.imagen" :alt="currentScene.titulo" class="w-full rounded-lg" />
          </div>

          <h3 class="text-2xl font-display font-bold mb-4">{{ currentScene.titulo }}</h3>
          
          <div class="scene-text prose prose-lg mb-6">
            <p>{{ currentScene.descripcion }}</p>
          </div>

          <div v-if="!sceneAnswered" class="question-section">
            <h4 class="font-semibold mb-3">{{ currentScene.pregunta.texto }}</h4>
            
            <div v-if="currentScene.pregunta.tipo !== 'emparejamiento'" class="options space-y-2">
              <button v-for="opc in currentScene.pregunta.opciones"
                      :key="opc.texto"
                      @click="answerQuestion(opc)"
                      class="btn btn-outline btn-block text-left justify-start">
                {{ opc.texto }}
              </button>
            </div>

            <div v-else class="matching-game">
              <!-- Implementar drag & drop para emparejar -->
              <div class="grid grid-cols-2 gap-4">
                <div class="personajes">
                  <div v-for="par in currentScene.pregunta.pares" :key="par.personaje"
                       class="match-item bg-blue-50 p-3 rounded mb-2">
                    {{ par.personaje }}
                  </div>
                </div>
                <div class="deseos">
                  <div v-for="par in shuffledDeseos" :key="par"
                       class="match-item bg-green-50 p-3 rounded mb-2 cursor-pointer"
                       @click="selectDeseo(par)">
                    {{ par }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="scene-complete">
            <div class="success-message p-4 bg-green-50 rounded-lg mb-4">
              <p class="text-green-700 font-semibold">✓ ¡Correcto!</p>
              <p v-if="currentScene.pregunta.explicacion" class="text-sm mt-2">
                {{ currentScene.pregunta.explicacion }}
              </p>
            </div>

            <div class="new-words mb-4">
              <h4 class="font-semibold mb-2">📚 Palabras nuevas de esta escena:</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="palabra in currentScene.palabrasNuevas" 
                      :key="palabra"
                      @click="showWordDefinition(palabra)"
                      class="badge badge-lg badge-primary cursor-pointer">
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
          
          <div class="words-list space-y-4">
            <div v-for="palabra in palabrasAprendidas" :key="palabra.palabra"
                 class="word-card p-4 bg-base-200 rounded-lg">
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
              <label class="label">Nombre de tu mundo:</label>
              <input v-model="nuevoMundo.nombre" 
                     type="text" 
                     placeholder="Ej: El Reino de las Nubes Doradas"
                     class="input input-bordered w-full" />
            </div>

            <div>
              <label class="label">¿Cómo se llega a tu mundo?</label>
              <input v-model="nuevoMundo.portal" 
                     type="text" 
                     placeholder="Ej: A través de un espejo mágico"
                     class="input input-bordered w-full" />
            </div>

            <div>
              <label class="label">Describe tu mundo (mínimo 50 palabras):</label>
              <textarea v-model="nuevoMundo.descripcion"
                        rows="5"
                        placeholder="Escribe sobre los lugares, criaturas, clima, y aventuras..."
                        class="textarea textarea-bordered w-full"></textarea>
              <div class="text-xs text-right mt-1">
                {{ wordCount }} palabras
              </div>
            </div>

            <div>
              <label class="label">Personaje principal:</label>
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

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import { useGameState } from '@/composables/useGameState'
import mundosData from './mundos.json'
import vocabularioData from './vocabulario.json'

const router = useRouter()
const gameState = useGameState('portal-magico')
const mundos = ref(mundosData.mundos)
const mundoSeleccionado = ref(null)
const currentSceneIndex = ref(0)
const sceneAnswered = ref(false)
const score = ref(0)
const palabrasAprendidas = ref([])
const showVocabulario = ref(false)
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const showFinalActivity = ref(false)
const nuevoMundo = ref({
  nombre: '',
  portal: '',
  descripcion: '',
  personaje: ''
})

const instructions = `
Explora mundos fantásticos respondiendo preguntas sobre las historias.
Aprende nuevas palabras y al final crea tu propio mundo mágico.
`

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

const selectWorld = (mundo) => {
  mundoSeleccionado.value = mundo
  currentSceneIndex.value = 0
  sceneAnswered.value = false
}

const backToSelection = () => {
  mundoSeleccionado.value = null
  currentSceneIndex.value = 0
}

const answerQuestion = (opcion) => {
  if (opcion.correcto) {
    sceneAnswered.value = true
    score.value += 15
    gameState.addScore(15)
    gameState.recordAnswer(true)
    
    // Agregar palabras nuevas al banco
    currentScene.value.palabrasNuevas.forEach(palabra => {
      const palabraData = vocabularioData.palabras.find(p => p.palabra === palabra)
      if (palabraData && !palabrasAprendidas.value.find(p => p.palabra === palabra)) {
        palabrasAprendidas.value.push(palabraData)
      }
    })
  } else {
    gameState.recordAnswer(false)
    feedbackCorrect.value = false
    feedbackMessage.value = 'Intenta de nuevo. Relee el texto con atención.'
    showFeedback.value = true
  }
}

const showWordDefinition = (palabra) => {
  const palabraData = vocabularioData.palabras.find(p => p.palabra === palabra)
  if (palabraData) {
    feedbackCorrect.value = true
    feedbackMessage.value = `<strong>${palabraData.palabra}:</strong> ${palabraData.definicion}<br><br><em>Ejemplo: ${palabraData.ejemplo}</em>`
    showFeedback.value = true
  }
}

const nextScene = () => {
  currentSceneIndex.value++
  sceneAnswered.value = false
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

<style scoped>
.world-card {
  @apply p-8 text-center;
}
.scene-image img {
  @apply object-cover h-64;
}
.word-card {
  @apply transition-all hover:shadow-md;
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTA: Agregar más escenas a cada mundo (mínimo 5 por mundo)
```

---

## PROMPT-L05: Aventura en Misiones

```
Eres un desarrollador experto en Vue 3. Crea "Aventura en Misiones: Horacio Quiroga".

CONTEXTO:
- 5to grado, Lengua - Unidad 5 y 6 "Relatos de la selva"
- Contenido: "El loro pelado", "Rikki-Tikki-Tavi", Horacio Quiroga
- Objetivo: Comprensión narrativa, descripción de personajes, comparaciones
- Extra: Geografía de Misiones

MECÁNICA:
1. Juego de plataformas 2D simple (o point-and-click)
2. 5 niveles = 5 escenas del cuento
3. Recolectar objetos clave de la historia
4. Preguntas de comprensión para avanzar
5. Identificar comparaciones en textos
6. Mapa de Misiones con datos

ESTRUCTURA:
src/games/aventura-misiones/
├── MisionesGame.vue
├── niveles.json
├── assets/
│   ├── sprites/
│   └── mapa-misiones.svg
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (niveles.json):

{
  "niveles": [
    {
      "id": "nivel_1",
      "titulo": "La casa de Horacio Quiroga",
      "cuento": "El loro pelado",
      "escenario": "casa_quiroga",
      "descripcion": "Conoce a los animales de la selva misionera",
      "objetosRecolectar": [
        {
          "id": "loro",
          "nombre": "Loro pelado",
          "posicion": {"x": 300, "y": 200},
          "descripcion": "Un loro que perdió sus plumas"
        },
        {
          "id": "tigre",
          "nombre": "Tigre",
          "posicion": {"x": 500, "y": 180}
        }
      ],
      "pregunta": {
        "tipo": "descripcion_personaje",
        "texto": "¿Cómo era el loro?",
        "fragmento": "Era un loro viejo, que no tenía sino tres o cuatro plumas en el lomo y algunas en la cabeza.",
        "opciones": [
          {"texto": "Viejo y casi sin plumas", "correcto": true},
          {"texto": "Joven y colorido", "correcto": false},
          {"texto": "Grande y peludo", "correcto": false}
        ]
      },
      "comparacion": {
        "texto": "El loro estaba tan pelado como una rata",
        "pregunta": "¿Con qué se compara al loro?",
        "respuesta": "Con una rata",
        "explicacion": "Usa 'como' para comparar"
      }
    },
    {
      "id": "nivel_2",
      "titulo": "El plan del tigre",
      "escenario": "selva",
      "descripcion": "El tigre quiere cazar a los hombres",
      "pregunta": {
        "tipo": "comprension",
        "texto": "¿Qué planeaba el tigre?",
        "opciones": [
          {"texto": "Atrapar a los hombres con un plan", "correcto": true},
          {"texto": "Hacer amigos", "correcto": false}
        ]
      }
    },
    {
      "id": "nivel_3",
      "titulo": "Rikki-Tikki-Tavi aparece",
      "cuento": "Rikki-Tikki-Tavi",
      "escenario": "jardin",
      "descripcion": "Una mangosta valiente llega al jardín",
      "pregunta": {
        "tipo": "personaje",
        "texto": "¿Qué animal es Rikki-Tikki-Tavi?",
        "opciones": [
          {"texto": "Una mangosta", "correcto": true},
          {"texto": "Una serpiente", "correcto": false},
          {"texto": "Un pájaro", "correcto": false}
        ]
      },
      "comparacion": {
        "texto": "Sus ojos brillaban como carbones encendidos",
        "pregunta": "¿Con qué se comparan los ojos de Rikki?",
        "respuesta": "Con carbones encendidos"
      }
    },
    {
      "id": "nivel_4",
      "titulo": "La batalla con las cobras",
      "escenario": "jardin_noche",
      "pregunta": {
        "tipo": "secuencia",
        "texto": "Ordena los eventos:",
        "eventos": [
          "Rikki encuentra los huevos",
          "Rikki pelea con Nag",
          "Las cobras planean atacar"
        ],
        "orden_correcto": [2, 1, 0]
      }
    },
    {
      "id": "nivel_5",
      "titulo": "Mapa de Misiones",
      "tipo": "geografia",
      "descripcion": "Aprende sobre la provincia donde vivió Quiroga",
      "infoMisiones": {
        "ubicacion": "Noreste de Argentina",
        "capital": "Posadas",
        "rios": ["Paraná", "Iguazú"],
        "atracciones": ["Cataratas del Iguazú", "Ruinas de San Ignacio"],
        "fauna": ["Tucán", "Mono caí", "Yaguareté", "Coatí"],
        "curiosidad": "Horacio Quiroga vivió en San Ignacio, Misiones"
      },
      "actividad": {
        "tipo": "mapa_interactivo",
        "marcadores": [
          {"nombre": "Cataratas del Iguazú", "x": 70, "y": 30},
          {"nombre": "San Ignacio", "x": 50, "y": 50},
          {"nombre": "Posadas", "x": 45, "y": 60}
        ]
      }
    }
  ],
  "personajes": {
    "quiroga": {
      "nombre": "Horacio Quiroga",
      "descripcion": "Escritor uruguayo que vivió en la selva misionera",
      "años": "1878-1937",
      "obras": ["Cuentos de la selva", "Cuentos de amor, locura y muerte"]
    }
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (MisionesGame.vue):

<template>
  <GameLayout title="Aventura en Misiones" :instructions="instructions">
    <div class="misiones-container max-w-6xl mx-auto">
      
      <div class="game-header flex justify-between items-center mb-6">
        <ScoreBoard :score="score" />
        <ProgressTracker :current="currentLevel + 1" :total="5" label="Nivel" />
      </div>

      <div v-if="!gameStarted" class="intro-screen card-edu text-center p-8">
        <h2 class="text-3xl font-display font-bold mb-4">
          🌿 Aventura en la Selva Misionera
        </h2>
        <div class="mb-6">
          <img src="/assets/quiroga-portrait.jpg" alt="Horacio Quiroga" class="w-32 h-32 rounded-full mx-auto mb-4" />
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
        <div class="level-info card-edu mb-6">
          <h3 class="text-2xl font-display font-bold mb-2">
            Nivel {{ currentLevel + 1 }}: {{ currentLevelData.titulo }}
          </h3>
          <p class="text-gray-600">{{ currentLevelData.descripcion }}</p>
          <div v-if="currentLevelData.cuento" class="badge badge-secondary mt-2">
            📖 {{ currentLevelData.cuento }}
          </div>
        </div>

        <!-- Escenario del juego -->
        <div v-if="currentLevelData.tipo !== 'geografia'" class="game-canvas card-edu">
          <div class="escenario relative h-96 overflow-hidden rounded-lg"
               :style="{backgroundImage: `url(/assets/escenarios/${currentLevelData.escenario}.svg)`}">
            
            <!-- Objetos recolectables -->
            <div v-for="objeto in objetosRestantes" 
                 :key="objeto.id"
                 class="objeto-recolectable absolute cursor-pointer hover:scale-110 transition-transform"
                 :style="{left: objeto.posicion.x+'px', top: objeto.posicion.y+'px'}"
                 @click="recolectarObjeto(objeto)">
              <div class="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                {{ getObjetoIcon(objeto.id) }}
              </div>
            </div>

            <!-- Personaje jugador -->
            <div class="personaje absolute bottom-4"
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
        <div v-else class="mapa-misiones card-edu">
          <h3 class="text-xl font-bold mb-4">🗺️ Provincia de Misiones</h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="mapa-interactivo relative">
              <img src="/assets/mapa-misiones.svg" alt="Mapa de Misiones" class="w-full" />
              
              <button v-for="marcador in currentLevelData.actividad.marcadores"
                      :key="marcador.nombre"
                      class="marcador absolute w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold hover:scale-125 transition-transform"
                      :style="{left: marcador.x+'%', top: marcador.y+'%'}"
                      @click="showMarcadorInfo(marcador)">
                📍
              </button>
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
        <div v-if="showPregunta" class="modal modal-open">
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
              <draggable v-model="eventosOrdenados" class="space-y-2">
                <div v-for="(evento, idx) in eventosOrdenados" :key="evento"
                     class="evento-card p-3 bg-base-200 rounded cursor-move">
                  {{ idx + 1 }}. {{ evento }}
                </div>
              </draggable>
              <button @click="verificarSecuencia" class="btn btn-primary w-full mt-4">
                Verificar orden
              </button>
            </div>
          </div>
        </div>

        <!-- Comparaciones -->
        <div v-if="showComparacion" class="modal modal-open">
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

        <!-- Nivel completado -->
        <div v-if="levelCompleted" class="modal modal-open">
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
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import { useGameState } from '@/composables/useGameState'
import nivelesData from './niveles.json'

const router = useRouter()
const gameState = useGameState('aventura-misiones')
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

const instructions = `
Explora la selva misionera, recolecta objetos y responde preguntas sobre los cuentos de Horacio Quiroga.
Usa las flechas para mover al personaje y haz click en los objetos para recolectarlos.
`

const currentLevelData = computed(() => nivelesData.niveles[currentLevel.value])

const startGame = () => {
  gameStarted.value = true
  gameState.loadState()
  gameState.startGame()
  initLevel()
}

const initLevel = () => {
  levelCompleted.value = false
  levelScore.value = 0
  objetosRecolectados.value = []
  
  if (currentLevelData.value.objetosRecolectar) {
    objetosRestantes.value = [...currentLevelData.value.objetosRecolectar]
  }
}

const movePlayer = (delta) => {
  playerPosition.value = Math.max(0, Math.min(700, playerPosition.value + delta))
}

const recolectarObjeto = (objeto) => {
  objetosRecolectados.value.push(objeto)
  objetosRestantes.value = objetosRestantes.value.filter(o => o.id !== objeto.id)
  
  score.value += 10
  gameState.addScore(10)
  
  if (objetosRestantes.value.length === 0) {
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
    gameState.addScore(20)
    gameState.recordAnswer(true)
    
    if (currentLevelData.value.comparacion) {
      showComparacion.value = true
    } else {
      completeLevel()
    }
  } else {
    gameState.recordAnswer(false)
    feedbackCorrect.value = false
    feedbackMessage.value = 'Intenta de nuevo. Relee el fragmento con atención.'
    showFeedback.value = true
  }
}

const verificarComparacion = () => {
  const respuesta = respuestaComparacion.value.toLowerCase().trim()
  const correcta = currentLevelData.value.comparacion.respuesta.toLowerCase()
  
  if (respuesta.includes(correcta) || correcta.includes(respuesta)) {
    showComparacion.value = false
    score.value += 15
    gameState.addScore(15)
    
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

const completeGeografia = () => {
  score.value += 30
  gameState.addScore(30)
  completeLevel()
}

const completeLevel = () => {
  levelScore.value = 50
  score.value += levelScore.value
  gameState.addScore(levelScore.value)
  gameState.levelUp()
  levelCompleted.value = true
}

const nextLevel = () => {
  currentLevel.value++
  initLevel()
}

const finishGame = () => {
  gameState.markCompleted()
  router.push('/juegos')
}
</script>

<style scoped>
.escenario {
  background-size: cover;
  background-position: center;
}
.personaje {
  font-size: 3rem;
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
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTA: Crear assets SVG para escenarios (casa_quiroga, selva, jardin, etc.) y mapa de Misiones
```

---

## PROMPT-M01: Autopista Numérica

```
[YA INCLUIDO ANTERIORMENTE - Ver sección principal del documento]
```

---

## PROMPT-M02: Transformador de Calculadora

```
[YA INCLUIDO ANTERIORMENTE - Ver sección principal del documento]
```

---

## PROMPT-CS01: Línea del Tiempo Interactiva

```
[YA INCLUIDO ANTERIORMENTE - Ver sección principal del documento]
```

---

## PROMPT-CS02: Defensa de Buenos Aires

```
Eres un desarrollador experto en Vue 3. Crea "Defensa de Buenos Aires 1806-1807".

CONTEXTO:
- 5to grado, Ciencias Sociales - Unidad 1
- Contenido: Invasiones Inglesas (1806-1807)
- Personajes: Liniers, Beresford, Whitelocke, Martina Céspedes
- Objetivo: Comprender eventos, personajes y causas de las Invasiones

MECÁNICA:
1. Estrategia tipo tower defense simplificado
2. Dos niveles: Primera Invasión (1806) y Segunda Invasión (1807)
3. Responder preguntas históricas para desbloquear defensas
4. Ubicar milicias, barricadas en el mapa de Buenos Aires
5. Galería de personajes históricos

ESTRUCTURA:
src/games/defensa-buenosaires/
├── DefensaGame.vue
├── invasiones.json
├── personajes.json
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (invasiones.json):

{
  "invasiones": [
    {
      "id": "primera_invasion",
      "año": 1806,
      "titulo": "Primera Invasión Inglesa",
      "comandante_ingles": "William Carr Beresford",
      "defensor": "Santiago de Liniers",
      "contexto": "Inglaterra buscaba nuevos mercados para sus productos industriales debido al bloqueo continental de Napoleón.",
      "eventos": [
        {
          "fecha": "25 de junio de 1806",
          "descripcion": "Desembarco inglés en Quilmes",
          "pregunta": {
            "texto": "¿Dónde desembarcaron los ingleses?",
            "opciones": [
              {"texto": "Quilmes", "correcto": true},
              {"texto": "La Boca", "correcto": false},
              {"texto": "San Telmo", "correcto": false}
            ]
          }
        },
        {
          "fecha": "27 de junio de 1806",
          "descripcion": "Los británicos toman el fuerte y Beresford asume el gobierno",
          "pregunta": {
            "texto": "¿Qué hizo el virrey Sobremonte?",
            "opciones": [
              {"texto": "Huyó a Córdoba con el tesoro", "correcto": true},
              {"texto": "Organizó la defensa", "correcto": false},
              {"texto": "Se rindió inmediatamente", "correcto": false}
            ],
            "explicacion": "Sobremonte tomó el tesoro real y huyó, lo que causó gran descontento"
          }
        },
        {
          "fecha": "12 de agosto de 1806",
          "descripcion": "Reconquista: Liniers derrota a los ingleses",
          "pregunta": {
            "texto": "¿Quién lideró la reconquista?",
            "opciones": [
              {"texto": "Santiago de Liniers", "correcto": true},
              {"texto": "Manuel Belgrano", "correcto": false},
              {"texto": "José de San Martín", "correcto": false}
            ]
          }
        }
      ],
      "resultado": "Victoria de las fuerzas locales. Reconquista de Buenos Aires.",
      "consecuencias": [
        "Formación de milicias criollas",
        "Aumento de la confianza criolla",
        "Descrédito del virrey Sobremonte"
      ]
    },
    {
      "id": "segunda_invasion",
      "año": 1807,
      "titulo": "Segunda Invasión Inglesa",
      "comandante_ingles": "John Whitelocke",
      "defensor": "Milicias de Buenos Aires",
      "eventos": [
        {
          "fecha": "28 de junio de 1807",
          "descripcion": "Los ingleses desembarcan con fuerzas mayores",
          "pregunta": {
            "texto": "¿Por qué Inglaterra volvió a intentar tomar Buenos Aires?",
            "opciones": [
              {"texto": "Querían el puerto y romper el monopolio español", "correcto": true},
              {"texto": "Por venganza personal", "correcto": false},
              {"texto": "Para ayudar a los criollos", "correcto": false}
            ]
          }
        },
        {
          "fecha": "5 de julio de 1807",
          "descripcion": "Defensa de Buenos Aires: barricadas y azoteas",
          "pregunta": {
            "texto": "¿Cómo se defendió Buenos Aires?",
            "opciones": [
              {"texto": "Con barricadas y desde las azoteas", "correcto": true},
              {"texto": "Solo con el ejército español", "correcto": false},
              {"texto": "Pidiendo ayuda a Francia", "correcto": false}
            ],
            "explicacion": "El pueblo organizó la defensa con barricadas, agua hirviendo y disparos desde azoteas"
          }
        },
        {
          "fecha": "7 de julio de 1807",
          "descripcion": "Whitelocke firma la rendición",
          "pregunta": {
            "texto": "¿Quién fue Martina Céspedes?",
            "opciones": [
              {"texto": "Pulpera que capturó soldados ingleses", "correcto": true},
              {"texto": "Esposa de Liniers", "correcto": false},
              {"texto": "Una espía inglesa", "correcto": false}
            ],
            "explicacion": "Martina y sus hijas emborracharon a soldados ingleses y los capturaron. Liniers la nombró Sargento Mayor."
          }
        }
      ],
      "resultado": "Victoria definitiva. Los ingleses se retiran.",
      "consecuencias": [
        "Milicias criollas se convierten en poder militar",
        "Crecimiento del sentimiento independentista",
        "Protagonismo político de los criollos"
      ]
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (personajes.json):

{
  "personajes": [
    {
      "id": "liniers",
      "nombre": "Santiago de Liniers",
      "rol": "Defensor de Buenos Aires",
      "origen": "Francés al servicio de España",
      "descripcion": "Oficial experimentado que lideró la Reconquista y organizó las milicias",
      "logros": [
        "Reconquista de Buenos Aires (1806)",
        "Organización de milicias",
        "Defensa exitosa en 1807"
      ],
      "imagen": "/assets/personajes/liniers.jpg"
    },
    {
      "id": "beresford",
      "nombre": "William Carr Beresford",
      "rol": "Comandante inglés (1806)",
      "descripcion": "Lideró la primera invasión, tomó Buenos Aires brevemente",
      "resultado": "Capturado y enviado prisionero"
    },
    {
      "id": "whitelocke",
      "nombre": "John Whitelocke",
      "rol": "Comandante inglés (1807)",
      "descripcion": "Lideró la segunda invasión con fuerzas superiores",
      "resultado": "Derrotado, firmó la rendición. Fue juzgado en Inglaterra por su fracaso"
    },
    {
      "id": "martina",
      "nombre": "Martina Céspedes",
      "rol": "Heroína popular",
      "descripcion": "Pulpera que capturó soldados ingleses con astucia",
      "reconocimiento": "Liniers la nombró Sargento Mayor del Ejército",
      "legado": "Símbolo de la participación popular en la defensa"
    },
    {
      "id": "sobremonte",
      "nombre": "Rafael de Sobremonte",
      "rol": "Virrey del Río de la Plata",
      "descripcion": "Virrey durante la primera invasión",
      "accion": "Huyó a Córdoba con el tesoro",
      "consecuencia": "Perdió autoridad y fue reemplazado"
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (DefensaGame.vue):

<template>
  <GameLayout title="Defensa de Buenos Aires" :instructions="instructions">
    <div class="defensa-container max-w-6xl mx-auto">

      <div v-if="!invasionSeleccionada" class="invasion-selection">
        <h2 class="text-3xl font-display font-bold text-center mb-8">
          Elige qué invasión defender
        </h2>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="invasion in invasionesData.invasiones" :key="invasion.id"
               class="invasion-card card-edu cursor-pointer hover:scale-105 transition-transform"
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

        <div class="contexto-historico card-edu mb-6">
          <h3 class="font-bold mb-2">📖 Contexto histórico</h3>
          <p class="text-sm">{{ invasionSeleccionada.contexto }}</p>
        </div>

        <div class="mapa-defensa card-edu mb-6">
          <h3 class="font-bold mb-4">Mapa de Buenos Aires Colonial</h3>
          
          <div class="mapa-container relative">
            <img src="/assets/mapa-bsas-1806.svg" alt="Buenos Aires 1806" class="w-full" />
            
            <!-- Defensas colocadas -->
            <div v-for="defensa in defensasColocadas" :key="defensa.id"
                 class="defensa-icon absolute"
                 :style="{left: defensa.x+'%', top: defensa.y+'%'}">
              {{ defensa.tipo === 'milicia' ? '🛡️' : '🧱' }}
            </div>

            <!-- Enemigos -->
            <div v-for="enemigo in enemigos" :key="enemigo.id"
                 class="enemigo-icon absolute"
                 :style="{left: enemigo.x+'%', top: enemigo.y+'%'}">
              🇬🇧
            </div>
          </div>

          <div class="defensa-controls mt-4 flex gap-4">
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

        <div class="evento-actual card-edu">
          <h3 class="text-xl font-bold mb-2">{{ currentEvento.fecha }}</h3>
          <p class="mb-4">{{ currentEvento.descripcion }}</p>

          <div v-if="!eventoRespondido" class="pregunta-evento">
            <h4 class="font-semibold mb-3">{{ currentEvento.pregunta.texto }}</h4>
            <div class="options space-y-2">
              <button v-for="opc in currentEvento.pregunta.opciones"
                      :key="opc.texto"
                      @click="answerEvento(opc)"
                      class="btn btn-outline btn-block text-left justify-start">
                {{ opc.texto }}
              </button>
            </div>
          </div>

          <div v-else class="evento-completado">
            <div class="success-message p-4 bg-green-50 rounded-lg mb-4">
              <p class="text-green-700 font-semibold">✓ ¡Correcto!</p>
              <p v-if="currentEvento.pregunta.explicacion" class="text-sm mt-2">
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
      <div v-if="showResultado" class="modal modal-open">
        <div class="modal-box max-w-2xl">
          <h2 class="font-display text-3xl font-bold mb-4">
            🎉 {{ invasionSeleccionada.resultado }}
          </h2>
          
          <div class="consecuencias mb-6">
            <h3 class="font-bold mb-2">Consecuencias históricas:</h3>
            <ul class="list-disc list-inside space-y-1">
              <li v-for="cons in invasionSeleccionada.consecuencias" :key="cons">
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

      <!-- Modal personajes -->
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
                </div>
              </div>
            </div>
          </div>

          <div class="modal-action">
            <button @click="showPersonajes = false" class="btn">Cerrar</button>
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

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import { useGameState } from '@/composables/useGameState'
import invasionesData from './invasiones.json'
import personajesData from './personajes.json'

const router = useRouter()
const gameState = useGameState('defensa-buenosaires')
const invasionSeleccionada = ref(null)
const eventoActual = ref(0)
const eventoRespondido = ref(false)
const score = ref(0)
const showPersonajes = ref(false)
const showResultado = ref(false)
const defensasColocadas = ref([])
const enemigos = ref([])
const recursosDisponibles = ref({ milicias: 5, barricadas: 8 })
const invasionesCompletadas = ref([])
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')

const instructions = `
Defiende Buenos Aires de las Invasiones Inglesas (1806-1807).
Responde preguntas históricas para desbloquear recursos y coloca defensas en el mapa.
Aprende sobre los personajes y eventos que marcaron la historia argentina.
`

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

const selectInvasion = (invasion) => {
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
}

const backToSelection = () => {
  invasionSeleccionada.value = null
  showResultado.value = false
}

const colocarDefensa = (tipo) => {
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

const answerEvento = (opcion) => {
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
  invasionesCompletadas.value.push(invasionSeleccionada.value.id)
  gameState.levelUp()
  showResultado.value = true
}

const finishGame = () => {
  gameState.markCompleted()
  router.push('/juegos')
}
</script>

<style scoped>
.mapa-container {
  min-height: 400px;
}
.defensa-icon, .enemigo-icon {
  font-size: 2rem;
  animation: float 2s ease-in-out infinite;
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTA: Crear SVG simple del mapa de Buenos Aires colonial con puntos clave (Fuerte, Plaza Mayor, etc.)
```

---

## PROMPT-CN01: Viaje por la Hidrosfera

```
[YA INCLUIDO ANTERIORMENTE - Ver sección principal del documento]
```

---

## PROMPT-CN02: Ciclo del Agua

```
[YA INCLUIDO ANTERIORMENTE - Ver sección principal del documento]
```

---

## PROMPT-CN03: Detector de Humedad

```
Eres un desarrollador experto en Vue 3. Crea "Detector de Humedad".

CONTEXTO:
- 5to grado, Ciencias Naturales - Unidad 1
- Contenido: Humedad, vapor de agua, formación de nubes
- Objetivo: Comprender humedad atmosférica y estados del agua

MECÁNICA:
1. Simulador meteorológico interactivo
2. Analizar informes del clima reales (simulados)
3. Preguntas sobre humedad, vapor de agua
4. Comparación de climas (CABA, Patagonia, Litoral)
5. Experimento virtual: crear nubes
6. Desafío: "¿Las nubes son vapor?"

ESTRUCTURA:
src/games/detector-humedad/
├── HumedadGame.vue
├── climas.json
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (climas.json):

{
  "informes": [
    {
      "id": "bsas_verano",
      "ciudad": "Buenos Aires",
      "estacion": "Verano",
      "fecha": "15 de enero",
      "temperatura": 32,
      "humedad": 85,
      "sensacion_termica": 38,
      "viento": "NE 15 km/h",
      "presion": 1012,
      "visibilidad": 8,
      "descripcion": "Parcialmente nublado, calor húmedo",
      "preguntas": [
        {
          "texto": "¿Qué significa humedad del 85%?",
          "opciones": [
            {"texto": "El aire tiene 85% de la cantidad máxima de vapor que puede contener", "correcto": true},
            {"texto": "Va a llover 85% del día", "correcto": false},
            {"texto": "La temperatura es 85°C", "correcto": false}
          ],
          "explicacion": "La humedad relativa indica cuánto vapor de agua hay en el aire comparado con el máximo que podría contener a esa temperatura"
        },
        {
          "texto": "¿Por qué la sensación térmica es mayor que la temperatura real?",
          "opciones": [
            {"texto": "La humedad alta dificulta la evaporación del sudor", "correcto": true},
            {"texto": "El termómetro está roto", "correcto": false},
            {"texto": "Hay más sol", "correcto": false}
          ]
        }
      ]
    },
    {
      "id": "patagonia_invierno",
      "ciudad": "Bariloche",
      "estacion": "Invierno",
      "temperatura": -2,
      "humedad": 45,
      "descripcion": "Seco y frío, cielo despejado",
      "preguntas": [
        {
          "texto": "¿Por qué la humedad es baja en Patagonia en invierno?",
          "opciones": [
            {"texto": "El aire frío contiene menos vapor de agua", "correcto": true},
            {"texto": "No hay ríos en Patagonia", "correcto": false},
            {"texto": "La gente usa calefacción", "correcto": false}
          ]
        }
      ]
    },
    {
      "id": "litoral_verano",
      "ciudad": "Iguazú, Misiones",
      "estacion": "Verano",
      "temperatura": 35,
      "humedad": 95,
      "descripcion": "Muy húmedo, sensación de bochorno",
      "preguntas": [
        {
          "texto": "¿Por qué Misiones tiene tanta humedad?",
          "opciones": [
            {"texto": "Clima subtropical con muchos ríos y vegetación", "correcto": true},
            {"texto": "Está cerca del océano", "correcto": false},
            {"texto": "Llueve todos los días", "correcto": false}
          ]
        }
      ]
    }
  ],
  "experimentos": [
    {
      "id": "crear_nubes",
      "titulo": "Experimento: Crear una nube",
      "descripcion": "Simula cómo se forman las nubes cuando el vapor de agua se enfría",
      "pasos": [
        "Llena un frasco con agua caliente (simulación)",
        "Coloca hielo en la tapa del frasco",
        "Observa cómo se forma una nube dentro"
      ],
      "explicacion": "El vapor de agua sube, se enfría al tocar el hielo, y se condensa formando gotitas (nube)"
    }
  ],
  "conceptos": {
    "humedad_relativa": "Porcentaje de vapor de agua en el aire comparado con el máximo que podría contener a esa temperatura",
    "vapor_agua": "Agua en estado gaseoso, invisible al ojo humano",
    "nubes": "Gotitas de agua o cristales de hielo suspendidos en el aire (NO vapor)",
    "condensacion": "Cambio de vapor de agua a líquido cuando se enfría",
    "evaporacion": "Cambio de agua líquida a vapor cuando se calienta"
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (HumedadGame.vue):

<template>
  <GameLayout title="Detector de Humedad" :instructions="instructions">
    <div class="humedad-container max-w-5xl mx-auto">
      
      <div class="game-header flex justify-between items-center mb-6">
        <ScoreBoard :score="score" />
        <button @click="showConceptos = true" class="btn btn-info btn-sm">
          📖 Conceptos clave
        </button>
      </div>

      <div v-if="!informeSeleccionado" class="informes-selection">
        <h2 class="text-2xl font-display font-bold mb-6 text-center">
          Elige un informe meteorológico para analizar
        </h2>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="informe in climasData.informes" :key="informe.id"
               class="informe-card card-edu cursor-pointer hover:scale-105 transition-transform"
               @click="selectInforme(informe)">
            <div class="text-center mb-3">
              <div class="text-5xl mb-2">{{ getClimaIcon(informe) }}</div>
              <h3 class="font-bold">{{ informe.ciudad }}</h3>
              <p class="text-sm text-gray-600">{{ informe.estacion }}</p>
            </div>
            <div class="stats text-sm space-y-1">
              <div class="stat-item">
                <span class="font-semibold">🌡️ {{ informe.temperatura }}°C</span>
              </div>
              <div class="stat-item">
                <span class="font-semibold">💧 {{ informe.humedad }}%</span>
              </div>
            </div>
          </div>
        </div>

        <div class="experiments-section mt-8">
          <h3 class="text-xl font-bold mb-4 text-center">O realiza un experimento</h3>
          <button @click="startExperimento" class="btn btn-secondary btn-block">
            🧪 Crear una nube virtual
          </button>
        </div>
      </div>

      <div v-else class="informe-analisis">
        <button @click="backToSelection" class="btn btn-ghost btn-sm mb-4">← Cambiar informe</button>

        <div class="informe-detalle card-edu mb-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-2xl font-display font-bold">{{ informeSeleccionado.ciudad }}</h2>
              <p class="text-gray-600">{{ informeSeleccionado.fecha }} - {{ informeSeleccionado.estacion }}</p>
            </div>
            <div class="clima-icon text-6xl">{{ getClimaIcon(informeSeleccionado) }}</div>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div class="stat-box p-3 bg-base-200 rounded-lg text-center">
              <div class="text-2xl font-bold text-orange-500">{{ informeSeleccionado.temperatura }}°C</div>
              <div class="text-xs text-gray-600">Temperatura</div>
            </div>
            <div class="stat-box p-3 bg-base-200 rounded-lg text-center">
              <div class="text-2xl font-bold text-blue-500">{{ informeSeleccionado.humedad }}%</div>
              <div class="text-xs text-gray-600">Humedad</div>
            </div>
            <div v-if="informeSeleccionado.sensacion_termica" class="stat-box p-3 bg-base-200 rounded-lg text-center">
              <div class="text-2xl font-bold text-red-500">{{ informeSeleccionado.sensacion_termica }}°C</div>
              <div class="text-xs text-gray-600">Sensación térmica</div>
            </div>
            <div v-if="informeSeleccionado.viento" class="stat-box p-3 bg-base-200 rounded-lg text-center">
              <div class="text-sm font-bold">{{ informeSeleccionado.viento }}</div>
              <div class="text-xs text-gray-600">Viento</div>
            </div>
          </div>

          <div class="descripcion-clima p-3 bg-blue-50 rounded-lg mb-4">
            <p>{{ informeSeleccionado.descripcion }}</p>
          </div>

          <div class="humedad-visual mb-4">
            <h4 class="font-semibold mb-2">Visualización de humedad</h4>
            <div class="humidity-bar-container bg-gray-200 rounded-full h-8 overflow-hidden relative">
              <div class="humidity-bar-fill bg-gradient-to-r from-blue-300 to-blue-600 h-full transition-all duration-1000"
                   :style="{width: informeSeleccionado.humedad + '%'}"></div>
              <span class="absolute inset-0 flex items-center justify-center font-bold text-white">
                {{ informeSeleccionado.humedad }}%
              </span>
            </div>
            <p class="text-xs text-gray-600 mt-1">
              El aire contiene {{ informeSeleccionado.humedad }}% del vapor de agua máximo posible a esta temperatura
            </p>
          </div>
        </div>

        <div v-if="!informeCompletado" class="preguntas-section">
          <div class="pregunta-card card-edu">
            <h3 class="font-bold mb-3">{{ currentPregunta.texto }}</h3>
            <div class="options space-y-2">
              <button v-for="opc in currentPregunta.opciones"
                      :key="opc.texto"
                      @click="answerPregunta(opc)"
                      class="btn btn-outline btn-block text-left justify-start">
                {{ opc.texto }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="informe-completed">
          <div class="success-message p-4 bg-green-50 rounded-lg mb-4">
            <p class="text-green-700 font-semibold text-center">
              ✓ ¡Completaste el análisis de este informe!
            </p>
          </div>

          <div class="comparacion-climas card-edu">
            <h3 class="font-bold mb-3">📊 Compara con otros climas:</h3>
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Ciudad</th>
                  <th>Temperatura</th>
                  <th>Humedad</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="inf in climasData.informes" :key="inf.id"
                    :class="{'bg-green-50': inf.id === informeSeleccionado.id}">
                  <td>{{ inf.ciudad }}</td>
                  <td>{{ inf.temperatura }}°C</td>
                  <td>{{ inf.humedad }}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <button @click="backToSelection" class="btn btn-primary btn-block mt-4">
            Analizar otro informe →
          </button>
        </div>
      </div>

      <!-- Experimento virtual -->
      <div v-if="showExperimento" class="modal modal-open">
        <div class="modal-box max-w-3xl">
          <h2 class="font-display text-2xl font-bold mb-4">
            🧪 {{ experimentoData.titulo }}
          </h2>

          <p class="mb-4">{{ experimentoData.descripcion }}</p>

          <div class="experimento-visual bg-gradient-to-b from-blue-100 to-blue-300 rounded-lg p-6 mb-4">
            <div class="frasco relative h-64 w-48 mx-auto bg-white rounded-lg border-4 border-gray-700">
              <!-- Agua caliente abajo -->
              <div class="agua-caliente absolute bottom-0 w-full h-16 bg-gradient-to-t from-red-300 to-red-100 rounded-b-lg"></div>
              
              <!-- Vapor subiendo (animado) -->
              <div v-if="experimentoStep >= 2" class="vapor absolute bottom-16 w-full h-32">
                <div v-for="i in 5" :key="i" 
                     class="vapor-bubble absolute w-2 h-2 bg-blue-200 rounded-full"
                     :style="{
                       left: Math.random() * 100 + '%',
                       animation: `rise ${2 + Math.random()}s infinite`,
                       animationDelay: Math.random() + 's'
                     }"></div>
              </div>

              <!-- Hielo arriba -->
              <div v-if="experimentoStep >= 1" 
                   class="hielo absolute top-0 w-full h-8 bg-gradient-to-b from-blue-500 to-blue-300 rounded-t-lg flex items-center justify-center text-white text-xs">
                ❄️ HIELO
              </div>

              <!-- Nube formándose -->
              <div v-if="experimentoStep >= 3" 
                   class="nube absolute top-8 w-full h-16 flex items-center justify-center text-4xl opacity-0"
                   :class="{'animate-fade-in': experimentoStep === 3}">
                ☁️
              </div>
            </div>
          </div>

          <div class="pasos space-y-3 mb-4">
            <div v-for="(paso, idx) in experimentoData.pasos" :key="idx"
                 class="paso-item p-3 rounded-lg"
                 :class="experimentoStep >= idx + 1 ? 'bg-green-50 border-green-300 border-2' : 'bg-gray-100'">
              <span class="font-bold">Paso {{ idx + 1 }}:</span> {{ paso }}
              <span v-if="experimentoStep >= idx + 1" class="float-right">✓</span>
            </div>
          </div>

          <button v-if="experimentoStep < 3" @click="nextExperimentoStep" class="btn btn-primary btn-block">
            Siguiente paso →
          </button>

          <div v-else>
            <div class="explicacion p-4 bg-blue-50 rounded-lg mb-4">
              <p class="font-semibold mb-2">💡 ¿Qué pasó?</p>
              <p class="text-sm">{{ experimentoData.explicacion }}</p>
            </div>

            <div class="pregunta-experimento mb-4">
              <p class="font-semibold mb-2">Pregunta:</p>
              <p class="mb-2">¿Las nubes están hechas de vapor de agua?</p>
              <div class="flex gap-2">
                <button @click="answerNubesVapor(true)" class="btn btn-outline flex-1">Sí</button>
                <button @click="answerNubesVapor(false)" class="btn btn-outline flex-1">No</button>
              </div>
            </div>

            <button @click="closeExperimento" class="btn btn-primary btn-block">
              Terminar experimento
            </button>
          </div>
        </div>
      </div>

      <!-- Modal conceptos -->
      <div v-if="showConceptos" class="modal modal-open">
        <div class="modal-box max-w-2xl">
          <h2 class="font-display text-2xl font-bold mb-4">📖 Conceptos Clave</h2>
          
          <div class="conceptos-list space-y-4">
            <div v-for="(definicion, concepto) in climasData.conceptos" :key="concepto"
                 class="concepto-item p-4 bg-base-200 rounded-lg">
              <h4 class="font-bold capitalize">{{ concepto.replace('_', ' ') }}</h4>
              <p class="text-sm">{{ definicion }}</p>
            </div>
          </div>

          <div class="modal-action">
            <button @click="showConceptos = false" class="btn">Cerrar</button>
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

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import { useGameState } from '@/composables/useGameState'
import climasData from './climas.json'

const router = useRouter()
const gameState = useGameState('detector-humedad')
const informeSeleccionado = ref(null)
const preguntaActual = ref(0)
const informeCompletado = ref(false)
const score = ref(0)
const showConceptos = ref(false)
const showExperimento = ref(false)
const experimentoStep = ref(0)
const informesCompletados = ref([])
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')

const instructions = `
Analiza informes meteorológicos reales y aprende sobre humedad atmosférica.
Compara diferentes climas de Argentina y realiza experimentos virtuales.
`

const experimentoData = computed(() => climasData.experimentos[0])

const currentPregunta = computed(() => {
  return informeSeleccionado.value?.preguntas[preguntaActual.value]
})

const getClimaIcon = (informe) => {
  if (informe.humedad > 80) return '☁️'
  if (informe.humedad > 60) return '⛅'
  if (informe.temperatura < 5) return '❄️'
  if (informe.temperatura > 30) return '☀️'
  return '🌤️'
}

const selectInforme = (informe) => {
  informeSeleccionado.value = informe
  preguntaActual.value = 0
  informeCompletado.value = false
}

const backToSelection = () => {
  informeSeleccionado.value = null
}

const answerPregunta = (opcion) => {
  if (opcion.correcto) {
    score.value += 15
    gameState.addScore(15)
    gameState.recordAnswer(true)
    
    feedbackCorrect.value = true
    feedbackMessage.value = currentPregunta.value.explicacion || '¡Correcto!'
    showFeedback.value = true
    
    setTimeout(() => {
      if (preguntaActual.value < informeSeleccionado.value.preguntas.length - 1) {
        preguntaActual.value++
      } else {
        informeCompletado.value = true
        informesCompletados.value.push(informeSeleccionado.value.id)
        
        if (informesCompletados.value.length === climasData.informes.length) {
          gameState.markCompleted()
        }
      }
    }, 2000)
  } else {
    gameState.recordAnswer(false)
    feedbackCorrect.value = false
    feedbackMessage.value = 'Intenta de nuevo. Piensa en qué significa humedad relativa.'
    showFeedback.value = true
  }
}

const startExperimento = () => {
  showExperimento.value = true
  experimentoStep.value = 0
}

const nextExperimentoStep = () => {
  experimentoStep
  .value++
}

const answerNubesVapor = (respuesta) => {
  if (!respuesta) {
    feedbackCorrect.value = true
    feedbackMessage.value = '¡Correcto! Las nubes NO son vapor. Son gotitas de agua líquida o cristales de hielo suspendidos en el aire. El vapor es invisible.'
    score.value += 25
    gameState.addScore(25)
  } else {
    feedbackCorrect.value = false
    feedbackMessage.value = 'Incorrecto. Las nubes están hechas de gotitas de agua líquida (o hielo), NO de vapor. El vapor de agua es invisible.'
  }
  showFeedback.value = true
}

const closeExperimento = () => {
  showExperimento.value = false
  experimentoStep.value = 0
}
</script>

<style scoped>
@keyframes rise {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-100px); opacity: 0; }
}
.animate-fade-in {
  animation: fadeIn 2s forwards;
}
@keyframes fadeIn {
  to { opacity: 1; }
}
.humidity-bar-fill {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

README.md:

# Detector de Humedad

Juego educativo sobre humedad atmosférica y estados del agua.

## Contenido
- Humedad relativa y absoluta
- Comparación de climas argentinos
- Experimento: formación de nubes
- Conceptos: vapor vs. nubes

## Mecánica
Análisis de informes meteorológicos + experimento virtual interactivo

## Uso
Importar en router, agregar a metadata
```

---

## PROMPT-T01: Quiz Rápido Unidad 1

```
Eres un desarrollador experto en Vue 3. Crea "Quiz Rápido Unidad 1".

CONTEXTO:
- Juego transversal que integra todas las materias
- Repaso rápido de conceptos de Unidad 1
- 20 preguntas variadas (Lengua, Matemática, CS, CN)
- 3 modos: Fácil, Medio, Difícil

MECÁNICA:
1. Seleccionar dificultad
2. 20 preguntas aleatorias
3. 30s por pregunta (modo difícil: 20s)
4. Feedback inmediato
5. Ranking de mejores puntajes
6. Podio final

ESTRUCTURA:
src/games/quiz-rapido/
├── QuizGame.vue
├── preguntas.json
└── README.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JSON (preguntas.json):

{
  "preguntas": [
    {
      "id": "L1",
      "materia": "Lengua",
      "dificultad": "facil",
      "pregunta": "¿Qué es un caligrama?",
      "opciones": [
        {"texto": "Un poema con forma visual", "correcto": true},
        {"texto": "Un tipo de narración", "correcto": false},
        {"texto": "Una figura retórica", "correcto": false},
        {"texto": "Un instrumento musical", "correcto": false}
      ],
      "explicacion": "Los caligramas son poemas cuyas palabras forman una figura relacionada con el tema"
    },
    {
      "id": "L2",
      "materia": "Lengua",
      "dificultad": "medio",
      "pregunta": "Identifica el recurso: 'El río canta melodías'",
      "opciones": [
        {"texto": "Personificación", "correcto": true},
        {"texto": "Comparación", "correcto": false},
        {"texto": "Hipérbole", "correcto": false},
        {"texto": "Imagen sensorial", "correcto": false}
      ],
      "explicacion": "Es personificación porque el río (objeto) realiza una acción humana: cantar"
    },
    {
      "id": "L3",
      "materia": "Lengua",
      "dificultad": "facil",
      "pregunta": "La palabra 'corazón' es:",
      "opciones": [
        {"texto": "Aguda", "correcto": true},
        {"texto": "Grave", "correcto": false},
        {"texto": "Esdrújula", "correcto": false}
      ],
      "explicacion": "Es aguda porque la sílaba tónica es la última: co-ra-ZÓN"
    },
    {
      "id": "M1",
      "materia": "Matemática",
      "dificultad": "facil",
      "pregunta": "¿Cómo se lee 3.500.000?",
      "opciones": [
        {"texto": "Tres millones quinientos mil", "correcto": true},
        {"texto": "Tres mil quinientos", "correcto": false},
        {"texto": "Treinta y cinco mil", "correcto": false},
        {"texto": "Trescientos cincuenta mil", "correcto": false}
      ]
    },
    {
      "id": "M2",
      "materia": "Matemática",
      "dificultad": "medio",
      "pregunta": "En el número 4.567.890, ¿qué valor tiene el 5?",
      "opciones": [
        {"texto": "500.000 (quinientos mil)", "correcto": true},
        {"texto": "50.000 (cincuenta mil)", "correcto": false},
        {"texto": "5.000 (cinco mil)", "correcto": false},
        {"texto": "5 (cinco)", "correcto": false}
      ],
      "explicacion": "El 5 está en la posición de las centenas de mil"
    },
    {
      "id": "M3",
      "materia": "Matemática",
      "dificultad": "dificil",
      "pregunta": "Si sumo 100.000 cinco veces a 2.300.000, obtengo:",
      "opciones": [
        {"texto": "2.800.000", "correcto": true},
        {"texto": "2.400.000", "correcto": false},
        {"texto": "3.300.000", "correcto": false},
        {"texto": "2.350.000", "correcto": false}
      ],
      "explicacion": "100.000 x 5 = 500.000, entonces 2.300.000 + 500.000 = 2.800.000"
    },
    {
      "id": "CS1",
      "materia": "Ciencias Sociales",
      "dificultad": "facil",
      "pregunta": "¿En qué año fue la Primera Invasión Inglesa?",
      "opciones": [
        {"texto": "1806", "correcto": true},
        {"texto": "1807", "correcto": false},
        {"texto": "1810", "correcto": false},
        {"texto": "1816", "correcto": false}
      ]
    },
    {
      "id": "CS2",
      "materia": "Ciencias Sociales",
      "dificultad": "medio",
      "pregunta": "¿Quién lideró la Reconquista de Buenos Aires?",
      "opciones": [
        {"texto": "Santiago de Liniers", "correcto": true},
        {"texto": "Manuel Belgrano", "correcto": false},
        {"texto": "José de San Martín", "correcto": false},
        {"texto": "Rafael de Sobremonte", "correcto": false}
      ]
    },
    {
      "id": "CS3",
      "materia": "Ciencias Sociales",
      "dificultad": "dificil",
      "pregunta": "¿Qué consecuencia tuvieron las Invasiones Inglesas?",
      "opciones": [
        {"texto": "Formación de milicias criollas y aumento de confianza", "correcto": true},
        {"texto": "Argentina se independizó inmediatamente", "correcto": false},
        {"texto": "Buenos Aires fue destruida", "correcto": false},
        {"texto": "Llegaron más españoles", "correcto": false}
      ],
      "explicacion": "Las milicias criollas adquirieron poder militar y aumentó el sentimiento de independencia"
    },
    {
      "id": "CN1",
      "materia": "Ciencias Naturales",
      "dificultad": "facil",
      "pregunta": "¿Qué porcentaje de la superficie terrestre es agua?",
      "opciones": [
        {"texto": "Aproximadamente 71%", "correcto": true},
        {"texto": "50%", "correcto": false},
        {"texto": "90%", "correcto": false},
        {"texto": "30%", "correcto": false}
      ]
    },
    {
      "id": "CN2",
      "materia": "Ciencias Naturales",
      "dificultad": "medio",
      "pregunta": "¿Qué es la evaporación?",
      "opciones": [
        {"texto": "Cambio de agua líquida a vapor", "correcto": true},
        {"texto": "Cambio de vapor a agua líquida", "correcto": false},
        {"texto": "Cambio de hielo a agua", "correcto": false},
        {"texto": "Caída de lluvia", "correcto": false}
      ]
    },
    {
      "id": "CN3",
      "materia": "Ciencias Naturales",
      "dificultad": "dificil",
      "pregunta": "¿Las nubes están hechas de vapor de agua?",
      "opciones": [
        {"texto": "No, son gotitas de agua líquida o cristales de hielo", "correcto": true},
        {"texto": "Sí, son vapor de agua puro", "correcto": false},
        {"texto": "Son aire comprimido", "correcto": false},
        {"texto": "Son polvo atmosférico", "correcto": false}
      ],
      "explicacion": "El vapor de agua es invisible. Las nubes son gotitas líquidas suspendidas"
    }
  ]
}

NOTA: Agregar más preguntas hasta completar un pool de 60+ preguntas variadas

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPONENTE (QuizGame.vue):

<template>
  <GameLayout title="Quiz Rápido Unidad 1" :instructions="instructions">
    <div class="quiz-container max-w-4xl mx-auto">

      <div v-if="!quizStarted" class="difficulty-selection">
        <h2 class="text-3xl font-display font-bold text-center mb-8">
          Elige tu dificultad
        </h2>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="nivel in niveles" :key="nivel.id"
               class="difficulty-card card-edu cursor-pointer hover:scale-105 transition-transform"
               :class="'border-4 border-' + nivel.color"
               @click="startQuiz(nivel)">
            <div class="text-6xl text-center mb-4">{{ nivel.icono }}</div>
            <h3 class="text-2xl font-display font-bold text-center mb-2">
              {{ nivel.nombre }}
            </h3>
            <div class="specs text-sm space-y-1">
              <p>⏱️ {{ nivel.tiempoPorPregunta }}s por pregunta</p>
              <p>📊 {{ nivel.totalPreguntas }} preguntas</p>
              <p>⭐ Puntos: {{ nivel.puntosPorRespuesta }}</p>
            </div>
          </div>
        </div>

        <div v-if="mejoresPuntajes.length" class="ranking-preview card-edu mt-8">
          <h3 class="font-bold mb-3 text-center">🏆 Top 3 Puntajes</h3>
          <div class="space-y-2">
            <div v-for="(puntaje, idx) in mejoresPuntajes.slice(0, 3)" :key="idx"
                 class="flex justify-between items-center p-2 bg-base-200 rounded">
              <span class="font-bold">{{ idx + 1 }}. {{ puntaje.fecha }}</span>
              <span class="badge badge-primary">{{ puntaje.puntos }} pts</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!quizCompleted" class="quiz-active">
        <div class="quiz-header flex justify-between items-center mb-6">
          <div class="pregunta-counter">
            <span class="text-2xl font-bold">{{ preguntaActual + 1 }}</span>
            <span class="text-gray-600">/{{ totalPreguntas }}</span>
          </div>

          <div class="timer text-3xl font-bold" 
               :class="timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-edu-primary'">
            ⏱️ {{ timeLeft }}s
          </div>

          <ScoreBoard :score="score" />
        </div>

        <ProgressTracker 
          :current="preguntaActual + 1" 
          :total="totalPreguntas"
          label="Progreso" 
          class="mb-6"
        />

        <div class="pregunta-card card-edu">
          <div class="materia-badge mb-3">
            <span :class="'badge badge-lg badge-' + getMateriaColor(currentPregunta.materia)">
              {{ getMateriaIcon(currentPregunta.materia) }} {{ currentPregunta.materia }}
            </span>
          </div>

          <h3 class="text-2xl font-bold mb-6">{{ currentPregunta.pregunta }}</h3>

          <div class="opciones space-y-3">
            <button v-for="(opc, idx) in currentPregunta.opciones"
                    :key="idx"
                    @click="selectOpcion(opc)"
                    :disabled="opcionSeleccionada !== null"
                    class="opcion-btn"
                    :class="{
                      'selected-correct': opcionSeleccionada === opc && opc.correcto,
                      'selected-incorrect': opcionSeleccionada === opc && !opc.correcto,
                      'show-correct': opcionSeleccionada !== null && opc.correcto
                    }">
              <span class="opcion-letter">{{ String.fromCharCode(65 + idx) }}</span>
              <span class="opcion-text">{{ opc.texto }}</span>
              <span v-if="opcionSeleccionada === opc" class="opcion-icon">
                {{ opc.correcto ? '✓' : '✗' }}
              </span>
            </button>
          </div>

          <div v-if="showExplicacion" class="explicacion mt-4 p-4 bg-blue-50 rounded-lg">
            <p class="text-sm">💡 {{ currentPregunta.explicacion }}</p>
          </div>
        </div>
      </div>

      <div v-else class="quiz-completed">
        <div class="podio-container card-edu text-center">
          <div class="podio-icon text-8xl mb-4">{{ getPodioIcon() }}</div>
          
          <h2 class="text-3xl font-display font-bold mb-2">
            {{ getPodioTitle() }}
          </h2>

          <div class="stats-grid grid grid-cols-2 gap-4 my-6">
            <div class="stat-box p-4 bg-base-200 rounded-lg">
              <div class="text-3xl font-bold text-primary">{{ score }}</div>
              <div class="text-sm text-gray-600">Puntos totales</div>
            </div>
            <div class="stat-box p-4 bg-base-200 rounded-lg">
              <div class="text-3xl font-bold text-success">{{ respuestasCorrectas }}</div>
              <div class="text-sm text-gray-600">Respuestas correctas</div>
            </div>
            <div class="stat-box p-4 bg-base-200 rounded-lg">
              <div class="text-3xl font-bold text-warning">{{ accuracy }}%</div>
              <div class="text-sm text-gray-600">Precisión</div>
            </div>
            <div class="stat-box p-4 bg-base-200 rounded-lg">
              <div class="text-3xl font-bold text-info">{{ tiempoTotal }}s</div>
              <div class="text-sm text-gray-600">Tiempo total</div>
            </div>
          </div>

          <div class="resultados-por-materia mb-6">
            <h3 class="font-bold mb-3">Resultados por materia:</h3>
            <div class="grid grid-cols-2 gap-3">
              <div v-for="(resultado, materia) in resultadosPorMateria" :key="materia"
                   class="p-3 bg-base-200 rounded-lg">
                <div class="font-semibold">{{ getMateriaIcon(materia) }} {{ materia }}</div>
                <div class="text-sm">{{ resultado.correctas }}/{{ resultado.total }}</div>
              </div>
            </div>
          </div>

          <div class="actions space-y-3">
            <button @click="reiniciarQuiz" class="btn btn-primary btn-block">
              🔄 Jugar de nuevo
            </button>
            <button @click="volverMenu" class="btn btn-outline btn-block">
              🏠 Volver al menú
            </button>
          </div>
        </div>

        <div v-if="esNuevoRecord" class="nuevo-record-banner mt-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg text-center animate-bounce">
          <p class="text-2xl font-bold text-white">🎉 ¡NUEVO RÉCORD! 🎉</p>
        </div>
      </div>
    </div>

    <FeedbackModal 
      v-if="showFeedback"
      :show="showFeedback"
      :isCorrect="feedbackCorrect"
      :message="feedbackMessage"
      @close="handleFeedbackClose"
    />
  </GameLayout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import GameLayout from '@/components/GameLayout.vue'
import ScoreBoard from '@/components/ScoreBoard.vue'
import ProgressTracker from '@/components/ProgressTracker.vue'
import FeedbackModal from '@/components/FeedbackModal.vue'
import { useGameState } from '@/composables/useGameState'
import { useLocalStorage } from '@/composables/useLocalStorage'
import preguntasData from './preguntas.json'

const router = useRouter()
const gameState = useGameState('quiz-rapido')
const { save, load } = useLocalStorage()

const quizStarted = ref(false)
const quizCompleted = ref(false)
const nivelSeleccionado = ref(null)
const preguntasSeleccionadas = ref([])
const preguntaActual = ref(0)
const timeLeft = ref(30)
const opcionSeleccionada = ref(null)
const showExplicacion = ref(false)
const score = ref(0)
const respuestasCorrectas = ref(0)
const respuestasPorMateria = ref({})
const tiempoInicio = ref(null)
const tiempoTotal = ref(0)
let timerInterval = null
const showFeedback = ref(false)
const feedbackCorrect = ref(false)
const feedbackMessage = ref('')
const mejoresPuntajes = ref([])
const esNuevoRecord = ref(false)

const niveles = [
  {
    id: 'facil',
    nombre: 'Fácil',
    icono: '🟢',
    color: 'success',
    tiempoPorPregunta: 30,
    totalPreguntas: 20,
    puntosPorRespuesta: 10,
    filtro: ['facil']
  },
  {
    id: 'medio',
    nombre: 'Medio',
    icono: '🟡',
    color: 'warning',
    tiempoPorPregunta: 25,
    totalPreguntas: 20,
    puntosPorRespuesta: 15,
    filtro: ['facil', 'medio']
  },
  {
    id: 'dificil',
    nombre: 'Difícil',
    icono: '🔴',
    color: 'error',
    tiempoPorPregunta: 20,
    totalPreguntas: 20,
    puntosPorRespuesta: 20,
    filtro: ['facil', 'medio', 'dificil']
  }
]

const instructions = `
Responde 20 preguntas de todas las materias de Unidad 1.
¡Tienes tiempo limitado por pregunta!
Elige tu dificultad y ve cuántos puntos logras.
`

const currentPregunta = computed(() => preguntasSeleccionadas.value[preguntaActual.value])
const totalPreguntas = computed(() => preguntasSeleccionadas.value.length)
const accuracy = computed(() => Math.round((respuestasCorrectas.value / totalPreguntas.value) * 100))

const resultadosPorMateria = computed(() => {
  const resultado = {}
  preguntasSeleccionadas.value.forEach(p => {
    if (!resultado[p.materia]) {
      resultado[p.materia] = { total: 0, correctas: 0 }
    }
    resultado[p.materia].total++
  })
  
  Object.keys(respuestasPorMateria.value).forEach(materia => {
    if (resultado[materia]) {
      resultado[materia].correctas = respuestasPorMateria.value[materia]
    }
  })
  
  return resultado
})

const startQuiz = (nivel) => {
  nivelSeleccionado.value = nivel
  
  // Filtrar preguntas por dificultad
  const preguntasFiltradas = preguntasData.preguntas.filter(p => 
    nivel.filtro.includes(p.dificultad)
  )
  
  // Seleccionar 20 aleatorias
  preguntasSeleccionadas.value = preguntasFiltradas
    .sort(() => Math.random() - 0.5)
    .slice(0, nivel.totalPreguntas)
  
  quizStarted.value = true
  preguntaActual.value = 0
  score.value = 0
  respuestasCorrectas.value = 0
  respuestasPorMateria.value = {}
  tiempoInicio.value = Date.now()
  
  gameState.loadState()
  gameState.startGame()
  
  startTimer()
}

const startTimer = () => {
  timeLeft.value = nivelSeleccionado.value.tiempoPorPregunta
  
  if (timerInterval) clearInterval(timerInterval)
  
  timerInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      timeOut()
    }
  }, 1000)
}

const selectOpcion = (opc) => {
  if (opcionSeleccionada.value) return
  
  opcionSeleccionada.value = opc
  clearInterval(timerInterval)
  
  if (opc.correcto) {
    respuestasCorrectas.value++
    const materia = currentPregunta.value.materia
    respuestasPorMateria.value[materia] = (respuestasPorMateria.value[materia] || 0) + 1
    
    // Bonus por tiempo restante
    const bonus = timeLeft.value > 15 ? 5 : 0
    const puntos = nivelSeleccionado.value.puntosPorRespuesta + bonus
    score.value += puntos
    gameState.addScore(puntos)
    gameState.recordAnswer(true)
    
    feedbackCorrect.value = true
    feedbackMessage.value = currentPregunta.value.explicacion || '¡Correcto!'
  } else {
    gameState.recordAnswer(false)
    feedbackCorrect.value = false
    feedbackMessage.value = currentPregunta.value.explicacion || 'Incorrecto. La respuesta correcta se muestra en verde.'
  }
  
  showExplicacion.value = !!currentPregunta.value.explicacion
  showFeedback.value = true
}

const timeOut = () => {
  clearInterval(timerInterval)
  feedbackCorrect.value = false
  feedbackMessage.value = '⏰ ¡Se acabó el tiempo!'
  showFeedback.value = true
  
  // Mostrar respuesta correcta
  setTimeout(() => {
    opcionSeleccionada.value = { correcto: false }
  }, 100)
}

const handleFeedbackClose = () => {
  showFeedback.value = false
  
  setTimeout(() => {
    if (preguntaActual.value < totalPreguntas.value - 1) {
      nextPregunta()
    } else {
      finishQuiz()
    }
  }, 500)
}

const nextPregunta = () => {
  preguntaActual.value++
  opcionSeleccionada.value = null
  showExplicacion.value = false
  startTimer()
}

const finishQuiz = () => {
  clearInterval(timerInterval)
  tiempoTotal.value = Math.floor((Date.now() - tiempoInicio.value) / 1000)
  quizCompleted.value = true
  gameState.markCompleted()
  
  // Guardar puntaje
  const puntajeActual = {
    puntos: score.value,
    fecha: new Date().toLocaleDateString(),
    nivel: nivelSeleccionado.value.nombre,
    accuracy: accuracy.value
  }
  
  mejoresPuntajes.value.push(puntajeActual)
  mejoresPuntajes.value.sort((a, b) => b.puntos - a.puntos)
  mejoresPuntajes.value = mejoresPuntajes.value.slice(0, 10)
  
  save('quiz_mejores_puntajes', mejoresPuntajes.value)
  
  // Verificar si es nuevo récord
  esNuevoRecord.value = mejoresPuntajes.value[0].puntos === score.value
}

const getPodioIcon = () => {
  if (accuracy.value >= 90) return '🥇'
  if (accuracy.value >= 75) return '🥈'
  if (accuracy.value >= 60) return '🥉'
  return '🎯'
}

const getPodioTitle = () => {
  if (accuracy.value >= 90) return '¡Excelente! Oro'
  if (accuracy.value >= 75) return '¡Muy bien! Plata'
  if (accuracy.value >= 60) return '¡Bien hecho! Bronce'
  return '¡Sigue practicando!'
}

const getMateriaIcon = (materia) => {
  const icons = {
    'Lengua': '📖',
    'Matemática': '🔢',
    'Ciencias Sociales': '🌎',
    'Ciencias Naturales': '🔬'
  }
  return icons[materia] || '📚'
}

const getMateriaColor = (materia) => {
  const colors = {
    'Lengua': 'primary',
    'Matemática': 'secondary',
    'Ciencias Sociales': 'accent',
    'Ciencias Naturales': 'success'
  }
  return colors[materia] || 'neutral'
}

const reiniciarQuiz = () => {
  quizStarted.value = false
  quizCompleted.value = false
  esNuevoRecord.value = false
}

const volverMenu = () => {
  router.push('/juegos')
}

onMounted(() => {
  const saved = load('quiz_mejores_puntajes')
  if (saved) {
    mejoresPuntajes.value = saved
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
.opcion-btn {
  @apply w-full flex items-center gap-4 p-4 rounded-lg border-2 border-gray-300 
         hover:border-primary hover:bg-primary hover:bg-opacity-10 
         transition-all text-left;
}
.opcion-btn:disabled {
  @apply cursor-not-allowed;
}
.opcion-letter {
  @apply w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold flex-shrink-0;
}
.opcion-text {
  @apply flex-1;
}
.opcion-icon {
  @apply text-2xl flex-shrink-0;
}
.selected-correct {
  @apply border-success bg-success bg-opacity-20;
}
.selected-incorrect {
  @apply border-error bg-error bg-opacity-20;
}
.show-correct {
  @apply border-success bg-success bg-opacity-10;
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

README.md:

# Quiz Rápido Unidad 1

Quiz transversal de repaso con todas las materias.

## Características
- 3 niveles de dificultad
- 20 preguntas aleatorias
- Timer por pregunta
- Ranking de puntajes
- Estadísticas por materia

## Uso
Juego independiente, importar en router
```

---

## PROMPT-INT01: Sistema de Monetización

```
Eres un desarrollador experto en Vue 3. Crea el sistema de monetización con monedas virtuales.

CONTEXTO:
- Economía virtual del juego
- Monedas: "Estrellas de Aprendizaje" ⭐
- Ganar monedas jugando
- Tienda virtual con recompensas
- Avatares personalizables

ESTRUCTURA:
src/
├── store/
│   └── economyStore.js
├── components/
│   ├── CurrencyDisplay.vue
│   ├── ShopModal.vue
│   └── AvatarCustomizer.vue
└── views/
    └── TiendaView.vue

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO: src/store/economyStore.js

import { reactive } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'

const { save, load } = useLocalStorage()

const STORAGE_KEY = 'economia_usuario'

const defaultState = {
  estrellas: 0,
  estrellasGanadasTotal: 0,
  comprasRealizadas: [],
  avatarActual: {
    cabeza: 'default',
    cuerpo: 'default',
    accesorio: null,
    fondo: 'default'
  },
  itemsDesbloqueados: ['default']
}

const state = reactive({ ...defaultState })

// Cargar estado al iniciar
const loadState = () => {
  const saved = load(STORAGE_KEY)
  if (saved) {
    Object.assign(state, saved)
  }
}

const saveState = () => {
  save(STORAGE_KEY, state)
}

// Ganar estrellas (llamar desde juegos)
export const ganarEstrellas = (cantidad) => {
  state.estrellas += cantidad
  state.estrellasGanadasTotal += cantidad
  saveState()
}

// Gastar estrellas
export const gastarEstrellas = (cantidad) => {
  if (state.estrellas >= cantidad) {
    state.estrellas -= cantidad
    saveState()
    return true
  }
  return false
}

// Comprar item
export const comprarItem = (item) => {
  if (gastarEstrellas(item.precio)) {
    state.comprasRealizadas.push({
      itemId: item.id,
      fecha: new Date().toISOString()
    })
    state.itemsDesbloqueados.push(item.id)
    saveState()
    return true
  }
  return false
}

// Actualizar avatar
export const actualizarAvatar = (parte, itemId) => {
  if (state.itemsDesbloqueados.includes(itemId)) {
    state.avatarActual[parte] = itemId
    saveState()
    return true
  }
  return false
}

// Verificar si item está desbloqueado
export const estaDesbloqueado = (itemId) => {
  return state.itemsDesbloqueados.includes(itemId)
}

// Obtener estado
export const getEconomyState = () => state

// Inicializar
loadState()

export default {
  state,
  ganarEstrellas,
  gastarEstrellas,
  comprarItem,
  actualizarAvatar,
  estaDesbloqueado,
  getEconomyState
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO: src/components/CurrencyDisplay.vue

<template>
  <div class="currency-display inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full shadow-lg">
    <span class="text-2xl">⭐</span>
    <span class="text-xl font-bold text-white">{{ estrellas }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getEconomyState } from '@/store/economyStore'

const economyState = getEconomyState()
const estrellas = computed(() => economyState.estrellas)
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO: src/assets/data/tienda-items.json

{
  "categorias": [
    {
      "id": "cabezas",
      "nombre": "Cabezas",
      "items": [
        {
          "id": "cabeza_astronauta",
          "nombre": "Astronauta",
          "precio": 50,
          "icono": "🚀",
          "descripcion": "Explora el espacio del conocimiento"
        },
        {
          "id": "cabeza_pirata",
          "nombre": "Pirata",
          "precio": 40,
          "icono": "🏴‍☠️"
        },
        {
          "id": "cabeza_mago",
          "nombre": "Mago",
          "precio": 60,
          "icono": "🧙"
        }
      ]
    },
    {
      "id": "accesorios",
      "nombre": "Accesorios",
      "items": [
        {
          "id": "acc_gafas",
          "nombre": "Gafas de Estudio",
          "precio": 30,
          "icono": "👓"
        },
        {
          "id": "acc_corona",
          "nombre": "Corona del Saber",
          "precio": 100,
          "icono": "👑",
          "especial": true
        }
      ]
    },
    {
      "id": "fondos",
      "nombre": "Fondos",
      "items": [
        {
          "id": "fondo_espacio",
          "nombre": "Espacio",
          "precio": 70,
          "preview": "/assets/fondos/espacio.svg"
        },
        {
          "id": "fondo_biblioteca",
          "nombre": "Biblioteca",
          "precio": 50,
          "preview": "/assets/fondos/biblioteca.svg"
        }
      ]
    }
  ],
  "ofertas_especiales": [
    {
      "id": "pack_estudiante",
      "nombre": "Pack Estudiante Completo",
      "items": ["cabeza_graduado", "acc_gafas", "fondo_aula"],
      "precio_normal": 150,
      "precio_oferta": 100,
      "descuento": 33
    }
  ]
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ARCHIVO: src/views/TiendaView.vue

<template>
  <div class="tienda-view min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-6">
    <div class="container mx-auto max-w-6xl">
      
      <div class="header flex justify-between items-center mb-8">
        <h1 class="text-4xl font-display font-bold">🛍️ Tienda</h1>
        <CurrencyDisplay />
      </div>

      <div class="avatar-preview card-edu mb-8 p-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Tu Avatar</h2>
        <div class="avatar-display flex justify-center">
          <div class="avatar-container relative w-64 h-64 rounded-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
            <span class="text-8xl">{{ getAvatarEmoji() }}</span>
            <button @click="showCustomizer = true" class="absolute bottom-0 right-0 btn btn-circle btn-primary">
              ✏️
            </button>
          </div>
        </div>
      </div>

      <div class="categorias">
        <div v-for="categoria in tiendaData.categorias" :key="categoria.id" class="categoria-section mb-8">
          <h3 class="text-2xl font-bold mb-4">{{ categoria.nombre }}</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="item in categoria.items" :key="item.id"
                 class="item-card card-edu cursor-pointer"
                 :class="{'opacity-50': !puedeComprar(item)}"
                 @click="comprarItem(item)">
              
              <div class="item-icon text-6xl text-center mb-2">
                {{ item.icono || '🎁' }}
              </div>
              
              <h4 class="font-bold text-center mb-2">{{ item.nombre }}</h4>
              
              <div class="item-precio text-center">
                <span v-if="!estaDesbloqueado(item.id)" class="flex items-center justify-center gap-1">
                  <span class="text-xl font-bold">{{ item.precio }}</span>
                  <span class="text-lg">⭐</span>
                </span>
                <span v-else class="badge badge-success">Desbloqueado ✓</span>
              </div>

              <div v-if="item.especial" class="badge badge-secondary w-full mt-2">
                ⭐ Especial
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="tiendaData.ofertas_especiales" class="ofertas-section card-edu p-6 mt-8">
        <h3 class="text-2xl font-bold mb-4">🎉 Ofertas Especiales</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div v-for="oferta in tiendaData.ofertas_especiales" :key="oferta.id"
               class="oferta-card p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
            <h4 class="font-bold text-lg mb-2">{{ oferta.nombre }}</h4>
            <p class="text-sm text-gray-600 mb-3">
              Incluye: {{ oferta.items.join(', ') }}
            </p>
            <div class="flex items-center justify-between">
              <div>
                <span class="line-through text-gray-500">{{ oferta.precio_normal }} ⭐</span>
                <span class="text-2xl font-bold text-green-600 ml-2">{{ oferta.precio_oferta }} ⭐</span>
                <span class="badge badge-error ml-2">-{{ oferta.descuento }}%</span>
              </div>
              <button @click="comprarPack(oferta)" class="btn btn-primary btn-sm">
                Comprar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal customizador -->
      <div v-if="showCustomizer" class="modal modal-open">
        <div class="modal-box max-w-4xl">
          <h3 class="font-display text-2xl font-bold mb-4">Personaliza tu Avatar</h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div class="avatar-preview-large">
              <div class="w-full h-64 rounded-lg bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                <span class="text-9xl">{{ getAvatarEmoji() }}</span>
              </div>
            </div>

            <div class="customizer-options space-y-4">
              <div v-for="categoria in tiendaData.categorias" :key="categoria.id">
                <h4 class="font-semibold mb-2">{{ categoria.nombre }}</h4>
                <div class="flex flex-wrap gap-2">
                  <button v-for="item in categoria.items.filter(i => estaDesbloqueado(i.id))"
                          :key="item.id"
                          @click="aplicarItem(categoria.id, item.id)"
                          class="btn btn-sm"
                          :class="avatarActual[categoria.id] === item.id ? 'btn-primary' : 'btn-outline'">
                    {{ item.icono || item.nombre }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-action">
            <button @click="showCustomizer = false" class="btn btn-primary">
              Guardar y cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CurrencyDisplay from '@/components/CurrencyDisplay.vue'
import { getEconomyState, comprarItem as comprarItemStore, estaDesbloqueado as itemDesbloqueado, actualizarAvatar } from '@/store/economyStore'
import tiendaData from '@/assets/data/tienda-items.json'

const economyState = getEconomyState()
const showCustomizer = ref(false)

const avatarActual = computed(() => economyState.avatarActual)

const puedeComprar = (item) => {
  return economyState.estrellas >= item.precio && !itemDesbloqueado(item.id)
}

const estaDesbloqueado = (itemId) => {
  return itemDesbloqueado(itemId)
}

const comprarItem = (item) => {
  if (puedeComprar(item)) {
    if (comprarItemStore(item)) {
      alert(`¡Compraste ${item.nombre}! 🎉`)
    }
  } else if (itemDesbloqueado(item.id)) {
    alert('Ya tienes este item')
  } else {
    alert(`Necesitas ${item.precio - economyState.estrellas} estrellas más`)
  }
}

const aplicarItem = (categoria, itemId) => {
  actualizarAvatar(categoria, itemId)
}

const getAvatarEmoji = () => {
  // Lógica simplificada - en producción usar las partes del avatar
  return '😊'
}
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INTEGRACIÓN EN JUEGOS:
En cada juego, importar y usar:

import { ganarEstrellas } from '@/store/economyStore'

// Al completar nivel/juego:
ganarEstrellas(puntos / 10) // 1 estrella cada 10 puntos, ajustar según balance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VALIDACIÓN:
✓ Monedas se guardan persistentemente
✓ Compras funcionan correctamente
✓ Avatar se puede personalizar
✓ Tienda muestra items desbloqueados
✓ Ofertas especiales
```

---

## PROMPT-INT02: PWA y Modo Offline

```
Eres un desarrollador experto en Vue 3. Convierte la app en PWA con modo offline.

OBJETIVO:
- App instalable en dispositivos
- Funciona sin internet (contenido cacheado)
- Sincronización cuando hay conexión
- Notificaciones push (opcional futuro)

PASOS:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 1: Instalar Vite Plugin PWA

npm install -D vite-plugin-pwa

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 2: Configurar vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Yo Amo Aprender Digital',
        short_name: 'YoAmoAprender',
        description: 'Plataforma educativa interactiva para 5to grado',
        theme_color: '#4F46E5',
        background_color: '#FFFFFF',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: '/icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ],
        categories: ['education', 'kids'],
        lang: 'es-AR'
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 días
              }
            }
          },
          {
            urlPattern: /\.(?:js|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources'
            }
          }
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/]
      }
    })
  ]
})

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 3: Crear iconos PWA

Generar iconos en /public/icons/ usando una herramienta como:
- https://realfavicongenerator.net/
- O manualmente con imagen base de 512x512

Tamaños necesarios: 72, 96, 128, 144, 152, 192, 384, 512

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 4: Componente de instalación PWA

src/components/InstallPWA.vue:

<template>
  <div v-if="showInstallPrompt" class="install-pwa-banner fixed bottom-0 left-0 right-0 bg-gradient-to-r from-edu-primary to-edu-secondary p-4 shadow-lg z-50">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white">
        <p class="font-bold">📱 Instala la app</p>
        <p class="text-sm">Accede más rápido y juega sin conexión</p>
      </div>
      <div class="flex gap-2">
        <button @click="install" class="btn btn-sm bg-white text-edu-primary hover:bg-gray-100">
          Instalar
        </button>
        <button @click="dismiss" class="btn btn-sm btn-ghost text-white">
          Ahora no
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
let deferredPrompt = null

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    
    // Verificar si ya fue rechazado antes
    const dismissed = localStorage.getItem('pwa_install_dismissed')
    if (!dismissed) {
      showInstallPrompt.value = true
    }
  })

  window.addEventListener('appinstalled', () => {
    console.log('PWA instalada correctamente')
    showInstallPrompt.value = false
    deferredPrompt = null
  })
})

const install = async () => {
  if (!deferredPrompt) return
  
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  
  console.log(`Usuario ${outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`)
  
  deferredPrompt = null
  showInstallPrompt.value = false
}

const dismiss = () => {
  showInstallPrompt.value = false
  localStorage.setItem('pwa_install_dismissed', Date.now())
  
  // Volver a mostrar después de 7 días
  setTimeout(() => {
    localStorage.removeItem('pwa_install_dismissed')
  }, 7 * 24 * 60 * 60 * 1000)
}
</script>

<style scoped>
.install-pwa-banner {
  animation: slideUp 0.3s ease-out;
}
@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 5: Detector de conectividad

src/composables/useOnlineStatus.js:

import { ref, onMounted, onUnmounted } from 'vue'

export function useOnlineStatus() {
  const isOnline = ref(navigator.onLine)

  const updateOnlineStatus = () => {
    isOnline.value = navigator.onLine
  }

  onMounted(() => {
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  })

  return { isOnline }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 6: Indicador de estado offline

src/components/OfflineIndicator.vue:

<template>
  <div v-if="!isOnline" class="offline-banner fixed top-0 left-0 right-0 bg-warning text-warning-content p-2 text-center z-50">
    <span class="text-sm font-semibold">📡 Sin conexión - Modo offline activado</span>
  </div>
</template>

<script setup>
import { useOnlineStatus } from '@/composables/useOnlineStatus'

const { isOnline } = useOnlineStatus()
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 7: Integrar en App.vue

<template>
  <div id="app">
    <OfflineIndicator />
    <router-view />
    <InstallPWA />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import OfflineIndicator from '@/components/OfflineIndicator.vue'
import InstallPWA from '@/components/InstallPWA.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// Registrar Service Worker
const { needRefresh, updateServiceWorker } = useRegisterSW({
  onRegistered(r) {
    console.log('SW Registered:', r)
  },
  onRegisterError(error) {
    console.log('SW registration error', error)
  }
})

onMounted(() => {
  // Auto-actualizar cuando hay nueva versión
  if (needRefresh.value) {
    updateServiceWorker(true)
  }
})
</script>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 8: Configurar meta tags en index.html

<!DOCTYPE html>
<html lang="es-AR">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
  
  <!-- PWA Meta Tags -->
  <meta name="description" content="Plataforma educativa interactiva para 5to grado" />
  <meta name="theme-color" content="#4F46E5" />
  <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <meta name="apple-mobile-web-app-title" content="YoAmoAprender" />
  
  <title>Yo Amo Aprender Digital</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PASO 9: Estrategia de datos offline

src/composables/useOfflineData.js:

import { ref } from 'vue'
import { useOnlineStatus } from './useOnlineStatus'
import { useLocalStorage } from './useLocalStorage'

export function useOfflineData() {
  const { isOnline } = useOnlineStatus()
  const { save, load } = useLocalStorage()
  const pendingSyncs = ref([])

  // Guardar acción para sincronizar cuando haya conexión
  const queueSync = (action) => {
    const syncs = load('pending_syncs') || []
    syncs.push({
      ...action,
      timestamp: Date.now()
    })
    save('pending_syncs', syncs)
    pendingSyncs.value = syncs
  }

  // Sincronizar cuando hay conexión
  const syncPendingActions = async () => {
    if (!isOnline.value) return

    const syncs = load('pending_syncs') || []
    if (syncs.length === 0) return

    console.log(`Sincronizando ${syncs.length} acciones pendientes...`)

    // Aquí iría la lógica de sincronización con servidor si existiera
    // Por ahora solo limpiamos la cola
    save('pending_syncs', [])
    pendingSyncs.value = []
  }

  return {
    isOnline,
    queueSync,
    syncPendingActions,
    pendingSyncs
  }
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VALIDACIÓN:

1. Build de producción:
npm run build

2. Preview PWA:
npm run preview

3. Probar instalación:
- Abrir Chrome DevTools
- Application > Manifest
- Verificar manifest.json
- Service Workers debe estar registrado

4. Probar offline:
- DevTools > Network > Offline
- Navegar por la app
- Verificar que funciona sin conexión

5. Lighthouse audit:
- Debe pasar PWA criteria
- Performance > 90
- Accessibility > 90

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MEJORAS FUTURAS:
- Background sync para guardar progreso offline
- Push notifications para recordatorios de estudio
- Share API para compartir logros
- Shortcuts API para acceso rápido a juegos favoritos
```

---

## 🎉 FIN DEL DOCUMENTO DE PROMPTS

**RESUMEN COMPLETO:**

### Juegos implementados:
- ✅ L01: Cazador de Caligramas
- ✅ L02: Detectivismo Poético
- ✅ L03: Laboratorio de Acentuación
- ✅ L04: Portal Mágico Oz y Narnia
- ✅ L05: Aventura en Misiones
- ✅ M01: Autopista Numérica
- ✅ M02: Transformador de Calculadora
- ✅ CS01: Línea del Tiempo Interactiva
- ✅ CS02: Defensa de Buenos Aires
- ✅ CN01: Viaje por la Hidrosfera
- ✅ CN02: Ciclo del Agua
- ✅ CN03: Detector de Humedad
- ✅ T01: Quiz Rápido Unidad 1

### Sistemas base:
- ✅ Setup inicial (PROMPT-000)
- ✅ Composables core (PROMPT-001)
- ✅ Componentes UI (PROMPT-002)

### Integraciones:
- ✅ Sistema de monetización (INT01)
- ✅ PWA y modo offline (INT02)

**Total: 18 prompts completos listos para usar** 📚✨