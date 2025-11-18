<template>
  <div class="privacidad-view min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
    <div class="container mx-auto max-w-4xl">
      
      <div class="text-center mb-12">
        <h1 class="text-5xl font-display font-bold mb-4">🔒 Privacidad</h1>
        <p class="text-xl text-base-content/70">
          Tu privacidad es importante para nosotros
        </p>
      </div>

      <!-- Card de privacidad -->
      <div class="privacy-section card bg-base-100 shadow-xl p-8">
        <div class="space-y-6">
          <p class="text-lg text-base-content/90">
            <strong>Respetamos la privacidad de nuestros usuarios y no guardamos ningún dato.</strong>
          </p>
          
          <p class="text-base-content/80">
            Esta plataforma educativa funciona completamente en tu navegador. 
            No recolectamos, almacenamos ni compartimos información personal de ningún tipo.
          </p>

          <div class="divider"></div>

          <div class="space-y-4">
            <h2 class="text-2xl font-bold">¿Qué significa esto?</h2>
            
            <ul class="list-disc list-inside space-y-2 text-base-content/80">
              <li>No creamos cuentas de usuario</li>
              <li>No solicitamos información personal</li>
              <li>No utilizamos cookies de seguimiento</li>
              <li>Tu progreso se guarda localmente en tu dispositivo</li>
              <li>No enviamos ninguna información a servidores externos</li>
            </ul>
          </div>

          <div class="divider"></div>

          <div class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>
              El progreso de los juegos se almacena únicamente en el navegador de tu dispositivo. 
              Si borras los datos del navegador, se perderá tu progreso.
            </span>
          </div>
        </div>
      </div>

      <!-- Botón de volver -->
      <div class="text-center mt-8">
        <router-link to="/" class="btn btn-primary">
          Volver al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No se necesita lógica adicional para esta vista estática
</script>

<style scoped>
.divider {
  @apply my-6;
}
</style>
