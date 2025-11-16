/**
 * useSound.js
 * Reproducir sonidos del juego usando Web Audio API
 */

import { ref } from 'vue';

/**
 * Estado de silencio
 */
const isMuted = ref(false);

/**
 * Contexto de audio (se crea al primer uso)
 */
let audioContext = null;

/**
 * Obtiene o crea el contexto de audio
 * @returns {AudioContext} - Contexto de audio
 */
function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

/**
 * Crea un oscilador para generar tonos
 * @param {number} frequency - Frecuencia en Hz
 * @param {number} duration - Duración en segundos
 * @param {string} type - Tipo de onda ('sine', 'square', 'sawtooth', 'triangle')
 */
function playTone(frequency, duration, type = 'sine') {
  if (isMuted.value) {
    return;
  }

  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    // Envelope para evitar clicks
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (error) {
    console.error('Error al reproducir tono:', error);
  }
}

/**
 * Reproduce una secuencia de tonos
 * @param {Array} notes - Array de objetos {frequency, duration, delay}
 */
function playSequence(notes) {
  if (isMuted.value) {
    return;
  }

  try {
    const ctx = getAudioContext();
    let startTime = ctx.currentTime;

    notes.forEach(note => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = note.type || 'sine';
      oscillator.frequency.value = note.frequency;

      const noteStartTime = startTime + (note.delay || 0);
      const noteDuration = note.duration || 0.2;

      gainNode.gain.setValueAtTime(0, noteStartTime);
      gainNode.gain.linearRampToValueAtTime(0.3, noteStartTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.01, noteStartTime + noteDuration);

      oscillator.start(noteStartTime);
      oscillator.stop(noteStartTime + noteDuration);
    });
  } catch (error) {
    console.error('Error al reproducir secuencia:', error);
  }
}

/**
 * Reproduce sonido de acierto
 */
export function playCorrect() {
  playSequence([
    { frequency: 523.25, duration: 0.15, delay: 0 },      // C5
    { frequency: 659.25, duration: 0.15, delay: 0.1 },    // E5
    { frequency: 783.99, duration: 0.3, delay: 0.2 }      // G5
  ]);
}

/**
 * Reproduce sonido de error
 */
export function playWrong() {
  playSequence([
    { frequency: 329.63, duration: 0.2, delay: 0, type: 'square' },  // E4
    { frequency: 246.94, duration: 0.3, delay: 0.15, type: 'square' } // B3
  ]);
}

/**
 * Reproduce sonido de nivel completado
 */
export function playComplete() {
  playSequence([
    { frequency: 523.25, duration: 0.15, delay: 0 },      // C5
    { frequency: 659.25, duration: 0.15, delay: 0.15 },   // E5
    { frequency: 783.99, duration: 0.15, delay: 0.3 },    // G5
    { frequency: 1046.5, duration: 0.4, delay: 0.45 }     // C6
  ]);
}

/**
 * Alterna el estado de silencio
 * @returns {boolean} - Nuevo estado de silencio
 */
export function toggleMute() {
  isMuted.value = !isMuted.value;
  return isMuted.value;
}

/**
 * Obtiene el estado actual de silencio
 * @returns {boolean} - true si está silenciado
 */
export function getMuteState() {
  return isMuted.value;
}

/**
 * Establece el estado de silencio
 * @param {boolean} muted - true para silenciar, false para activar sonido
 */
export function setMuted(muted) {
  isMuted.value = muted;
}

export default {
  playCorrect,
  playWrong,
  playComplete,
  toggleMute,
  getMuteState,
  setMuted
};
