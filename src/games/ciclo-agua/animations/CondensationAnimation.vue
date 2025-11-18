<script setup lang="ts">
</script>

<template>
  <div class="condensation-animation">
    <div class="vapor-cloud cloud-1">☁️</div>
    <div class="vapor-cloud cloud-2">☁️</div>
    <div class="forming-droplet drop-1">💧</div>
    <div class="forming-droplet drop-2">💧</div>
    <div class="forming-droplet drop-3">💧</div>
    <div class="forming-droplet drop-4">💧</div>
  </div>
</template>

<style scoped>
.condensation-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.vapor-cloud {
  position: absolute;
  font-size: 3rem;
  animation: drift 6s ease-in-out infinite;
  opacity: 0.6;
}

.cloud-1 {
  left: 10%;
  top: 10%;
  animation-delay: 0s;
}

.cloud-2 {
  right: 10%;
  top: 20%;
  animation-delay: 3s;
}

.forming-droplet {
  position: absolute;
  font-size: 1rem;
  animation: condense 3s ease-in-out infinite;
  opacity: 0;
  top: 20%;
}

.drop-1 {
  left: 25%;
  animation-delay: 0.5s;
}

.drop-2 {
  left: 45%;
  animation-delay: 1s;
}

.drop-3 {
  left: 65%;
  animation-delay: 1.5s;
}

.drop-4 {
  left: 85%;
  animation-delay: 2s;
}

@keyframes drift {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
}

@keyframes condense {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-20px);
  }
  50% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  80% {
    opacity: 1;
    transform: scale(1.1) translateY(5px);
  }
  100% {
    opacity: 0;
    transform: scale(1) translateY(10px);
  }
}
</style>
