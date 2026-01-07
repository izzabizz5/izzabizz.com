<template>
  <header
    class="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-[#1a3a52]/90 via-[#2c5270]/90 to-[#1a3a52]/90 backdrop-blur-xl border-b border-blue-200/20 shadow-lg shadow-black/20"
  >
    <div
      class="flex items-center w-full px-6 py-4 text-blue-100 font-mono lowercase"
    >
      <!-- Left: Logo (fixed width) -->
      <div class="text-lg tracking-widest font-semibold select-none flex-shrink-0 w-48 hover:text-blue-100 transition-colors duration-300 cursor-default text-blue-100">
        <span class="inline-block hover:animate-pulse">izzabizz_</span>
      </div>

      <!-- Center: Navigation (grows to take available space) -->
      <nav
        class="hidden md:flex flex-1 items-center justify-center gap-10"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="nav-link px-6 py-2 rounded-full border border-blue-200/30 bg-gradient-to-br from-[#2c5270]/50 to-[#1a3a52]/50
                 hover:from-[#4a7a9e]/40 hover:to-[#2c5270]/70 hover:border-blue-200/60 hover:shadow-lg hover:shadow-blue-300/20
                 text-blue-100 hover:text-white transition-all duration-300 ease-out
                 flex items-center justify-center relative overflow-hidden
                 hover:scale-105 active:scale-95"
        >
          <span class="relative z-10">{{ link.name }}</span>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/10 to-transparent translate-x-[-100%] hover-slide"></span>
        </NuxtLink>
      </nav>

      <!-- Right: Animated Uptime Indicator (fixed width) -->
      <div class="hidden md:flex items-center gap-2 text-sm text-blue-100/80 flex-shrink-0 w-48 justify-end">
        <span class="opacity-80">uptime:</span>
        <span class="text-blue-100 font-semibold tabular-nums px-2 py-1 rounded bg-blue-300/10 border border-blue-200/20">{{ uptime }}</span>
      </div>

      <!-- Mobile Hamburger -->
      <div class="flex items-center md:hidden ml-auto">
        <button
          @click="isOpen = !isOpen"
          class="w-9 h-9 rounded-full border border-blue-200/20 flex items-center justify-center
                 hover:border-blue-200/40 bg-[#2c5270]/80 transition-all duration-200"
        >
          <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            class="w-5 h-5 text-blue-100"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            class="w-5 h-5 text-blue-100"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="fade">
      <nav
        v-if="isOpen"
        class="md:hidden flex flex-col w-full items-start gap-4 pb-5 pt-2 bg-[#2c5270]/80 border-t border-blue-200/10 px-6"
      >
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          class="px-6 py-2 rounded-full border border-blue-200/20 bg-[#2c5270]/40
                 hover:border-blue-200/40 hover:bg-[#4a7a9e]/80 text-blue-100 hover:text-white
                 transition-all duration-200 w-full text-left"
        >
          {{ link.name }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const isOpen = ref(false);
const links = [
  { name: "home", href: "/" },
  { name: "projects", href: "/projects" },
  { name: "about", href: "/about" },
];

const uptime = ref("00:00:00");

onMounted(() => {
  // Website launch date: October 27th, 2025
  const launchDate = new Date('2025-10-27T00:00:00').getTime();
  
  const updateUptime = () => {
    const diff = Math.floor((Date.now() - launchDate) / 1000);
    const days = Math.floor(diff / 86400);
    const hrs = Math.floor((diff % 86400) / 3600);
    const mins = Math.floor((diff % 3600) / 60);
    const secs = diff % 60;
    
    if (days > 0) {
      uptime.value = `${days}d ${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    } else {
      uptime.value = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  };
  
  updateUptime();
  setInterval(updateUptime, 1000);
});
</script>

<style scoped>
.nav-link:hover .hover-slide {
  animation: slide 0.6s ease-out;
}

@keyframes slide {
  to {
    transform: translateX(200%);
  }
}
</style>
