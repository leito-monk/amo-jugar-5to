# Portal Mágico: Oz y Narnia

## Descripción
Juego educativo de aventura narrativa que explora dos mundos fantásticos clásicos de la literatura infantil: "El Mago de Oz" de L. Frank Baum y "Las Crónicas de Narnia" de C.S. Lewis.

## Objetivo Pedagógico
- **Materia**: Lengua - 5to grado
- **Unidad**: 3 - "De un mundo a otro"
- **Competencias**:
  - Comprensión lectora
  - Vocabulario y léxico
  - Análisis de mundos fantásticos
  - Creatividad y escritura

## Mecánica del Juego

### 1. Selección de Mundo
El jugador elige entre dos mundos para explorar:
- **El Mágico Mundo de Oz**: Sigue a Dorothy en su viaje
- **El Reino de Narnia**: Acompaña a Lucy en su descubrimiento

### 2. Navegación por Escenas
Cada mundo contiene 6 escenas secuenciales que narran la historia:
- Lectura de la escena con descripción detallada
- Pregunta de comprensión lectora
- Colección de palabras nuevas

### 3. Tipos de Preguntas
- **Selección múltiple**: Elegir la respuesta correcta entre 3 opciones
- **Emparejamiento**: Relacionar personajes con sus características o deseos

### 4. Banco de Palabras
- Se van agregando nuevas palabras al vocabulario del jugador
- Cada palabra incluye:
  - Definición
  - Ejemplo de uso
  - Sinónimos
- Las palabras se pueden consultar en cualquier momento

### 5. Actividad Final
Al completar un mundo, el jugador debe:
- Crear su propio mundo fantástico
- Describir el portal de acceso
- Escribir una descripción de mínimo 50 palabras
- Nombrar un personaje principal

## Sistema de Puntuación
- **Respuesta correcta**: 15 puntos
- **Completar mundo creativo**: 50 puntos

## Estructura de Archivos

```
src/games/portal-magico/
├── PortalGame.vue        # Componente principal del juego
├── mundos.json          # Datos de los mundos y escenas
├── vocabulario.json     # Diccionario de palabras
└── README.md           # Este archivo
```

## Datos de Contenido

### mundos.json
Contiene la estructura de ambos mundos con:
- 6 escenas por mundo (Oz y Narnia)
- Descripción narrativa de cada escena
- Preguntas de comprensión
- Palabras nuevas asociadas

### vocabulario.json
Base de datos de 36 palabras con:
- Definiciones claras
- Ejemplos contextualizados
- Sinónimos relevantes

## Características Técnicas

### Componentes Utilizados
- `GameLayout`: Layout principal con sistema de ayuda
- `ScoreBoard`: Muestra la puntuación actual
- `ProgressTracker`: Indica el progreso en las escenas
- `FeedbackModal`: Modal para retroalimentación

### Composables
- `useGameState`: Gestión del estado del juego (puntuación, progreso, etc.)

### Persistencia
- Progreso guardado en localStorage
- Mundos creados guardados para revisión posterior

## Notas de Implementación

### Sistema de Ayuda
El juego utiliza el sistema de ayuda integrado en `GameLayout`, que:
- Muestra las instrucciones automáticamente en la primera visita
- Permite consultar las instrucciones en cualquier momento
- Persiste el estado de "instrucciones vistas"

### Vocabulario Progresivo
El banco de palabras se va llenando conforme el jugador avanza:
- Solo se muestran palabras de escenas completadas
- Se evitan duplicados
- Las palabras son clickeables para ver su definición

### Juego de Emparejamiento
Para preguntas tipo "emparejamiento":
1. Los deseos se mezclan aleatoriamente
2. El jugador hace clic en cada deseo para asignarlo
3. Se valida automáticamente cuando se completan todos los pares
4. Feedback inmediato sobre la corrección

## Adaptación Curricular
Basado en los contenidos curriculares de 5to grado:
- Literatura fantástica
- Mundos imaginarios
- Comprensión de textos narrativos
- Enriquecimiento del vocabulario
- Producción escrita creativa
