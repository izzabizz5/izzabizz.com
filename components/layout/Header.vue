<template>
  <header class="site-header">
    <div class="header-inner">

      <!-- Logo -->
      <NuxtLink to="/" class="logo">izzabizz_</NuxtLink>

      <!-- Desktop nav -->
      <nav class="desktop-nav">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="nav-item"
          :class="{ 'nav-active': isActive(link.href) }"
        >{{ link.name }}</NuxtLink>
      </nav>

      <!-- Uptime pill -->
      <div class="uptime-pill">
        <span class="uptime-dot"></span>
        <span class="uptime-value">{{ uptime }}</span>
      </div>

      <!-- Mobile toggle -->
      <button class="mobile-toggle" @click="isOpen = !isOpen" aria-label="Menu">
        <span class="toggle-inner" :class="{ open: isOpen }">
          <span></span><span></span><span></span>
        </span>
      </button>

    </div>

    <!-- Mobile menu -->
    <Transition name="nav-drop">
      <nav v-if="isOpen" class="mobile-nav">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="mobile-nav-item"
          :class="{ 'nav-active': isActive(link.href) }"
          @click="isOpen = false"
        >{{ link.name }}</NuxtLink>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const isOpen = ref(false)
const route = useRoute()

const links = [
  { name: 'home',         href: '/' },
  { name: 'projects',     href: '/projects' },
  { name: 'compete',      href: '/competitions' },
  { name: 'about',        href: '/about' },
  { name: 'noteables',    href: '/noteables' },
]

const isActive = (href: string) => {
  if (href === '/') return route.path === '/'
  return route.path.startsWith(href)
}

const uptime = ref('000d 00:00:00')

onMounted(() => {
  const launchDate = new Date('2025-10-27T00:00:00').getTime()
  const update = () => {
    const diff = Math.floor((Date.now() - launchDate) / 1000)
    const d = Math.floor(diff / 86400)
    const h = Math.floor((diff % 86400) / 3600)
    const m = Math.floor((diff % 3600) / 60)
    const s = diff % 60
    uptime.value = `${String(d).padStart(3,'0')}d ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  }
  update()
  setInterval(update, 1000)
})
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  background: transparent;
}

.header-inner {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 0.85rem 1.75rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.08em;
}

/* Logo */
.logo {
  font-family: 'ttnp-round', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #C83060;
  text-decoration: none;
  letter-spacing: 0.02em;
  flex-shrink: 0;
  transition: opacity 0.15s;
  text-shadow: 0 1px 8px rgba(200, 48, 96, 0.45);
}
.logo:hover { opacity: 0.75; }

/* Desktop nav */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
}

@media (max-width: 640px) { .desktop-nav { display: none; } }

.nav-item {
  color: rgba(245, 221, 229, 0.85);
  text-decoration: none;
  text-transform: lowercase;
  letter-spacing: 0.08em;
  padding: 0.3rem 0.75rem;
  border: 1px solid rgba(200, 48, 96, 0.22);
  border-radius: 999px;
  transition: all 0.15s ease;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.05);
}

.nav-item:hover {
  color: #F5DDE5;
  border-color: rgba(200, 48, 96, 0.45);
  background: rgba(255, 255, 255, 0.10);
}

.nav-item.nav-active {
  color: #F5DDE5;
  background: #C83060;
  border-color: #C83060;
}

/* Uptime pill */
.uptime-pill {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-left: auto;
  padding: 0.28rem 0.75rem;
  border: 1px solid rgba(200, 48, 96, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

@media (max-width: 640px) { .uptime-pill { display: none; } }

.uptime-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #C83060;
  animation: pulse 2.5s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.35; }
}

.uptime-value {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  color: rgba(245, 221, 229, 0.70);
  font-variant-numeric: tabular-nums;
}

/* Mobile toggle */
.mobile-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: auto;
}

@media (max-width: 640px) { .mobile-toggle { display: flex; align-items: center; } }

.toggle-inner {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 20px;
}

.toggle-inner span {
  display: block;
  height: 1.5px;
  background: #F5DDE5;
  transition: all 0.2s ease;
}

.toggle-inner.open span:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
.toggle-inner.open span:nth-child(2) { opacity: 0; }
.toggle-inner.open span:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

/* Mobile nav */
.mobile-nav {
  display: flex;
  flex-direction: column;
  padding: 0.75rem 1.75rem 1rem;
  gap: 0.5rem;
  background: rgba(14, 6, 10, 0.97);
  backdrop-filter: blur(16px);
}

.mobile-nav-item {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: rgba(245, 221, 229, 0.82);
  text-decoration: none;
  text-transform: lowercase;
  padding: 0.35rem 0.75rem;
  border: 1px solid transparent;
  border-radius: 999px;
  transition: all 0.15s;
  display: inline-block;
  width: fit-content;
}

.mobile-nav-item:hover { color: #F5DDE5; border-color: rgba(200, 48, 96, 0.3); }
.mobile-nav-item.nav-active { color: #F5DDE5; background: #C83060; border-color: #C83060; }

/* Transition */
.nav-drop-enter-active, .nav-drop-leave-active { transition: opacity 0.15s, transform 0.15s; }
.nav-drop-enter-from, .nav-drop-leave-to { opacity: 0; transform: translateY(-4px); }
</style>
