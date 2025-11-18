# Viaje por la Hidrosfera

## Descripción
Juego educativo para 5to grado sobre la hidrosfera terrestre. Los estudiantes exploran diferentes ubicaciones del planeta para aprender sobre el agua en sus distintos estados y tipos.

## Objetivo Educativo
- **Materia**: Ciencias Naturales
- **Unidad**: 1 - La Hidrosfera
- **Grado**: 5to
- **Competencias**:
  - Identificar la presencia de agua en diferentes lugares del planeta
  - Reconocer los estados del agua (líquido, sólido, gaseoso)
  - Diferenciar entre agua dulce y salada
  - Conocer reservas de agua importantes como el Acuífero Guaraní

## Mecánica del Juego

### Componentes
1. **Mapa Interactivo**: Representación del planeta con 10 ubicaciones clickeables
2. **Sistema de Quiz**: Preguntas sobre cada ubicación
3. **Seguimiento de Progreso**: Marcadores de ubicaciones visitadas
4. **Certificado**: Reconocimiento al completar todas las ubicaciones

### Flujo de Juego
1. El estudiante ve un mapa con 10 ubicaciones marcadas con ❓
2. Al hacer clic en una ubicación, aparece un modal con:
   - Nombre y descripción del lugar
   - Quiz de 3 preguntas:
     - ¿Hay agua aquí?
     - ¿En qué estado? (líquido, sólido, gaseoso)
     - Si es líquido: ¿Es dulce o salada?
3. Al responder correctamente:
   - La ubicación se marca como visitada (✅)
   - Se muestra un dato curioso
   - Se otorgan 10 puntos
4. Ubicación especial (Acuífero Guaraní):
   - Incluye información adicional sobre su extensión, países e importancia
5. Al completar las 10 ubicaciones:
   - Se muestra un certificado de explorador
   - El juego se marca como completado

## Ubicaciones Incluidas

1. **Océano Atlántico** - Agua salada, estado líquido
2. **Glaciar Perito Moreno** - Agua dulce, estado sólido
3. **Acuífero Guaraní** ⭐ - Agua dulce subterránea, estado líquido (ESPECIAL)
4. **Río Amazonas** - Agua dulce, estado líquido
5. **Desierto del Sahara** - Agua dulce subterránea, estado líquido
6. **Cataratas del Iguazú** - Agua dulce, estado líquido
7. **Nubes en la Atmósfera** - Agua dulce, estado gaseoso
8. **Mar Muerto** - Agua salada, estado líquido
9. **Casquete de Hielo Antártico** - Agua dulce, estado sólido
10. **Lago Titicaca** - Agua dulce, estado líquido

## Estructura de Archivos

```
src/games/viaje-hidrosfera/
├── HidrosferaGame.vue    # Componente principal del juego
├── locations.json        # Datos de las 10 ubicaciones
└── README.md            # Este archivo
```

## Tecnologías Utilizadas
- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS + DaisyUI
- Componentes reutilizables: GameLayout, ProgressTracker
- Composable: useGameState (para gestión de estado y persistencia)

## Sistema de Puntuación
- 10 puntos por cada ubicación descubierta correctamente
- Total máximo: 100 puntos

## Características Especiales
- **Validación progresiva**: Las preguntas se muestran secuencialmente según las respuestas
- **Feedback inmediato**: Mensajes de error con pistas si la respuesta es incorrecta
- **Información especial**: El Acuífero Guaraní incluye datos adicionales de importancia regional
- **Certificado personalizado**: Se otorga al completar todas las ubicaciones

## Conceptos Pedagógicos

### Estados del Agua
- **Líquido**: La forma más común (ríos, lagos, océanos)
- **Sólido**: Hielo (glaciares, casquetes polares)
- **Gaseoso**: Vapor de agua (nubes, humedad atmosférica)

### Tipos de Agua
- **Dulce**: Apta para consumo humano (ríos, lagos, glaciares, acuíferos)
- **Salada**: Alta concentración de sales (océanos, mares)

### Datos Curiosos Incluidos
Cada ubicación incluye un dato curioso educativo para mantener el interés del estudiante y proporcionar información adicional relevante.

## Integración con el Sistema
- Utiliza `useGameState` para persistir progreso en localStorage
- Se integra con el router de la aplicación
- Aparece en la vista de juegos (JuegosView.vue)
- Compatible con el sistema de seguimiento de progreso general
