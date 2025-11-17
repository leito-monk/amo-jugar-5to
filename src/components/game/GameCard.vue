<script setup lang="ts">
import { computed } from 'vue'

export interface Game {
  id: string
  titulo: string
  materia: string
  descripcion: string
  icono: string
  dificultad: 'Fácil' | 'Medio' | 'Difícil'
  duracion: string
  activo?: boolean
  completado?: boolean
  progreso?: number
}

const props = defineProps<{
  game: Game
}>()

const emit = defineEmits<{
  click: []
}>()

const isLocked = computed(() => props.game.activo === false)
const isCompleted = computed(() => props.game.completado === true)
const hasProgress = computed(() => 
  props.game.progreso !== undefined && props.game.progreso > 0 && !isCompleted.value
)

const difficultyColor = computed(() => {
  switch (props.game.dificultad) {
    case 'Fácil':
      return 'badge-success'
    case 'Medio':
      return 'badge-warning'
    case 'Difícil':
      return 'badge-error'
    default:
      return 'badge-primary'
  }
})

const cardClasses = computed(() => {
  const classes = ['card', 'bg-base-100', 'shadow-xl', 'transition-all', 'duration-300']
  
  if (isLocked.value) {
    classes.push('opacity-50', 'cursor-not-allowed')
  } else {
    classes.push('hover:scale-105', 'hover:shadow-2xl', 'cursor-pointer')
  }
  
  return classes.join(' ')
})

const handleClick = () => {
  if (!isLocked.value) {
    emit('click')
  }
}
</script>

<template>
  <div :class="cardClasses" @click="handleClick">
    <!-- Completed Badge -->
    <div v-if="isCompleted" class="absolute top-4 right-4 z-10">
      <div class="badge badge-success gap-1 px-3 py-3 text-sm font-semibold">
        <span>✓</span>
        <span>Completado</span>
      </div>
    </div>

    <!-- Lock Icon -->
    <div v-if="isLocked" class="absolute top-4 right-4 z-10">
      <div class="text-3xl opacity-70">🔒</div>
    </div>

    <figure class="px-10 pt-10">
      <div class="text-6xl">{{ game.icono }}</div>
    </figure>

    <div class="card-body items-center text-center">
      <h2 class="card-title text-xl mb-2">{{ game.titulo }}</h2>
      
      <p class="text-sm text-base-content/70 mb-4">{{ game.descripcion }}</p>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2 justify-center mb-4">
        <div class="badge badge-primary">{{ game.materia }}</div>
        <div class="badge" :class="difficultyColor">{{ game.dificultad }}</div>
        <div class="badge badge-outline">⏱️ {{ game.duracion }}</div>
      </div>

      <!-- Progress Bar -->
      <div v-if="hasProgress" class="w-full">
        <div class="flex justify-between text-xs mb-1">
          <span class="text-base-content/70">Progreso</span>
          <span class="font-semibold">{{ game.progreso }}%</span>
        </div>
        <progress 
          class="progress progress-primary w-full" 
          :value="game.progreso" 
          max="100"
        ></progress>
      </div>

      <!-- Action Button -->
      <div class="card-actions mt-2">
        <button 
          v-if="!isLocked" 
          class="btn btn-primary btn-sm"
          :class="{ 'btn-disabled': isLocked }"
        >
          {{ hasProgress ? 'Continuar' : isCompleted ? 'Volver a jugar' : 'Jugar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
