# Autopista Numérica 🏁

## Descripción
Juego educativo de carreras para 5to grado - Matemática Unidad 1. Los estudiantes compiten en una carrera de autos respondiendo preguntas sobre números hasta 9.999.999 (lectura, escritura y comparación).

## Objetivo Pedagógico
- Dominar la lectura y escritura de números grandes (hasta 9.999.999)
- Comparar y ordenar números grandes
- Identificar el valor posicional de los dígitos
- Ubicar números en la recta numérica

## Mecánica del Juego

### Reglas
1. **Carrera de 4 autos**: 1 jugador vs 3 IA
2. **10 preguntas por carrera**: Variedad de tipos
3. **Avance del jugador**: 10% por respuesta correcta
4. **Avance de IA**: Automático y aleatorio
5. **Victoria**: Primer auto en llegar al 100%

### Tipos de Preguntas

#### 1. Lectura (lectura)
Convertir palabras a números.
- Ejemplo: "¿Cómo se escribe 'Dos millones quinientos mil'?"
- Respuesta: Opciones múltiples con el número correcto

#### 2. Escritura (escritura)
Convertir números a palabras.
- Ejemplo: "¿Cómo se lee 3.405.100?"
- Respuesta: Campo de texto libre (validación normalizada)

#### 3. Comparación (comparacion)
Comparar y ordenar números.
- Ejemplo: "¿Qué número es MAYOR?"
- Respuesta: Opciones múltiples

#### 4. Recta Numérica (recta)
Ubicar un número en una recta numérica.
- Ejemplo: "Ubica 5.500.000 en esta recta (1M - 10M)"
- Respuesta: Click en la recta (con tolerancia)

#### 5. Valor Posicional (valor_posicional)
Identificar el valor de un dígito según su posición.
- Ejemplo: "En 4.567.890, ¿qué valor tiene el 5?"
- Respuesta: Opciones múltiples

## Estructura de Archivos

```
src/games/autopista-numerica/
├── AutopistaGame.vue     # Componente principal del juego
├── questions.json        # Base de datos de preguntas
├── gameLogic.js         # Funciones de lógica del juego
└── README.md            # Este archivo
```

## Componentes Utilizados
- **GameLayout**: Layout estándar con navegación
- **ScoreBoard**: Muestra puntos y estadísticas
- **useGameState**: Gestión de estado y puntuación
- **useSound**: Efectos de sonido

## Sistema de Puntuación
- **+15 puntos** por respuesta correcta
- **+50 puntos** bonus por ganar la carrera
- Se registran respuestas correctas e incorrectas
- Se calcula precisión final

## Dificultad
Las preguntas están clasificadas en tres niveles:
- **Fácil**: 3 preguntas (números más simples)
- **Medio**: 4 preguntas (números intermedios)
- **Difícil**: 3 preguntas (números más complejos)

## Características Técnicas

### gameLogic.js
- `formatNumber(num)`: Formatea número con separadores (3.456.789)
- `numberToWords(num)`: Convierte número a palabras en español
- `wordsToNumber(str)`: Convierte palabras a número (tolerante)
- `selectRandomQuestions(pool, total)`: Selecciona preguntas balanceadas
- `validateTextAnswer(user, correct)`: Validación normalizada de texto
- `calculateNumberLineValue(clickX, width, min, max)`: Calcula valor en recta
- `validateNumberLine(user, correct, tolerance)`: Valida posición en recta
- `randomAISpeed()`: Genera velocidad aleatoria para IA

### Estado del Juego
- Autos con progreso individual
- Índice de pregunta actual
- Sistema de intervalos para avance automático
- Gestión de game over y victoria

### Animaciones
- Transición suave del movimiento de autos
- Efecto de brillo en auto del jugador
- Línea de meta animada (checkered pattern)
- Feedback visual de respuestas

## Uso

```javascript
import AutopistaGame from './games/autopista-numerica/AutopistaGame.vue'

// Agregar ruta en router
{
  path: '/juegos/autopista-numerica',
  name: 'autopista-numerica',
  component: AutopistaGame
}
```

## Créditos
Desarrollado para "Amo Jugar 5to" - Plataforma educativa de juegos para 5to grado.
