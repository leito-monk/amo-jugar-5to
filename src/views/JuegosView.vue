<script setup lang="ts">
import { ref } from 'vue'
import GameCard, { type Game } from '../components/game/GameCard.vue'

const games = ref<Game[]>([
  {
    id: 'suma-rapida',
    titulo: 'Suma Rápida',
    materia: 'Matemáticas',
    descripcion: 'Practica sumas con tiempo limitado',
    icono: '➕',
    dificultad: 'Fácil',
    duracion: '5 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'multiplicacion-maestro',
    titulo: 'Multiplicación Maestro',
    materia: 'Matemáticas',
    descripcion: 'Domina las tablas de multiplicar',
    icono: '✖️',
    dificultad: 'Medio',
    duracion: '10 min',
    activo: true,
    completado: true
  },
  {
    id: 'fracciones-divertidas',
    titulo: 'Fracciones Divertidas',
    materia: 'Matemáticas',
    descripcion: 'Aprende sobre fracciones de forma visual',
    icono: '🍕',
    dificultad: 'Medio',
    duracion: '8 min',
    activo: true,
    completado: false,
    progreso: 45
  },
  {
    id: 'palabras-misteriosas',
    titulo: 'Palabras Misteriosas',
    materia: 'Lengua',
    descripcion: 'Encuentra las palabras ocultas',
    icono: '📝',
    dificultad: 'Fácil',
    duracion: '7 min',
    activo: true,
    completado: false,
    progreso: 20
  },
  {
    id: 'ortografia-campeones',
    titulo: 'Ortografía de Campeones',
    materia: 'Lengua',
    descripcion: 'Mejora tu ortografía con ejercicios prácticos',
    icono: '✍️',
    dificultad: 'Medio',
    duracion: '10 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'ecuaciones-avanzadas',
    titulo: 'Ecuaciones Avanzadas',
    materia: 'Matemáticas',
    descripcion: 'Resuelve ecuaciones complejas',
    icono: '🧮',
    dificultad: 'Difícil',
    duracion: '15 min',
    activo: false
  }
])

const handleGameClick = (game: Game) => {
  console.log('Juego seleccionado:', game.titulo)
  // Aquí se navegaría a la vista del juego específico
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">🎮 Galería de Juegos</h1>
      <p class="text-lg text-base-content/70">
        Explora todos los juegos disponibles y comienza a aprender jugando
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :game="game"
        @click="handleGameClick(game)"
      />
    </div>

    <div class="mt-12 text-center">
      <div class="alert alert-info inline-flex max-w-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>¡Más juegos próximamente! Completa los disponibles para desbloquear nuevos desafíos.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
