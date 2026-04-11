<template>
  <div class="project-detail">

    <!-- Back bar -->
    <div class="top-bar">
      <NuxtLink to="/projects" class="back-link">← projects.dir</NuxtLink>
      <span class="top-slug">{{ route.params.slug }}</span>
    </div>

    <client-only>
      <div v-if="isLoading" class="loading-block">
        <span class="loading-cursor">█</span>
      </div>

      <div v-else-if="error" class="error-block">
        <span class="error-label">[ERROR]</span>
        <span>{{ error }}</span>
        <NuxtLink to="/projects" class="back-link">← back</NuxtLink>
      </div>

      <div v-else-if="project">

        <!-- AQUA-style detail header -->
        <div class="detail-header">
          <div class="detail-header-left">
            <div class="detail-date">
              {{ new Date(project.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
            </div>
            <h1 class="detail-title">{{ project.title }}</h1>
          </div>
          <div class="detail-header-right">
            <span class="deco-cross">+</span>
            <p class="detail-desc">{{ project.description }}</p>
          </div>
        </div>

        <div class="content-divider">
          <span class="div-line"></span>
          <span class="div-label">content</span>
          <span class="div-line"></span>
        </div>

        <div class="project-content" v-html="renderedContent"></div>

      </div>

      <div v-else class="error-block">
        <span class="error-label">[404]</span>
        <span>project not found</span>
        <NuxtLink to="/projects" class="back-link">← back</NuxtLink>
      </div>
    </client-only>

    <div class="page-bottom">
      <span class="bottom-deco">◈</span>
      <span class="bottom-rule"></span>
      <span class="bottom-label">izzabizz_ · projects.dir</span>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { marked } from 'marked'

definePageMeta({
  validate: async (route) => {
    return typeof route.params.slug === 'string' &&
           route.params.slug.length > 0 &&
           route.params.slug !== 'index'
  }
})

const route = useRoute()
const project = ref(null)
const isLoading = ref(true)
const error = ref(null)

const staticProjects = [
  {
    title: 'Medusa',
    description: 'App that detects nonconsensually distributed images online and automates takedown requests. Won first place ($3,000) at the 2026 Bardusch Family IdeaMakers Challenge.',
    slug: 'medusa',
    createdAt: '2026-03-25',
    content: `Co-built with Marisa Vandenberg. The idea came out of a real situation — a Penn State athlete needed help tracking down and reporting misused images, and the process was exhausting and manual.

## What it does

Medusa uses facial recognition and keyword-matching to scan the web for nonconsensually distributed personal imagery. When it finds something, it automates the takedown request process across platforms — cutting what used to take hours down to something that can run at scale.

## Recognition

Won first place and a $3,000 prize at the 2026 Bardusch Family IdeaMakers Challenge, held during Penn State Startup Week powered by PNC on March 25, 2026.

[Read the PSU writeup](https://www.psu.edu/news/information-sciences-and-technology/story/app-prevent-misuse-personal-imagery-wins-top-prize)

## Stack

- Facial recognition for image matching
- Keyword-matching for content discovery
- Automated DMCA/platform takedown pipeline`
  },
  {
    title: 'CTF Challenges for CCSO',
    description: 'Custom Capture The Flag challenges written for Penn State\'s CCSO introduction meeting — cryptography, web, binary, and network categories.',
    slug: 'ctfs-for-ccso-intro-gbm',
    createdAt: '2025-08-20',
    content: `As CCSO president I wanted the intro GBM to actually teach something, so I built a set of CTF challenges from scratch instead of pulling from existing problem sets.

## Categories

- Basic cryptography
- Web security fundamentals
- Binary exploitation intro
- Network traffic analysis

## Notes

Designed to be completable by people who'd never touched security before, but still have a real challenge layer for members who'd been competing for a year. Over 50 students participated.`
  },
  {
    title: 'Portfolio Website',
    description: 'This site — built with Nuxt 3, Vue 3, and a custom SVG organic background. Editorial collage aesthetic.',
    slug: 'portfolio-website',
    createdAt: '2025-12-15',
    content: `Wanted a portfolio that didn't look like a template. Ended up going pretty deep on the visual side.

## Stack

- Nuxt 3 for SSR and file-based routing
- Vue 3 Composition API
- Tailwind CSS + scoped CSS
- Custom SVG blob background with feGaussianBlur filter
- CSS halftone dot overlay for texture

## Design

Collage/zine aesthetic — ghost typographic fragments in the background, frosted glass content panels, editorial split-column layouts. Went through about five different background approaches before landing on the organic blob thing.`
  },
  {
    title: 'Dish Decoder',
    description: 'Strips recipe pages down to ingredients and instructions. No backstory, no ads — just the food.',
    slug: 'dish-decoder',
    createdAt: '2025-11-01',
    content: `Built this because I was tired of scrolling through a 2,000-word essay about someone's childhood memories to find out how long to cook pasta.

## What it does

Takes a recipe URL and returns only the ingredients and steps. That's it.

## Features

- Ingredients + instructions only
- Grocery list mode (ingredients view only)
- Export to Markdown or PDF
- Dark mode

## Stack

- Nuxt 3 + Vue for routing and reactivity
- TypeScript
- Tailwind CSS
- Docker for consistent deploys
- GitHub Actions for CI/CD`
  }
]

marked.setOptions({ gfm: true, breaks: true })

const renderedContent = computed(() => {
  if (!project.value?.content) return ''
  return marked.parse(project.value.content)
})

const loadProject = () => {
  isLoading.value = true
  error.value = null
  try {
    const slug = route.params.slug?.toString().toLowerCase().trim()
    const found = staticProjects.find(p => p.slug.toLowerCase() === slug)
    project.value = found || null
    if (!found) error.value = 'Project not found'
  } catch (err) {
    error.value = err.message
    project.value = null
  } finally {
    setTimeout(() => { isLoading.value = false }, 150)
  }
}

onMounted(() => {
  if (!route.params.slug || route.params.slug === 'index') {
    navigateTo('/projects')
    return
  }
  loadProject()
})

watch(() => route.params.slug, (v) => { if (v) loadProject() })
</script>

<style>
.project-detail {
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


/* ── Top bar ──────────────────────────────────────────── */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.1em;
  color: rgba(240, 220, 255, 0.58);
  border-bottom: 1px solid rgba(240, 220, 255, 0.20);
  padding-bottom: 0.6rem;
  margin-bottom: 2rem;
}

.back-link {
  color: rgba(240, 220, 255, 0.70);
  text-decoration: none;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.1em;
  transition: color 0.15s;
}

.back-link:hover { color: #7DFF00; }
.top-slug { opacity: 0.4; }

/* ── Detail header (AQUA two-column) ─────────────────── */
.detail-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;
  margin-bottom: 2rem;
}

.detail-header-left { display: flex; flex-direction: column; gap: 0.5rem; }

.detail-date {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.58);
  text-transform: uppercase;
}

.detail-title {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(1.75rem, 5vw, 3.5rem);
  font-weight: 900;
  color: #7DFF00;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-shadow: 3px 3px 0px rgba(125, 255, 0, 0.12);
}

.detail-header-right {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-top: 0.5rem;
}

.deco-cross {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  font-weight: 300;
  color: rgba(240, 220, 255, 0.24);
  line-height: 1;
  flex-shrink: 0;
}

.detail-desc {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(240, 220, 255, 0.70);
}

/* ── Content divider ──────────────────────────────────── */
.content-divider {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 2rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.45);
  text-transform: uppercase;
}

.div-line {
  flex: 1;
  height: 1px;
  background: rgba(240, 220, 255, 0.16);
}

/* ── Markdown content ─────────────────────────────────── */
.project-content {
  max-width: 780px;
  color: rgba(240, 220, 255, 0.88);
  font-family: 'ttnp-round', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
}

.project-content h1,
.project-content h2,
.project-content h3,
.project-content h4 {
  font-family: 'Courier New', Courier, monospace;
  font-weight: 700;
  color: #F0E0FF;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-top: 2em;
  margin-bottom: 0.75em;
}

.project-content h1 { font-size: 1rem; color: #7DFF00; }
.project-content h2 { font-size: 0.94rem; }
.project-content h3 { font-size: 0.72rem; color: rgba(240, 220, 255, 0.70); }

.project-content p { margin-bottom: 1.25em; }

.project-content strong { color: #F0E0FF; font-weight: 700; }
.project-content em { font-style: italic; }

.project-content a {
  color: #7DFF00;
  text-decoration: none;
  border-bottom: 1px solid rgba(125, 255, 0, 0.3);
  transition: border-color 0.15s;
}

.project-content a:hover { border-bottom-color: #7DFF00; }

.project-content ul,
.project-content ol {
  padding-left: 1.25rem;
  margin-bottom: 1.25em;
}

.project-content ul { list-style: none; }
.project-content ul li::before {
  content: '→ ';
  color: #7DFF00;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8em;
}

.project-content ol { list-style: decimal; }
.project-content li { margin-bottom: 0.4em; }

.project-content blockquote {
  border-left: 2px solid #7DFF00;
  padding-left: 1rem;
  margin: 1.5em 0;
  font-style: italic;
  color: rgba(240, 220, 255, 0.70);
}

.project-content pre {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(240, 220, 255, 0.20);
  padding: 1.25rem;
  margin: 1.5em 0;
  overflow-x: auto;
}

.project-content code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85em;
  color: #7DFF00;
  background: rgba(125, 255, 0, 0.1);
  padding: 0.15rem 0.35rem;
}

.project-content pre code {
  background: none;
  padding: 0;
  color: rgba(240, 220, 255, 0.90);
}

/* ── States ───────────────────────────────────────────── */
.loading-block {
  padding: 4rem 0;
  font-family: 'Courier New', Courier, monospace;
  color: rgba(240, 220, 255, 0.58);
}

.loading-cursor { animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.error-block {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 3rem 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  color: rgba(240, 220, 255, 0.70);
}

.error-label { color: #7DFF00; font-weight: 700; }

/* ── Bottom ───────────────────────────────────────────── */
.page-bottom {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-top: 4rem;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(240, 220, 255, 0.35);
  text-transform: uppercase;
}

.bottom-deco { color: #7DFF00; opacity: 0.5; font-size: 0.84rem; }
.bottom-rule { flex: 1; height: 1px; background: rgba(240, 220, 255, 0.14); }

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 700px) {
  .project-detail { width: calc(100% - 1.5rem); padding: 1.25rem 1.25rem 2.5rem; margin: 1rem auto; }
  .detail-header { grid-template-columns: 1fr; gap: 1rem; }
}
</style>
