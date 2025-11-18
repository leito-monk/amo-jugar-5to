<template>
  <div v-if="show" class="modal modal-open">
    <div class="modal-box max-w-2xl">
      <button @click="$emit('close')" class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      
      <div class="text-center">
        <div class="text-7xl mb-4">☕💙</div>
        <h2 class="font-display text-3xl font-bold mb-3">
          ¡Gracias por tu apoyo!
        </h2>
        
        <p class="text-lg mb-6">
          <strong>Yo Amo Aprender Digital</strong> es un proyecto educativo libre y gratuito 
          para estudiantes de 5to grado de Argentina.
        </p>

        <div class="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 class="font-bold mb-3">🎯 ¿Para qué usamos las donaciones?</h3>
          <ul class="text-left space-y-2 max-w-md mx-auto">
            <li>✓ Hosting y mantenimiento del sitio</li>
            <li>✓ Desarrollo de nuevos juegos educativos</li>
            <li>✓ Creación de contenido pedagógico</li>
            <li>✓ Mejoras de accesibilidad</li>
            <li>✓ Soporte y actualizaciones</li>
          </ul>
        </div>

        <div class="bg-amber-50 p-4 rounded-lg mb-6 text-sm">
          <p class="font-semibold mb-2">💡 Recordá:</p>
          <p>Todas las funcionalidades seguirán siendo 100% gratuitas, 
          con o sin donación. Tu apoyo nos ayuda a seguir mejorando.</p>
        </div>

        <a :href="`https://cafecito.app/${username}`"
           target="_blank"
           rel="noopener noreferrer"
           class="btn btn-primary btn-lg gap-3 mb-4">
          <span class="text-3xl">☕</span>
          <span>Ir a Cafecito.app</span>
        </a>

        <div class="divider">O</div>

        <div class="other-support">
          <p class="text-sm text-base-content/70 mb-3">También podés ayudar de otras formas:</p>
          <div class="grid grid-cols-2 gap-3">
            <button @click="shareProject" class="btn btn-outline btn-sm">
              📢 Compartir
            </button>
            <button @click="reportBug" class="btn btn-outline btn-sm">
              🐛 Reportar errores
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true
  },
  username: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close'])

const shareProject = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Yo Amo Aprender Digital',
      text: 'Plataforma educativa gratuita para 5to grado',
      url: window.location.origin
    })
  } else {
    // Fallback: copiar al portapapeles
    navigator.clipboard.writeText(window.location.origin)
    alert('¡Link copiado! Compartilo con otros docentes y estudiantes.')
  }
}

const reportBug = () => {
  // Abrir formulario de contacto o GitHub issues
  window.open('https://github.com/leito-monk/amo-jugar-5to/issues', '_blank')
}
</script>
