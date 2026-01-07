<template>
  <div id="app" class="min-h-screen relative">
    <!-- Pixel Blast Background -->
    <PixelBlast
      :particle-count="2500"
      :colors="['#FFFBA9']"
      :speed="0.5"
    />

    <!-- Foreground Content -->
    <div class="relative z-10 min-h-screen">
      <Header />
      
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
import PixelBlast from '@/components/PixelBlast.vue'
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
