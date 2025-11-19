/**
 * Type declarations for randomizer utilities
 */

export function shuffleArray<T>(array: T[]): T[]
export function selectRandomItems<T>(array: T[], count: number): T[]
export function shuffleWithFixedPositions<T>(array: T[], fixedIndices?: number[]): T[]
export function selectByDifficulty<T extends { dificultad: string }>(
  questions: T[],
  distribution: Record<string, number>
): T[]
export function getDailySeed(): number
export function seededRandom(seed: number): () => number
export function shuffleWithSeed<T>(array: T[], seed: number): T[]
export function weightedRandomSelect<T extends { peso?: number; weight?: number }>(items: T[]): T
