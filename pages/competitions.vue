<template>
  <div class="competitions-page">

    <span class="page-edge-label" aria-hidden="true">COMPETITIONS · 00</span>

    <!-- Page header -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">COMPETE<span class="title-dot">.</span></h1>
        <div class="header-tags">
          <span class="pill-tag">{{ entries.length }} competitions</span>
          <span class="deco-star">✦</span>
          <span class="pill-tag">ccso · penn state</span>
        </div>
      </div>
      <div class="header-right">
        <span class="deco-cross">+</span>
        <p class="header-desc">CCDC, CTFs, and other competitions. defending live infrastructure, attacking services, and racing the clock.</p>
      </div>
    </div>

    <!-- Divider -->
    <div class="section-divider">
      <span class="div-line"></span>
      <span class="div-label">{{ entries.length }} results</span>
      <span class="div-line"></span>
    </div>

    <!-- Entries grid -->
    <TransitionGroup name="entry-fade" tag="div" class="entries-grid">
      <div
        v-for="(entry, index) in entries"
        :key="entry.id"
        class="entry-block"
      >
        <div class="entry-meta-row">
          <span class="entry-index">//{{ String(index + 1).padStart(3, '0') }}</span>
          <span :class="['entry-type-pill', `badge-${entry.type}`]">◈ {{ entry.type }}</span>
          <span class="entry-date">{{ entry.date }}</span>
        </div>

        <h2 class="entry-title">{{ entry.title }}</h2>
        <p class="entry-body">{{ entry.body }}</p>

        <div v-if="entry.team" class="entry-team">
          <span class="team-label">team —</span> {{ entry.team }}
        </div>

        <div v-if="entry.tags" class="entry-tags">
          <span v-for="tag in entry.tags" :key="tag" class="tag-chip">{{ tag }}</span>
        </div>
      </div>
    </TransitionGroup>

    <!-- Bottom mark -->
    <div class="page-bottom">
      <span class="bottom-deco">◈</span>
      <span class="bottom-rule"></span>
      <span class="bottom-label">izzabizz_ · compete.log</span>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const entries = ref([
  {
    id: 1,
    title: 'MACCDC — 3rd Place (Final Year)',
    type: 'competition',
    date: 'Mar 2026',
    tags: ['cyber defense', 'injects', 'CCDC'],
    body: 'Wrapped up my final MACCDC with a 3rd place finish. The National Collegiate Cyber Defense Competition has teams defending live infrastructure while completing business and technical injects under pressure. My role centered on the injects — I completed 30 across Windows and Linux servers, Palo Alto and Cisco firewalls, and a VyOS router over a 12-hour period.',
    team: 'Aiden Johnson, Maguire Younes, Aidan Ethier, Dhrupad Joshi, Evan Glickman, Daniel Thiriot, Asa Reynolds',
  },
  {
    id: 2,
    title: 'Wicked6 CTF — 4th Place, Captained All-Women Team',
    type: 'competition',
    date: 'Spring 2026',
    tags: ['CTF', 'attack-defense', 'captain'],
    body: "Captained CCSO's first all-women team at Wicked6 — an attack and defense CTF where teams analyze source code from custom services, exploit vulnerabilities to capture flags, and patch services to defend against attacks. We had five services across Go, Rust, PHP, JavaScript, HTML, and a compiled binary. Placed 4th out of 10 teams.",
    team: 'Christina Fontaine, Gia Castagna, Marisa Vandenberg, Nethra Shanbhag, Haidyn DiPaolo, Siddhi L., Emily Jao',
  },
  {
    id: 3,
    title: 'CCDC Season — Qualifiers → Regionals → Wildcard',
    type: 'competition',
    date: 'Spring 2025',
    tags: ['cyber defense', 'CCDC'],
    body: "Competed in three rounds of CCDC: Qualifiers (2nd place out of 17), Regionals (2nd place at MACCDC), and the Wildcard Round (3rd place). A full competition season of defending live infrastructure against an active red team while completing business injects.",
    team: 'Aidan Ethier (Captain), Brendan McShane, Aiden Johnson, Cy Fisher, Evan Glickman, Walker Kennedy, Dhrupad J.',
  },
  {
    id: 4,
    title: 'DOE CyberFire Competition',
    type: 'competition',
    date: 'Fall 2024',
    tags: ['CTF', 'password cracking', 'network'],
    body: "Competed in the U.S. Department of Energy's CyberFire competition, developed by Lawrence Livermore National Laboratory. Pitted Penn State students against each other and the clock — racing to crack passwords, solve ciphers, and compromise vulnerable networks.",
  },
])
</script>

<style scoped>
.competitions-page {
  position: relative;
  width: calc(100% - 3rem);
  max-width: 960px;
  margin: 1.75rem auto 2.5rem;
  border-radius: 14px;
  padding: 1.75rem 2rem 3rem;
  color: #F5DDE5;
  background: rgba(14, 6, 10, 0.92);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(200, 48, 96, 0.12);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
}

.page-edge-label {
  position: absolute;
  top: 3.5rem;
  right: 0.6rem;
  transform: rotate(90deg);
  transform-origin: right top;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.48rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(200, 48, 96, 0.18);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

/* ── Page header ──────────────────────────────────────── */
.page-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 1.75rem;
}

.header-left { display: flex; flex-direction: column; gap: 0.75rem; }

.page-title {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(2.5rem, 8vw, 6.5rem);
  font-weight: 900;
  color: #C83060;
  line-height: 0.88;
  letter-spacing: -0.02em;
  text-shadow: 3px 3px 0px rgba(200, 48, 96, 0.12);
}

.title-dot { color: #F5DDE5; opacity: 0.35; }

.header-tags {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.pill-tag {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.1em;
  text-transform: lowercase;
  color: #F5DDE5;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(200, 48, 96, 0.25);
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
}

.deco-star { font-size: 0.84rem; color: #C83060; opacity: 0.65; }

.header-right {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-top: 0.5rem;
}

.deco-cross {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  font-weight: 300;
  color: rgba(200, 48, 96, 0.28);
  line-height: 1;
  flex-shrink: 0;
}

.header-desc {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(245, 221, 229, 0.70);
}

/* ── Section divider ──────────────────────────────────── */
.section-divider {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 2rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(245, 221, 229, 0.52);
}

.div-line {
  flex: 1;
  height: 1px;
  background: rgba(200, 48, 96, 0.22);
}

/* ── Entries grid ─────────────────────────────────────── */
.entries-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem 3rem;
  margin-bottom: 2.5rem;
}

.entry-block {
  border-left: 2px solid rgba(200, 48, 96, 0.2);
  padding-left: 1rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.entry-block:nth-child(3n+1) { transform: rotate(-0.35deg); }
.entry-block:nth-child(3n+2) { transform: rotate(0.25deg); }
.entry-block:nth-child(3n+3) { transform: rotate(-0.2deg); }
.entry-block:hover { border-left-color: #C83060; transform: rotate(0deg); }

.entry-meta-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.entry-index {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(245, 221, 229, 0.52);
}

.entry-type-pill {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border: 1px solid;
  border-radius: 999px;
}

.badge-competition { color: #E06882; border-color: rgba(200, 48, 96, 0.50); }
.badge-workshop    { color: #F0A0B5; border-color: rgba(200, 48, 96, 0.30); }
.badge-event       { color: rgba(245, 221, 229, 0.72); border-color: rgba(200, 48, 96, 0.20); }

.entry-date {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  color: rgba(245, 221, 229, 0.38);
  margin-left: auto;
}

.entry-title {
  font-family: 'ttnp-round', sans-serif;
  font-size: 1.0rem;
  font-weight: 700;
  color: #F5DDE5;
  line-height: 1.25;
  margin-bottom: 0.5rem;
}

.entry-body {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.855rem;
  line-height: 1.65;
  color: rgba(245, 221, 229, 0.80);
  margin-bottom: 0.6rem;
}

.entry-team {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: rgba(245, 221, 229, 0.45);
  line-height: 1.55;
  margin-bottom: 0.6rem;
}

.team-label {
  color: rgba(200, 48, 96, 0.7);
  font-style: italic;
}

.entry-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.4rem;
}

.tag-chip {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: lowercase;
  color: rgba(245, 221, 229, 0.52);
  background: rgba(200, 48, 96, 0.06);
  border: 1px solid rgba(200, 48, 96, 0.16);
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
}

/* ── Bottom mark ──────────────────────────────────────── */
.page-bottom {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(245, 221, 229, 0.35);
  text-transform: uppercase;
}

.bottom-deco { color: #C83060; opacity: 0.5; font-size: 0.84rem; }
.bottom-rule { flex: 1; height: 1px; background: rgba(200, 48, 96, 0.2); }

/* ── Transitions ──────────────────────────────────────── */
.entry-fade-enter-active,
.entry-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.entry-fade-enter-from,
.entry-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
.entry-fade-move { transition: transform 0.2s ease; }

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 700px) {
  .competitions-page { width: calc(100% - 1.5rem); padding: 1.25rem 1.25rem 2.5rem; margin: 1rem auto; }
  .page-header { grid-template-columns: 1fr; gap: 1rem; }
  .entries-grid { grid-template-columns: 1fr; }
}
</style>
