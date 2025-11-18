<script setup lang="ts">
</script>

<template>
  <div class="evaporation-animation">
    <div class="water-droplet droplet-1">💧</div>
    <div class="water-droplet droplet-2">💧</div>
    <div class="water-droplet droplet-3">💧</div>
    <div class="vapor-particle particle-1">☁️</div>
    <div class="vapor-particle particle-2">☁️</div>
    <div class="vapor-particle particle-3">☁️</div>
  </div>
</template>

<style scoped>
.evaporation-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.water-droplet {
  position: absolute;
  font-size: 2rem;
  animation: evaporate 3s ease-in-out infinite;
  opacity: 0;
}

.droplet-1 {
  left: 20%;
  bottom: 0;
  animation-delay: 0s;
}

.droplet-2 {
  left: 50%;
  bottom: 0;
  animation-delay: 1s;
}

.droplet-3 {
  left: 80%;
  bottom: 0;
  animation-delay: 2s;
}

.vapor-particle {
  position: absolute;
  font-size: 1.5rem;
  animation: rise 4s ease-out infinite;
  opacity: 0;
}

.particle-1 {
  left: 25%;
  bottom: 0;
  animation-delay: 0.5s;
}

.particle-2 {
  left: 55%;
  bottom: 0;
  animation-delay: 1.5s;
}

.particle-3 {
  left: 75%;
  bottom: 0;
  animation-delay: 2.5s;
}

@keyframes evaporate {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-20px) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.5);
  }
}

@keyframes rise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  30% {
    opacity: 0.7;
    transform: translateY(-50px) scale(0.8);
  }
  70% {
    opacity: 0.4;
    transform: translateY(-100px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-150px) scale(1.2);
  }
}
</style>
