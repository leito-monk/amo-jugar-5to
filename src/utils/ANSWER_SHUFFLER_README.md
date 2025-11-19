# Answer Shuffler - Aleatorización de Opciones Multiple Choice

Utilidades para aleatorizar opciones de respuesta en preguntas de múltiple choice, mejorando la rejugabilidad y evitando patrones memorísticos.

## 📋 Características

- ✅ Aleatoriza opciones de múltiple choice automáticamente
- ✅ Mantiene el tracking de respuestas correctas
- ✅ Detecta automáticamente casos donde el orden es importante
- ✅ Validación de formato de preguntas
- ✅ Retrocompatible con JSONs existentes
- ✅ TypeScript declarations incluidas
- ✅ Composable para Vue 3

## 🚀 Uso Básico

### Opción 1: Usando el Composable (Recomendado)

```javascript
import { useShuffledQuestion } from '@/composables/useShuffledQuestion'

export default {
  setup() {
    const { 
      shuffledQuestion, 
      loadQuestion, 
      isCorrect,
      wasShuffled 
    } = useShuffledQuestion()
    
    // Cargar pregunta (se mezcla automáticamente)
    const question = {
      id: 'Q1',
      pregunta: '¿Qué es un caligrama?',
      opciones: [
        { texto: 'Un poema con forma visual', correcto: true },
        { texto: 'Un tipo de narración', correcto: false },
        { texto: 'Una figura retórica', correcto: false },
        { texto: 'Un instrumento musical', correcto: false }
      ]
    }
    
    loadQuestion(question)
    
    // Verificar respuesta
    const handleAnswer = (opcion) => {
      if (isCorrect(opcion)) {
        console.log('¡Correcto!')
      } else {
        console.log('Incorrecto')
      }
    }
    
    return {
      shuffledQuestion,
      handleAnswer,
      wasShuffled
    }
  }
}
```

### Opción 2: Usando las Utilidades Directamente

```javascript
import { shuffleQuestionOptions } from '@/utils/answerShuffler'

const question = {
  pregunta: '¿Qué es un tornado?',
  opciones: [
    { texto: 'Un tornado', correcto: true },
    { texto: 'Un terremoto', correcto: false },
    { texto: 'Una inundación', correcto: false }
  ]
}

const shuffled = shuffleQuestionOptions(question)
```

## 📦 Funciones Disponibles

### `shuffleQuestionOptions(question, options)`

Mezcla las opciones de una pregunta.

**Parámetros:**
- `question` (Object): Pregunta con propiedad `opciones`
- `options` (Object): Configuración opcional
  - `detectExceptions` (boolean): Detectar casos especiales (default: `true`)
  - `preserveOrder` (boolean): Forzar mantener orden original (default: `false`)
  - `trackCorrectIndex` (boolean): Guardar índice de respuesta correcta (default: `true`)

**Retorna:** Pregunta con opciones mezcladas

```javascript
const shuffled = shuffleQuestionOptions(question, {
  detectExceptions: true,
  trackCorrectIndex: true
})

// Acceder a metadata
console.log(shuffled._shuffleMetadata.newCorrectIndices)
```

### `shuffleMultipleQuestions(questions, options)`

Mezcla opciones de múltiples preguntas.

```javascript
const questions = [question1, question2, question3]
const shuffledQuestions = shuffleMultipleQuestions(questions)
```

### `balancedShuffle(question)`

Garantiza que la respuesta correcta no esté siempre en la primera posición.

```javascript
const shuffled = balancedShuffle(question)
```

### `validateQuestionFormat(question)`

Valida que una pregunta tenga el formato correcto.

```javascript
const validation = validateQuestionFormat(question)
if (!validation.valid) {
  console.error('Errores:', validation.errors)
}
```

### `normalizeOptions(options)`

Normaliza diferentes formatos de opciones al estándar.

```javascript
// Convierte diferentes formatos a { texto: string, correcto: boolean }
const normalized = normalizeOptions([
  'Opción A',  // string simple
  { label: 'Opción B', correct: true },  // formato alternativo
  { texto: 'Opción C', correcto: false }  // formato estándar
])
```

## 🔍 Detección Automática de Excepciones

El sistema detecta automáticamente cuando NO debe mezclar opciones:

**Patrones detectados:**
- "todas las anteriores"
- "ninguna de las anteriores"
- "a y b son correctas"
- "tanto a como b"
- "solo a" / "solo b"
- "primero...luego"
- "antes...después"
- "cronológico"
- "orden correcto"
- "secuencia"
- "del 1 al"
- "de menor a mayor"
- "de mayor a menor"

**Ejemplo de pregunta que NO se mezcla:**

```javascript
const preguntaConOrden = {
  pregunta: '¿Cuál es el orden cronológico correcto?',
  opciones: [
    { texto: '1806 - Primera Invasión', correcto: false },
    { texto: '1807 - Segunda Invasión', correcto: false },
    { texto: '1810 - Revolución de Mayo', correcto: true },
    { texto: 'Todas las anteriores en orden', correcto: false }
  ]
}

const resultado = shuffleQuestionOptions(preguntaConOrden)
// No se mezcla porque detecta "anteriores"
```

**Marcar explícitamente que no se mezcle:**

```javascript
const pregunta = {
  pregunta: 'Pregunta especial',
  opciones: [...],
  preserveOrder: true  // ← No se mezclará
}
```

## 🎮 Integración con Juegos Existentes

### Ejemplo: Portal Mágico

```javascript
import { useShuffledQuestion } from '@/composables/useShuffledQuestion'

setup() {
  const { shuffledQuestion, loadQuestion } = useShuffledQuestion()
  
  const currentScene = computed(() => {
    const scene = mundoSeleccionado.value?.escenas[currentSceneIndex.value]
    if (scene?.pregunta?.opciones) {
      loadQuestion(scene.pregunta)
      return {
        ...scene,
        pregunta: shuffledQuestion.value
      }
    }
    return scene
  })
  
  return { currentScene }
}
```

### Ejemplo: Batch Processing

```javascript
import { shuffleMultipleQuestions } from '@/utils/answerShuffler'

// Mezclar todas las preguntas de un juego al cargar
const preguntasMezcladas = shuffleMultipleQuestions(todasLasPreguntas)
```

## 📝 Formato JSON Recomendado

```json
{
  "preguntas": [
    {
      "id": "L1",
      "pregunta": "¿Qué es un caligrama?",
      "opciones": [
        {
          "texto": "Un poema con forma visual",
          "correcto": true
        },
        {
          "texto": "Un tipo de narración",
          "correcto": false
        },
        {
          "texto": "Una figura retórica",
          "correcto": false
        }
      ],
      "explicacion": "Los caligramas son poemas cuyas palabras forman una figura"
    }
  ]
}
```

**Para preguntas con orden importante:**

```json
{
  "id": "L2",
  "pregunta": "Ordena cronológicamente:",
  "opciones": [
    { "texto": "1806 - Primera Invasión", "correcto": false },
    { "texto": "1807 - Segunda Invasión", "correcto": false },
    { "texto": "1810 - Revolución", "correcto": false },
    { "texto": "Todas las anteriores en orden", "correcto": true }
  ],
  "preserveOrder": true
}
```

## 🎯 Composable API

### `useShuffledQuestion(options)`

**Opciones:**
- `shuffleOnLoad` (boolean): Mezclar al cargar pregunta (default: `true`)
- `validateFormat` (boolean): Validar formato antes de usar (default: `true`)
- `autoDetectExceptions` (boolean): Detectar casos especiales (default: `true`)

**Retorna:**

**State:**
- `currentQuestion`: Pregunta original (ref)
- `shuffledQuestion`: Pregunta con opciones mezcladas (ref)
- `validationErrors`: Errores de validación (ref)

**Methods:**
- `loadQuestion(question)`: Cargar y preparar pregunta
- `reshuffle()`: Re-mezclar pregunta actual
- `isCorrect(option)`: Verificar si opción es correcta
- `getCorrectOptions()`: Obtener todas las opciones correctas
- `getCorrectIndex()`: Obtener índice de opción correcta

**Computed:**
- `hasMultipleCorrect`: Si hay múltiples respuestas correctas
- `isValid`: Si la pregunta pasó validación
- `wasShuffled`: Si la pregunta fue mezclada

## 🧪 Testing

```javascript
import { validateQuestionFormat, shuffleQuestionOptions } from '@/utils/answerShuffler'

// Validar antes de usar
const validation = validateQuestionFormat(question)
if (!validation.valid) {
  console.error('Pregunta inválida:', validation.errors)
  return
}

// Mezclar con confianza
const shuffled = shuffleQuestionOptions(question)

// Verificar que se mezcló correctamente
expect(shuffled.opciones).toHaveLength(question.opciones.length)
expect(shuffled.opciones.some(o => o.correcto)).toBe(true)
expect(shuffled._shuffleMetadata.shuffled).toBe(true)
```

## 🔧 Compatibilidad

- ✅ Vue 3
- ✅ TypeScript
- ✅ JavaScript
- ✅ Compatible con todos los formatos JSON existentes
- ✅ No requiere cambios en juegos existentes

## 🎯 Juegos Aplicables

- ✅ L02 - Detectivismo Poético
- ✅ L04 - Portal Mágico
- ✅ L05 - Aventura en Misiones
- ✅ M01 - Autopista Numérica
- ✅ CS01 - Línea del Tiempo
- ✅ CS02 - Defensa de Buenos Aires
- ✅ CN01 - Viaje Hidrosfera
- ✅ CN03 - Detector de Humedad
- ✅ T01 - Quiz Rápido (todos)

## 💡 Beneficios

1. **Imposible memorizar patrones** - Las opciones cambian en cada intento
2. **Mejor evaluación** - Evalúa conocimiento real, no memorización de posiciones
3. **Mayor desafío cognitivo** - Fuerza a leer y comprender cada opción
4. **Rejugabilidad** - Experiencia diferente en cada intento
5. **Detección inteligente** - Preserva automáticamente orden cuando es importante
6. **Fácil integración** - Una línea de código para activar
7. **Retrocompatible** - Funciona con JSONs existentes sin modificaciones

## 🐛 Troubleshooting

**Problema:** Las opciones no se mezclan

**Solución:** Verifica que:
1. La pregunta tenga propiedad `opciones` como array
2. No tenga `preserveOrder: true`
3. No contenga patrones de orden ("todas las anteriores", etc.)
4. El composable tenga `shuffleOnLoad: true`

**Problema:** Error de validación

**Solución:** Asegúrate que:
1. Todas las opciones tengan propiedad `texto`
2. Al menos una opción tenga `correcto: true`
3. Haya al menos 2 opciones

## 📚 Recursos Adicionales

- Ver ejemplos en `/src/games/portal-magico/PortalGame.vue`
- TypeScript declarations en `/src/utils/answerShuffler.d.ts`
- Tests de integración en games existentes
