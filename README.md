# 🎮 Yo Amo Aprender Digital

**Plataforma educativa interactiva para estudiantes de 5to grado**

Una aplicación web educativa diseñada para hacer el aprendizaje divertido y atractivo mediante juegos interactivos y actividades educativas. El proyecto combina tecnología moderna con pedagogía efectiva para crear una experiencia de aprendizaje memorable.

## 🌟 Características

### Composables Reutilizables
- **🗄️ useLocalStorage**: Gestión persistente de datos con prefijo de aislamiento
  - Almacenamiento y recuperación de datos con manejo de errores
  - Limpieza selectiva de datos del proyecto
  - Soporte para objetos y arrays complejos

- **🎯 useGameState**: Administración de estado reactivo para juegos
  - Seguimiento de puntuación, progreso y logros
  - Sistema de niveles y precisión de respuestas
  - Persistencia automática del estado
  - Métricas de tiempo formateadas

- **🔊 useSound**: Efectos de sonido con Web Audio API
  - Sonidos de retroalimentación (correcto/incorrecto)
  - Fanfarria de completado de nivel
  - Control de silencio/activación
  - Sin archivos externos requeridos

### Interfaz de Usuario
- Diseño responsivo con Tailwind CSS
- Componentes DaisyUI personalizados con tema educativo
- Tipografías amigables: Quicksand y Comic Neue
- Paleta de colores educativa optimizada
- Animaciones y transiciones suaves

## 🛠️ Stack Técnico

| Tecnología | Versión | Propósito |
|-----------|---------|-----------|
| **Vue 3** | 3.5.24 | Framework JavaScript reactivo |
| **Vite** | 7.2.2 | Herramienta de construcción ultrarrápida |
| **Vue Router** | 4.6.3 | Enrutamiento SPA |
| **Tailwind CSS** | 3.4.18 | Framework CSS utility-first |
| **DaisyUI** | 5.5.5 | Biblioteca de componentes UI |
| **PostCSS** | 8.5.6 | Transformación de CSS |

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

```bash
# Clonar el repositorio
git clone https://github.com/leito-monk/amo-jugar-5to.git

# Navegar al directorio del proyecto
cd amo-jugar-5to

# Instalar dependencias
npm install
```

## 🚀 Comandos de Desarrollo

```bash
# Iniciar servidor de desarrollo con hot-reload
npm run dev

# Compilar para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

El servidor de desarrollo estará disponible en `http://localhost:5173/`

## 📁 Estructura del Proyecto

```
amo-jugar-5to/
├── composables/           # Composables Vue reutilizables
│   ├── useLocalStorage.js # Gestión de localStorage
│   ├── useGameState.js    # Estado del juego
│   ├── useSound.js        # Efectos de sonido
│   ├── README.md          # Documentación de composables
│   └── example.html       # Demo interactivo
├── public/                # Archivos estáticos
├── src/
│   ├── assets/           # Estilos y recursos
│   ├── components/       # Componentes Vue
│   ├── router/           # Configuración de rutas
│   ├── App.vue           # Componente raíz
│   └── main.js           # Punto de entrada
├── index.html            # Template HTML
├── package.json          # Dependencias y scripts
├── tailwind.config.js    # Configuración de Tailwind
└── vite.config.js        # Configuración de Vite
```

## 💡 Uso de Composables

### Ejemplo: useGameState

```javascript
import * as gameState from './composables/useGameState.js'
import * as sound from './composables/useSound.js'

// Inicializar juego
gameState.loadState('matematicas-suma')
gameState.startGame()

// Respuesta correcta
gameState.recordAnswer(true)
gameState.addScore(10)
sound.playCorrect()

// Completar nivel
gameState.markCompleted()
sound.playComplete()

// Obtener métricas
console.log(`Precisión: ${gameState.accuracy.value}%`)
console.log(`Tiempo: ${gameState.formattedTime.value}`)
```

### Ejemplo: useLocalStorage

```javascript
import * as localStorage from './composables/useLocalStorage.js'

// Guardar datos
localStorage.save('userData', { 
  name: 'María', 
  grade: 5, 
  score: 850 
})

// Cargar datos
const userData = localStorage.load('userData')

// Listar todas las claves
const keys = localStorage.getAllKeys()
```

## 🎨 Tema Educativo

El proyecto incluye un tema personalizado con colores optimizados para educación:

- **Primary** (#4F46E5): Índigo para acciones principales
- **Secondary** (#F59E0B): Ámbar para elementos secundarios
- **Success** (#10B981): Verde esmeralda para retroalimentación positiva
- **Danger** (#EF4444): Rojo para alertas
- **Info** (#3B82F6): Azul para información

## 🧪 Testing

Los composables incluyen pruebas automatizadas:

```bash
# Ejecutar pruebas de localStorage
node composables/test-localStorage.js
```

## 📄 Documentación Adicional

Para información detallada sobre los composables, consulta:
- [Documentación de Composables](./composables/README.md)
- [Demo Interactivo](./composables/example.html)
- [Resumen de Implementación](./IMPLEMENTATION_SUMMARY.md)

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia GNU General Public License v3.0. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Reconocimientos

- Vue.js por el excelente framework
- Tailwind CSS y DaisyUI por los componentes UI
- La comunidad educativa por la inspiración

---

**Hecho con ❤️ para estudiantes de 5to grado**
