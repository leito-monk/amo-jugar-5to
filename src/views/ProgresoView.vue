<script setup lang="ts">
import { ref } from 'vue'
import ScoreBoard from '../components/game/ScoreBoard.vue'
import ProgressTracker from '../components/game/ProgressTracker.vue'

const totalScore = ref(1250)
const overallAccuracy = ref(87.5)
const correctAnswers = ref(175)
const totalAnswers = ref(200)

const subjects = ref([
  { name: 'Matemáticas', current: 8, total: 12 },
  { name: 'Lengua', current: 5, total: 8 },
  { name: 'Ciencias', current: 2, total: 6 },
  { name: 'Historia', current: 0, total: 4 }
])

const achievements = ref([
  { emoji: '🏆', title: 'Primera Victoria', description: 'Completa tu primer juego' },
  { emoji: '🔥', title: 'Racha de 5', description: 'Responde 5 preguntas correctas seguidas' },
  { emoji: '⭐', title: 'Experto en Multiplicación', description: 'Completa el juego de multiplicación' },
  { emoji: '📚', title: 'Estudiante Dedicado', description: 'Juega 10 días seguidos' }
])
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">📊 Mi Progreso</h1>
      <p class="text-lg text-base-content/70">
        Observa tu desempeño y logros
      </p>
    </div>

    <!-- Score Board -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Estadísticas Generales</h2>
      <ScoreBoard
        :score="totalScore"
        :accuracy="overallAccuracy"
        :correct-count="correctAnswers"
        :total-count="totalAnswers"
        :show-accuracy="true"
      />
    </div>

    <!-- Progress by Subject -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Progreso por Materia</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="subject in subjects"
          :key="subject.name"
          class="bg-base-100 rounded-lg shadow-lg p-6"
        >
          <ProgressTracker
            :current="subject.current"
            :total="subject.total"
            :label="subject.name"
            :show-percentage="true"
          />
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4">🏅 Logros Desbloqueados</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="achievement in achievements"
          :key="achievement.title"
          class="card bg-base-100 shadow-xl"
        >
          <div class="card-body items-center text-center">
            <div class="text-5xl mb-2">{{ achievement.emoji }}</div>
            <h3 class="font-bold">{{ achievement.title }}</h3>
            <p class="text-sm text-base-content/70">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="text-2xl font-bold mb-4">📅 Actividad Reciente</h2>
      <div class="bg-base-100 rounded-lg shadow-lg p-6">
        <ul class="timeline timeline-vertical">
          <li>
            <div class="timeline-start timeline-box">
              <div class="font-bold">Multiplicación Maestro</div>
              <div class="text-sm text-base-content/70">Completado • Hace 2 horas</div>
            </div>
            <div class="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
              </svg>
            </div>
            <hr class="bg-primary" />
          </li>
          <li>
            <hr class="bg-primary" />
            <div class="timeline-start timeline-box">
              <div class="font-bold">Fracciones Divertidas</div>
              <div class="text-sm text-base-content/70">En progreso • Hace 1 día</div>
            </div>
            <div class="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
              </svg>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div class="timeline-start timeline-box">
              <div class="font-bold">Palabras Misteriosas</div>
              <div class="text-sm text-base-content/70">Iniciado • Hace 2 días</div>
            </div>
            <div class="timeline-middle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
              </svg>
            </div>
            <hr />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
