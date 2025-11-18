<template>
  <dialog ref="modal" class="modal">
    <div class="modal-box max-w-2xl">
      <h3 class="font-bold text-2xl mb-4">🐛 Errores, Mejoras y Propuestas</h3>
      
      <div class="space-y-4">
        <p class="text-base-content/80">
          ¡Tu feedback es muy valioso! Si encontraste un error, tenés una idea para mejorar 
          la plataforma o querés proponer algo nuevo, podés reportarlo en nuestro repositorio de GitHub.
        </p>

        <div class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>
            Necesitás una cuenta de GitHub para reportar. Es gratis y solo toma unos minutos crear una.
          </span>
        </div>

        <div class="space-y-3">
          <h4 class="font-bold text-lg">📝 ¿Cómo reportar?</h4>
          
          <ol class="list-decimal list-inside space-y-2 text-base-content/80 ml-2">
            <li>Hacé clic en el botón "Abrir GitHub Issues" abajo</li>
            <li>Si no tenés cuenta en GitHub, creá una (es gratis)</li>
            <li>Hacé clic en el botón verde "New Issue"</li>
            <li>Describí el problema, mejora o propuesta con el mayor detalle posible</li>
            <li>Si es un error, incluí:
              <ul class="list-disc list-inside ml-6 mt-1 space-y-1">
                <li>Qué estabas haciendo cuando ocurrió</li>
                <li>Qué esperabas que pasara</li>
                <li>Qué pasó en realidad</li>
                <li>Captura de pantalla si es posible</li>
              </ul>
            </li>
          </ol>
        </div>

        <div class="flex gap-3 justify-end mt-6">
          <button class="btn btn-ghost" @click="closeModal">
            Cerrar
          </button>
          <a 
            href="https://github.com/leito-monk/amo-jugar-5to/issues" 
            target="_blank"
            class="btn btn-primary"
            @click="closeModal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="mr-2">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Abrir GitHub Issues
          </a>
        </div>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="closeModal">close</button>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const modal = ref<HTMLDialogElement | null>(null)

const openModal = () => {
  modal.value?.showModal()
}

const closeModal = () => {
  modal.value?.close()
}

defineExpose({
  openModal
})
</script>

<style scoped>
</style>
