<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import GameCard, { type Game } from '../components/game/GameCard.vue'

const games = ref<Game[]>([
  {
    id: 'cazador-caligramas',
    titulo: 'Cazador de Caligramas',
    materia: 'Lengua',
    descripcion: 'Descubre poemas visuales arrastrando versos a su lugar correcto',
    icono: '🦋',
    dificultad: 'Medio',
    duracion: '60 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'detectivismo-poetico',
    titulo: 'Detectivismo Poético',
    materia: 'Lengua',
    descripcion: 'Conviértete en detective literario y resuelve misterios poéticos',
    icono: '🕵️‍♂️',
    dificultad: 'Medio',
    duracion: '45 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'ciclo-agua',
    titulo: 'Ciclo del Agua: La Gran Aventura',
    materia: 'Ciencias Naturales',
    descripcion: 'Viaja como una gota de agua a través del ciclo del agua',
    icono: '🌊',
    dificultad: 'Medio',
    duracion: '20 min',
    activo: true,
    completado: false,
    progreso: 0
  },
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

const router = useRouter()

const handleGameClick = (game: Game) => {
  if (game.activo && game.id === 'cazador-caligramas') {
    router.push(`/juegos/${game.id}`)
  } else if (game.activo && game.id === 'detectivismo-poetico') {
    router.push(`/${game.id}`)
  } else if (game.activo && game.id === 'ciclo-agua') {
    router.push(`/${game.id}`)
  } else {
    console.log('Juego seleccionado:', game.titulo)
    // Otros juegos aún no implementados
  }
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
