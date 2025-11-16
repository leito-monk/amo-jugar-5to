# UI Base Components Documentation

Este documento describe todos los componentes UI base creados para la plataforma Amo Jugar 5to.

## Tabla de Contenidos

1. [GameLayout](#gamelayout)
2. [ScoreBoard](#scoreboard)
3. [ProgressTracker](#progresstracker)
4. [FeedbackModal](#feedbackmodal)
5. [GameCard](#gamecard)
6. [Header](#header)
7. [Footer](#footer)

---

## GameLayout

Componente wrapper común para todos los juegos.

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `title` | `string` | Sí | Título del juego |
| `instructions` | `string` | Sí | Texto de instrucciones |

### Eventos

- `back`: Emitido cuando el usuario hace clic en el botón de volver

### Slots

- **default**: Contenido principal del juego
- **footer**: Contenido opcional para el footer

### Características

- Header sticky con botón volver, título centrado y botón ayuda
- Modal de instrucciones con DaisyUI
- Background con gradiente
- Totalmente responsive

### Ejemplo de Uso

```vue
<template>
  <GameLayout
    title="Suma Rápida"
    instructions="Resuelve las sumas lo más rápido posible.
    
Instrucciones:
1. Lee la operación matemática
2. Selecciona la respuesta correcta
3. ¡Gana puntos por cada respuesta correcta!"
    @back="handleBack"
  >
    <!-- Contenido del juego -->
    <div class="game-content">
      <p>5 + 3 = ?</p>
      <button>8</button>
    </div>

    <!-- Footer opcional -->
    <template #footer>
      <p class="text-center">Tiempo restante: 30s</p>
    </template>
  </GameLayout>
</template>

<script setup lang="ts">
import GameLayout from '@/components/game/GameLayout.vue'

const handleBack = () => {
  // Lógica personalizada antes de volver
  console.log('Guardando progreso...')
}
</script>
```

---

## ScoreBoard

Componente para mostrar puntuación y estadísticas del juego.

### Props

| Prop | Tipo | Por Defecto | Descripción |
|------|------|-------------|-------------|
| `score` | `number` | `0` | Puntuación actual |
| `accuracy` | `number` | `0` | Porcentaje de precisión |
| `correctCount` | `number` | `undefined` | Número de respuestas correctas |
| `totalCount` | `number` | `undefined` | Número total de respuestas |
| `showAccuracy` | `boolean` | `false` | Mostrar sección de precisión |

### Características

- Layout horizontal con flex (vertical en mobile)
- Emojis grandes: ⭐ para puntos, 🎯 para precisión, ✅ para correctas
- Números grandes y bold
- Divisores entre secciones
- Responsive

### Ejemplo de Uso

```vue
<template>
  <ScoreBoard
    :score="150"
    :accuracy="87.5"
    :correct-count="35"
    :total-count="40"
    :show-accuracy="true"
  />
</template>

<script setup lang="ts">
import ScoreBoard from '@/components/game/ScoreBoard.vue'
</script>
```

---

## ProgressTracker

Componente de barra de progreso visual.

### Props

| Prop | Tipo | Por Defecto | Requerido | Descripción |
|------|------|-------------|-----------|-------------|
| `current` | `number` | - | Sí | Valor actual |
| `total` | `number` | - | Sí | Valor máximo |
| `label` | `string` | `'Progreso'` | No | Etiqueta del progreso |
| `showPercentage` | `boolean` | `true` | No | Mostrar porcentaje |

### Características

- Barra horizontal con background gris
- Fill con gradiente (primary → secondary)
- Transición suave (duration-500)
- Porcentaje calculado automáticamente
- Labels: título a la izquierda, fracción a la derecha

### Ejemplo de Uso

```vue
<template>
  <ProgressTracker
    :current="7"
    :total="10"
    label="Preguntas Respondidas"
    :show-percentage="true"
  />
</template>

<script setup lang="ts">
import ProgressTracker from '@/components/game/ProgressTracker.vue'
</script>
```

---

## FeedbackModal

Modal de retroalimentación educativa.

### Props

| Prop | Tipo | Por Defecto | Requerido | Descripción |
|------|------|-------------|-----------|-------------|
| `isCorrect` | `boolean` | - | Sí | Si la respuesta es correcta |
| `message` | `string` | - | Sí | Mensaje de retroalimentación |
| `title` | `string` | `undefined` | No | Título personalizado |
| `showExplanation` | `boolean` | `true` | No | Mostrar explicación |
| `show` | `boolean` | `true` | No | Controlar visibilidad |

### Eventos

- `close`: Emitido cuando el usuario cierra el modal

### Slots

- **default**: Contenido extra (ej: puntos ganados)

### Características

- Diseño condicional:
  - **Correcto**: Verde, emoji ✅, animación celebración
  - **Incorrecto**: Amarillo, emoji 💡, tono motivador
- Animaciones: fade-in, scale-up, bounce-in
- Título automático o personalizado
- Botón continuar

### Ejemplo de Uso

```vue
<template>
  <FeedbackModal
    :is-correct="isCorrect"
    :show="showModal"
    :message="feedbackMessage"
    @close="showModal = false"
  >
    <!-- Contenido extra opcional -->
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Puntos ganados</div>
        <div class="stat-value text-success">+10</div>
      </div>
    </div>
  </FeedbackModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import FeedbackModal from '@/components/game/FeedbackModal.vue'

const isCorrect = ref(true)
const showModal = ref(false)

const feedbackMessage = computed(() => 
  isCorrect.value 
    ? '¡Excelente! Has demostrado un gran conocimiento.'
    : 'No te preocupes, sigue intentando. Recuerda que...'
)
</script>
```

---

## GameCard

Tarjeta para mostrar juegos en el listado.

### Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `game` | `Game` | Sí | Objeto con datos del juego |

### Interface Game

```typescript
interface Game {
  id: string
  titulo: string
  materia: string
  descripcion: string
  icono: string
  dificultad: 'Fácil' | 'Medio' | 'Difícil'
  duracion: string
  activo?: boolean
  completado?: boolean
  progreso?: number
}
```

### Eventos

- `click`: Emitido cuando se hace clic en la tarjeta

### Características

- Card con shadow y hover effect (scale-up)
- Icono grande en la parte superior
- Badges: materia, dificultad, duración
- Progress bar si el juego está en progreso
- Badge "Completado" si está completado
- Lock icon si no está activo
- Estados: normal, completado, en progreso, bloqueado

### Ejemplo de Uso

```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <GameCard
      v-for="game in games"
      :key="game.id"
      :game="game"
      @click="handleGameClick(game)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GameCard, { type Game } from '@/components/game/GameCard.vue'

const games = ref<Game[]>([
  {
    id: 'suma-rapida',
    titulo: 'Suma Rápida',
    materia: 'Matemáticas',
    descripcion: 'Practica sumas con tiempo limitado',
    icono: '➕',
    dificultad: 'Fácil',
    duracion: '5 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  // ... más juegos
])

const handleGameClick = (game: Game) => {
  if (game.activo) {
    router.push(`/juegos/${game.id}`)
  }
}
</script>
```

---

## Header

Componente de navegación del sitio.

### Características

- Logo con icono 🎮 y título del proyecto
- Navegación desktop: Home, Juegos, Progreso, Acerca de
- Menu hamburguesa responsive en mobile
- Sticky positioning con shadow
- Animación slide-down para menu mobile
- RouterLink integrado

### Uso

```vue
<template>
  <div class="app">
    <Header />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>
```

---

## Footer

Componente footer del sitio.

### Características

- Logo y descripción del proyecto
- Links: Privacidad, Contacto, GitHub
- Crédito a gcoop
- Mensaje "Hecho con ❤️ en Argentina 🇦🇷"
- Diseño centrado y responsive

### Uso

El Footer se incluye automáticamente en el layout principal de la aplicación (ver ejemplo de Header arriba).

---

## Guía de Estilo

### Colores

Los componentes utilizan las clases de color de DaisyUI:
- `primary`: Color principal
- `secondary`: Color secundario
- `accent`: Color de acento
- `success`: Verde para éxito
- `warning`: Amarillo para advertencias
- `error`: Rojo para errores

### Animaciones

Todos los componentes incluyen transiciones suaves:
- `duration-300`: Transiciones rápidas
- `duration-500`: Transiciones medianas
- `ease-out`: Curva de animación suave

### Responsive

Los breakpoints utilizados son:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## Instalación y Configuración

### Requisitos

- Node.js 18+
- npm 9+

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

---

## Demo

Para ver todos los componentes en acción, navega a `/demo` en el navegador durante el desarrollo.

```
http://localhost:5173/demo
```

Esta página muestra ejemplos de todos los componentes con diferentes estados y configuraciones.
