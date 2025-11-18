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
    id: 'laboratorio-acentuacion',
    titulo: 'Laboratorio de Acentuación',
    materia: 'Lengua',
    descripcion: 'Clasifica palabras según su acentuación: agudas, graves y esdrújulas',
    icono: '🧪',
    dificultad: 'Medio',
    duracion: '10 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'autopista-numerica',
    titulo: 'Autopista Numérica',
    materia: 'Matemáticas',
    descripcion: 'Compite en una carrera de autos respondiendo preguntas sobre números hasta 9.999.999',
    icono: '🏁',
    dificultad: 'Medio',
    duracion: '15 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'transformador-calculadora',
    titulo: 'Transformador de Calculadora',
    materia: 'Matemáticas',
    descripcion: 'Aprende valor posicional transformando números con suma y resta',
    icono: '🔢',
    dificultad: 'Medio',
    duracion: '30 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'viaje-hidrosfera',
    titulo: 'Viaje por la Hidrosfera',
    materia: 'Ciencias Naturales',
    descripcion: 'Explora el agua en el planeta y descubre sus estados y ubicaciones',
    icono: '🌊',
    dificultad: 'Medio',
    duracion: '30 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'ciclo-agua',
    titulo: 'Ciclo del Agua: La Gran Aventura',
    materia: 'Ciencias Naturales',
    descripcion: 'Viaja como una gota de agua a través del ciclo del agua',
    icono: '💧',
    dificultad: 'Medio',
    duracion: '20 min',
    activo: true,
    completado: false,
    progreso: 0
  },
  {
    id: 'aventura-misiones',
    titulo: 'Aventura en Misiones',
    materia: 'Lengua',
    descripcion: 'Explora los cuentos de Horacio Quiroga en la selva misionera',
    icono: '🌿',
    dificultad: 'Medio',
    duracion: '40 min',
    activo: true,
    completado: false,
    progreso: 0
  }
])

const router = useRouter()

const handleGameClick = (game: Game) => {
  if (!game.activo) {
    console.log('Juego no disponible:', game.titulo)
    return
  }

  // Mapa de rutas para cada juego
  const routeMap: Record<string, string> = {
    'cazador-caligramas': '/juegos/cazador-caligramas',
    'detectivismo-poetico': '/detectivismo-poetico',
    'laboratorio-acentuacion': '/laboratorio-acentuacion',
    'autopista-numerica': '/juegos/autopista-numerica',
    'transformador-calculadora': '/juegos/transformador-calculadora',
    'viaje-hidrosfera': '/juegos/viaje-hidrosfera',
    'ciclo-agua': '/ciclo-agua',
    'aventura-misiones': '/juegos/aventura-misiones'
  }

  const route = routeMap[game.id]
  if (route) {
    router.push(route)
  } else {
    console.log('Ruta no configurada para:', game.titulo)
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
