<template>
  <header class="site-header">
    <div class="header-content">
      <!-- Left: Logo (fixed width) -->
      <div class="text-base sm:text-lg tracking-widest font-semibold select-none flex-shrink-0 w-32 sm:w-48 hover:text-[#F0E7D5] transition-colors duration-300 cursor-default text-[#F0E7D5]/90">
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
          class="nav-link px-6 py-2 rounded-full border border-[#F0E7D5]/30 bg-gradient-to-br from-[#2d3555]/50 to-[#1a1f35]/50
                 hover:from-[#3d4a70]/40 hover:to-[#2d3555]/70 hover:border-[#F0E7D5]/60 hover:shadow-lg hover:shadow-[#F0E7D5]/20
                 text-[#F0E7D5]/90 hover:text-white transition-all duration-300 ease-out
                 flex items-center justify-center relative overflow-hidden
                 hover:scale-105 active:scale-95"
        >
          <span class="relative z-10">{{ link.name }}</span>
          <span class="absolute inset-0 bg-gradient-to-r from-transparent via-[#F0E7D5]/10 to-transparent translate-x-[-100%] hover-slide"></span>
        </NuxtLink>
      </nav>

      <!-- Right: Animated Uptime Indicator (fixed width) -->
      <div class="hidden lg:flex items-center gap-2 text-xs lg:text-sm text-[#F0E7D5]/80 flex-shrink-0 w-32 lg:w-48 justify-end">
        <span class="opacity-80">uptime:</span>
        <span class="text-[#F0E7D5] font-semibold tabular-nums px-1.5 lg:px-2 py-1 rounded bg-[#F0E7D5]/10 border border-[#F0E7D5]/20 text-xs lg:text-sm">{{ uptime }}</span>
      </div>

      <!-- Mobile Hamburger -->
      <div class="flex items-center md:hidden ml-auto">
        <button
          @click="isOpen = !isOpen"
          class="w-9 h-9 rounded-full border border-[#F0E7D5]/20 flex items-center justify-center
                 hover:border-[#F0E7D5]/40 bg-[#2d3555]/80 transition-all duration-200"
        >
          <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            class="w-5 h-5 text-[#F0E7D5]"
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
            class="w-5 h-5 text-[#F0E7D5]"
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
        class="md:hidden flex flex-col w-full max-w-full items-start gap-4 pb-5 pt-2 bg-[#2d3555]/80 border-t border-[#F0E7D5]/10 px-4 sm:px-6"
      >
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          class="px-6 py-2 rounded-full border border-[#F0E7D5]/20 bg-[#2d3555]/40
                 hover:border-[#F0E7D5]/40 hover:bg-[#3d4a70]/80 text-[#F0E7D5]/90 hover:text-white
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
.site-header {
  opacity: 0.90;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 50;
  background: linear-gradient(to right, rgba(26, 31, 53, 0.75), rgba(45, 53, 85, 0.75), rgba(26, 31, 53, 0.75));
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(240, 231, 213, 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  color: #F0E7D5;
  font-family: monospace;
  text-transform: lowercase;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .header-content {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
}

.nav-link:hover .hover-slide {
  animation: slide 0.6s ease-out;
}

@keyframes slide {
  to {
    transform: translateX(200%);
  }
}
</style>
