<script setup lang="ts">
</script>

<template>
  <div class="precipitation-animation">
    <div class="rain-drop drop-1">💧</div>
    <div class="rain-drop drop-2">💧</div>
    <div class="rain-drop drop-3">💧</div>
    <div class="rain-drop drop-4">💧</div>
    <div class="rain-drop drop-5">💧</div>
    <div class="rain-drop drop-6">💧</div>
    <div class="rain-drop drop-7">💧</div>
    <div class="rain-drop drop-8">💧</div>
  </div>
</template>

<style scoped>
.precipitation-animation {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

.rain-drop {
  position: absolute;
  font-size: 1.5rem;
  animation: fall 2s linear infinite;
  opacity: 0.8;
  top: -20px;
}

.drop-1 {
  left: 10%;
  animation-delay: 0s;
}

.drop-2 {
  left: 20%;
  animation-delay: 0.3s;
}

.drop-3 {
  left: 35%;
  animation-delay: 0.6s;
}

.drop-4 {
  left: 50%;
  animation-delay: 0.9s;
}

.drop-5 {
  left: 60%;
  animation-delay: 0.2s;
}

.drop-6 {
  left: 75%;
  animation-delay: 0.5s;
}

.drop-7 {
  left: 85%;
  animation-delay: 0.8s;
}

.drop-8 {
  left: 95%;
  animation-delay: 0.4s;
}

@keyframes fall {
  0% {
    transform: translateY(0) rotate(10deg);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translateY(calc(100vh + 40px)) rotate(10deg);
    opacity: 0;
  }
}
</style>
