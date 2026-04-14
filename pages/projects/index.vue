<template>
  <div class="projects-page">

    <span class="page-edge-label" aria-hidden="true">PROJECTS.DIR · 00</span>

    <!-- style page header -->
    <div class="page-header">
      <div class="header-left">
        <h1 class="page-title">PROJECTS<span class="title-dot">.</span></h1>
        <div class="header-tags">
          <span class="pill-tag">{{ projects.length }} items</span>
          <span class="deco-star">✦</span>
          <span class="pill-tag">nuxt · vue · python</span>
        </div>
      </div>
      <div class="header-right">
        <span class="deco-cross">+</span>
        <p class="header-desc">things i've built || web apps & competition work. some finished, some ongoing.</p>
      </div>
    </div>

    <!-- Divider -->
    <div class="section-divider">
      <span class="div-line"></span>
      <span class="div-label">index</span>
      <span class="div-line"></span>
    </div>

    <!-- style project list -->
    <ul class="project-list">
      <li
        v-for="(project, i) in projects"
        :key="project.slug"
        class="project-entry"
        :ref="el => { if (el) projectRefs[i] = el }"
        :class="{ visible: visibleItems[i] }"
      >
        <!-- Top meta row -->
        <div class="entry-meta-row">
          <span class="entry-index">//{{ String(i + 1).padStart(3, '0') }}</span>
          <span class="entry-date">{{ project.createdAt }}</span>
          <span class="deco-mark">◈</span>
        </div>

        <!-- two-column: title + description -->
        <div class="entry-body-grid">
          <h2 class="entry-title">{{ project.title }}</h2>
          <div class="entry-right-col">
            <p class="entry-desc">{{ project.description }}</p>
            <NuxtLink :to="'/projects/' + project.slug" class="entry-cta">
              read more <span class="cta-arrow">→</span>
            </NuxtLink>
          </div>
        </div>

        <div class="entry-rule"></div>
      </li>
    </ul>

    <!-- Bottom mark -->
    <div class="page-bottom">
      <span class="bottom-deco">◈</span>
      <span class="bottom-rule"></span>
      <span class="bottom-label">izzabizz_ · projects.dir</span>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const projectRefs = ref([])
const visibleItems = ref([])

const projects = ref([
  {
    title: 'Medusa',
    description: 'App that detects nonconsensually distributed images online and automates takedown requests. Won first place ($3,000) at the 2026 Bardusch Family IdeaMakers Challenge.',
    slug: 'medusa',
    createdAt: 'Mar 2026',
    content: `Co-built with my friend Marisa. The idea came out of a real situation. A Penn State athlete needed help tracking down and reporting misused images, and the process was exhausting and manual.

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
    createdAt: 'Aug 2025',
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
    description: 'This site!',
    slug: 'portfolio-website',
    createdAt: 'Dec 2025',
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
    description: 'Strips recipe pages down to ingredients and instructions. No backstory & no ads. Just the glorious food.',
    slug: 'dish-decoder',
    createdAt: 'Nov 2025',
    content: `Built this because it was annoying to look through a 2,000-word essay about someone's childhood memories to find out if I need to mix the sabayon or fold it.

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
  },
  {
    title: 'SDR GBM — LimeSDR & GNURadio CTF',
    description: 'Led a CCSO general body meeting on Software Defined Radio using the LimeSDR and GNURadio, capped with a Caesar cipher + NATO phonetic alphabet CTF I wrote from scratch.',
    slug: 'sdr-gbm-limesdr-gnuradio',
    createdAt: 'Mar 2026',
    content: `Designed and ran a CCSO GBM centered on Software Defined Radio, covering how to transmit audio using the LimeSDR and GNURadio while staying within legal frequency bands and decibel limits.

## The CTF twist

I wrote a CTF storyline from scratch. Each letter of the flag was encoded with a Caesar cipher, then broadcast using the NATO phonetic (military) alphabet via the LimeSDR. Members had to intercept the transmission, decode the NATO phonetic to letters, then reverse the Caesar shift to get the flag. Also had walkie-talkies on hand for members to intercept and decode a separate transmitted message.

## What members learned

- LimeSDR hardware setup and GNURadio basics
- Legal frequency band limits and decibel constraints
- SDR signal transmission vs. reception
- Applied cryptography (Caesar cipher, NATO alphabet)`
  },
  {
    title: 'Internal Red vs. Blue Competition',
    description: "Helped design and run CCSO's Internal Red vs. Blue — 3 teams, 30+ blue teamers, with C-Suite briefings, incident response reports, and timed injects.",
    slug: 'internal-red-vs-blue',
    createdAt: 'Spring 2025',
    content: `After a year of planning, CCSO ran its first Internal Red vs. Blue Competition. My main contributions were on the structure and inject side.

## What I built

- **Competition packet** — rules, environment overview, scoring breakdown, and task details distributed to all participants
- **Injects** — designed and graded all timed inject submissions (business memos, IR reports, and technical tasks)
- **Shadow participation program** — organized a track for students who were interested but not ready to compete, letting them observe, ask questions, and support teams without pressure

## Format

3 blue teams defending their systems against the red team simultaneously, with C-Suite roles played by faculty/staff to simulate real business pressure. Teams submitted inject responses within set windows throughout the day.`
  },
  {
    title: 'Reverse Engineering GBM — Binary Ninja',
    description: 'Co-led a CCSO GBM on reverse engineering using Binary Ninja as a decompiler, disassembler, debugger, and binary analysis platform, followed by internal CTF challenges.',
    slug: 're-gbm-binary-ninja',
    createdAt: 'Apr 2025',
    content: `Co-led a reverse engineering GBM with Aiden Johnson and Robert Roderick, walking members through Binary Ninja as a practical RE environment.

## Topics covered

- Using Binary Ninja as a decompiler, disassembler, debugger, and binary analysis platform
- Navigating disassembly views and annotating code
- Hands-on CTF challenges designed to introduce RE thinking to members at all skill levels`
  },
  {
    title: 'SDR Meeting — RTL-SDR & SDR++',
    description: 'Co-led a CCSO SDR meeting before spring break: RTL-SDR hardware, SDR++ software, FM radio theory, and an audio-based CTF.',
    slug: 'sdr-meeting-rtlsdr',
    createdAt: 'Feb 2025',
    content: `Co-led CCSO's SDR meeting with Aiden Johnson, introducing members to software-defined radio before spring break.

## Topics covered

- RTL-SDR hardware setup and SDR++ software walkthrough
- FM radio fundamentals, frequency math, and imaginary numbers
- GNU Radio introduction for more advanced SDR work

## CTF

Used SDR transmitters to hide messages in audio. Members tuned in and decoded the transmissions to find the flag.`
  },
  {
    title: 'Blue Team Workshop — Email Server Setup',
    description: 'Led a CCSO Blue Team workshop on building an internal email server with Postfix and Dovecot, then testing it by sending simulated phishing emails inside the lab.',
    slug: 'blue-team-workshop-email-server',
    createdAt: '2025',
    content: `Led a Blue Team workshop on configuring a full internal email server from scratch, then attacking it.

## What members built

- **Postfix** for outgoing SMTP
- **Dovecot** for incoming IMAP
- **Thunderbird** integration to send and receive via a GUI

## The twist

Once the servers were up, members crafted and sent simulated phishing emails inside the lab to test their own configurations. Good way to understand how email infrastructure gets abused.`
  },
  {
    title: 'Rotational GBM — Linux Station',
    description: 'Led the Linux station at a four-rotation CCSO GBM, covering file permissions, special bits, and ACLs.',
    slug: 'rotational-gbm-linux',
    createdAt: 'Fall 2024',
    content: `Ran one of four stations at a rotational CCSO GBM — members cycled through Linux, lockpicking, Windows, and PicoCTF challenges.

## Linux station content

- File permissions (read, write, execute, octal notation)
- Special bits: setuid, setgid, sticky bit
- Access Control Lists (ACLs) with getfacl / setfacl

Aimed at members who were brand new to Linux and needed a solid foundation before jumping into lab environments.`
  },
  {
    title: 'Reverse Engineering GBM — DLLs & Unity',
    description: 'Co-led a CCSO GBM on reverse engineering — assembly language, DLLs, and live demos modifying game behavior by patching binaries.',
    slug: 're-gbm-dlls-unity',
    createdAt: 'Nov 2024',
    content: `Co-led a reverse engineering GBM with Cy Fisher covering the foundational concepts behind RE.

## Topics covered

- Machine code, compilers, and assembly language
- Dynamic Linked Libraries (DLLs) — what they are and how patching them changes program behavior
- Binary types and formats

## Demos

- Modified DLLs in Getting Over It to demonstrate how patching affects runtime behavior
- Members reverse-engineered a Unity game at the end of the session`
  },
  {
    title: 'Cyber Mixer',
    description: "Helped run CCSO's Cyber Mixer — 150+ students and industry reps from Deloitte, CrowdStrike, BD, Vanguard, Lockheed Martin, AWS, and more.",
    slug: 'cyber-mixer',
    createdAt: '2025',
    content: `Helped organize CCSO's Cyber Mixer, one of our largest annual events.

## Attendees

150+ students connected with industry representatives from:
Deloitte · BD · CrowdStrike · Vanguard · PwC · ARL Penn State · Lockheed Martin · AWS · Grant Thornton · Security Risk Advisors

Penn State clubs C3, WiCys, FCA, and WiredIN also had tables to showcase their work.`
  },
  {
    title: 'CYBER 100 Classroom Presentation',
    description: 'Brought CCSO into two CYBER 100 classes for a club intro and hands-on PicoCTF activity spanning crypto, forensics, web exploitation, and reverse engineering.',
    slug: 'cyber-100-presentation',
    createdAt: 'Fall 2024',
    content: `Presented CCSO to two sections of CYBER 100 at Penn State — giving incoming students a first look at what competitive cybersecurity looks like.

## Format

After a short club introduction, students jumped into PicoCTF challenges across four categories:

- Cryptography
- Forensics
- Web exploitation
- Reverse engineering

Good way to get people hooked early. A lot of students who came to the next GBM had found out about CCSO through this.`
  },
  {
    title: 'Grace Hopper Conference',
    description: 'Attended the Grace Hopper Conference in Philadelphia — networking with industry leaders and connecting with women in cybersecurity, sponsored by Penn State IST.',
    slug: 'grace-hopper-2024',
    createdAt: 'Oct 2024',
    content: `Attended the Grace Hopper Celebration in Philadelphia, one of the largest gatherings of women in computing.

Penn State IST sponsored my attendance. Spent the conference networking with companies, talking to engineers and security researchers, and meeting other women in the field — a lot of whom were navigating the same intersection of security and law that I care about.`
  },
])

onMounted(() => {
  visibleItems.value = new Array(projects.value.length).fill(false)
  nextTick(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const i = projectRefs.value.indexOf(entry.target)
          if (entry.isIntersecting && i !== -1) {
            visibleItems.value[i] = true
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    projectRefs.value.forEach(el => { if (el) observer.observe(el) })
  })
})
</script>

<style scoped>
.projects-page {
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
  color: rgba(200, 48, 96, 0.20);
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
  margin-bottom: 2rem;
  width: 100%;
}

.header-left { display: flex; flex-direction: column; gap: 0.75rem; }

.page-title {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(2.75rem, 9vw, 7rem);
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
  margin-top: 0.15rem;
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

/* ── Project list ─────────────────────────────────────── */
.project-list { list-style: none; padding: 0; margin: 0; }

.project-entry {
  border-left: 2px solid rgba(200, 48, 96, 0.18);
  padding-left: 1.25rem;
  transition: border-color 0.2s ease, opacity 0.4s ease, transform 0.4s ease;
  opacity: 0;
  transform: translateY(10px);
}

.project-entry.visible { opacity: 1; transform: translateY(0); }
.project-entry.visible:nth-child(odd)  { transform: translateY(0) rotate(-0.3deg); }
.project-entry.visible:nth-child(even) { transform: translateY(0) rotate(0.2deg); }
.project-entry:hover { border-left-color: #C83060; transform: rotate(0deg) !important; }

/* Meta row */
.entry-meta-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

.entry-index {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.15em;
  color: rgba(245, 221, 229, 0.52);
}

.entry-date {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.94rem;
  letter-spacing: 0.1em;
  color: rgba(245, 221, 229, 0.45);
}

.deco-mark { font-size: 0.94rem; color: #C83060; opacity: 0.5; }

/* two-column body */
.entry-body-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  align-items: start;
}

.entry-title {
  font-family: 'ttnp-round', sans-serif;
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: #F5DDE5;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.entry-right-col {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.entry-desc {
  font-family: 'ttnp-round', sans-serif;
  font-size: 0.875rem;
  line-height: 1.65;
  color: rgba(245, 221, 229, 0.78);
}

.entry-cta {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.84rem;
  letter-spacing: 0.1em;
  color: rgba(245, 221, 229, 0.70);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.75rem;
  border: 1px solid rgba(200, 48, 96, 0.28);
  border-radius: 999px;
  width: fit-content;
  transition: all 0.15s ease;
}

.entry-cta:hover {
  background: #C83060;
  border-color: #C83060;
  color: #F5DDE5;
}

.cta-arrow { font-size: 0.94rem; }

.entry-rule {
  height: 1px;
  background: rgba(200, 48, 96, 0.18);
  margin-bottom: 2rem;
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
.bottom-rule { flex: 1; height: 1px; background: rgba(200, 48, 96, 0.18); }

/* ── Mobile ───────────────────────────────────────────── */
@media (max-width: 700px) {
  .projects-page { width: calc(100% - 1.5rem); padding: 1.25rem 1.25rem 2.5rem; margin: 1rem auto; }
  .page-header { grid-template-columns: 1fr; gap: 1rem; }
  .entry-body-grid { grid-template-columns: 1fr; gap: 0.75rem; }
}
</style>
