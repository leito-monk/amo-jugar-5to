<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    current: number
    total: number
    label?: string
    showPercentage?: boolean
  }>(),
  {
    label: 'Progreso',
    showPercentage: true
  }
)

const percentage = computed(() => {
  if (props.total === 0) return 0
  return Math.min((props.current / props.total) * 100, 100)
})

const formattedPercentage = computed(() => {
  return percentage.value.toFixed(0)
})
</script>

<template>
  <div class="w-full">
    <!-- Labels Row -->
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium text-base-content">{{ label }}</span>
      <span class="text-sm font-medium text-base-content/70">
        {{ current }} / {{ total }}
      </span>
    </div>

    <!-- Progress Bar -->
    <div class="relative w-full h-4 bg-base-300 rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
        :style="{ width: `${percentage}%` }"
      >
        <div class="h-full w-full bg-gradient-to-r from-white/0 via-white/20 to-white/0"></div>
      </div>
    </div>

    <!-- Percentage Display -->
    <div v-if="showPercentage" class="flex justify-end mt-1">
      <span class="text-xs font-semibold text-base-content/60">
        {{ formattedPercentage }}%
      </span>
    </div>
  </div>
</template>

<style scoped>
</style>
