# Ejemplos de Integración - Answer Shuffler

## 📚 Tabla de Contenidos

1. [Uso Básico con Composable](#1-uso-básico-con-composable)
2. [Integración en Portal Mágico](#2-integración-en-portal-mágico)
3. [Integración en Quiz Rápido](#3-integración-en-quiz-rápido)
4. [Batch Processing](#4-batch-processing)
5. [Validación y Error Handling](#5-validación-y-error-handling)
6. [Casos Especiales](#6-casos-especiales)

---

## 1. Uso Básico con Composable

### Ejemplo Simple en Vue Component

```vue
<script setup>
import { ref } from 'vue'
import { useShuffledQuestion } from '@/composables/useShuffledQuestion'

// Inicializar composable
const { 
  shuffledQuestion, 
  loadQuestion, 
  isCorrect,
  wasShuffled,
  isValid 
} = useShuffledQuestion({
  shuffleOnLoad: true,
  validateFormat: true,
  autoDetectExceptions: true
})

// Pregunta ejemplo
const currentQuestion = ref({
  id: 'L1',
  pregunta: '¿Qué es un caligrama?',
  opciones: [
    { texto: 'Un poema con forma visual', correcto: true },
    { texto: 'Un tipo de narración', correcto: false },
    { texto: 'Una figura retórica', correcto: false },
    { texto: 'Un instrumento musical', correcto: false }
  ],
  explicacion: 'Los caligramas son poemas cuyas palabras forman una figura'
})

// Cargar pregunta (se mezcla automáticamente)
loadQuestion(currentQuestion.value)

// Manejar respuesta
const handleAnswer = (opcion) => {
  if (isCorrect(opcion)) {
    console.log('¡Correcto! ✅')
    score.value += 10
  } else {
    console.log('Incorrecto ❌')
  }
}
</script>

<template>
  <div class="question-container">
    <h2>{{ shuffledQuestion?.pregunta }}</h2>
    
    <div v-if="!isValid" class="error">
      ⚠️ Pregunta inválida
    </div>
    
    <div class="options">
      <button 
        v-for="(opcion, index) in shuffledQuestion?.opciones"
        :key="index"
        @click="handleAnswer(opcion)"
        class="option-btn"
      >
        {{ opcion.texto }}
      </button>
    </div>
    
    <div v-if="wasShuffled" class="info">
      🔀 Opciones mezcladas
    </div>
  </div>
</template>
```

---

## 2. Integración en Portal Mágico

### Modificación en PortalGame.vue

```vue
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useShuffledQuestion } from '@/composables/useShuffledQuestion'
import mundosData from './mundos.json'

// ... código existente ...

// Agregar composable para shuffle
const { 
  shuffledQuestion, 
  loadQuestion, 
  isCorrect 
} = useShuffledQuestion({
  shuffleOnLoad: true,
  autoDetectExceptions: true  // Detecta automáticamente "emparejamiento"
})

// Computed para escena actual con opciones mezcladas
const currentScene = computed(() => {
  if (!mundoSeleccionado.value) return null
  
  const scene = mundoSeleccionado.value.escenas[currentSceneIndex.value]
  
  // Si la pregunta tiene opciones, mezclarlas
  if (scene?.pregunta?.opciones) {
    loadQuestion(scene.pregunta)
    
    return {
      ...scene,
      pregunta: shuffledQuestion.value
    }
  }
  
  return scene
})

// Verificar respuesta usando el composable
const handleAnswer = (opcion: Opcion) => {
  if (sceneAnswered.value) return
  
  const correct = isCorrect(opcion)
  
  if (correct) {
    score.value += 10
    feedbackMessage.value = currentScene.value?.pregunta?.explicacion || '¡Correcto!'
    feedbackCorrect.value = true
  } else {
    feedbackMessage.value = '¡Intenta de nuevo!'
    feedbackCorrect.value = false
  }
  
  showFeedback.value = true
  sceneAnswered.value = true
}
</script>

<template>
  <!-- Usar currentScene en lugar de escena directa -->
  <div v-if="currentScene" class="scene">
    <h2>{{ currentScene.titulo }}</h2>
    <p>{{ currentScene.descripcion }}</p>
    
    <!-- Pregunta con opciones mezcladas -->
    <div v-if="currentScene.pregunta?.opciones" class="question">
      <p>{{ currentScene.pregunta.texto }}</p>
      
      <div class="options">
        <button
          v-for="(opcion, index) in currentScene.pregunta.opciones"
          :key="index"
          @click="handleAnswer(opcion)"
          :disabled="sceneAnswered"
        >
          {{ opcion.texto }}
        </button>
      </div>
    </div>
  </div>
</template>
```

---

## 3. Integración en Quiz Rápido

### Componente QuizRapido.vue

```vue
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useShuffledQuestion } from '@/composables/useShuffledQuestion'
import { shuffleArray } from '@/utils/randomizer'
import preguntasData from './preguntas.json'

// Composable para manejar pregunta actual
const { 
  shuffledQuestion, 
  loadQuestion, 
  isCorrect,
  reshuffle 
} = useShuffledQuestion()

const score = ref(0)
const currentQuestionIndex = ref(0)
const showFeedback = ref(false)
const preguntas = ref([])

// Inicializar: mezclar orden de preguntas Y opciones
onMounted(() => {
  // Mezclar el orden de las preguntas
  preguntas.value = shuffleArray(preguntasData.preguntas)
  
  // Cargar primera pregunta (opciones se mezclan automáticamente)
  if (preguntas.value.length > 0) {
    loadQuestion(preguntas.value[0])
  }
})

const nextQuestion = () => {
  currentQuestionIndex.value++
  
  if (currentQuestionIndex.value < preguntas.value.length) {
    loadQuestion(preguntas.value[currentQuestionIndex.value])
  }
}

const handleAnswer = (opcion) => {
  if (isCorrect(opcion)) {
    score.value += 10
    showFeedback.value = true
    
    setTimeout(() => {
      showFeedback.value = false
      nextQuestion()
    }, 1500)
  } else {
    // Mostrar feedback negativo
    showFeedback.value = true
  }
}

const progress = computed(() => {
  return Math.round((currentQuestionIndex.value / preguntas.value.length) * 100)
})
</script>

<template>
  <div class="quiz-container">
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
    </div>
    
    <div class="score">Puntos: {{ score }}</div>
    
    <div v-if="shuffledQuestion" class="question">
      <h2>{{ shuffledQuestion.pregunta }}</h2>
      
      <div class="options-grid">
        <button
          v-for="(opcion, index) in shuffledQuestion.opciones"
          :key="index"
          @click="handleAnswer(opcion)"
          class="option-button"
          :disabled="showFeedback"
        >
          {{ opcion.texto }}
        </button>
      </div>
    </div>
    
    <div v-if="showFeedback" class="feedback">
      {{ showFeedback ? '¡Correcto! ✅' : 'Incorrecto ❌' }}
    </div>
  </div>
</template>
```

---

## 4. Batch Processing

### Mezclar todas las preguntas de una vez

```javascript
import { shuffleMultipleQuestions } from '@/utils/answerShuffler'
import preguntasData from './preguntas.json'

// Al cargar el juego, mezclar TODAS las preguntas
export default {
  setup() {
    const preguntas = ref([])
    
    onMounted(() => {
      // Mezclar opciones de todas las preguntas
      preguntas.value = shuffleMultipleQuestions(
        preguntasData.preguntas,
        {
          detectExceptions: true,
          trackCorrectIndex: true
        }
      )
      
      console.log(`${preguntas.value.length} preguntas mezcladas`)
    })
    
    return { preguntas }
  }
}
```

### Mezclar solo preguntas específicas

```javascript
import { shuffleQuestionOptions } from '@/utils/answerShuffler'

const preguntasMezcladas = preguntas.map(pregunta => {
  // Solo mezclar preguntas de múltiple choice
  if (pregunta.tipo === 'multiple-choice') {
    return shuffleQuestionOptions(pregunta)
  }
  return pregunta
})
```

---

## 5. Validación y Error Handling

### Validar antes de usar

```javascript
import { validateQuestionFormat, shuffleQuestionOptions } from '@/utils/answerShuffler'

const cargarPregunta = (pregunta) => {
  // Validar formato
  const validation = validateQuestionFormat(pregunta)
  
  if (!validation.valid) {
    console.error('Pregunta inválida:', validation.errors)
    
    // Mostrar mensaje al usuario
    showError.value = true
    errorMessage.value = `Error en pregunta: ${validation.errors.join(', ')}`
    
    // Usar pregunta sin mezclar como fallback
    currentQuestion.value = pregunta
    return
  }
  
  // Si es válida, mezclar
  currentQuestion.value = shuffleQuestionOptions(pregunta)
}
```

### Manejar errores gracefully

```javascript
const { shuffledQuestion, loadQuestion, validationErrors, isValid } = useShuffledQuestion({
  validateFormat: true
})

watch(isValid, (valid) => {
  if (!valid) {
    console.warn('Pregunta no válida, usando formato original')
    console.warn('Errores:', validationErrors.value)
  }
})
```

---

## 6. Casos Especiales

### 6.1. Preservar orden manualmente

```javascript
// En el JSON
{
  "pregunta": "Ordena cronológicamente los eventos:",
  "opciones": [
    { "texto": "1806 - Primera Invasión", "correcto": false },
    { "texto": "1807 - Segunda Invasión", "correcto": false },
    { "texto": "1810 - Revolución de Mayo", "correcto": true }
  ],
  "preserveOrder": true  // ← NO se mezclará
}
```

### 6.2. Balanced Shuffle (evitar "siempre la primera")

```javascript
import { balancedShuffle } from '@/utils/answerShuffler'

// Garantiza que la correcta no esté siempre en posición 0
const preguntaMezclada = balancedShuffle(pregunta)
```

### 6.3. Normalizar formatos diferentes

```javascript
import { normalizeOptions, shuffleQuestionOptions } from '@/utils/answerShuffler'

// Si tienes un formato diferente
const preguntaLegacy = {
  pregunta: "¿Qué es...?",
  respuestas: [
    { label: "Opción A", correct: true },
    { label: "Opción B", correct: false }
  ]
}

// Normalizar primero
const preguntaNormalizada = {
  ...preguntaLegacy,
  opciones: normalizeOptions(preguntaLegacy.respuestas)
}

// Luego mezclar
const mezclada = shuffleQuestionOptions(preguntaNormalizada)
```

### 6.4. Re-shuffle al reintentar

```javascript
const { shuffledQuestion, reshuffle } = useShuffledQuestion()

const reintentar = () => {
  // Re-mezclar la misma pregunta
  reshuffle()
  
  // Las opciones estarán en orden diferente
  console.log('Pregunta re-mezclada')
}
```

### 6.5. Mezclar con configuración personalizada

```javascript
const { shuffledQuestion, loadQuestion } = useShuffledQuestion({
  shuffleOnLoad: true,
  validateFormat: true,
  autoDetectExceptions: false  // ← Desactivar detección automática
})

// Todas las preguntas se mezclarán, incluso con "todas las anteriores"
loadQuestion(pregunta)
```

### 6.6. Tracking de metadata

```javascript
const preguntaMezclada = shuffleQuestionOptions(pregunta)

// Acceder a metadata del shuffle
console.log('Índices originales correctos:', 
  preguntaMezclada._shuffleMetadata.originalCorrectIndices)

console.log('Nuevos índices correctos:', 
  preguntaMezclada._shuffleMetadata.newCorrectIndices)

console.log('¿Fue mezclada?', 
  preguntaMezclada._shuffleMetadata.shuffled)
```

---

## 🎯 Receta Completa: Integración en Juego Existente

### Paso 1: Importar utilidades

```javascript
import { useShuffledQuestion } from '@/composables/useShuffledQuestion'
```

### Paso 2: Inicializar en setup()

```javascript
const { shuffledQuestion, loadQuestion, isCorrect } = useShuffledQuestion()
```

### Paso 3: Cargar pregunta

```javascript
onMounted(() => {
  loadQuestion(currentQuestion.value)
})

// O en un watch
watch(currentQuestionIndex, () => {
  loadQuestion(questions.value[currentQuestionIndex.value])
})
```

### Paso 4: Usar en template

```vue
<template>
  <div v-for="opcion in shuffledQuestion?.opciones" :key="opcion.texto">
    <button @click="handleAnswer(opcion)">
      {{ opcion.texto }}
    </button>
  </div>
</template>
```

### Paso 5: Verificar respuestas

```javascript
const handleAnswer = (opcion) => {
  if (isCorrect(opcion)) {
    // Correcto
  } else {
    // Incorrecto
  }
}
```

---

## 🧪 Testing de Integración

```javascript
describe('Answer Shuffler Integration', () => {
  it('should shuffle options in Portal Mágico', () => {
    const { loadQuestion, shuffledQuestion } = useShuffledQuestion()
    
    const pregunta = {
      pregunta: 'Test',
      opciones: [
        { texto: 'A', correcto: true },
        { texto: 'B', correcto: false },
        { texto: 'C', correcto: false }
      ]
    }
    
    loadQuestion(pregunta)
    
    expect(shuffledQuestion.value).toBeDefined()
    expect(shuffledQuestion.value.opciones).toHaveLength(3)
    expect(shuffledQuestion.value.opciones.some(o => o.correcto)).toBe(true)
  })
  
  it('should not shuffle when order matters', () => {
    const { loadQuestion, shuffledQuestion } = useShuffledQuestion()
    
    const pregunta = {
      pregunta: 'Test',
      opciones: [
        { texto: 'A', correcto: false },
        { texto: 'Todas las anteriores', correcto: true }
      ]
    }
    
    loadQuestion(pregunta)
    
    // Debe mantener orden original
    expect(shuffledQuestion.value.opciones[1].texto).toBe('Todas las anteriores')
  })
})
```

---

## 📝 Notas Importantes

1. **No modifica JSONs**: Los JSONs permanecen sin cambios, el shuffle ocurre en runtime
2. **Retrocompatible**: Funciona con todos los juegos sin modificarlos
3. **Opt-in**: Solo se activa donde se use explícitamente
4. **Performance**: Muy ligero, no afecta rendimiento
5. **TypeScript**: Full type support incluido

## 🎉 ¡Listo para usar!

Con estos ejemplos puedes integrar el answer shuffler en cualquier juego existente o nuevo. Solo importa, inicializa y usa. ¡Así de simple!
