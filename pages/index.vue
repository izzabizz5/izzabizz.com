<template>
  <div class="landing">

    <!-- ── HERO BAND TOP ───────────────────────────────── -->
    <div class="ornament-band">
      <span class="ob-rule"></span>
      <span class="ob-star">✦</span>
      <span class="ob-tag">cybersecurity</span>
      <span class="ob-star">✦</span>
      <span class="ob-tag">penn state</span>
      <span class="ob-star">✦</span>
      <span class="ob-rule"></span>
    </div>

    <!-- ── HERO SECTION ────────────────────────────────── -->
    <div class="hero">
      <div class="hero-rule-band">
        <span class="hrb-line"></span>
        <span class="hrb-deco">✦</span>
        <span class="hrb-line"></span>
        <span class="hrb-deco">✦</span>
        <span class="hrb-line"></span>
      </div>

      <div class="hero-inner">
        <h1 class="hero-name">IZZY</h1>

        <div class="hero-ctas">
          <a class="cta-btn" href="https://linkedin.com/in/isabella-masso" target="_blank" rel="noopener noreferrer">
            linkedin <span>↗</span>
          </a>
          <a class="cta-btn cta-outline" href="https://github.com/izzabizz5" target="_blank" rel="noopener noreferrer">
            github <span>↗</span>
          </a>
        </div>
      </div>

      <div class="hero-rule-band">
        <span class="hrb-line"></span>
        <span class="hrb-deco">✦</span>
        <span class="hrb-line"></span>
        <span class="hrb-deco">✦</span>
        <span class="hrb-line"></span>
      </div>
    </div>

    <!-- ── TICKER BAND ─────────────────────────────────── -->
    <div class="ticker-band">
      <span class="ticker-item">researcher</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">student</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">builder</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">psu 2026</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">isc2 cc</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">rev eng</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">threat hunting</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">ctf dev</span>
      <span class="ticker-sep">◈</span>
      <span class="ticker-item">sdr tech</span>
      <span class="ticker-sep">◈</span>
    </div>

    <!-- ── BIO SECTION ─────────────────────────────────── -->
    <div class="bio-section">
      <div class="bio-visual">
        <img src="@/assets/images/image.png" alt="izzy" class="bio-img" />
        <div class="bio-img-deco">
          <span>✦</span>
          <span>◈</span>
        </div>
      </div>

      <div class="bio-panel">
        <h2 class="bio-heading">I'M IZZY<span class="bio-star">✦</span></h2>
        <p class="bio-body">
          BS in Cybersecurity Analytics &amp; Operations at Penn State,
          graduating May 2026. ISC2 Certified in Cybersecurity.
          Threat hunting intern at BD, Cyber Associate at Succession Systems,
          President of CCSO. Radio host at LION 90.7FM.
          Building with Nuxt, Vue, Python &amp; Three.js.
        </p>
      </div>
    </div>

    <!-- ── CARDS SECTION ───────────────────────────────── -->
    <div class="cards-section">
      <div class="section-header-band">
        <span class="shb-rule"></span>
        <span class="shb-label">STILL LOOKING FOR SOMETHING?</span>
        <span class="shb-rule"></span>
      </div>

      <div class="cards-grid">
        <div class="info-card">
          <span class="card-tag">sec ◈</span>
          <p>Rev Engineering · SDR Tech · CTF Dev · ISO 27001</p>
        </div>
        <div class="info-card info-card-accent">
          <span class="card-tag">stack ◈</span>
          <p>Nuxt · Vue · Python · Three.js · Wireshark</p>
        </div>
        <div class="info-card">
          <span class="card-tag">life ◈</span>
          <p>Radio / LION 90.7FM · Longboarding · PSU 2026</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
</script>

<style scoped>

/* ── Variables ──────────────────────────────────────── */
.landing {
  --rose:        #C83060;
  --rose-mid:    #E06882;
  --rose-light:  #F0A0B5;
  --purple-blue: #5860A0;
  --text:        #F5DDE5;
  --text-muted:  rgba(245, 221, 229, 0.58);
  --border:      rgba(200, 48, 96, 0.28);
  --panel-bg:    rgba(22, 8, 14, 0.72);

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  color: var(--text);
  padding-bottom: 2rem;
}

/* ── Ornament band (top tag row) ───────────────────── */
.ornament-band {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  padding: 0.7rem 2rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.ob-rule {
  flex: 1;
  height: 1px;
  background: var(--border);
  max-width: 160px;
}

.ob-star { color: var(--rose); font-size: 0.7rem; }

.ob-tag { color: var(--text-muted); }

/* ── Hero ───────────────────────────────────────────── */
.hero {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0 2rem;
}

.hero-rule-band {
  display: flex;
  align-items: center;
  gap: 0;
  height: 18px;
}

.hrb-line {
  flex: 1;
  height: 2px;
  background: var(--rose);
  opacity: 0.55;
}

.hrb-deco {
  color: var(--rose);
  font-size: 0.75rem;
  padding: 0 0.5rem;
  opacity: 0.85;
}

.hero-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 0 1.5rem;
  gap: 0.6rem;
}

.hero-eyebrow {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.25em;
  color: var(--text-muted);
  text-transform: lowercase;
}

.hero-name {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(6rem, 24vw, 20rem);
  font-weight: 900;
  color: var(--text);
  line-height: 0.85;
  letter-spacing: -0.03em;
  margin: 0;
}

.hero-tagline {
  font-family: 'ttnp-square', sans-serif;
  font-size: clamp(0.75rem, 2.2vw, 1.1rem);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
  line-height: 1.6;
  margin: 0.5rem 0 0.25rem;
}

.hero-ctas {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.cta-btn {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.82rem;
  letter-spacing: 0.12em;
  text-transform: lowercase;
  text-decoration: none;
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  background: var(--rose);
  color: #F5DDE5;
  border: 1.5px solid var(--rose);
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.cta-btn:hover {
  background: var(--rose-mid);
  border-color: var(--rose-mid);
}

.cta-btn.cta-outline {
  background: transparent;
  color: var(--text);
  border-color: rgba(200, 48, 96, 0.45);
}

.cta-btn.cta-outline:hover {
  background: rgba(200, 48, 96, 0.12);
  border-color: var(--rose);
  color: var(--rose-light);
}

/* ── Ticker band ────────────────────────────────────── */
.ticker-band {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  padding: 0.85rem 2rem;
  margin-top: 0.5rem;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  background: rgba(200, 48, 96, 0.06);
}

.ticker-item {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.ticker-sep {
  color: var(--rose);
  font-size: 0.65rem;
  opacity: 0.7;
}

/* ── Bio section ────────────────────────────────────── */
.bio-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  margin: 2rem 2rem 0;
  border: 1px solid var(--border);
  overflow: hidden;
}

.bio-visual {
  position: relative;
  background: rgba(10, 8, 16, 0.6);
  min-height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-right: 1px solid var(--border);
}

.bio-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  mix-blend-mode: luminosity;
  opacity: 0.85;
}

.bio-img-deco {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.75rem;
  color: var(--rose);
  opacity: 0.7;
  text-align: right;
}

.bio-panel {
  padding: 2rem 1.75rem;
  background: var(--panel-bg);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.bio-eyebrow {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: lowercase;
  color: var(--text-muted);
}

.bio-star { color: var(--rose); }

.bio-heading {
  font-family: 'ttnp-square', sans-serif;
  font-size: clamp(1.1rem, 3vw, 1.6rem);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text);
  line-height: 1.15;
  margin: 0;
}

.bio-body {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  line-height: 1.7;
  margin: 0;
}

/* ── Cards section ──────────────────────────────────── */
.cards-section {
  margin: 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-header-band {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.shb-rule {
  flex: 1;
  height: 1px;
  background: var(--border);
}

.shb-label {
  font-family: 'ttnp-square', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.info-card {
  border: 1px solid var(--border);
  padding: 1rem 1.1rem;
  background: var(--panel-bg);
  backdrop-filter: blur(10px);
  text-align: left;
}

.info-card.info-card-accent {
  border-color: rgba(200, 48, 96, 0.5);
  background: rgba(200, 48, 96, 0.08);
}

.card-tag {
  display: block;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.5rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--rose);
  margin-bottom: 0.5rem;
  opacity: 0.85;
}

.info-card p {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
}

/* ── Mobile ─────────────────────────────────────────── */
@media (max-width: 640px) {
  .hero       { padding: 0 1.25rem; }
  .bio-section { grid-template-columns: 1fr; margin: 1.5rem 1.25rem 0; }
  .bio-visual  { min-height: 200px; border-right: none; border-bottom: 1px solid var(--border); }
  .cards-grid  { grid-template-columns: 1fr; }
  .cards-section { margin: 1.5rem 1.25rem 0; }
  .ticker-band { padding: 0.75rem 1.25rem; }
  .ornament-band { padding: 0.7rem 1.25rem; }
  .shb-label   { font-size: 0.58rem; letter-spacing: 0.15em; }
}
</style>
