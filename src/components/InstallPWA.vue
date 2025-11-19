<template>
  <div
    v-if="showInstallPrompt"
    class="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-white rounded-lg shadow-2xl p-6 z-50 border-2 border-indigo-500"
  >
    <div class="flex items-start gap-4">
      <div class="flex-shrink-0">
        <svg class="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      <div class="flex-1">
        <h3 class="text-lg font-bold text-gray-900 mb-2">
          ¡Instala la App!
        </h3>
        <p class="text-sm text-gray-600 mb-4">
          Accede más rápido y úsala sin conexión instalándola en tu dispositivo.
        </p>
        <div class="flex gap-2">
          <button
            @click="installApp"
            class="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Instalar
          </button>
          <button
            @click="dismissPrompt"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Ahora no
          </button>
        </div>
      </div>
      <button
        @click="dismissPrompt"
        class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showInstallPrompt = ref(false)
const deferredPrompt = ref(null)

onMounted(() => {
  // Escuchar evento beforeinstallprompt
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt.value = e
    
    // Verificar si ya se instaló o se rechazó antes
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    const installed = localStorage.getItem('pwa-installed')
    
    if (!dismissed && !installed) {
      showInstallPrompt.value = true
    }
  })

  // Detectar si la app ya está instalada
  window.addEventListener('appinstalled', () => {
    showInstallPrompt.value = false
    localStorage.setItem('pwa-installed', 'true')
    console.log('PWA instalada exitosamente')
  })
})

const installApp = async () => {
  if (!deferredPrompt.value) return

  deferredPrompt.value.prompt()
  const { outcome } = await deferredPrompt.value.userChoice
  
  console.log(`Usuario ${outcome === 'accepted' ? 'aceptó' : 'rechazó'} la instalación`)
  
  deferredPrompt.value = null
  showInstallPrompt.value = false
  
  if (outcome === 'accepted') {
    localStorage.setItem('pwa-installed', 'true')
  }
}

const dismissPrompt = () => {
  showInstallPrompt.value = false
  localStorage.setItem('pwa-install-dismissed', 'true')
  
  // Volver a mostrar después de 7 días
  setTimeout(() => {
    localStorage.removeItem('pwa-install-dismissed')
  }, 7 * 24 * 60 * 60 * 1000)
}
</script>
