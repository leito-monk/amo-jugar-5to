<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CafecitoButton from './components/CafecitoButton.vue'
import ThankYouBanner from './components/ThankYouBanner.vue'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'

const route = useRoute()
const showHeader = computed(() => route.name !== 'home')
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <ThankYouBanner />
    <Header v-if="showHeader" />
    <router-view />
    <Footer />
    <CafecitoButton variant="floating" username="leitomonk" />
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
