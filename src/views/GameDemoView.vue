<script setup lang="ts">
import { ref } from 'vue'
import GameLayout from '../components/game/GameLayout.vue'
import ScoreBoard from '../components/game/ScoreBoard.vue'
import ProgressTracker from '../components/game/ProgressTracker.vue'
import FeedbackModal from '../components/game/FeedbackModal.vue'

const score = ref(150)
const accuracy = ref(85)
const correctCount = ref(17)
const totalCount = ref(20)
const currentQuestion = ref(5)
const totalQuestions = ref(10)

const showCorrectModal = ref(false)
const showIncorrectModal = ref(false)

const handleShowCorrect = () => {
  showCorrectModal.value = true
}

const handleShowIncorrect = () => {
  showIncorrectModal.value = true
}
</script>

<template>
  <GameLayout
    title="Demo de Componentes del Juego"
    instructions="Esta es una demostración de todos los componentes del juego en acción.

Aquí puedes ver:
- El layout del juego con header sticky
- ScoreBoard mostrando puntuación y estadísticas
- ProgressTracker con barra de progreso
- FeedbackModal para mostrar retroalimentación

Prueba los botones para ver los diferentes modales de retroalimentación."
  >
    <div class="space-y-6">
      <!-- Score Board -->
      <div>
        <h2 class="text-2xl font-bold mb-4">ScoreBoard Component</h2>
        <ScoreBoard
          :score="score"
          :accuracy="accuracy"
          :correct-count="correctCount"
          :total-count="totalCount"
          :show-accuracy="true"
        />
      </div>

      <!-- Progress Tracker -->
      <div>
        <h2 class="text-2xl font-bold mb-4">ProgressTracker Component</h2>
        <div class="bg-base-100 rounded-lg shadow-lg p-6">
          <ProgressTracker
            :current="currentQuestion"
            :total="totalQuestions"
            label="Preguntas Respondidas"
            :show-percentage="true"
          />
        </div>
      </div>

      <!-- Feedback Modal Demo -->
      <div>
        <h2 class="text-2xl font-bold mb-4">FeedbackModal Component</h2>
        <div class="bg-base-100 rounded-lg shadow-lg p-6">
          <p class="mb-4">Haz clic en los botones para ver los modales de retroalimentación:</p>
          <div class="flex gap-4 flex-wrap">
            <button @click="handleShowCorrect" class="btn btn-success">
              ✅ Mostrar Modal Correcto
            </button>
            <button @click="handleShowIncorrect" class="btn btn-warning">
              💡 Mostrar Modal Incorrecto
            </button>
          </div>
        </div>
      </div>

      <!-- Game Content Example -->
      <div>
        <h2 class="text-2xl font-bold mb-4">Área de Contenido del Juego</h2>
        <div class="bg-base-100 rounded-lg shadow-lg p-8 text-center">
          <p class="text-6xl mb-4">5 + 3 = ?</p>
          <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <button class="btn btn-lg btn-outline">6</button>
            <button class="btn btn-lg btn-outline">7</button>
            <button class="btn btn-lg btn-outline">8</button>
            <button class="btn btn-lg btn-outline">9</button>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="text-center text-sm text-base-content/70">
        Este es un ejemplo del slot de footer opcional
      </div>
    </template>
  </GameLayout>

  <!-- Feedback Modals -->
  <FeedbackModal
    :is-correct="true"
    :show="showCorrectModal"
    message="¡Excelente trabajo! La respuesta correcta es 8. Has demostrado un gran entendimiento de la suma."
    @close="showCorrectModal = false"
  >
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Puntos ganados</div>
        <div class="stat-value text-success">+10</div>
      </div>
    </div>
  </FeedbackModal>

  <FeedbackModal
    :is-correct="false"
    :show="showIncorrectModal"
    message="No te preocupes, todos cometemos errores. Recuerda que cuando sumas 5 + 3, estás contando 3 números más después del 5. Intenta de nuevo."
    @close="showIncorrectModal = false"
  />
</template>

<style scoped>
</style>
