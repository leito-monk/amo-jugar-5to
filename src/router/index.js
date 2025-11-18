import { createRouter, createWebHistory } from 'vue-router'
import CaligramaGame from '../games/cazador-caligramas/CaligramaGame.vue'

const routes = [
  {
    path: '/juegos/cazador-caligramas',
    name: 'cazador-caligramas',
    component: CaligramaGame
  }
  // More routes will be added here as the application grows
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
