<template>
  <div class="relative w-full h-full px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 overflow-y-auto overflow-x-hidden" style="max-width: 100vw;">
    <div class="container mx-auto max-w-4xl w-full" style="max-width: calc(100vw - 2rem);">
      <!-- Back Button -->
      <NuxtLink 
        to="/projects"
        class="inline-flex items-center mb-6 sm:mb-8 text-blue-200 hover:text-white transition-colors duration-200 touch-manipulation"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Projects
      </NuxtLink>

      <client-only>
        <!-- Loading State -->
        <div v-if="isLoading" class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div class="space-y-4">
            <div class="h-4 bg-gray-200 rounded w-full"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            <div class="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center">
          <p class="text-red-500 mb-4">{{ error }}</p>
          <NuxtLink 
            to="/projects"
            class="px-4 py-2 bg-[#53A275] text-white rounded-lg hover:bg-[#1b1740] transition-colors duration-200 inline-block"
          >
            Back to Projects
          </NuxtLink>
        </div>

        <!-- Project Content -->
        <div v-else-if="project" class="w-full flex flex-col items-center">
          <h1 class="hero-header-small text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center break-words">{{ project.title }}</h1>
          <div class="mb-6 sm:mb-8 font-bold text-blue-200 text-center text-xs sm:text-sm">
            {{ new Date(project.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) }}
          </div>
          <div class="content-card">
            <div 
              class="project-content"
              v-html="renderedContent"
            ></div>
          </div>
        </div>

        <!-- Not Found State -->
        <div v-else class="text-center">
          <p class="text-gray-600 mb-4">Project not found</p>
          <NuxtLink 
            to="/projects"
            class="px-4 py-2 bg-[#53A275] text-white rounded-lg hover:bg-[#1b1740] transition-colors duration-200"
          >
            Back to Projects
          </NuxtLink>
        </div>
      </client-only>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { marked } from 'marked'

// Define page metadata for Nuxt
definePageMeta({
  layout: 'default',
  validate: async (route) => {
    // Make sure we have a slug and it's not 'index' or empty
    return typeof route.params.slug === 'string' && 
           route.params.slug.length > 0 && 
           route.params.slug !== 'index'
  }
})

const route = useRoute()
const project = ref(null)
const isLoading = ref(true)
const error = ref(null)

// Static projects data (same as in index.vue)
const staticProjects = [
  {
    title: 'CTFs for CCSO Intro GBM',
    description: 'Created custom Capture The Flag challenges for Penn State\'s Competitive Cyber Security Organization.',
    slug: 'ctfs-for-ccso-intro-gbm',
    createdAt: '2026-01-07',
    content: `I created a series of custom Capture The Flag challenges for Penn State's Competitive Cyber Security Organization (CCSO) Introduction General Body Meeting.

## Overview

These challenges were designed to introduce new members to cybersecurity concepts in a fun and engaging way. The CTFs covered various topics including:

- Basic cryptography
- Web security fundamentals
- Binary exploitation basics
- Network analysis

## Impact

The event was a great success, with over 50 students participating and learning fundamental security concepts through hands-on challenges.`
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, animated personal portfolio built with Nuxt 3 and Vue 3.',
    slug: 'portfolio-website',
    createdAt: '2025-12-15',
    content: `Built a personal portfolio website showcasing my projects and skills.

## Tech Stack

- Nuxt 3 for SSR and routing
- Vue 3 with Composition API
- Tailwind CSS for styling
- Custom animations and effects

## Features

- Responsive design
- Smooth scroll animations
- Project showcase
- Interactive components`
  },
  {
    title: 'Dish Decoder',
    description: 'Extract only the good parts of a recipe webpage.',
    slug: 'dish-decoder',
    createdAt: 'Nov 2025',
    content: `Tired of the ads and life stories? Me too.

  So, I finally got around to building **Dish Decoder**. I made this because I was tired of trying to cook dinner and having to scroll through a 2,000-word essay about someone's childhood trip to Italy just to find out how much long I have to whip the whipping cream for a tiramisu recipe. 

  ## What is it?
  It’s a web app that takes a messy recipe URL and "decodes" it. It strips away all the ads, the giant high-res photos that take forever to load, and the life stories, leaving you with just the ingredients and the actual steps. 

  ## Why I think it’s cool:
  - **No Clutter:** It’s just the facts. Ingredients + Instructions. That’s it.
  - **Grocery List Mode:** There’s a dedicated view that just shows the ingredients so you can use it while walking around the store without losing your mind.
  - **Exporting:** If you’re like me and keep a digital cookbook in Notion or Obsidian, you can export the recipe as **Markdown**. You can also just grab a **PDF** if you’re old school and want to print it.
  - **Dark Mode:** Because let’s be real, I’m usually cooking or coding at 11 PM and don’t want to be blinded by a white screen.

  ## Nerd Stuff
  I wanted to keep the vibes modern and fast, so here’s what I used:
  - **Nuxt 3 & Vue:** My go-to for building stuff quickly. It’s super fast and handles the routing like a champ.
  - **TypeScript:** Because I hate when my code breaks for no reason. Having types makes the whole dev process way less of a headache.
  - **Tailwind CSS:** For styling. I can’t go back to regular CSS after this—it makes everything look clean with way less effort.
  - **Docker:** I containerized the whole thing. It’s a bit of a flex, but it makes deploying it super easy and ensures it runs the same on my machine as it does on the server.
  - **GitHub Actions:** Set up some CI/CD so every time I push code, it automatically checks if I broke anything.

  ## Summary
  It’s simple, it’s fast, and it saves me from reading about someone's "culinary journey" when I just want to make some tacos. Check out the repo if you want to see how the scraping logic works or if you want to run a local instance!`
  }
]

// Initialize marked with GitHub-flavored markdown
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
})

// Computed property for rendered markdown
const renderedContent = computed(() => {
  if (!project.value?.content) return ''
  const html = marked.parse(project.value.content)
  console.log('Rendered HTML:', html)
  return html
})

// Load project data from static array
const loadProject = () => {
  isLoading.value = true
  error.value = null
  
  try {
    // Normalize slugs for comparison (handle case sensitivity and whitespace)
    const normalizedSlug = route.params.slug?.toString().toLowerCase().trim()
    const foundProject = staticProjects.find(p => {
      const projectSlug = p.slug?.toString().toLowerCase().trim()
      return projectSlug === normalizedSlug
    })
    
    if (foundProject) {
      project.value = foundProject
    } else {
      console.warn('Project not found. Available slugs:', staticProjects.map(p => p.slug))
      console.warn('Looking for slug:', normalizedSlug)
      error.value = 'Project not found'
      project.value = null
    }
  } catch (err) {
    console.error('Error loading project:', err)
    error.value = err.message
    project.value = null
  } finally {
    // Simulate loading for smooth transition
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }
}

onMounted(() => {
  // Check if we have a valid slug before loading
  if (!route.params.slug || typeof route.params.slug !== 'string' || route.params.slug === 'index') {
    navigateTo('/projects')
    return
  }
  loadProject()
})

// Watch for route changes to reload data
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    loadProject()
  }
})
</script>

<style>
.content-card {
  background-color: rgba(45, 53, 85, 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(240, 231, 213, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  width: 100%;
}

@media (min-width: 640px) {
  .content-card {
    padding: 2rem;
    border-radius: 18px;
  }
}

@media (min-width: 768px) {
  .content-card {
    padding: 2.5rem;
    border-radius: 20px;
  }
}

.project-content {
  color: #F0E7D5;
  line-height: 1.8;
  font-size: 0.95rem;
  animation: fadeIn 0.5s ease-out;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

@media (min-width: 640px) {
  .project-content {
    font-size: 1rem;
    line-height: 1.85;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.project-content h1 {
  color: #ffffff !important;
  font-weight: bold !important;
  font-size: 1.35rem !important;
  margin-top: 1.75em !important;
  margin-bottom: 0.75em !important;
  line-height: 1.3 !important;
}

@media (min-width: 640px) {
  .project-content h1 {
    font-size: 1.5rem !important;
  }
}

.project-content h2 {
  color: #ffffff !important;
  font-weight: bold !important;
  font-size: 1.15rem !important;
  margin-top: 1.5em !important;
  margin-bottom: 0.6em !important;
  line-height: 1.35 !important;
}

@media (min-width: 640px) {
  .project-content h2 {
    font-size: 1.25rem !important;
  }
}

.project-content h3 {
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 1.05rem !important;
  margin-top: 1.35em !important;
  margin-bottom: 0.5em !important;
}

@media (min-width: 640px) {
  .project-content h3 {
    font-size: 1.1rem !important;
  }
}

.project-content h4,
.project-content h5,
.project-content h6 {
  color: #ffffff !important;
  font-weight: 600 !important;
  margin-top: 1.2em !important;
  margin-bottom: 0.5em !important;
}

.project-content strong,
.project-content b {
  font-weight: 700 !important;
  color: #ffffff !important;
}

.project-content em,
.project-content i {
  font-style: italic !important;
}

.project-content a {
  color: #87ceeb !important;
  transition: color 0.2s ease;
}

.project-content a:hover {
  color: #ffffff !important;
}

.project-content pre {
  background-color: rgba(26, 31, 53, 0.6) !important;
  border: 1px solid rgba(240, 231, 213, 0.3) !important;
  border-radius: 0.5rem !important;
  padding: 1rem !important;
}

.project-content code {
  color: #F0E7D5 !important;
  background-color: rgba(26, 31, 53, 0.6) !important;
  padding: 0.25rem !important;
  border-radius: 0.25rem !important;
}

.project-content pre code {
  background-color: transparent !important;
  padding: 0 !important;
}

.project-content p {
  margin-top: 1em !important;
  margin-bottom: 1em !important;
}

.project-content img {
  margin-top: 1.5em !important;
  margin-bottom: 1.5em !important;
  border-radius: 0.5rem !important;
  max-width: 100% !important;
}

.project-content ul {
  margin-top: 0.75em !important;
  margin-bottom: 0.75em !important;
  padding-left: 1.5em !important;
  list-style-type: disc !important;
}

.project-content ol {
  margin-top: 0.75em !important;
  margin-bottom: 0.75em !important;
  padding-left: 1.5em !important;
  list-style-type: decimal !important;
}

.project-content li {
  margin-bottom: 0.35em !important;
}

.project-content blockquote {
  margin-top: 1.6em !important;
  margin-bottom: 1.6em !important;
  padding-left: 1em !important;
  border-left: 4px solid #87ceeb !important;
  font-style: italic !important;
}
</style>