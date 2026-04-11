<template>
  <footer class="site-footer">
    <span class="footer-name">izzabizz_</span>
    <span class="footer-sep">✦</span>
    <span class="footer-year">{{ year }}</span>
    <span class="footer-sep">✦</span>
    <span class="footer-stack">nuxt · vue · three.js</span>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.75rem;
  border-top: 1px solid rgba(240, 220, 255, 0.12);
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.55);
  text-transform: lowercase;
  background: rgba(255, 255, 255, 0.03);
  flex-shrink: 0;
}

.footer-name { color: #7DFF00; opacity: 0.9; }
.footer-sep  { color: rgba(240, 220, 255, 0.2); }
</style>
