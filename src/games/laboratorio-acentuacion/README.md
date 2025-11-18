# 🧪 Laboratorio de Acentuación

Juego educativo para estudiantes de 5to grado enfocado en la clasificación de palabras según su acentuación.

## 📚 Contenido Educativo

### Unidad
- **Materia**: Lengua
- **Unidad 2**: "Textos bajo la lupa"
- **Tema**: Acentuación y clasificación de palabras

### Conceptos Trabajados
- **Palabras Agudas**: Acentuación en la última sílaba (co-ra-ZÓN)
- **Palabras Graves**: Acentuación en la penúltima sílaba (CA-sa)
- **Palabras Esdrújulas**: Acentuación en la antepenúltima sílaba (MÚ-si-ca)
- **Diptongo**: Unión de dos vocales en una misma sílaba
- **Hiato**: Separación de dos vocales en sílabas diferentes

## 🎮 Mecánica del Juego

### Objetivo
Clasificar palabras correctamente según su tipo de acentuación arrastrándolas a los recipientes correspondientes.

### Cómo Jugar
1. Las palabras aparecen flotando en la pantalla
2. El estudiante arrastra cada palabra a uno de los 3 recipientes:
   - 📌 Agudas
   - 📍 Graves
   - 📎 Esdrújulas
3. Se verifica inmediatamente si la clasificación es correcta
4. Se muestra una explicación con cada respuesta
5. Hay 60 segundos por nivel para clasificar 10 palabras
6. Son 5 niveles progresivos de dificultad

### Niveles
1. **Nivel 1**: Solo palabras agudas (15 palabras en banco)
2. **Nivel 2**: Solo palabras graves (15 palabras en banco)
3. **Nivel 3**: Mezcla de agudas, graves y esdrújulas
4. **Nivel 4**: Incluye palabras con diptongo
5. **Nivel 5**: Incluye palabras con hiato

### Sistema de Puntuación
- ✅ Respuesta correcta: +10 puntos
- ❌ Respuesta incorrecta: -5 puntos
- ⏰ 60 segundos por nivel
- 🎯 Objetivo: Clasificar las 10 palabras antes del tiempo límite

## 🛠️ Estructura Técnica

### Archivos
```
src/games/laboratorio-acentuacion/
├── AcentuacionGame.vue    # Componente principal del juego
├── palabras.json          # Base de datos de palabras
└── README.md              # Esta documentación
```

### Componentes Utilizados
- `GameLayout`: Layout base para juegos
- `ScoreBoard`: Tablero de puntuación
- `FeedbackModal`: Modal de retroalimentación

### Datos (palabras.json)
Cada palabra incluye:
- `palabra`: La palabra en sí
- `tipo`: aguda, grave o esdrújula
- `silaba_tonica`: Sílaba donde recae el acento
- `tiene_tilde`: Booleano indicando si lleva tilde escrita
- `nivel`: Nivel en que aparece (1-5)
- `explicacion`: Explicación pedagógica
- `especial`: (Opcional) Indica si tiene diptongo o hiato

## 🎨 Características Visuales

### Animaciones
- **Flotación**: Las palabras flotan suavemente en el área de juego
- **Drag & Drop**: Arrastrar y soltar con retroalimentación visual
- **Hover effects**: Efectos al pasar el mouse sobre palabras y contenedores
- **Timer animado**: Cambia de color según el tiempo restante
  - Verde/Azul: > 20 segundos
  - Naranja: 11-20 segundos
  - Rojo pulsante: ≤ 10 segundos

### Colores
- **Agudas**: Color primario (azul)
- **Graves**: Color secundario (púrpura)
- **Esdrújulas**: Color acento (verde/cyan)

## 📊 Seguimiento de Progreso

El juego registra:
- Puntuación total
- Nivel alcanzado
- Palabras clasificadas correctamente
- Porcentaje de precisión

## 🎯 Objetivos de Aprendizaje

1. **Identificar** los tres tipos de acentuación en español
2. **Clasificar** palabras según su sílaba tónica
3. **Reconocer** patrones de acentuación
4. **Aplicar** reglas de tildación
5. **Distinguir** entre diptongos e hiatos

## 🔧 Requisitos Técnicos

- Vue 3 con TypeScript
- Navegador moderno con soporte para Drag and Drop API
- Responsive design (funciona en desktop y tablet)

## 📝 Notas Pedagógicas

- Las explicaciones están adaptadas al nivel de 5to grado
- El sistema progresivo de niveles permite aprendizaje gradual
- La retroalimentación inmediata refuerza el aprendizaje
- El límite de tiempo mantiene la atención y el ritmo
- Los ejemplos incluyen palabras del vocabulario común
