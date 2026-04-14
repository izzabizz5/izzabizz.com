<template>
  <div id="app">
    <OrganicBg />
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
import OrganicBg from '@/components/OrganicBg.vue'
</script>

<style>
#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #0A0810;
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
