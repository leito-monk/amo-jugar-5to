# 🔍 Detectivismo Poético

## Descripción

**Detectivismo Poético** es un juego educativo interactivo diseñado para estudiantes de 10-11 años (5to grado) que les enseña a identificar recursos literarios en poemas de manera divertida y atractiva.

## Contenido Pedagógico

### Recursos Literarios Incluidos

1. **Comparación**: Establece semejanzas entre dos elementos usando palabras como "como", "parece", "es similar a"
   - Ejemplo: "La luna es un plato de plata"

2. **Personificación**: Atribuye características humanas a objetos, animales o ideas abstractas
   - Ejemplo: "El viento susurra secretos"

3. **Hipérbole**: Exageración para enfatizar o dar mayor importancia a algo
   - Ejemplo: "Es más grande que mil elefantes"

4. **Imagen Sensorial**: Descripción que apela a los cinco sentidos (vista, oído, tacto, olfato, gusto)
   - Ejemplo: "Sabor a sal", "murmullo fresco"

## Objetivos de Aprendizaje

- Identificar diferentes recursos literarios en textos poéticos
- Comprender el propósito y efecto de cada recurso
- Desarrollar habilidades de análisis literario
- Mejorar la comprensión lectora
- Apreciar la belleza del lenguaje poético

## Mecánica del Juego

### Cómo Jugar

1. **Lee el poema**: Cada poema tiene entre 4-8 versos
2. **Selecciona texto**: Usa el mouse para seleccionar fragmentos del poema
3. **Identifica el recurso**: Aparece un menú con 4 opciones de recursos literarios
4. **Recibe feedback**: Obtén explicaciones inmediatas sobre tu respuesta
5. **Completa el poema**: Encuentra todos los recursos para avanzar

### Sistema de Puntuación

- **Primera vez que encuentras un tipo**: +15 puntos
- **Segunda vez**: +10 puntos
- **Tercera vez o más**: +5 puntos

### Sistema de Pistas

Después de 3 errores, el juego muestra pistas visuales sutiles para ayudar al estudiante a localizar los recursos literarios.

## Contenido

### 10 Poemas Incluidos

El juego incluye 10 poemas originales con diferentes niveles de dificultad:

- **Fácil (3 poemas)**: Recursos literarios más evidentes y directos
- **Medio (5 poemas)**: Requiere más análisis y comprensión
- **Difícil (2 poemas)**: Recursos más sutiles y complejos

### Temas de los Poemas

1. La Luna Traviesa
2. El Sol Gigante
3. El Mar Cantante
4. La Noche Estrellada
5. El Jardín Mágico
6. El Viento Juguetón
7. La Lluvia Danzarina
8. El Río Aventurero
9. El Bosque Encantado
10. La Montaña Sabia

## Estructura de Archivos

```
src/games/detectivismo-poetico/
├── DetectiveGame.vue    # Componente principal del juego
├── poemas.json          # Base de datos de poemas y recursos
└── README.md            # Esta documentación
```

## Tecnologías Utilizadas

- **Vue 3**: Framework de JavaScript
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Estilos
- **DaisyUI**: Componentes UI

## Componentes Reutilizados

- `GameLayout.vue`: Layout general para juegos
- `FeedbackModal.vue`: Modal para mostrar retroalimentación

## Características Técnicas

### Selección de Texto

El juego usa la API nativa del navegador `window.getSelection()` para capturar el texto seleccionado por el usuario.

### Menú Contextual

Un menú flotante aparece cerca del texto seleccionado con las 4 opciones de recursos literarios.

### Validación Inteligente

El sistema valida que:
- El texto seleccionado coincida (total o parcialmente) con un recurso
- El tipo de recurso sea correcto
- No se haya encontrado previamente

### Feedback Pedagógico

Cada recurso incluye una explicación detallada que ayuda al estudiante a comprender por qué es ese tipo de recurso específico.

## Futuras Mejoras

- [ ] Añadir más poemas
- [ ] Incluir diferentes niveles de dificultad seleccionables
- [ ] Agregar modo multijugador
- [ ] Crear un sistema de logros
- [ ] Añadir estadísticas detalladas del progreso
- [ ] Incluir efectos de sonido
- [ ] Implementar animaciones más elaboradas

## Uso en el Aula

### Recomendaciones para Docentes

1. **Introducción**: Explique los 4 tipos de recursos literarios antes de jugar
2. **Práctica guiada**: Haga el primer poema junto con los estudiantes
3. **Trabajo independiente**: Permita que los estudiantes exploren por su cuenta
4. **Discusión**: Analicen los recursos encontrados y sus efectos
5. **Extensión**: Invite a los estudiantes a crear sus propios poemas usando estos recursos

### Tiempo Estimado

- Por poema: 5-10 minutos
- Juego completo: 50-90 minutos
- Puede dividirse en múltiples sesiones

## Accesibilidad

- Texto legible con alto contraste
- Fuentes amigables (Comic Neue)
- Instrucciones claras y concisas
- Sistema de pistas para ayuda adicional
- Feedback positivo y motivador

## Licencia

Este juego es parte del proyecto **Yo Amo Aprender Digital** y está bajo la Licencia GNU General Public License v3.0.
