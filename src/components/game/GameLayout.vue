<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{
  title: string
  instructions: string
  autoShowInstructions?: boolean
}>()

const emit = defineEmits<{
  back: []
}>()

const router = useRouter()
const route = useRoute()
const showInstructions = ref(false)

const handleBack = () => {
  emit('back')
  router.push('/juegos')
}

const toggleInstructions = () => {
  showInstructions.value = !showInstructions.value
}

onMounted(() => {
  // Auto-show instructions on first visit if enabled
  if (props.autoShowInstructions !== false) {
    const storageKey = `instructions-shown-${String(route.name || route.path)}`
    const hasSeenInstructions = localStorage.getItem(storageKey)
    
    if (!hasSeenInstructions) {
      setTimeout(() => {
        showInstructions.value = true
        localStorage.setItem(storageKey, 'true')
      }, 500)
    }
  }
})
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
          <div class="tooltip tooltip-left" data-tip="Ayuda">
            <button @click="toggleInstructions" class="btn btn-ghost btn-circle hover:btn-primary">
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
          <div class="modal-box relative max-w-2xl bg-gradient-to-br from-base-100 to-base-200">
            <!-- Back Button -->
            <button
              @click="toggleInstructions"
              class="btn btn-sm btn-circle btn-ghost absolute left-2 top-2"
              title="Atrás"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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

            <button
              @click="toggleInstructions"
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="text-3xl">💡</span>
              </div>
              <h3 class="font-bold text-2xl text-primary">
                Cómo Jugar
              </h3>
            </div>
            <div class="py-2">
              <div class="prose prose-sm max-w-none">
                <p class="whitespace-pre-line text-base leading-relaxed">{{ instructions }}</p>
              </div>
            </div>
            <div class="divider"></div>
            <div class="modal-action justify-center">
              <button @click="toggleInstructions" class="btn btn-primary btn-wide">
                ¡Entendido, vamos a jugar!
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
