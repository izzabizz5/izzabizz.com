<template>
  <header
    class="w-full fixed top-0 left-0 z-50 bg-[#56727D]/80 backdrop-blur-lg border-b border-green-300/10"
  >
    <div
      class="relative flex items-center justify-between w-full px-6 py-4 text-green-300 font-mono lowercase"
    >
      <!-- Left: Logo -->
      <div class="text-lg tracking-widest font-semibold select-none">
        izzabizz_
      </div>

      <!-- Center: Navigation -->
      <nav
        class="hidden md:flex fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-10"
      >
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          class="px-6 py-2 rounded-full border border-green-300/20 bg-[#0b2d2f]/40
                 hover:bg-[#0b2d2f]/70 hover:border-green-300/40
                 text-green-300 hover:text-green-100 transition-all duration-200
                 flex items-center justify-center"
        >
          {{ link.name }}
        </a>
      </nav>

      <!-- Right: Animated Uptime Indicator -->
      <div class="hidden md:flex items-center gap-2 text-sm text-green-300/80">
        <span class="opacity-80">uptime:</span>
        <span class="text-green-200 font-semibold tabular-nums">{{ uptime }}</span>
      </div>

      <!-- Mobile Hamburger -->
      <div class="flex items-center md:hidden ml-auto">
        <button
          @click="isOpen = !isOpen"
          class="w-9 h-9 rounded-full border border-green-300/20 flex items-center justify-center
                 hover:border-green-300/40 bg-[#56727D]/80 transition-all duration-200"
        >
          <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
            class="w-5 h-5 text-green-300"
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
            class="w-5 h-5 text-green-300"
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
        class="md:hidden flex flex-col w-full items-start gap-4 pb-5 pt-2 bg-[#56727D]/80 border-t border-green-300/10 px-6"
      >
        <a
          v-for="link in links"
          :key="link.name"
          :href="link.href"
          class="px-6 py-2 rounded-full border border-green-300/20 bg-[#0b2d2f]/40
                 hover:border-green-300/40 hover:bg-[#56727D]/80 text-green-300 hover:text-green-100
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
  const start = Date.now();
  setInterval(() => {
    const diff = Math.floor((Date.now() - start) / 1000);
    const hrs = String(Math.floor(diff / 3600)).padStart(2, "0");
    const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const secs = String(diff % 60).padStart(2, "0");
    uptime.value = `${hrs}:${mins}:${secs}`;
  }, 1000);
});
</script>
