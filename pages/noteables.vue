<template>
  <div class="noteables-page">

    <span class="page-edge-label" aria-hidden="true">NOTEABLES · 00</span>

    <!-- AQUA-style page header -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">NOTEABLES<span class="title-dot">.</span></h1>
        <div class="header-tags">
          <span class="pill-tag">{{ quotes.length }} quotes</span>
          <span class="deco-star">✦</span>
          <span class="pill-tag">words that resonate</span>
        </div>
      </div>
      <div class="header-right">
        <span class="deco-cross">+</span>
        <p class="header-desc">lines from books, music, articles, and films that stuck around long after i first read them.</p>
      </div>
    </div>

    <!-- Filter bar (AQUA pill style) -->
    <div class="filter-bar">
      <button
        v-for="cat in categories"
        :key="cat.id"
        :class="['filter-pill', { active: activeFilter === cat.id }]"
        @click="activeFilter = cat.id"
      >
        {{ cat.name }}
        <span class="pill-count">{{ getCategoryCount(cat.id) }}</span>
      </button>
    </div>

    <!-- Divider -->
    <div class="section-divider">
      <span class="div-line"></span>
      <span class="div-label">{{ filteredQuotes.length }} results</span>
      <span class="div-line"></span>
    </div>

    <!-- AQUA two-column quote grid -->
    <TransitionGroup name="quote-fade" tag="div" class="quotes-grid">
      <div
        v-for="(quote, index) in filteredQuotes"
        :key="quote.id"
        class="quote-block"
      >
        <div class="quote-meta-row">
          <span class="quote-index">//{{ String(index + 1).padStart(3, '0') }}</span>
          <span :class="['quote-type-pill', `badge-${quote.type}`]">◈ {{ quote.type }}</span>
        </div>

        <blockquote class="quote-text">
          <span class="open-mark">"</span>{{ quote.text }}<span class="close-mark">"</span>
        </blockquote>

        <div class="quote-attr">
          <span class="attr-dash">—</span>
          <span class="attr-author">{{ quote.author }}</span>
          <span v-if="quote.source" class="attr-source">{{ quote.source }}</span>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty state -->
    <div v-if="filteredQuotes.length === 0" class="empty-state">
      <span class="empty-pill">no entries in this category</span>
    </div>

    <!-- Bottom mark -->
    <div class="page-bottom">
      <span class="bottom-deco">◈</span>
      <span class="bottom-rule"></span>
      <span class="bottom-label">izzabizz_ · noteables.log</span>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('all')

const categories = [
  { id: 'all',     name: 'All' },
  { id: 'book',    name: 'Books' },
  { id: 'article', name: 'Articles' },
  { id: 'music',   name: 'Music' },
  { id: 'film',    name: 'Film' },
  { id: 'other',   name: 'Other' },
]

const quotes = ref([
  {
    id: 1,
    text: "Men are disturbed not by things, but by the view which they take of them.",
    author: "Epictetus",
    source: "The Enchiridion",
    type: "book",
  },
  {
    id: 2,
    text: "If there is any principle of the Constitution that more imperatively calls for attachment than any other it is the principle of free thought, not free thought for those who agree with us but freedom for the thought that we hate.",
    author: "Oliver Wendell Holmes, Jr.",
    source: "United States v. Schwimmer (1929)",
    type: "other",
  },
  {
    id: 3,
    text: "A man cannot directly choose his circumstances, but he can choose his thoughts, and so indirectly, yet surely, shape his circumstances.",
    author: "James Allen",
    source: "As a Man Thinketh",
    type: "book",
  },
  {
    id: 4,
    text: "You never know just how you look through other people's eyes.",
    author: "Butthole Surfers",
    source: "Pepper",
    type: "music",
  },
  {
    id: 5,
    text: "Three words, large enough to tip the world. I remember you.",
    author: "V.E. Schwab",
    source: "The Invisible Life of Addie LaRue",
    type: "book",
  },
  {
    id: 6,
    text: "You have to know what you stand for, not just what you stand against.",
    author: "Laurie Halse Anderson",
    source: "Speak",
    type: "book",
  },
])

const filteredQuotes = computed(() => {
  if (activeFilter.value === 'all') return quotes.value
  return quotes.value.filter(q => q.type === activeFilter.value)
})

const getCategoryCount = (id) => {
  if (id === 'all') return quotes.value.length
  return quotes.value.filter(q => q.type === id).length
}
</script>

<style scoped>
.noteables-page {
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
  color: #7DFF00;
  line-height: 0.88;
  letter-spacing: -0.02em;
  text-shadow: 3px 3px 0px rgba(125, 255, 0, 0.12);
}

.title-dot { color: #F0E0FF; opacity: 0.35; }

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
  color: #F0E0FF;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(240, 220, 255, 0.24);
  border-radius: 999px;
  padding: 0.25rem 0.7rem;
}

.deco-star { font-size: 0.84rem; color: #7DFF00; opacity: 0.65; }

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
}

.header-desc {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(240, 220, 255, 0.70);
}

/* ── Filter bar (AQUA pill style) ─────────────────────── */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.5rem;
}

.filter-pill {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: lowercase;
  color: rgba(240, 220, 255, 0.70);
  background: transparent;
  border: 1px solid rgba(240, 220, 255, 0.24);
  border-radius: 999px;
  padding: 0.28rem 0.75rem;
  cursor: pointer;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.filter-pill:hover {
  color: #F0E0FF;
  border-color: rgba(240, 220, 255, 0.52);
  background: rgba(240, 220, 255, 0.05);
}

.filter-pill.active {
  background: #7DFF00;
  border-color: #7DFF00;
  color: #0E000C;
}

.pill-count {
  font-size: 0.84rem;
  opacity: 0.7;
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

/* ── AQUA two-column quotes grid ──────────────────────── */
.quotes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem 3rem;
  margin-bottom: 2.5rem;
}

.quote-block {
  border-left: 2px solid rgba(240, 220, 255, 0.14);
  padding-left: 1rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.quote-block:nth-child(3n+1) { transform: rotate(-0.4deg); }
.quote-block:nth-child(3n+2) { transform: rotate(0.3deg); }
.quote-block:nth-child(3n+3) { transform: rotate(-0.2deg); }

.quote-block:hover { border-left-color: #7DFF00; transform: rotate(0deg); }

.quote-meta-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.quote-index {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.72rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.52);
}

.quote-type-pill {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border: 1px solid;
  border-radius: 999px;
}

.badge-book    { color: #7DFF00;       border-color: rgba(255, 0, 140, 0.45); }
.badge-music   { color: #7DFF00;       border-color: rgba(125, 255, 0, 0.35); }
.badge-film    { color: rgba(240, 220, 255, 0.78); border-color: rgba(240, 220, 255, 0.28); }
.badge-article { color: #7DFF00;       border-color: rgba(180, 0, 120, 0.35); }
.badge-other   { color: rgba(240, 220, 255, 0.64); border-color: rgba(240, 220, 255, 0.20); }

.quote-text {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #F0E0FF;
  font-style: italic;
  margin-bottom: 0.75rem;
}

.open-mark, .close-mark {
  font-size: 1.2em;
  line-height: 0;
  vertical-align: -0.15em;
  color: #7DFF00;
  font-style: normal;
}

.quote-attr {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.attr-dash {
  font-family: 'ttnp-round', sans-serif;
  color: rgba(240, 220, 255, 0.45);
}

.attr-author {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.06em;
  color: rgba(240, 220, 255, 0.88);
  text-transform: uppercase;
}

.attr-source {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  color: rgba(240, 220, 255, 0.38);
  font-style: italic;
}

.attr-source::before { content: '/ '; opacity: 0.5; }

/* ── Empty state ──────────────────────────────────────── */
.empty-state {
  padding: 3rem 0;
  grid-column: 1 / -1;
}

.empty-pill {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.12em;
  color: rgba(240, 220, 255, 0.52);
  background: rgba(240, 220, 255, 0.06);
  border: 1px solid rgba(240, 220, 255, 0.20);
  border-radius: 999px;
  padding: 0.35rem 1rem;
  text-transform: lowercase;
}

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
.bottom-rule { flex: 1; height: 1px; background: rgba(240, 220, 255, 0.14); }

/* ── Transitions ──────────────────────────────────────── */
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
.quote-fade-move { transition: transform 0.2s ease; }

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 700px) {
  .noteables-page { width: calc(100% - 1.5rem); padding: 1.25rem 1.25rem 2.5rem; margin: 1rem auto; }
  .page-header { grid-template-columns: 1fr; gap: 1rem; }
  .quotes-grid { grid-template-columns: 1fr; }
}
</style>
