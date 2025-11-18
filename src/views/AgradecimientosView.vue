<template>
  <div class="agradecimientos-view min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      
      <div class="text-center mb-12">
        <h1 class="text-5xl font-display font-bold mb-4">💙 Agradecimientos</h1>
        <p class="text-xl text-base-content/70">
          Este proyecto es posible gracias a la comunidad educativa
        </p>
      </div>

      <!-- Card de donaciones -->
      <CafecitoButton variant="card" :username="cafecitoUsername" class="mb-12" />

      <!-- Sección de créditos -->
      <div class="credits-section card bg-base-100 shadow-xl p-6 mb-8">
        <h2 class="text-2xl font-bold mb-6">🏫 Créditos</h2>
        
        <div class="space-y-6">
          <div class="credit-item">
            <h3 class="font-bold text-lg mb-2">📚 Contenido Educativo</h3>
            <p class="text-base-content/80">
              Basado en el libro "Yo Amo Aprender 5" del Ministerio de Educación CABA.
              Todos los contenidos pedagógicos están alineados con los NAP (Núcleos de Aprendizajes Prioritarios).
            </p>
          </div>

          <div class="credit-item">
            <h3 class="font-bold text-lg mb-2">💻 Desarrollo</h3>
            <p class="text-base-content/80">
              Proyecto de código abierto desarrollado con Vue 3, Tailwind CSS y DaisyUI.
              <a href="https://github.com/leito-monk/amo-jugar-5to" target="_blank" class="link link-primary">
                Ver en GitHub
              </a>
            </p>
          </div>

          <div class="credit-item">
            <h3 class="font-bold text-lg mb-2">🎨 Diseño</h3>
            <p class="text-base-content/80">
              Diseño pensado para estudiantes de 10-11 años, priorizando accesibilidad 
              y experiencia de usuario adaptada a dispositivos móviles.
            </p>
          </div>

          <div class="credit-item">
            <h3 class="font-bold text-lg mb-2">🌟 Apoyadores</h3>
            <p class="text-base-content/80 mb-3">
              Gracias especiales a todos los que apoyan este proyecto en Cafecito.app:
            </p>
            <div v-if="supporters.length > 0" class="supporters-list flex flex-wrap gap-2">
              <span v-for="supporter in supporters" :key="supporter"
                    class="badge badge-lg badge-primary">
                {{ supporter }}
              </span>
            </div>
            <p v-else class="text-sm text-base-content/60 italic">
              Sé el primero en apoyar este proyecto ☕
            </p>
          </div>
        </div>
      </div>

      <!-- Licencia -->
      <div class="license-section card bg-base-100 shadow-xl p-6 mb-8">
        <h2 class="text-2xl font-bold mb-4">📜 Licencia</h2>
        <p class="text-base-content/80 mb-3">
          Este proyecto está bajo licencia <strong>MIT</strong>. 
          Es libre y gratuito para uso educativo.
        </p>
        <p class="text-sm text-base-content/70">
          Podés usar, modificar y distribuir este código libremente, 
          siempre manteniendo la atribución original.
        </p>
      </div>

      <!-- Contacto -->
      <div class="contact-section text-center mt-12">
        <h3 class="text-xl font-bold mb-4">📧 Contacto</h3>
        <div class="flex justify-center gap-4 flex-wrap">
          <a href="mailto:contacto@gcoop.coop" class="btn btn-outline btn-sm">
            Email
          </a>
          <a href="https://github.com/leito-monk/amo-jugar-5to" target="_blank" class="btn btn-outline btn-sm">
            GitHub
          </a>
          <a href="https://gcoop.coop" target="_blank" class="btn btn-outline btn-sm">
            gcoop
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CafecitoButton from '../components/CafecitoButton.vue'

// Configuración de Cafecito
const cafecitoUsername = 'leitomonk'

// Lista de apoyadores (actualizar manualmente o via API)
const supporters = ref([
  // Ejemplo: 'María G.', 'Juan P.', 'Escuela N°123'
  // Dejar vacío inicialmente
])
</script>

<style scoped>
.credit-item {
  @apply pb-6 border-b border-gray-200 last:border-b-0 last:pb-0;
}
</style>
