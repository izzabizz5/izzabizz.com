<template>
  <footer class="site-footer">
    <div class="footer-rule-band">
      <span class="frb-line"></span>
      <span class="frb-deco">✦</span>
      <span class="frb-line"></span>
      <span class="frb-deco">✦</span>
      <span class="frb-line"></span>
    </div>
    <div class="footer-inner">
      <span class="footer-name">izzabizz_</span>
      <div class="footer-meta">
        <span class="footer-sep">✦</span>
        <span class="footer-year">{{ year }}</span>
        <span class="footer-sep">✦</span>
        <span class="footer-stack">nuxt · vue · three.js</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  flex-shrink: 0;
}

.footer-rule-band {
  display: flex;
  align-items: center;
  gap: 0;
  height: 14px;
}

.frb-line {
  flex: 1;
  height: 1.5px;
  background: rgba(200, 48, 96, 0.35);
}

.frb-deco {
  color: rgba(200, 48, 96, 0.6);
  font-size: 0.65rem;
  padding: 0 0.55rem;
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 1.75rem 0.7rem;
  background: rgba(10, 8, 16, 0.5);
}

.footer-name {
  font-family: 'ttnp-round', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #C83060;
  letter-spacing: 0.02em;
  opacity: 0.9;
}

.footer-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: lowercase;
}

.footer-sep  { color: rgba(200, 48, 96, 0.4); }
.footer-year { color: rgba(245, 221, 229, 0.45); }
.footer-stack { color: rgba(245, 221, 229, 0.35); }
</style>
