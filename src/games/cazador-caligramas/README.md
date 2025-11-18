# Cazador de Caligramas

## 📖 Descripción

**Cazador de Caligramas** es un juego educativo interactivo diseñado para estudiantes de 10-11 años que explora el mundo de los caligramas (poemas con forma visual). Basado en el libro "Estar en poesía" de Fabián Sevilla, este juego ayuda a los estudiantes a comprender que la poesía puede ser visual y artística.

## 🎯 Objetivos Pedagógicos

- **Contenido**: Caligramas (poemas con forma visual)
- **Libro de referencia**: "Estar en poesía" - Fabián Sevilla
- **Objetivo principal**: Comprender que la poesía puede ser visual
- **Edad recomendada**: 10-11 años (5to grado)
- **Duración estimada**: 60 minutos
- **Prerequisito**: PROMPT-002

## 🎮 Mecánica del Juego

1. **Visualización**: Se muestra una silueta vacía de una figura (corazón, mariposa, árbol)
2. **Desafío**: Se presentan 5-12 versos desordenados en un banco de versos
3. **Interacción**: El estudiante arrastra cada verso a su posición correcta en el grid
4. **Retroalimentación**: Verificación inmediata con feedback visual y auditivo
5. **Progresión**: 3 niveles de dificultad creciente

## 📊 Niveles

### Nivel 1: Corazón de Amor
- **Dificultad**: Fácil
- **Versos**: 5
- **Grid**: 5x5
- **Tema**: Amor y pasión

### Nivel 2: Mariposa de Libertad
- **Dificultad**: Medio
- **Versos**: 8
- **Grid**: 7x7
- **Tema**: Libertad y naturaleza

### Nivel 3: Árbol de la Vida
- **Dificultad**: Difícil
- **Versos**: 12
- **Grid**: 9x7
- **Tema**: Naturaleza y vida

## 🎯 Sistema de Puntuación

El puntaje de cada nivel se calcula según:

- **Base**: 100 puntos
- **Penalización por error**: -5 puntos por intento incorrecto
- **Penalización por pista**: -10 puntos por pista usada
- **Bonus de velocidad**: +20 puntos si se completa en menos de 2 minutos
- **Puntaje mínimo**: 10 puntos garantizados

### Fórmula
```
score = 100 - (errores × 5) - (pistas × 10) + (bonus_tiempo)
score = max(score, 10)
```

## 💡 Sistema de Pistas

- **Cantidad inicial**: 3 pistas por nivel
- **Función**: Cada pista proporciona orientación sobre dónde colocar los versos
- **Costo**: 10 puntos por pista usada
- **Restricción**: Una vez usadas las 3 pistas, no hay más disponibles en ese nivel

## 🎨 Características Técnicas

### Tecnologías Utilizadas
- **Vue 3**: Framework reactivo
- **Drag & Drop API**: Interacción de arrastrar y soltar
- **Touch Events**: Soporte para dispositivos móviles
- **Composables personalizados**: useGameState, useSound
- **Tailwind CSS + DaisyUI**: Estilos y componentes UI

### Estructura de Archivos
```
src/games/cazador-caligramas/
├── CaligramaGame.vue          # Componente principal del juego
├── gameLogic.js               # Funciones de lógica del juego
├── caligramas-content.json    # Contenido de los caligramas
└── README.md                  # Este archivo
```

### Funciones de Lógica (gameLogic.js)

#### `shuffleArray(array)`
Mezcla un array usando el algoritmo Fisher-Yates para randomizar el orden de los versos.

#### `checkPosition(placed, correct)`
Compara si la posición donde se colocó el verso coincide con la posición correcta.

#### `calculateScore(attempts, hintsUsed, timeElapsed)`
Calcula el puntaje del nivel basado en errores, pistas usadas y tiempo transcurrido.

#### `getRandomMotivationalMessage(messages)`
Selecciona aleatoriamente un mensaje motivacional del array para mostrar al jugador.

## 📱 Compatibilidad

### Desktop
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### Mobile
- ✅ iOS Safari (touch support)
- ✅ Chrome Android (touch support)
- ✅ Firefox Mobile (touch support)

## 🎯 Validación Final

Antes de considerar el juego completo, verificar:

- [ ] Drag & drop funciona en desktop
- [ ] Touch funciona en mobile
- [ ] Versos solo encajan en posición correcta
- [ ] Sistema de pistas funciona correctamente
- [ ] Puntuación se calcula correctamente
- [ ] Estado del juego se persiste al recargar
- [ ] Los 3 niveles son completables
- [ ] Modal final muestra estadísticas correctas
- [ ] Sonidos de retroalimentación funcionan
- [ ] Diseño responsivo en diferentes tamaños de pantalla

## 🚀 Cómo Usar

1. **Iniciar el juego**: Navegar a `/juegos/cazador-caligramas`
2. **Leer instrucciones**: Hacer clic en el botón de ayuda (?) en el header
3. **Arrastrar versos**: Tomar un verso del banco y arrastrarlo a una celda del grid
4. **Usar pistas**: Si necesitas ayuda, hacer clic en el botón de pista
5. **Completar nivel**: Colocar todos los versos correctamente
6. **Avanzar**: Hacer clic en "Siguiente Nivel" para continuar

## 🎨 Diseño Visual

- **Siluetas**: Representación visual de las formas (corazón, mariposa, árbol)
- **Colores**: Paleta educativa con primary (#4F46E5) y secondary (#F59E0B)
- **Animaciones**: Transiciones suaves para drag & drop
- **Feedback visual**: Cambios de color al colocar versos correctamente
- **Responsive**: Layout adaptable a móviles y tablets

## 🔊 Retroalimentación Auditiva

- **Correcto**: Sonido de éxito al colocar correctamente
- **Incorrecto**: Sonido de error al colocar incorrectamente
- **Completado**: Fanfarria al completar un nivel

## 📈 Progreso del Jugador

El juego guarda automáticamente:
- Puntuación total
- Nivel actual
- Intentos realizados
- Respuestas correctas
- Tiempo de juego

## 🤝 Contribuir

Para agregar nuevos caligramas:

1. Editar `caligramas-content.json`
2. Agregar un nuevo objeto con la estructura:
   - `id`: Número único
   - `nivel`: Nivel de dificultad (1-3+)
   - `titulo`: Nombre del caligrama
   - `forma`: Tipo de forma
   - `gridSize`: { rows, cols }
   - `versos`: Array de objetos { id, texto, posicion }
   - `silueta`: Matriz 2D (0=vacío, 1=activo)
   - `pistas`: Array de strings con pistas

## 📝 Licencia

Este juego es parte del proyecto "Yo Amo Aprender Digital" bajo licencia GNU GPL v3.0.

---

**Desarrollado con ❤️ para fomentar el amor por la poesía visual**
