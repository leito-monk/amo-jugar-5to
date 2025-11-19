# Quiz Rápido Unidad 1

Quiz transversal de repaso con todas las materias.

## Características

- **3 niveles de dificultad**: Fácil, Medio y Difícil
- **20 preguntas aleatorias** por partida
- **Timer por pregunta**:
  - Fácil/Medio: 30 segundos
  - Difícil: 20 segundos
- **Feedback inmediato** con explicaciones
- **Ranking de puntajes** guardado en localStorage
- **Estadísticas por materia** al finalizar
- **Podio con Top 5** mejores jugadores

## Materias Incluidas

- **Lengua**: Recursos literarios, acentuación, figuras retóricas
- **Matemática**: Números hasta 9.999.999, valor posicional, operaciones
- **Ciencias Sociales**: Invasiones Inglesas (1806-1807)
- **Ciencias Naturales**: Hidrosfera, ciclo del agua, estados del agua

## Sistema de Puntos

- Respuesta correcta: 10 puntos base + bonus por tiempo restante
- Respuesta incorrecta: 0 puntos
- Tiempo agotado: 0 puntos

El bonus de tiempo se calcula como: `tiempo_restante / 2` puntos adicionales

## Estructura de Datos

### preguntas.json

Cada pregunta incluye:
- `id`: Identificador único
- `materia`: Lengua, Matemática, Ciencias Sociales, Ciencias Naturales
- `dificultad`: facil, medio, dificil
- `pregunta`: Texto de la pregunta
- `opciones`: Array de opciones con texto y flag `correcto`
- `explicacion`: (Opcional) Explicación de la respuesta correcta

### Ejemplo:

```json
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
}
```

## Uso

### Como juego independiente

Importar en el router:

```javascript
{
  path: '/juegos/quiz-rapido',
  name: 'quiz-rapido',
  component: () => import('../games/quiz-rapido/QuizGame.vue')
}
```

### Agregar a la galería de juegos

En `JuegosView.vue`:

```javascript
{
  id: 'quiz-rapido',
  titulo: 'Quiz Rápido Unidad 1',
  materia: 'Transversal',
  descripcion: 'Repaso rápido con preguntas de todas las materias',
  icono: '🎯',
  dificultad: 'Variable',
  duracion: '15 min',
  activo: true,
  completado: false,
  progreso: 0
}
```

## Funcionalidades Técnicas

- **Randomización**: Usa `selectRandomItems` y `shuffleArray` de `utils/randomizer.js`
- **Mezclado de opciones**: Usa `shuffleQuestionOptions` de `utils/answerShuffler.js`
- **Timer**: Implementado con `setInterval` y limpieza en `onUnmounted`
- **Persistencia**: Ranking guardado en `localStorage`
- **Componentes reutilizados**:
  - `GameLayout`: Layout principal
  - `ScoreBoard`: Puntaje y progreso
  - `FeedbackModal`: Retroalimentación inmediata

## Expansión

Para agregar más preguntas:

1. Editar `preguntas.json`
2. Seguir el formato establecido
3. Distribuir equitativamente entre materias y dificultades
4. Agregar explicaciones cuando sea posible

Pool actual: **60 preguntas** (15 por materia)
