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
      path: '/agradecimientos',
      name: 'agradecimientos',
      component: () => import('../views/AgradecimientosView.vue')
    },
    {
      path: '/privacidad',
      name: 'privacidad',
      component: () => import('../views/PrivacidadView.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/GameDemoView.vue')
    },
    {
      path: '/juegos/viaje-hidrosfera',
      name: 'viaje-hidrosfera',
      component: () => import('../games/viaje-hidrosfera/HidrosferaGameSimple.vue'),
    },
    {
      path: '/laboratorio-acentuacion',
      name: 'laboratorio-acentuacion',
      component: () => import('../games/laboratorio-acentuacion/AcentuacionGame.vue')
    },
    {
      path: '/juegos/cazador-caligramas',
      name: 'cazador-caligramas',
      component: () => import('../games/cazador-caligramas/CaligramaGame.vue')
    },
    {
      path: '/detectivismo-poetico',
      name: 'detectivismo-poetico',
      component: () => import('../games/detectivismo-poetico/DetectiveGame.vue')
    },
    {
      path: '/juegos/autopista-numerica',
      name: 'autopista-numerica',
      component: () => import('../games/autopista-numerica/AutopistaGame.vue')
    },
    {
      path: '/juegos/transformador-calculadora',
      name: 'transformador-calculadora',
      component: () => import('../games/transformador-calculadora/CalculadoraGame.vue')
    },
    {
      path: '/ciclo-agua',
      name: 'ciclo-agua',
      component: () => import('../games/ciclo-agua/CicloAguaGame.vue')
    },
    {
      path: '/juegos/defensa-buenosaires',
      name: 'defensa-buenosaires',
      component: () => import('../games/defensa-buenosaires/DefensaGame.vue')
    },
    {
      path: '/juegos/aventura-misiones',
      name: 'aventura-misiones',
      component: () => import('../games/aventura-misiones/MisionesGame.vue')
    },
    {
      path: '/juegos/portal-magico',
      name: 'portal-magico',
      component: () => import('../games/portal-magico/PortalGame.vue')
    },
    {
      path: '/juegos/quiz-rapido',
      name: 'quiz-rapido',
      component: () => import('../games/quiz-rapido/QuizGame.vue')
    }
  ]
})

export default router
