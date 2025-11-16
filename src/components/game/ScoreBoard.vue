<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    score?: number
    accuracy?: number
    correctCount?: number
    totalCount?: number
    showAccuracy?: boolean
  }>(),
  {
    score: 0,
    accuracy: 0,
    showAccuracy: false
  }
)

const formattedAccuracy = computed(() => {
  return props.accuracy.toFixed(0)
})
</script>

<template>
  <div class="bg-base-100 rounded-lg shadow-lg p-4">
    <div class="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
      <!-- Score Section -->
      <div class="flex flex-col items-center">
        <div class="text-5xl mb-2">⭐</div>
        <div class="text-3xl font-bold text-primary">{{ score }}</div>
        <div class="text-sm text-base-content/60">Puntos</div>
      </div>

      <!-- Divider -->
      <div v-if="showAccuracy" class="divider divider-horizontal hidden md:flex"></div>
      <div v-if="showAccuracy" class="divider md:hidden"></div>

      <!-- Accuracy Section -->
      <div v-if="showAccuracy" class="flex flex-col items-center">
        <div class="text-5xl mb-2">🎯</div>
        <div class="text-3xl font-bold text-secondary">{{ formattedAccuracy }}%</div>
        <div class="text-sm text-base-content/60">Precisión</div>
      </div>

      <!-- Correct/Total Count Section -->
      <template v-if="correctCount !== undefined && totalCount !== undefined">
        <div class="divider divider-horizontal hidden md:flex"></div>
        <div class="divider md:hidden"></div>
        
        <div class="flex flex-col items-center">
          <div class="text-5xl mb-2">✅</div>
          <div class="text-3xl font-bold text-success">
            {{ correctCount }} / {{ totalCount }}
          </div>
          <div class="text-sm text-base-content/60">Correctas</div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
</style>
