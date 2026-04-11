<template>
  <div class="landing">

    <!-- Top label row -->
    <div class="top-row">
      <span class="pill-tag">cybersecurity</span>
      <span class="deco-star">✦</span>
      <span class="deco-label">penn state</span>
    </div>

    <!-- Centered name block -->
    <div class="name-block">
      <div class="name-eyebrow">// hello, i'm</div>
      <h1 class="name-izzy">IZZY</h1>
      <div class="name-descriptors">
        researcher · student · builder
      </div>
    </div>

    <!-- Collage clippings -->
    <div class="clippings-row">
      <div class="clip" style="transform:rotate(-1.3deg)">
        <span class="clip-tag">sec ◈</span>
        <p>Rev Engineering · SDR Tech · CTF Dev · ISO 27001</p>
      </div>
      <div class="clip clip-accent" style="transform:rotate(0.6deg)">
        <span class="clip-tag">stack ◈</span>
        <p>Nuxt · Vue · Python · Three.js · Wireshark</p>
      </div>
      <div class="clip" style="transform:rotate(-0.5deg)">
        <span class="clip-tag">life ◈</span>
        <p>Radio / LION 90.7FM · Longboarding · PSU 2026</p>
      </div>
    </div>

    <!-- Divider -->
    <div class="divider-band">
      <span class="band-line"></span>
      <span class="band-deco">◈</span>
      <span class="band-line"></span>
    </div>

    <!-- Bottom row -->
    <div class="bottom-row">
      <div class="link-group">
        <a class="editorial-link" href="https://linkedin.com/in/isabella-masso" target="_blank" rel="noopener noreferrer">
          linkedin <span class="link-arrow">↗</span>
        </a>
        <a class="editorial-link" href="https://github.com/izzabizz5" target="_blank" rel="noopener noreferrer">
          github <span class="link-arrow">↗</span>
        </a>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>
.landing {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.75rem 2rem 2rem;
  color: #F0E0FF;
}

/* ── Top row ──────────────────────────────────────────── */
.top-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  margin-bottom: auto;
  width: 100%;
}

.pill-tag {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: lowercase;
  color: rgba(240, 220, 255, 0.88);
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(240, 220, 255, 0.18);
  border-radius: 999px;
  padding: 0.28rem 0.85rem;
  backdrop-filter: blur(8px);
}

.deco-star { color: #7DFF00; font-size: 0.9rem; }

.deco-label {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.58);
  text-transform: uppercase;
}

/* ── Name block ───────────────────────────────────────── */
.name-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1rem 0;
}

.name-eyebrow {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  color: rgba(240, 220, 255, 0.58);
  margin-bottom: 3rem;
}

.name-izzy {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(6rem, 24vw, 20rem);
  font-weight: 900;
  color: #F0E0FF;
  line-height: 0.85;
  letter-spacing: -0.03em;
  margin: 0;
}

.name-masso {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(3.5rem, 14vw, 11rem);
  font-weight: 700;
  color: #F0E0FF;
  line-height: 0.9;
  letter-spacing: -0.025em;
  margin: 0 0 0.6rem 0;
}

.name-descriptors {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.12em;
  color: rgba(240, 220, 255, 0.62);
  text-transform: lowercase;
  margin-top: 0.4rem;
}

/* ── Clippings ────────────────────────────────────────── */
.clippings-row {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  margin: 0 0 0.5rem;
}

.clip {
  flex: 1;
  border: 1px solid rgba(240, 220, 255, 0.15);
  padding: 0.75rem 0.9rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  box-shadow: 2px 2px 0 rgba(0,0,0,0.2);
  text-align: left;
}

.clip.clip-accent {
  border-color: rgba(125, 255, 0, 0.35);
  background: rgba(125, 255, 0, 0.07);
}

.clip-tag {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.5rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(240, 220, 255, 0.50);
  margin-bottom: 0.45rem;
}

.clip p {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  color: rgba(240, 220, 255, 0.80);
  line-height: 1.65;
  margin: 0;
}

/* ── Divider ──────────────────────────────────────────── */
.divider-band {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin: 1rem 0;
  width: 100%;
}

.band-line { flex: 1; height: 1px; background: rgba(240, 220, 255, 0.15); }
.band-deco { font-size: 0.84rem; color: #7DFF00; }

/* ── Bottom row ───────────────────────────────────────── */
.bottom-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.link-group { display: flex; gap: 1.5rem; }

.editorial-link {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  color: rgba(240, 220, 255, 0.80);
  text-decoration: none;
  text-transform: lowercase;
  padding: 0.3rem 0.85rem;
  border: 1px solid rgba(240, 220, 255, 0.22);
  border-radius: 999px;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
}

.editorial-link:hover {
  background: #7DFF00;
  border-color: #7DFF00;
  color: #0E000C;
}

.link-arrow { font-size: 0.94rem; opacity: 0.7; }

.status-tag {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.12em;
  color: rgba(240, 220, 255, 0.58);
  text-transform: uppercase;
  padding: 0.28rem 0.75rem;
  border: 1px solid rgba(240, 220, 255, 0.15);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
}

.status-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #7DFF00;
  animation: pulse 2.5s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 600px) {
  .landing { padding: 1.25rem 1.25rem 2rem; }
  .clippings-row { flex-direction: column; }
}
</style>
