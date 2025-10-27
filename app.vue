<template>
  <div id="app" class="min-h-screen relative overflow-hidden">
    <!-- Iridescent Background -->
    <Iridescence
      class="absolute inset-0 -z-10"
      :color="[0.6, 0.7, 0.5]"
      :speed="0.2"
      :amplitude="0.1"
      :mouseReact="false"
    />

    <!-- Foreground -->
    <Header />

    <div class="relative z-10">
      <main class="pt-20">
        <transition name="page" mode="out-in">
          <NuxtPage />
        </transition>
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import Iridescence from '@/components/Iridescence.vue'
</script>

<style>
/* Smooth blur-based page transition (no white flash) */
.page-enter-active,
.page-leave-active {
  transition: filter 0.2s linear;
}

.page-enter-from,
.page-leave-to {
  filter: blur(6px);
}
</style>
