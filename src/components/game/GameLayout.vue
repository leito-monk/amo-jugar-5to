<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  title: string
  instructions: string
}>()

const emit = defineEmits<{
  back: []
}>()

const router = useRouter()
const showInstructions = ref(false)

const handleBack = () => {
  emit('back')
  router.push('/juegos')
}

const toggleInstructions = () => {
  showInstructions.value = !showInstructions.value
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-base-100 shadow-md">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <!-- Back Button -->
          <button @click="handleBack" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <!-- Title -->
          <h1 class="text-xl md:text-2xl font-bold text-center flex-1">
            {{ title }}
          </h1>

          <!-- Help Button -->
          <button @click="toggleInstructions" class="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-6 flex-1">
      <div class="max-w-4xl mx-auto">
        <slot></slot>
      </div>
    </main>

    <!-- Optional Footer Slot -->
    <footer v-if="$slots.footer" class="bg-base-200 py-4">
      <div class="container mx-auto px-4">
        <slot name="footer"></slot>
      </div>
    </footer>

    <!-- Instructions Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showInstructions"
          class="modal modal-open"
          @click.self="toggleInstructions"
        >
          <div class="modal-box relative max-w-2xl">
            <button
              @click="toggleInstructions"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 class="font-bold text-lg mb-4 flex items-center gap-2">
              <span class="text-2xl">💡</span>
              Instrucciones
            </h3>
            <div class="py-4 text-left">
              <p class="whitespace-pre-line">{{ instructions }}</p>
            </div>
            <div class="modal-action">
              <button @click="toggleInstructions" class="btn btn-primary">
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.9);
}
</style>
