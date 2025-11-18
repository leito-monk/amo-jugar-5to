# 🔢 Transformador de Calculadora

## Descripción

Juego educativo de matemáticas para 5to grado enfocado en el aprendizaje del **valor posicional** de los números. Los estudiantes aprenden a comprender qué cifras cambian al realizar operaciones de suma y resta con números grandes.

## Objetivo Pedagógico

- Comprender el sistema de valor posicional de números hasta 9.999.999
- Identificar qué posiciones (unidades, decenas, centenas, miles, etc.) se modifican al sumar o restar
- Desarrollar intuición sobre el impacto de operaciones en diferentes posiciones
- Practicar operaciones con números grandes de forma visual e interactiva

## Modos de Juego

### 📝 Modo Práctica Libre
- Calculadora funcional de 7 dígitos
- Visualización en tiempo real de los cambios en cada posición
- Botones de operaciones rápidas (+100.000, +10.000, -100.000, -10.000)
- Panel explicativo que muestra qué posiciones cambiaron
- Ideal para exploración libre y experimentación

### 🎯 Modo Desafíos
- 15 desafíos progresivos
- Cada desafío presenta un número inicial y un número objetivo
- El estudiante debe identificar la operación y valor correctos para transformar uno en otro
- Sistema de puntos: 20 puntos por desafío correcto
- Feedback inmediato con pistas educativas
- Barra de progreso visual

## Componentes del Juego

### `CalculadoraGame.vue`
Componente principal con:
- Display de 7 dígitos estilo calculadora retro (fondo negro, texto verde)
- Teclado numérico completo (0-9)
- Botones de operación (+, -, =, C)
- Panel de explicación con tabla de cambios
- Interfaz de desafíos con validación

### `calculatorLogic.js`
Funciones auxiliares:
- `detectChangedDigits(before, after)`: Detecta qué posiciones cambiaron
- `getPositionName(idx)`: Convierte índice a nombre de posición (millones, centenas de mil, etc.)
- `formatWithSeparators(num)`: Formatea números con separadores de miles (3.456.789)
- `generateExplanation(op, value, positions)`: Genera texto pedagógico explicativo
- `calculate(num1, op, num2)`: Realiza la operación matemática
- `isValidNumber(num)`: Valida rango 0-9.999.999

### `challenges.json`
Datos de los 15 desafíos:
- Progresión de dificultad
- Variedad de operaciones (suma y resta)
- Diferentes órdenes de magnitud
- Explicaciones pedagógicas incluidas

## Características Técnicas

- **Framework**: Vue 3 con Composition API y TypeScript
- **Estilos**: TailwindCSS + DaisyUI
- **Estado**: Refs reactivos de Vue
- **Animaciones**: CSS animations para resaltar cambios
- **Validación**: Límites de rango y operaciones seguras

## Uso de Componentes Compartidos

- `GameLayout`: Layout estándar con header, botón de ayuda e instrucciones
- `ProgressTracker`: Barra de progreso visual para modo desafíos

## Sistema de Puntuación

**Modo Desafíos:**
- +20 puntos por cada desafío correcto
- Puntaje máximo: 300 puntos (15 desafíos × 20 puntos)
- Sin penalización por errores (enfoque pedagógico sobre competitivo)

## Animaciones y Feedback Visual

- **Dígitos cambiados**: Color amarillo con animación de pulso
- **Transiciones**: Suaves entre números
- **Feedback inmediato**: Alertas de color según el resultado
- **Display retro**: Estilo calculadora clásica (verde sobre negro)

## Flujo de Usuario

### Práctica Libre:
1. Usuario ingresa un número (hasta 7 dígitos)
2. Usuario selecciona operación (+ o -)
3. Usuario ingresa segundo número o usa botones rápidos
4. Usuario presiona =
5. Sistema muestra resultado y destaca dígitos cambiados
6. Panel de explicación muestra tabla de cambios

### Desafíos:
1. Sistema presenta desafío (número inicial → número objetivo)
2. Usuario analiza qué operación y valor necesita
3. Usuario ingresa su respuesta (operación + valor)
4. Usuario presiona "Verificar"
5. Sistema valida y da feedback
6. Si es correcto: +20 puntos y avanza al siguiente
7. Si es incorrecto: muestra pista educativa
8. Al completar los 15: opción de reiniciar

## Extensibilidad

El juego está diseñado para ser fácilmente extensible:

- **Más desafíos**: Agregar entradas al archivo `challenges.json`
- **Nuevas operaciones**: Extender `calculatorLogic.js` con multiplicación/división
- **Niveles de dificultad**: Implementar categorías de desafíos
- **Modos adicionales**: Agregar modo "contra reloj" o "competencia"
- **Persistencia**: Integrar con `useGameState` para guardar progreso

## Referencias Pedagógicas

Basado en ejercicios del libro de 5to grado (Macarena/Pablo/Mica/Juli) enfocados en:
- Comprensión del valor posicional
- Impacto de operaciones en diferentes órdenes de magnitud
- Descomposición de números grandes
- Relación entre valor absoluto y posición

## Instalación y Uso

El juego se integra automáticamente en la aplicación principal. Para acceder:

```javascript
// Router
{
  path: '/transformador-calculadora',
  name: 'transformador-calculadora',
  component: () => import('../games/transformador-calculadora/CalculadoraGame.vue')
}
```

## Testing

Casos de prueba recomendados:
- [ ] Calculadora acepta entrada de 7 dígitos
- [ ] Operaciones básicas funcionan correctamente
- [ ] Detección de cambios identifica posiciones correctas
- [ ] Validación de rango previene números negativos o > 9.999.999
- [ ] Modo desafío valida respuestas correctas
- [ ] Botones rápidos ejecutan operaciones correctas
- [ ] Animaciones se muestran al cambiar dígitos
- [ ] Navegación entre modos funciona correctamente

## Notas de Desarrollo

- Display siempre muestra 7 dígitos (con padding de ceros)
- Índice 0 = millones, Índice 6 = unidades
- Números formateados con punto (.) como separador de miles
- Animación de pulso en dígitos cambiados con duración de 1 segundo
- Clear (C) resetea todo el estado de la calculadora
