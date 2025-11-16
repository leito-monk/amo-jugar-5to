import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // Routes will be added here as the application grows
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
