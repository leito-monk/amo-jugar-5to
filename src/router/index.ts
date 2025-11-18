import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/juegos',
      name: 'juegos',
      component: () => import('../views/JuegosView.vue')
    },
    {
      path: '/progreso',
      name: 'progreso',
      component: () => import('../views/ProgresoView.vue')
    },
    {
      path: '/acerca',
      name: 'acerca',
      component: () => import('../views/AcercaView.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/GameDemoView.vue')
    },
    {
      path: '/juegos/viaje-hidrosfera',
      name: 'viaje-hidrosfera',
      component: () => import('../games/viaje-hidrosfera/HidrosferaGame.vue')
    }
  ]
})

export default router
