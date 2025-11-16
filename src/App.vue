<script setup>
import { ref } from 'vue'

const title = ref('Yo Amo Aprender Digital')
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-edu-primary/10 to-edu-secondary/10">
    <div class="container-edu">
      <!-- Hero Section -->
      <div class="text-center py-12">
        <h1 class="text-edu-title text-5xl mb-4 text-shadow-edu font-display">
          {{ title }}
        </h1>
        <p class="text-edu-subtitle mb-8">
          Plataforma educativa para 5to grado
        </p>
        
        <!-- Demo Buttons -->
        <div class="flex gap-4 justify-center flex-wrap">
          <button class="btn-edu-primary">
            Botón Primario
          </button>
          <button class="btn-edu-secondary">
            Botón Secundario
          </button>
          <button class="btn-edu-success">
            Botón Éxito
          </button>
        </div>
      </div>

      <!-- Demo Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        <div class="card-edu">
          <h3 class="text-xl font-bold text-edu-primary mb-2">Card Básica</h3>
          <p class="text-gray-600">
            Esta es una tarjeta educativa básica con estilos personalizados.
          </p>
        </div>
        
        <div class="card-edu-bordered">
          <h3 class="text-xl font-bold text-edu-secondary mb-2">Card con Borde</h3>
          <p class="text-gray-600">
            Esta tarjeta tiene un borde personalizado.
          </p>
        </div>
        
        <div class="card-edu-game">
          <h3 class="text-xl font-bold text-edu-success mb-2">Card de Juego</h3>
          <p class="text-gray-600">
            Esta tarjeta se anima al pasar el mouse.
          </p>
        </div>
      </div>

      <!-- Font Demo -->
      <div class="card-edu mt-12">
        <h3 class="font-sans text-2xl mb-2">Fuente Quicksand (Sans)</h3>
        <p class="font-display text-3xl text-edu-primary">
          Fuente Comic Neue (Display)
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
