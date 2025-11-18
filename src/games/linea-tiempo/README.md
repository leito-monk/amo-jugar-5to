# 🕰️ Línea del Tiempo Interactiva

## Descripción
Juego educativo interactivo para 5to grado de Ciencias Sociales que enseña sobre los eventos clave del Siglo XVIII mediante una línea del tiempo visual e interactiva.

## Contenido Educativo
- **Materia**: Ciencias Sociales - Unidad 1
- **Grado**: 5to grado
- **Temas**:
  - La Ilustración (1740)
  - Revolución Industrial (1760)
  - Independencia de Estados Unidos (1776)
  - Revolución Francesa (1789)
  - Imperio Napoleónico (1804)
  - Invasiones Inglesas al Río de la Plata (1806)

## Objetivos de Aprendizaje
1. Comprender la cronología de eventos históricos del Siglo XVIII
2. Identificar relaciones de causa y efecto entre eventos históricos
3. Reconocer la influencia de las ideas ilustradas en las revoluciones
4. Contextualizar los eventos locales (Invasiones Inglesas) en el panorama mundial

## Mecánica del Juego

### 1. Línea del Tiempo (1700-1810)
- Línea horizontal visual con marcadores cada 10 años
- Representa 110 años de historia

### 2. Drag & Drop de Eventos
- Los jugadores arrastran tarjetas de eventos históricos
- Deben colocarlos en el año correcto de la línea del tiempo
- Tolerancia de ±5 años para la colocación

### 3. Sistema de Puntos
- **+15 puntos**: Por cada evento colocado correctamente
- **+10 puntos**: Por cada respuesta correcta en el quiz final

### 4. Conexiones Causa-Efecto
- Al completar la línea del tiempo, se visualizan flechas
- Las flechas muestran relaciones entre eventos
- Colores diferentes para causas y consecuencias

### 5. Quiz Final
- 5 preguntas de comprensión
- Retroalimentación educativa inmediata
- Refuerza el aprendizaje de relaciones causales

## Estructura de Archivos

```
linea-tiempo/
├── LineaTiempoGame.vue  # Componente principal del juego
├── eventos.json          # Datos de eventos históricos y quiz
└── README.md            # Este archivo
```

## Datos (eventos.json)

### Estructura de Eventos
```json
{
  "id": "identificador único",
  "titulo": "Nombre del evento",
  "año": 1789,
  "descripcion": "Descripción educativa del evento",
  "imagen": "ruta/a/imagen.jpg",
  "categoria": "revolucion|independencia|imperio|conflicto",
  "relacionadoCon": ["id_evento1", "id_evento2"],
  "esencia": "causa|consecuencia"
}
```

### Quiz Final
- 5 preguntas de opción múltiple
- Explicaciones educativas para cada respuesta
- Refuerza conceptos de causa-efecto

## Componentes Utilizados
- `GameLayout`: Layout estándar de juegos con header y modal de instrucciones
- `FeedbackModal`: Modal para mostrar retroalimentación al jugador

## Características Técnicas
- Vue 3 Composition API
- TypeScript para type safety
- Drag & Drop nativo del navegador
- SVG para visualización de línea del tiempo y conexiones
- Animaciones CSS para mejor UX
- Diseño responsive con Tailwind CSS y DaisyUI

## Flujo del Juego
1. El jugador ve una línea del tiempo vacía (1700-1810)
2. En la parte inferior hay tarjetas con eventos históricos
3. El jugador arrastra cada evento a su posición en la línea del tiempo
4. Si la colocación es correcta (±5 años), el evento se fija y suma puntos
5. Si es incorrecta, recibe feedback con el año correcto
6. Al completar todos los eventos, se muestran las conexiones entre ellos
7. Aparece un quiz final de 5 preguntas
8. Al completar el quiz, se muestra la puntuación final
9. El jugador puede reiniciar para mejorar su puntuación

## Validaciones
- ✅ Tolerancia de ±5 años para colocación
- ✅ Prevención de colocación duplicada
- ✅ Feedback inmediato en cada acción
- ✅ Verificación de quiz completo

## Futuras Mejoras
- [ ] Agregar imágenes reales de los eventos históricos
- [ ] Sonidos al colocar eventos correctamente
- [ ] Animaciones más elaboradas para las conexiones
- [ ] Modo multijugador competitivo
- [ ] Más eventos históricos y niveles de dificultad
- [ ] Guardar progreso y puntuaciones
