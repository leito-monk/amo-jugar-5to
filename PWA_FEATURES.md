# PWA Features - Yo Amo Aprender Digital

## Características Implementadas

Esta aplicación es ahora una **Progressive Web App (PWA)** completa con las siguientes características:

### 🚀 Instalación

La aplicación puede ser instalada en dispositivos móviles y de escritorio:

- **Android/Chrome**: Aparecerá un banner de instalación automáticamente
- **iOS/Safari**: Usar "Agregar a pantalla de inicio" desde el menú compartir
- **Desktop**: Ícono de instalación en la barra de direcciones del navegador

El componente `InstallPWA.vue` muestra un prompt personalizado para facilitar la instalación.

### 📴 Modo Offline

La aplicación funciona sin conexión a internet:

- **Cache de archivos estáticos**: Todos los archivos JS, CSS, HTML se cachean automáticamente
- **Cache de imágenes**: Las imágenes se almacenan en caché por 30 días
- **Cache de fuentes**: Google Fonts se cachean por 1 año
- **Indicador visual**: `OfflineIndicator.vue` muestra un banner cuando no hay conexión

### 🔄 Estrategias de Caché

1. **CacheFirst** para:
   - Google Fonts
   - Imágenes (PNG, JPG, JPEG, SVG, GIF)

2. **StaleWhileRevalidate** para:
   - Archivos JavaScript y CSS (siempre actualizado en segundo plano)

### 🎯 Composables Disponibles

#### `useOnlineStatus.js`
Detecta el estado de conectividad en tiempo real:

```javascript
import { useOnlineStatus } from './composables/useOnlineStatus'

const { isOnline } = useOnlineStatus()
// isOnline.value es true cuando hay conexión, false cuando está offline
```

#### `useOfflineData.js`
Gestiona sincronización de datos cuando se recupera la conexión:

```javascript
import { useOfflineData } from './composables/useOfflineData'

const { isOnline, queueSync, syncPendingActions, pendingSyncs } = useOfflineData()

// Encolar acción para sincronizar después
queueSync({ type: 'save_progress', data: gameState })

// Sincronizar cuando hay conexión
await syncPendingActions()
```

## 🛠️ Configuración Técnica

### Manifest (vite.config.js)

- **Nombre**: Yo Amo Aprender Digital
- **Nombre corto**: YoAmoAprender
- **Color de tema**: #4F46E5 (Indigo)
- **Display**: standalone
- **Orientación**: portrait
- **Idioma**: es-AR
- **Categorías**: education, kids

### Service Worker

Generado automáticamente por Workbox con:
- Precaching de 37+ recursos
- Runtime caching configurado
- Actualización automática del service worker

### Iconos

8 tamaños de iconos disponibles (72x72 hasta 512x512):
- Ubicados en `/public/icons/`
- Formato PNG
- Compatibles con Android, iOS y Desktop

## 📱 Pruebas

### Verificar Instalación PWA

1. **Build de producción**:
   ```bash
   npm run build
   ```

2. **Preview local**:
   ```bash
   npm run preview
   ```

3. **Chrome DevTools**:
   - Application → Manifest (verificar datos del manifest)
   - Application → Service Workers (verificar registro)
   - Lighthouse → PWA audit (debe pasar criterios PWA)

### Probar Modo Offline

1. Abrir la aplicación en modo desarrollo o preview
2. Chrome DevTools → Network → Offline
3. Navegar por la aplicación
4. Verificar que funciona sin conexión
5. Verificar que aparece el indicador offline

## 🔧 Mantenimiento

### Actualizar Iconos

Para reemplazar los iconos con diseños personalizados:

1. Crear iconos de alta calidad (recomendado: 512x512 base)
2. Usar herramienta como [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Reemplazar archivos en `/public/icons/`

### Modificar Estrategias de Caché

Editar `vite.config.js` → `workbox.runtimeCaching[]`:

```javascript
{
  urlPattern: /pattern/,
  handler: 'CacheFirst', // o 'NetworkFirst', 'StaleWhileRevalidate'
  options: {
    cacheName: 'custom-cache',
    expiration: {
      maxEntries: 50,
      maxAgeSeconds: 60 * 60 * 24 * 30
    }
  }
}
```

## 🌟 Futuras Mejoras

- [ ] Notificaciones Push
- [ ] Sincronización en background
- [ ] Actualizaciones periódicas de contenido
- [ ] Detección de actualizaciones con prompt al usuario
- [ ] Análisis de uso offline

## 📚 Recursos

- [Vite Plugin PWA](https://vite-pwa-org.netlify.app/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)
