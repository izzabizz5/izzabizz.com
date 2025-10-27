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
        <NuxtLayout>
          <template #default>
            <transition name="page" mode="out-in">
              <div>
                <NuxtPage />
              </div>
            </transition>
          </template>
        </NuxtLayout>
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
  transition: opacity 0.2s ease, filter 0.2s linear;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(6px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  filter: blur(0);
}
</style>
