import { createRouter, createWebHashHistory } from 'vue-router'
import CaligramaGame from '../games/cazador-caligramas/CaligramaGame.vue'
import AutopistaGame from '../games/autopista-numerica/AutopistaGame.vue'

const routes = [
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
    path: '/detectivismo-poetico',
    name: 'detectivismo-poetico',
    component: () => import('../games/detectivismo-poetico/DetectiveGame.vue')
  },
  {
    path: '/juegos/cazador-caligramas',
    name: 'cazador-caligramas',
    component: CaligramaGame
  },
  {
    path: '/juegos/linea-tiempo',
    name: 'linea-tiempo',
    component: () => import('../games/linea-tiempo/LineaTiempoGame.vue')
    path: '/juegos/viaje-hidrosfera',
    name: 'viaje-hidrosfera',
    component: () => import('../games/viaje-hidrosfera/HidrosferaGame.vue')
    path: '/laboratorio-acentuacion',
    name: 'laboratorio-acentuacion',
    component: () => import('../games/laboratorio-acentuacion/AcentuacionGame.vue')
    path: '/juegos/autopista-numerica',
    name: 'autopista-numerica',
    component: AutopistaGame
    path: '/transformador-calculadora',
    name: 'transformador-calculadora',
    component: () => import('../games/transformador-calculadora/CalculadoraGame.vue')
    path: '/ciclo-agua',
    name: 'ciclo-agua',
    component: () => import('../games/ciclo-agua/CicloAguaGame.vue')
  }
  // More routes will be added here as the application grows
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
