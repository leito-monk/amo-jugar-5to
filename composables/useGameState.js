/**
 * useGameState.js
 * Estado compartido para todos los juegos
 */

import { ref, computed } from 'vue';
import * as localStorage from './useLocalStorage.js';

const STORAGE_KEY = 'gameState';

/**
 * Estado por defecto del juego
 */
function getDefaultState(gameId = '') {
  return {
    gameId: gameId,
    score: 0,
    completed: false,
    attemptsCount: 0,
    correctAnswers: 0,
    totalQuestions: 0,
    timeSpent: 0,
    startTime: null,
    lastPlayed: null,
    achievements: [],
    currentLevel: 1,
    maxLevel: 1
  };
}

/**
 * Estado reactivo del juego
 */
const state = ref(getDefaultState());

/**
 * Carga el estado desde localStorage o usa el estado por defecto
 * @param {string} gameId - ID del juego a cargar
 * @returns {object} - Estado cargado
 */
export function loadState(gameId) {
  try {
    const storageKey = `${STORAGE_KEY}_${gameId}`;
    const savedState = localStorage.load(storageKey);
    
    if (savedState) {
      state.value = { ...getDefaultState(gameId), ...savedState };
    } else {
      state.value = getDefaultState(gameId);
    }
    
    return state.value;
  } catch (error) {
    console.error('Error al cargar estado del juego:', error);
    state.value = getDefaultState(gameId);
    return state.value;
  }
}

/**
 * Persiste el estado actual en localStorage
 * @returns {boolean} - true si se guardó exitosamente
 */
export function saveState() {
  try {
    const storageKey = `${STORAGE_KEY}_${state.value.gameId}`;
    return localStorage.save(storageKey, state.value);
  } catch (error) {
    console.error('Error al guardar estado del juego:', error);
    return false;
  }
}

/**
 * Inicia el juego (inicia timer, incrementa attemptsCount)
 */
export function startGame() {
  state.value.startTime = Date.now();
  state.value.attemptsCount++;
  state.value.lastPlayed = new Date().toISOString();
  saveState();
}

/**
 * Suma puntos al score
 * @param {number} points - Puntos a sumar (debe ser > 0)
 */
export function addScore(points) {
  if (points > 0) {
    state.value.score += points;
    saveState();
  }
}

/**
 * Registra una respuesta (correcta o incorrecta)
 * @param {boolean} isCorrect - true si la respuesta es correcta
 */
export function recordAnswer(isCorrect) {
  state.value.totalQuestions++;
  if (isCorrect) {
    state.value.correctAnswers++;
  }
  saveState();
}

/**
 * Avanza al siguiente nivel
 */
export function levelUp() {
  state.value.currentLevel++;
  if (state.value.currentLevel > state.value.maxLevel) {
    state.value.maxLevel = state.value.currentLevel;
  }
  saveState();
}

/**
 * Marca el juego como completado y calcula el tiempo transcurrido
 */
export function markCompleted() {
  state.value.completed = true;
  
  if (state.value.startTime) {
    const endTime = Date.now();
    state.value.timeSpent = Math.floor((endTime - state.value.startTime) / 1000);
  }
  
  saveState();
}

/**
 * Resetea el juego al estado por defecto (mantiene attemptsCount)
 */
export function resetGame() {
  const currentAttemptsCount = state.value.attemptsCount;
  const currentGameId = state.value.gameId;
  state.value = getDefaultState(currentGameId);
  state.value.attemptsCount = currentAttemptsCount;
  saveState();
}

/**
 * Desbloquea un logro (lo agrega si no existe)
 * @param {string} id - ID del logro a desbloquear
 */
export function unlockAchievement(id) {
  if (!state.value.achievements.includes(id)) {
    state.value.achievements.push(id);
    saveState();
  }
}

/**
 * Computed property: Porcentaje de aciertos
 */
export const accuracy = computed(() => {
  if (state.value.totalQuestions === 0) {
    return 0;
  }
  return Math.round((state.value.correctAnswers / state.value.totalQuestions) * 100);
});

/**
 * Computed property: Si el juego ha sido jugado
 */
export const hasPlayed = computed(() => {
  return state.value.attemptsCount > 0;
});

/**
 * Computed property: Tiempo formateado como "MM:SS"
 */
export const formattedTime = computed(() => {
  const minutes = Math.floor(state.value.timeSpent / 60);
  const seconds = state.value.timeSpent % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

/**
 * Obtiene el estado actual
 */
export function getState() {
  return state.value;
}

export default {
  loadState,
  saveState,
  startGame,
  addScore,
  recordAnswer,
  levelUp,
  markCompleted,
  resetGame,
  unlockAchievement,
  accuracy,
  hasPlayed,
  formattedTime,
  getState
};
