<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="hero min-h-[70vh] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
    <div class="hero-content text-center">
      <div class="max-w-2xl">
        <div class="text-8xl mb-6">🎮</div>
        <h1 class="text-5xl font-bold mb-6">Amo Jugar 5to</h1>
        <p class="text-xl mb-8">
          Plataforma educativa interactiva diseñada para estudiantes de 5to grado.
          Aprende jugando con actividades de matemáticas, lengua y más.
        </p>
        <div class="flex gap-4 justify-center flex-wrap">
          <RouterLink to="/juegos" class="btn btn-primary btn-lg">
            🎯 Explorar Juegos
          </RouterLink>
          <RouterLink to="/progreso" class="btn btn-outline btn-lg">
            📊 Ver mi Progreso
          </RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto px-4 py-16">
    <h2 class="text-3xl font-bold text-center mb-12">¿Por qué elegir Amo Jugar?</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <div class="text-5xl mb-4">📚</div>
          <h3 class="card-title">Contenido Educativo</h3>
          <p>Juegos alineados con el currículum de 5to grado</p>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <div class="text-5xl mb-4">🎯</div>
          <h3 class="card-title">Aprendizaje Divertido</h3>
          <p>Aprende mientras te diviertes con actividades interactivas</p>
        </div>
      </div>
      
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <div class="text-5xl mb-4">📈</div>
          <h3 class="card-title">Sigue tu Progreso</h3>
          <p>Observa tu mejora y logros a lo largo del tiempo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
