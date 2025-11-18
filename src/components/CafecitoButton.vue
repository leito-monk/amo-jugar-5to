<template>
  <div class="cafecito-button-container">
    <!-- Botón flotante (versión pequeña) -->
    <a v-if="variant === 'floating'"
       :href="cafecitoUrl"
       target="_blank"
       rel="noopener noreferrer"
       class="cafecito-floating"
       title="Invitame un café">
      <div class="floating-btn">
        ☕
      </div>
    </a>

    <!-- Botón estándar -->
    <a v-else-if="variant === 'standard'"
       :href="cafecitoUrl"
       target="_blank"
       rel="noopener noreferrer"
       class="cafecito-standard btn btn-primary gap-2">
      <span class="text-2xl">☕</span>
      <span>{{ buttonText }}</span>
    </a>

    <!-- Card completa -->
    <div v-else-if="variant === 'card'" class="cafecito-card card bg-base-100 shadow-xl">
      <div class="card-body text-center">
        <div class="text-6xl mb-4">☕</div>
        <h3 class="text-xl font-bold mb-2">¿Te gusta esta plataforma?</h3>
        <p class="text-base-content/70 mb-4">
          Este proyecto es gratuito y de código abierto. 
          Si te resulta útil, considerá invitarnos un cafecito.
        </p>
        <a :href="cafecitoUrl"
           target="_blank"
           rel="noopener noreferrer"
           class="btn btn-primary btn-block">
          Invitar un café ☕
        </a>
        <p class="text-xs text-base-content/60 mt-2">
          Todas las funciones seguirán siendo gratuitas
        </p>
      </div>
    </div>

    <!-- Banner sutil -->
    <div v-else-if="variant === 'banner'" class="cafecito-banner">
      <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
        <div class="flex items-center gap-3">
          <span class="text-3xl">☕</span>
          <div>
            <p class="font-semibold text-sm">¿Disfrutás de Yo Amo Aprender?</p>
            <p class="text-xs text-base-content/70">Apoyanos con un cafecito</p>
          </div>
        </div>
        <a :href="cafecitoUrl"
           target="_blank"
           rel="noopener noreferrer"
           class="btn btn-sm btn-primary">
          Donar
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'standard',
    validator: (value) => ['floating', 'standard', 'card', 'banner'].includes(value)
  },
  username: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Invitame un café'
  }
})

const cafecitoUrl = `https://cafecito.app/${props.username}`
</script>

<style scoped>
.cafecito-floating {
  @apply fixed bottom-6 right-6 z-50;
}

.floating-btn {
  @apply w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 
         rounded-full shadow-lg flex items-center justify-center
         text-2xl hover:scale-110 transition-transform cursor-pointer
         animate-bounce;
  animation-duration: 2s;
}

.cafecito-standard {
  @apply inline-flex items-center;
}

.cafecito-card {
  @apply max-w-md mx-auto;
}

.cafecito-banner {
  @apply my-4;
}
</style>
