<template>
  <div class="about-page">

    <span class="page-edge-label" aria-hidden="true">ABOUT.ME · 00</span>

    <!-- page header: title left, tag right -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">ABOUT<span class="title-dot">.</span></h1>
        <div class="header-meta">
          <span class="pill-tag">isabella masso</span>
          <span class="deco-star">✦</span>
          <span class="pill-tag">penn state · 2026</span>
        </div>
      </div>
      <div class="header-right">
        <span class="deco-cross">+</span>
        <p class="header-desc">cybersecurity student at Penn State, graduating May 2026. i do threat hunting, competition security, and build things when something bothers me enough.</p>
      </div>
    </div>

    <!-- divider -->
    <div class="section-divider">
      <span class="div-line"></span>
      <span class="div-label">{{ entries.length }} entries</span>
      <span class="div-line"></span>
    </div>

    <!-- two-column entry list -->
    <div class="entries-grid">
      <div
        v-for="(entry, i) in entries"
        :key="i"
        class="entry-block"
      >
        <!-- Entry index + label row -->
        <div class="entry-label-row">
          <span class="entry-index">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="entry-type-pill">{{ entry.type }}</span>
        </div>

        <!-- Entry title -->
        <h2 class="entry-title">{{ entry.title }}</h2>

        <!-- Entry body -->
        <p class="entry-body">{{ entry.body }}</p>

        <!-- Link -->
        <a
          v-if="entry.link"
          :href="entry.link"
          target="_blank"
          rel="noopener noreferrer"
          class="entry-link"
        >{{ entry.linkLabel }} ↗</a>
      </div>
    </div>

    <!-- bottom mark -->
    <div class="page-bottom">
      <span class="bottom-deco">◈</span>
      <span class="bottom-rule"></span>
      <span class="bottom-label">izzabizz_ · about.me</span>
    </div>

  </div>
</template>

<script setup>
const entries = [
  {
    title: 'Background',
    type: 'bio',
    body: 'Cybersecurity Analytics and Operations at Penn State, graduating May 2026. ISC2 Certified in Cybersecurity. Before PSU I was dual-enrolled at Brookdale CC, which is how I ended up starting college with an associate\'s degree already in hand.',
  },
  {
    title: 'Medusa',
    type: 'project',
    body: 'Co-built an app that uses facial recognition and keyword-matching to scan the web for nonconsensually distributed images and automate takedown requests. Won first place ($3,000) at the 2026 Bardusch Family IdeaMakers Challenge during Penn State Startup Week.',
    link: 'https://www.psu.edu/news/information-sciences-and-technology/story/app-prevent-misuse-personal-imagery-wins-top-prize',
    linkLabel: 'read the writeup',
  },
  {
    title: 'Cyber Threat Hunting Intern @ Becton Dickinson',
    type: 'work',
    body: 'Hunted threats across Microsoft Sentinel and XDR — analyzing logs, endpoints, and cloud signals to catch suspicious activity early. Also worked on cloud security posture assessment and managed investigation workflows in ServiceNow. Summer 2025.',
  },
  {
    title: 'Cyber Associate @ Succession Systems',
    type: 'work',
    body: 'Leading ISO27001 implementation, writing CVE and compliance reports for C-suite and clients, and handling direct security guidance. June 2024–present.',
  },
  {
    title: 'President @ CCSO',
    type: 'leadership',
    body: 'Running Penn State\'s competitive cybersecurity club — competitions (CCDC, CPTC, Hivestorm), events, budgeting, and university liaison work. We placed 2nd nationally in the CCDC wildcard round.',
    link: 'https://psuccso.org',
    linkLabel: 'psuccso.org',
  },
  {
    title: 'Student Researcher @ HAX Lab',
    type: 'work',
    body: 'Built the Use-Cases-Dashboard — a front-end tool that makes it easier to discover and navigate websites built with HAX. HTML, CSS, JavaScript. January–May 2025.',
  },
  {
    title: 'Interests',
    type: 'focus',
    body: 'Reverse engineering, SDR technology, CTF design, and defensive security. Also on the air at The LION 90.7FM and usually on a longboard when I\'m not at a keyboard.',
  },
]
</script>

<style scoped>
.about-page {
  position: relative;
  width: calc(100% - 3rem);
  max-width: 960px;
  margin: 1.75rem auto 2.5rem;
  border-radius: 14px;
  padding: 1.75rem 2rem 3rem;
  color: #F0E0FF;
  background: rgba(20, 0, 16, 0.92);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(240, 220, 255, 0.10);
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
  color: rgba(240, 220, 255, 0.18);
  pointer-events: none;
  user-select: none;
  white-space: nowrap;
}

/* ── Page header (split layout) ─────────────────── */
.page-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;
}

.header-left { display: flex; flex-direction: column; gap: 0.75rem; }

.page-title {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(3.5rem, 11vw, 8.5rem);
  font-weight: 900;
  color: #7DFF00;
  line-height: 0.88;
  letter-spacing: -0.02em;
  text-shadow: 4px 4px 0px rgba(125, 255, 0, 0.12);
}

.title-dot { color: #F0E0FF; opacity: 0.4; }

/* pill tags */
.header-meta {
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
  color: #F0E0FF;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(240, 220, 255, 0.24);
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
}

.deco-star {
  font-size: 0.84rem;
  color: #7DFF00;
  opacity: 0.65;
}

/* Right column */
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
  color: rgba(240, 220, 255, 0.28);
  line-height: 1;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.header-desc {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.9rem;
  line-height: 1.65;
  color: rgba(240, 220, 255, 0.78);
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
  color: rgba(240, 220, 255, 0.52);
}

.div-line {
  flex: 1;
  height: 1px;
  background: rgba(240, 220, 255, 0.20);
}

/* ── two-column entries grid ─────────────────────── */
.entries-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem 3rem;
  margin-bottom: 2.5rem;
}

.entry-block {
  padding: 1.25rem 0 1.25rem 1rem;
  border-left: 2px solid rgba(240, 220, 255, 0.14);
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.entry-block:nth-child(odd)  { transform: rotate(-0.35deg); }
.entry-block:nth-child(even) { transform: rotate(0.25deg); }

.entry-block:hover {
  border-left-color: #7DFF00;
  transform: rotate(0deg);
}

.entry-label-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 0.5rem;
}

.entry-index {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.52);
}

/* small type pill */
.entry-type-pill {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(240, 220, 255, 0.64);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(240, 220, 255, 0.18);
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
}

.entry-title {
  font-family: 'ttnp-round', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #F0E0FF;
  line-height: 1.25;
  margin-bottom: 0.5rem;
}

.entry-body {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(240, 220, 255, 0.82);
  margin-bottom: 0.6rem;
}

.entry-link {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.06em;
  color: #7DFF00;
  text-decoration: none;
  border-bottom: 1px solid rgba(125, 255, 0, 0.3);
  padding-bottom: 0.1rem;
  transition: border-color 0.15s;
}

.entry-link:hover { border-bottom-color: #7DFF00; }

/* ── Bottom mark ──────────────────────────────────────── */
.page-bottom {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.35);
  text-transform: uppercase;
}

.bottom-deco { color: #7DFF00; opacity: 0.5; font-size: 0.84rem; }
.bottom-rule { flex: 1; height: 1px; background: rgba(240, 220, 255, 0.16); }

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 700px) {
  .about-page { width: calc(100% - 1.5rem); padding: 1.25rem 1.25rem 2.5rem; margin: 1rem auto; }
  .page-header { grid-template-columns: 1fr; gap: 1rem; }
  .entries-grid { grid-template-columns: 1fr; }
}
</style>
