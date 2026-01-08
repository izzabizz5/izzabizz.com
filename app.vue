<template>
  <div id="app">
    <PixelSnow
      :colors="['#F0E7D5']"
      :flakeSize="0.01"
      :minFlakeSize="1.25"
      :pixelResolution="200"
      :speed="1.25"
      :density="0.2"
      :direction="125"
      :brightness="3.5"
      :depthFade="20"
      :gamma="0.3"
    />
    <div class="content-wrapper">
      <Header />
      <main>
        <NuxtPage />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import PixelSnow from '@/components/PixelSnow.vue'
</script>

<style>
#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}
</style>
