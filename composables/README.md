# Composables - Yo Amo Aprender

Composables reutilizables para el manejo de estado y persistencia en los juegos educativos.

## useLocalStorage.js

Wrapper de `localStorage` con prefijo `yoAmoAprender_` para evitar conflictos con otras aplicaciones.

### Funciones

#### `save(key, data)`
Guarda datos en localStorage con serialización JSON.
- **Parámetros:**
  - `key` (string): Clave para almacenar (sin prefijo)
  - `data` (any): Datos a guardar (se serializarán automáticamente)
- **Retorna:** `boolean` - `true` si se guardó exitosamente, `false` en caso de error

```javascript
import { save } from './composables/useLocalStorage.js';

save('userProgress', { level: 5, score: 100 });
```

#### `load(key)`
Carga datos desde localStorage con deserialización JSON.
- **Parámetros:**
  - `key` (string): Clave a cargar (sin prefijo)
- **Retorna:** `any` - Datos deserializados o `null` si no existen o hay error

```javascript
import { load } from './composables/useLocalStorage.js';

const progress = load('userProgress');
```

#### `remove(key)`
Elimina una entrada de localStorage.
- **Parámetros:**
  - `key` (string): Clave a eliminar (sin prefijo)
- **Retorna:** `boolean` - `true` si se eliminó exitosamente, `false` en caso de error

```javascript
import { remove } from './composables/useLocalStorage.js';

remove('userProgress');
```

#### `clear()`
Limpia todas las entradas del proyecto (solo las que tienen el prefijo `yoAmoAprender_`).
- **Retorna:** `boolean` - `true` si se limpió exitosamente, `false` en caso de error

```javascript
import { clear } from './composables/useLocalStorage.js';

clear(); // Limpia solo las entradas del proyecto
```

#### `getAllKeys()`
Lista todas las claves del proyecto (sin prefijo).
- **Retorna:** `string[]` - Array de claves sin prefijo

```javascript
import { getAllKeys } from './composables/useLocalStorage.js';

const keys = getAllKeys(); // ['gameState_math', 'userProgress', ...]
```

### Manejo de Errores
Todas las funciones incluyen manejo de errores con `try-catch`. En caso de error:
- Se registra en consola con `console.error`
- Las funciones de escritura retornan `false`
- Las funciones de lectura retornan `null` o array vacío

---

## useGameState.js

Estado compartido reactivo para todos los juegos, con persistencia automática en localStorage.

### Estado por Defecto

```javascript
{
  gameId: '',           // ID del juego
  score: 0,             // Puntuación acumulada
  completed: false,     // Si el nivel/juego está completado
  attemptsCount: 0,     // Número de intentos
  correctAnswers: 0,    // Respuestas correctas
  totalQuestions: 0,    // Total de preguntas respondidas
  timeSpent: 0,         // Tiempo transcurrido en segundos
  startTime: null,      // Timestamp de inicio
  lastPlayed: null,     // Fecha del último juego
  achievements: [],     // Array de IDs de logros desbloqueados
  currentLevel: 1,      // Nivel actual
  maxLevel: 1          // Nivel máximo alcanzado
}
```

### Funciones

#### `loadState(gameId)`
Carga el estado desde localStorage o inicializa con el estado por defecto.
- **Parámetros:**
  - `gameId` (string): ID del juego a cargar
- **Retorna:** `object` - Estado cargado

```javascript
import { loadState } from './composables/useGameState.js';

loadState('math-game-addition');
```

#### `saveState()`
Persiste el estado actual en localStorage.
- **Retorna:** `boolean` - `true` si se guardó exitosamente

```javascript
import { saveState } from './composables/useGameState.js';

saveState();
```

#### `startGame()`
Inicia el juego: registra el tiempo de inicio, incrementa el contador de intentos y actualiza la fecha del último juego.

```javascript
import { startGame } from './composables/useGameState.js';

startGame();
```

#### `addScore(points)`
Suma puntos al puntaje total (solo si `points > 0`).
- **Parámetros:**
  - `points` (number): Puntos a sumar

```javascript
import { addScore } from './composables/useGameState.js';

addScore(10); // Suma 10 puntos
```

#### `recordAnswer(isCorrect)`
Registra una respuesta e incrementa los contadores correspondientes.
- **Parámetros:**
  - `isCorrect` (boolean): `true` si la respuesta es correcta

```javascript
import { recordAnswer } from './composables/useGameState.js';

recordAnswer(true);  // Respuesta correcta
recordAnswer(false); // Respuesta incorrecta
```

#### `levelUp()`
Avanza al siguiente nivel y actualiza el nivel máximo si es necesario.

```javascript
import { levelUp } from './composables/useGameState.js';

levelUp();
```

#### `markCompleted()`
Marca el juego como completado y calcula el tiempo transcurrido desde el inicio.

```javascript
import { markCompleted } from './composables/useGameState.js';

markCompleted();
```

#### `resetGame()`
Resetea el juego al estado por defecto, manteniendo solo el `attemptsCount`.

```javascript
import { resetGame } from './composables/useGameState.js';

resetGame();
```

#### `unlockAchievement(id)`
Desbloquea un logro (lo agrega si no existe en el array).
- **Parámetros:**
  - `id` (string): ID del logro a desbloquear

```javascript
import { unlockAchievement } from './composables/useGameState.js';

unlockAchievement('perfect-score');
```

#### `getState()`
Obtiene el estado actual completo.
- **Retorna:** `object` - Estado actual

```javascript
import { getState } from './composables/useGameState.js';

const currentState = getState();
```

### Computed Properties

#### `accuracy`
Porcentaje de aciertos (0-100).
- **Tipo:** `ComputedRef<number>`

```javascript
import { accuracy } from './composables/useGameState.js';

console.log(`Precisión: ${accuracy.value}%`);
```

#### `hasPlayed`
Indica si el juego ha sido jugado al menos una vez.
- **Tipo:** `ComputedRef<boolean>`

```javascript
import { hasPlayed } from './composables/useGameState.js';

if (hasPlayed.value) {
  console.log('El jugador tiene experiencia previa');
}
```

#### `formattedTime`
Tiempo transcurrido formateado como "MM:SS".
- **Tipo:** `ComputedRef<string>`

```javascript
import { formattedTime } from './composables/useGameState.js';

console.log(`Tiempo: ${formattedTime.value}`); // "05:32"
```

---

## useSound.js

Sistema de sonidos usando Web Audio API para reproducir efectos de audio en los juegos.

### Funciones

#### `playCorrect()`
Reproduce un sonido de acierto (secuencia ascendente de tonos).

```javascript
import { playCorrect } from './composables/useSound.js';

playCorrect();
```

#### `playWrong()`
Reproduce un sonido de error (secuencia descendente de tonos).

```javascript
import { playWrong } from './composables/useSound.js';

playWrong();
```

#### `playComplete()`
Reproduce un sonido de nivel completado (fanfarria de éxito).

```javascript
import { playComplete } from './composables/useSound.js';

playComplete();
```

#### `toggleMute()`
Alterna entre silenciado y con sonido.
- **Retorna:** `boolean` - Nuevo estado de silencio

```javascript
import { toggleMute } from './composables/useSound.js';

const isMuted = toggleMute();
```

#### `getMuteState()`
Obtiene el estado actual de silencio.
- **Retorna:** `boolean` - `true` si está silenciado

```javascript
import { getMuteState } from './composables/useSound.js';

if (getMuteState()) {
  console.log('Sonidos desactivados');
}
```

#### `setMuted(muted)`
Establece el estado de silencio.
- **Parámetros:**
  - `muted` (boolean): `true` para silenciar, `false` para activar sonido

```javascript
import { setMuted } from './composables/useSound.js';

setMuted(true); // Silenciar
```

### Implementación

- Utiliza **Web Audio API** para generar tonos de forma programática
- Los sonidos se generan con osciladores (no requiere archivos de audio)
- Incluye envelope para evitar clicks en el audio
- Respeta el estado de silencio configurado por el usuario

---

## Ejemplo de Uso Completo

```javascript
import { loadState, startGame, recordAnswer, addScore, markCompleted, accuracy, formattedTime } from './composables/useGameState.js';
import { playCorrect, playWrong, playComplete } from './composables/useSound.js';

// Inicializar el juego
loadState('math-game-addition');
startGame();

// Simular juego
function handleAnswer(isCorrect) {
  recordAnswer(isCorrect);
  
  if (isCorrect) {
    addScore(10);
    playCorrect();
  } else {
    playWrong();
  }
  
  console.log(`Precisión actual: ${accuracy.value}%`);
}

// Responder preguntas
handleAnswer(true);  // Respuesta correcta
handleAnswer(true);  // Respuesta correcta
handleAnswer(false); // Respuesta incorrecta

// Completar el juego
markCompleted();
playComplete();

console.log(`Tiempo total: ${formattedTime.value}`);
```

---

## Compatibilidad

- **Vue 3**: Requiere Vue 3 para las funciones reactivas (`ref`, `computed`)
- **Navegadores**: Compatible con navegadores modernos que soporten:
  - `localStorage`
  - `Web Audio API` (para useSound.js)
  - ES6+ (módulos, arrow functions, etc.)

---

## Notas Técnicas

1. **Prefijo de localStorage**: Todas las claves se guardan con el prefijo `yoAmoAprender_` para evitar conflictos
2. **Persistencia automática**: `useGameState.js` guarda automáticamente después de cada cambio
3. **Computed properties**: Son reactivas y se actualizan automáticamente cuando cambia el estado
4. **Web Audio API**: Los sonidos se generan programáticamente, no requieren archivos externos
5. **Manejo de errores**: Todas las funciones incluyen try-catch y logging de errores
