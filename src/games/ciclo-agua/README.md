# 🌊 Ciclo del Agua: La Gran Aventura

## Descripción
Juego educativo interactivo sobre el ciclo del agua para estudiantes de 5to grado. Los estudiantes experimentan el ciclo del agua desde la perspectiva de una gota de agua, viajando a través de diferentes etapas y procesos.

## Materia
**Ciencias Naturales - Unidad 1**

## Contenido Educativo
- Ciclo del agua
- Cambios de estado del agua
- Procesos del ciclo: evaporación, condensación, precipitación, infiltración, escorrentía

## Objetivos de Aprendizaje
1. Comprender los procesos del ciclo del agua
2. Identificar los cambios de estado del agua
3. Reconocer la importancia del ciclo del agua en la naturaleza
4. Relacionar cada proceso con fenómenos naturales observables

## Características del Juego

### 1. Narrativa Interactiva
- El jugador es una gota de agua
- Historia ramificada con múltiples caminos posibles
- Cada decisión lleva a diferentes procesos del ciclo

### 2. Procesos del Ciclo
- **Evaporación**: Paso de líquido a vapor por el calor del sol
- **Condensación**: Formación de nubes cuando el vapor se enfría
- **Precipitación**: Lluvia, nieve u otras formas de agua que caen
- **Infiltración**: Agua que penetra en el suelo
- **Escorrentía**: Agua que fluye sobre la superficie

### 3. Elementos Interactivos
- **Preguntas de comprensión**: Validan el aprendizaje en cada etapa
- **Animaciones**: Visualización de cada proceso
- **Experimentos virtuales**: Simulación de evaporación con control de temperatura
- **Mapa del viaje**: Registro visual del recorrido completo

### 4. Retroalimentación Educativa
- Explicaciones científicas tras cada respuesta
- Feedback positivo para reforzar el aprendizaje
- Pistas y ayudas cuando es necesario

## Estructura del Proyecto

```
src/games/ciclo-agua/
├── CicloAguaGame.vue          # Componente principal del juego
├── journey.json                # Datos de la narrativa y etapas
├── animations/                 # Componentes de animaciones
│   ├── EvaporationAnimation.vue
│   ├── CondensationAnimation.vue
│   ├── PrecipitationAnimation.vue
│   └── InfiltrationAnimation.vue
└── README.md                   # Este archivo
```

## Etapas del Juego

### Etapas Principales
1. **Inicio**: Océano
2. **Atmósfera**: Evaporación
3. **Nube**: Condensación
4. **Lluvia/Nieve**: Precipitación
5. **Infiltración**: Agua subterránea
6. **Río**: Escorrentía
7. **Regreso al océano**: Completar el ciclo

### Caminos Alternativos
- Profundidades oceánicas
- Montañas nevadas
- Manantiales
- Plantas (transpiración)

## Tecnologías Utilizadas
- **Vue 3**: Framework principal
- **TypeScript**: Tipado estático
- **Tailwind CSS + DaisyUI**: Estilos y componentes
- **CSS Animations**: Animaciones de procesos

## Cómo Jugar

1. **Lee la historia**: Cada etapa presenta una situación
2. **Elige tu camino**: Selecciona entre las opciones disponibles
3. **Responde preguntas**: Demuestra tu comprensión
4. **Observa animaciones**: Visualiza los procesos
5. **Experimenta** (opcional): Interactúa con experimentos virtuales
6. **Completa el ciclo**: Llega de vuelta al océano

## Tiempo Estimado
15-25 minutos por sesión

## Dificultad
Media - Apropiado para 5to grado

## Evaluación
El juego evalúa:
- Comprensión de procesos del ciclo del agua
- Identificación de cambios de estado
- Relación causa-efecto en fenómenos naturales

## Extensiones Futuras
- Más caminos alternativos
- Experimentos adicionales (condensación, precipitación)
- Estadísticas de aprendizaje
- Certificado de completación
- Modo desafío con tiempo límite

## Créditos
Desarrollado para el programa educativo "Yo Amo Aprender Digital"
