<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    isCorrect: boolean
    message: string
    title?: string
    showExplanation?: boolean
    show?: boolean
  }>(),
  {
    showExplanation: true,
    show: true
  }
)

const emit = defineEmits<{
  close: []
}>()

const emoji = computed(() => props.isCorrect ? '✅' : '💡')
const defaultTitle = computed(() => props.isCorrect ? '¡Correcto!' : 'Intenta de nuevo')
const displayTitle = computed(() => props.title || defaultTitle.value)
const bgClass = computed(() => props.isCorrect ? 'bg-success/10' : 'bg-warning/10')
const borderClass = computed(() => props.isCorrect ? 'border-success' : 'border-warning')
const textColorClass = computed(() => props.isCorrect ? 'text-success' : 'text-warning')

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="show"
        class="modal modal-open"
        @click.self="handleClose"
      >
        <div class="modal-box relative max-w-lg scale-in" :class="[bgClass, borderClass, 'border-2']">
          <!-- Close Button -->
          <button
            @click="handleClose"
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <!-- Content -->
          <div class="text-center py-4">
            <!-- Emoji -->
            <div class="text-7xl mb-4 animate-bounce-in">
              {{ emoji }}
            </div>

            <!-- Title -->
            <h3 class="font-bold text-2xl mb-4" :class="textColorClass">
              {{ displayTitle }}
            </h3>

            <!-- Message/Explanation -->
            <div v-if="showExplanation" class="text-base-content text-left mb-4">
              <p class="whitespace-pre-line">{{ message }}</p>
            </div>

            <!-- Extra Content Slot -->
            <div v-if="$slots.default" class="my-4">
              <slot></slot>
            </div>
          </div>

          <!-- Modal Actions -->
          <div class="modal-action justify-center">
            <button @click="handleClose" class="btn btn-primary btn-wide">
              Continuar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-box {
  animation: scale-up 0.3s ease;
}

.modal-fade-leave-active .modal-box {
  animation: scale-down 0.3s ease;
}

@keyframes scale-up {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes scale-down {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.8);
    opacity: 0;
  }
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce-in {
  animation: bounce-in 0.5s ease;
}
</style>
