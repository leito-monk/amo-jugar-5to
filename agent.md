# Agent Instructions - Yo Amo Aprender Digital

Este documento proporciona instrucciones y guías para agentes de IA y desarrolladores que trabajan en el proyecto educativo **Yo Amo Aprender Digital**.

## 📋 Contexto del Proyecto

**Yo Amo Aprender Digital** es una plataforma educativa interactiva diseñada para estudiantes de 5to grado. El objetivo es hacer el aprendizaje divertido y atractivo mediante juegos interactivos y actividades educativas.

### Público Objetivo
- **Estudiantes**: Niños de aproximadamente 10-11 años (5to grado)
- **Educadores**: Maestros que buscan herramientas educativas digitales
- **Padres**: Tutores que apoyan el aprendizaje en casa

### Principios de Diseño
1. **Educativo**: Todo debe tener un propósito pedagógico
2. **Divertido**: La gamificación es clave para el engagement
3. **Accesible**: Interfaz simple y clara para niños
4. **Seguro**: Código robusto sin vulnerabilidades
5. **Responsive**: Funcional en desktop, tablet y móvil

## 🛠️ Stack Tecnológico

### Frontend
- **Vue 3** (v3.5.24): Framework principal con Composition API
- **Vue Router** (v4.6.3): Navegación SPA
- **TypeScript** (v5.9.3): Tipado opcional
- **Vite** (v7.2.2): Build tool

### Estilos
- **Tailwind CSS** (v3.4.18): Framework CSS utility-first
- **DaisyUI** (v5.5.5): Componentes UI pre-diseñados
- **PostCSS** (v8.5.6): Procesamiento CSS

### Tipografías
- **Quicksand**: Para títulos y UI
- **Comic Neue**: Para contenido educativo

### Paleta de Colores
- **Primary** (#4F46E5): Índigo para acciones principales
- **Secondary** (#F59E0B): Ámbar para elementos secundarios
- **Success** (#10B981): Verde esmeralda para retroalimentación positiva
- **Danger** (#EF4444): Rojo para alertas
- **Info** (#3B82F6): Azul para información

## 📁 Estructura del Proyecto

```
amo-jugar-5to/
├── composables/           # Lógica reutilizable
│   ├── useLocalStorage.js # Persistencia de datos
│   ├── useGameState.js    # Estado de juegos
│   ├── useSound.js        # Efectos de sonido
│   ├── README.md          # Documentación de composables
│   └── ARCHITECTURE.md    # Arquitectura detallada
├── src/
│   ├── components/        # Componentes Vue
│   │   ├── game/         # Componentes de juegos
│   │   └── layout/       # Componentes de layout
│   ├── views/            # Vistas/Páginas
│   ├── router/           # Configuración de rutas
│   ├── assets/           # Recursos estáticos
│   ├── App.vue           # Componente raíz
│   └── main.ts           # Punto de entrada
├── public/               # Archivos públicos
├── COMPONENTS.md         # Documentación de componentes UI
├── IMPLEMENTATION_SUMMARY.md  # Resumen de implementación
├── README.md             # Documentación principal
└── agent.md              # Este archivo
```

## 🎯 Guías de Desarrollo

### 1. Composables

Los composables son funciones reutilizables que encapsulan lógica de negocio. Son la base de la arquitectura del proyecto.

#### useLocalStorage.js
```javascript
import * as localStorage from './composables/useLocalStorage.js'

// Guardar datos con prefijo automático 'yoAmoAprender_'
localStorage.save('userData', { name: 'María', grade: 5 })

// Cargar datos
const userData = localStorage.load('userData')

// Listar todas las claves del proyecto
const keys = localStorage.getAllKeys()

// Limpiar todos los datos del proyecto
localStorage.clear()
```

#### useGameState.js
```javascript
import * as gameState from './composables/useGameState.js'

// Inicializar juego
gameState.loadState('matematicas-suma')
gameState.startGame()

// Registrar respuesta
gameState.recordAnswer(true) // true = correcta, false = incorrecta
gameState.addScore(10)

// Acceder a propiedades computadas reactivas
console.log(gameState.accuracy.value) // Precisión en porcentaje
console.log(gameState.formattedTime.value) // Tiempo en formato MM:SS

// Completar nivel
gameState.markCompleted()
gameState.unlockAchievement('primera-victoria')
```

#### useSound.js
```javascript
import * as sound from './composables/useSound.js'

// Reproducir sonidos
sound.playCorrect()    // Respuesta correcta
sound.playWrong()      // Respuesta incorrecta
sound.playComplete()   // Nivel completado

// Controlar silencio
sound.toggleMute()
sound.setMuted(true)
```

**Importante**: Lee `composables/README.md` y `composables/ARCHITECTURE.md` para detalles completos.

### 2. Componentes UI Base

El proyecto incluye componentes base documentados en `COMPONENTS.md`:

#### GameLayout
Wrapper común para todos los juegos con header, instrucciones y footer.

```vue
<template>
  <GameLayout
    title="Suma Rápida"
    instructions="Resuelve las sumas..."
    @back="handleBack"
  >
    <!-- Contenido del juego -->
  </GameLayout>
</template>
```

#### ScoreBoard
Muestra puntuación y estadísticas.

```vue
<ScoreBoard
  :score="150"
  :accuracy="87.5"
  :correct-count="35"
  :total-count="40"
  :show-accuracy="true"
/>
```

#### ProgressTracker
Barra de progreso visual.

```vue
<ProgressTracker
  :current="7"
  :total="10"
  label="Preguntas Respondidas"
/>
```

#### FeedbackModal
Modal de retroalimentación educativa.

```vue
<FeedbackModal
  :is-correct="true"
  :show="showModal"
  message="¡Excelente trabajo!"
  @close="showModal = false"
/>
```

#### GameCard
Tarjeta para mostrar juegos en el listado.

```vue
<GameCard
  :game="gameObject"
  @click="handleGameClick"
/>
```

**Consulta `COMPONENTS.md` para documentación completa de props, eventos y ejemplos.**

### 3. Vistas (Views)

Las vistas principales del proyecto:

- **HomeView.vue**: Página de inicio
- **JuegosView.vue**: Listado de juegos disponibles
- **ProgresoView.vue**: Progreso y estadísticas del estudiante
- **AcercaView.vue**: Información sobre el proyecto
- **GameDemoView.vue**: Demo de componentes de juego

### 4. Routing

```javascript
// router/index.ts
const routes = [
  { path: '/', component: HomeView },
  { path: '/juegos', component: JuegosView },
  { path: '/progreso', component: ProgresoView },
  { path: '/acerca', component: AcercaView },
  { path: '/juegos/:gameId', component: GameView } // Juegos específicos
]
```

## 💻 Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview

# Ejecutar tests de composables
node composables/test-localStorage.js
```

## ✅ Estándares de Código

### Vue 3 Composition API

**Preferir**:
```vue
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>
```

**Evitar** (Options API):
```vue
<script>
export default {
  data() {
    return { count: 0 }
  }
}
</script>
```

### TypeScript

- Los archivos pueden ser `.ts`, `.js` o `.vue`
- TypeScript es opcional pero recomendado para nuevos archivos
- Usar interfaces para tipos complejos

```typescript
interface Game {
  id: string
  titulo: string
  materia: string
  descripcion: string
  icono: string
  dificultad: 'Fácil' | 'Medio' | 'Difícil'
  duracion: string
}
```

### Tailwind CSS

Usar clases de utilidad en lugar de CSS personalizado:

```vue
<!-- ✅ Correcto -->
<div class="flex items-center justify-center p-4 bg-primary text-white rounded-lg shadow-md">

<!-- ❌ Evitar -->
<div class="custom-container">
<style>
.custom-container {
  display: flex;
  align-items: center;
  ...
}
</style>
```

### Nombres de Archivos

- **Componentes**: PascalCase (`GameCard.vue`, `ScoreBoard.vue`)
- **Composables**: camelCase con prefijo `use` (`useGameState.js`)
- **Vistas**: PascalCase con sufijo `View` (`HomeView.vue`)
- **Utilidades**: camelCase (`formatTime.js`)

### Convenciones de Código

1. **Indentación**: 2 espacios
2. **Comillas**: Simples `'` para strings
3. **Punto y coma**: Opcional (el proyecto no los usa consistentemente)
4. **Imports**: Agrupar por tipo (Vue, componentes, composables, utils)

```javascript
// Imports agrupados
import { ref, computed, onMounted } from 'vue'
import GameLayout from '@/components/game/GameLayout.vue'
import * as gameState from '@/composables/useGameState.js'
import { formatTime } from '@/utils/helpers.js'
```

## 🎮 Crear un Nuevo Juego

### Paso 1: Crear el Componente del Juego

```vue
<!-- src/views/games/MiJuegoView.vue -->
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import GameLayout from '@/components/game/GameLayout.vue'
import ScoreBoard from '@/components/game/ScoreBoard.vue'
import FeedbackModal from '@/components/game/FeedbackModal.vue'
import * as gameState from '@/composables/useGameState.js'
import * as sound from '@/composables/useSound.js'

// Estado local del juego
const currentQuestion = ref(0)
const showFeedback = ref(false)
const isCorrect = ref(false)

// Inicializar
onMounted(() => {
  gameState.loadState('mi-juego')
  gameState.startGame()
})

// Lógica del juego
function handleAnswer(answer: string) {
  const correct = checkAnswer(answer)
  isCorrect.value = correct
  
  gameState.recordAnswer(correct)
  if (correct) {
    gameState.addScore(10)
    sound.playCorrect()
  } else {
    sound.playWrong()
  }
  
  showFeedback.value = true
}

function nextQuestion() {
  showFeedback.value = false
  currentQuestion.value++
  
  // Verificar si completó el juego
  if (currentQuestion.value >= 10) {
    gameState.markCompleted()
    sound.playComplete()
  }
}
</script>

<template>
  <GameLayout
    title="Mi Juego Educativo"
    instructions="Instrucciones del juego..."
    @back="$router.push('/juegos')"
  >
    <ScoreBoard
      :score="gameState.getState().score"
      :accuracy="gameState.accuracy.value"
      :show-accuracy="true"
    />
    
    <!-- Contenido del juego aquí -->
    
    <FeedbackModal
      :is-correct="isCorrect"
      :show="showFeedback"
      :message="isCorrect ? '¡Correcto!' : 'Intenta de nuevo'"
      @close="nextQuestion"
    />
  </GameLayout>
</template>
```

### Paso 2: Agregar la Ruta

```typescript
// router/index.ts
{
  path: '/juegos/mi-juego',
  name: 'MiJuego',
  component: () => import('@/views/games/MiJuegoView.vue')
}
```

### Paso 3: Agregar a la Lista de Juegos

```typescript
// En JuegosView.vue o donde se listen los juegos
const games = [
  {
    id: 'mi-juego',
    titulo: 'Mi Juego Educativo',
    materia: 'Matemáticas',
    descripcion: 'Descripción breve del juego',
    icono: '🎯',
    dificultad: 'Medio',
    duracion: '10 min',
    activo: true
  }
]
```

## 🧪 Testing

### Tests Existentes

El proyecto incluye tests para los composables:

```bash
# Test de localStorage
node composables/test-localStorage.js
```

### Crear Nuevos Tests

Para nuevos composables o funciones críticas, crear tests similares:

```javascript
// tests/test-miComposable.js
import * as miComposable from '../composables/miComposable.js'

console.log('🧪 Testing miComposable.js\n')

// Test 1
try {
  const result = miComposable.myFunction('test')
  if (result === 'expected') {
    console.log('✅ PASS: myFunction works')
  } else {
    throw new Error('Result mismatch')
  }
} catch (error) {
  console.log('❌ FAIL: myFunction')
  console.error(error)
}
```

## 🔒 Seguridad

### Verificación de Vulnerabilidades

El proyecto usa GitHub CodeQL para análisis de seguridad. Antes de finalizar cambios:

1. Ejecutar análisis de seguridad
2. Revisar y corregir alertas
3. Documentar cualquier falso positivo

### Mejores Prácticas

1. **No almacenar secrets** en el código
2. **Validar inputs** del usuario
3. **Sanitizar datos** antes de renderizar
4. **Usar dependencias actualizadas** sin vulnerabilidades conocidas
5. **localStorage**: Solo datos no sensibles (juegos, preferencias)

## 📝 Proceso de Contribución

### Para Agentes de IA

1. **Leer el contexto**: Entender el problema y el objetivo educativo
2. **Analizar el código existente**: Mantener consistencia con el estilo actual
3. **Cambios mínimos**: Hacer solo las modificaciones necesarias
4. **Usar composables existentes**: No reinventar la rueda
5. **Seguir la arquitectura**: Respetar la separación de concerns
6. **Documentar cambios**: Actualizar documentación si es necesario
7. **Probar**: Verificar que funciona y no rompe nada
8. **Seguridad**: Ejecutar análisis de seguridad

### Flujo de Trabajo

```
1. Entender requisito
   ↓
2. Revisar documentación (README, COMPONENTS, ARCHITECTURE)
   ↓
3. Identificar archivos afectados
   ↓
4. Hacer cambios mínimos y quirúrgicos
   ↓
5. Probar localmente (npm run dev)
   ↓
6. Revisar con code_review
   ↓
7. Ejecutar codeql_checker
   ↓
8. Documentar y commit
```

## 🎨 Diseño y UX

### Principios de Diseño para Niños

1. **Colores brillantes**: Usar la paleta definida
2. **Iconos grandes**: Emojis y símbolos visuales
3. **Texto claro**: Lenguaje simple y directo
4. **Feedback inmediato**: Sonidos y animaciones
5. **Progreso visible**: Barras de progreso y badges
6. **Sin frustración**: Permitir múltiples intentos

### Animaciones

Usar las clases de Tailwind para transiciones:

```vue
<div class="transition-all duration-300 ease-out hover:scale-105">
  <!-- Elemento animado -->
</div>
```

### Responsive Design

Probar en diferentes tamaños:

- Mobile: 375px (iPhone SE)
- Tablet: 768px (iPad)
- Desktop: 1280px+

Usar breakpoints de Tailwind: `sm:`, `md:`, `lg:`, `xl:`

## 📚 Referencias Importantes

### Documentación del Proyecto

1. **README.md**: Visión general, instalación, comandos
2. **COMPONENTS.md**: Componentes UI base con ejemplos
3. **IMPLEMENTATION_SUMMARY.md**: Resumen de composables implementados
4. **composables/README.md**: Documentación detallada de composables
5. **composables/ARCHITECTURE.md**: Arquitectura y flujo de datos

### Documentación Externa

- [Vue 3 Docs](https://vuejs.org/guide/introduction.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [DaisyUI Components](https://daisyui.com/components/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🐛 Solución de Problemas

### El servidor no inicia

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errores de TypeScript

```bash
# Verificar configuración
npx tsc --noEmit

# El proyecto permite JS y TS mixto, los errores no bloquean el build
```

### Estilos no se aplican

```bash
# Verificar Tailwind está compilando
# Reiniciar el servidor de desarrollo
npm run dev
```

### localStorage no persiste

- Verificar que estás usando el prefijo correcto `yoAmoAprender_`
- Revisar la consola del navegador para errores
- Verificar que el navegador permite localStorage

## 💡 Consejos para Agentes

1. **Lee primero**: Revisa README.md, COMPONENTS.md y composables/ARCHITECTURE.md antes de hacer cambios
2. **Consistencia**: Mantén el estilo de código existente
3. **Composables primero**: Usa `useGameState`, `useSound`, `useLocalStorage` en lugar de reimplementar
4. **Componentes existentes**: Aprovecha GameLayout, ScoreBoard, etc.
5. **Educativo**: Recuerda que es para niños de 10-11 años
6. **No sobre-ingenierizar**: Mantén las cosas simples y claras
7. **Documenta**: Si agregas algo nuevo, actualiza la documentación
8. **Testing**: Prueba tus cambios en el navegador con `npm run dev`

## 🎯 Tareas Comunes

### Agregar un nuevo composable

1. Crear archivo `composables/useMyComposable.js`
2. Implementar funciones con manejo de errores
3. Documentar en `composables/README.md`
4. Crear tests si es crítico
5. Actualizar `composables/ARCHITECTURE.md` si cambia la arquitectura

### Agregar un nuevo componente UI

1. Crear componente en `src/components/game/` o `src/components/layout/`
2. Documentar props, eventos y slots
3. Agregar a `COMPONENTS.md` con ejemplos
4. Usar Tailwind y DaisyUI para estilos

### Actualizar dependencias

```bash
# Verificar actualizaciones
npm outdated

# Actualizar con precaución
npm update

# Probar que todo funciona
npm run dev
npm run build
```

## 📞 Contacto y Soporte

Para preguntas o problemas, consultar:
- Issues del repositorio en GitHub
- Documentación del proyecto
- Código existente como referencia

---

**Última actualización**: 2025-11-18
**Versión**: 1.0.0
**Mantenedores**: leito-monk

---

## 🔖 Resumen Rápido

**Para empezar rápido:**

```bash
# 1. Instalar
npm install

# 2. Desarrollar
npm run dev

# 3. Leer documentación
- README.md (visión general)
- COMPONENTS.md (componentes UI)
- composables/README.md (lógica reutilizable)

# 4. Crear un juego
- Usar GameLayout, ScoreBoard, FeedbackModal
- Integrar useGameState y useSound
- Agregar ruta en router/index.ts

# 5. Antes de finalizar
- Probar en navegador
- Ejecutar code_review
- Ejecutar codeql_checker
- Actualizar documentación si es necesario
```

¡Listo para contribuir al proyecto educativo! 🎮📚✨
