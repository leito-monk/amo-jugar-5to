<script setup lang="ts">
</script>

<template>
  <div class="infiltration-animation">
    <div class="surface-drop drop-1">💧</div>
    <div class="surface-drop drop-2">💧</div>
    <div class="surface-drop drop-3">💧</div>
    <div class="soil-layer">
      <div class="soil-particle particle-1">🟤</div>
      <div class="soil-particle particle-2">🟤</div>
      <div class="soil-particle particle-3">🟤</div>
      <div class="soil-particle particle-4">🟤</div>
    </div>
    <div class="underground-drop under-1">💧</div>
    <div class="underground-drop under-2">💧</div>
  </div>
</template>

<style scoped>
.infiltration-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.surface-drop {
  position: absolute;
  font-size: 1.5rem;
  animation: infiltrate 4s ease-in infinite;
  opacity: 0;
  top: 20%;
}

.drop-1 {
  left: 30%;
  animation-delay: 0s;
}

.drop-2 {
  left: 50%;
  animation-delay: 1.3s;
}

.drop-3 {
  left: 70%;
  animation-delay: 2.6s;
}

.soil-layer {
  position: absolute;
  width: 100%;
  top: 40%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(139, 69, 19, 0.3), transparent);
}

.soil-particle {
  position: absolute;
  font-size: 0.8rem;
  top: -10px;
  opacity: 0.4;
}

.particle-1 {
  left: 20%;
}

.particle-2 {
  left: 40%;
}

.particle-3 {
  left: 60%;
}

.particle-4 {
  left: 80%;
}

.underground-drop {
  position: absolute;
  font-size: 1rem;
  animation: settle 3s ease-out infinite;
  opacity: 0;
  top: 50%;
}

.under-1 {
  left: 35%;
  animation-delay: 2s;
}

.under-2 {
  left: 65%;
  animation-delay: 3.3s;
}

@keyframes infiltrate {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  30% {
    opacity: 0.8;
    transform: translateY(20px) scale(0.9);
  }
  60% {
    opacity: 0.5;
    transform: translateY(40px) scale(0.7);
  }
  100% {
    opacity: 0;
    transform: translateY(60px) scale(0.5);
  }
}

@keyframes settle {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  50% {
    opacity: 0.6;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(10px);
  }
}
</style>
