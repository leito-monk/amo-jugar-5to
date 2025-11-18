<script setup>
import CafecitoButton from './components/CafecitoButton.vue'
import ThankYouBanner from './components/ThankYouBanner.vue'
import Footer from './components/layout/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <ThankYouBanner />
    <router-view />
    <Footer />
    <CafecitoButton variant="floating" username="leitomonk" />
  </div>
</template>

<style scoped>
/* Component-specific styles if needed */
</style>
