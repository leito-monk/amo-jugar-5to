<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const menuOpen = ref(false)
const router = useRouter()

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <header class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
    <div class="container mx-auto">
      <!-- Back Button -->
      <div class="flex-none">
        <button @click="goBack" class="btn btn-ghost btn-circle" title="Atrás">
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
      </div>

      <div class="flex-1">
        <RouterLink to="/" class="btn btn-ghost text-xl gap-2" @click="closeMenu">
          <span class="text-2xl">🎮</span>
          <span class="font-bold">Amo Jugar 5to</span>
        </RouterLink>
      </div>
      
      <!-- Desktop Navigation -->
      <div class="flex-none hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><RouterLink to="/" class="btn btn-ghost">Home</RouterLink></li>
          <li><RouterLink to="/juegos" class="btn btn-ghost">Juegos</RouterLink></li>
          <li><RouterLink to="/progreso" class="btn btn-ghost">Progreso</RouterLink></li>
          <li><RouterLink to="/acerca" class="btn btn-ghost">Acerca de</RouterLink></li>
        </ul>
      </div>

      <!-- Mobile Hamburger Menu -->
      <div class="flex-none lg:hidden">
        <button class="btn btn-square btn-ghost" @click="toggleMenu">
          <svg
            v-if="!menuOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-6 h-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Menu -->
  <Transition name="slide-down">
    <div v-if="menuOpen" class="lg:hidden bg-base-100 shadow-lg">
      <ul class="menu menu-vertical px-4 py-2">
        <li><RouterLink to="/" class="btn btn-ghost justify-start" @click="closeMenu">Home</RouterLink></li>
        <li><RouterLink to="/juegos" class="btn btn-ghost justify-start" @click="closeMenu">Juegos</RouterLink></li>
        <li><RouterLink to="/progreso" class="btn btn-ghost justify-start" @click="closeMenu">Progreso</RouterLink></li>
        <li><RouterLink to="/acerca" class="btn btn-ghost justify-start" @click="closeMenu">Acerca de</RouterLink></li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
