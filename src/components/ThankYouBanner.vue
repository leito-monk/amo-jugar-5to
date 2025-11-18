<template>
  <div v-if="showBanner" class="thank-you-banner animate-fade-in">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="text-3xl">💙</span>
        <div>
          <p class="font-bold text-sm">¡Gracias a nuestros apoyadores!</p>
          <p class="text-xs text-base-content/70">Este proyecto es posible gracias a la comunidad</p>
        </div>
      </div>
      <button @click="closeBanner" class="btn btn-ghost btn-sm">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

onMounted(() => {
  // Mostrar banner solo cada 3 días
  const lastShown = localStorage.getItem('thank_you_banner_last_shown')
  const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000)
  
  if (!lastShown || parseInt(lastShown) < threeDaysAgo) {
    setTimeout(() => {
      showBanner.value = true
    }, 5000) // Mostrar después de 5 segundos
  }
})

const closeBanner = () => {
  showBanner.value = false
  localStorage.setItem('thank_you_banner_last_shown', Date.now().toString())
}
</script>

<style scoped>
.thank-you-banner {
  @apply fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-50 to-purple-50 
         border-b-2 border-blue-200 shadow-md z-40;
}

.animate-fade-in {
  animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
