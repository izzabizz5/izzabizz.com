<template>
  <div class="relative w-full min-h-screen px-4 sm:px-6 md:px-8 py-24 flex flex-col items-center" style="margin-top: -3rem;">
    <div class="container mx-auto max-w-4xl w-full">
      <!-- Back Button -->
      <NuxtLink 
        to="/projects"
        class="inline-flex items-center mb-8 text-blue-200 hover:text-white transition-colors duration-200"
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
        <div v-else-if="project" class="w-full">
          <h1 class="hero-header-small text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 text-center">{{ project.title }}</h1>
          <div class="mb-8 font-bold text-blue-200 text-center text-sm">
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
    title: 'Discord Bot',
    description: 'A multi-purpose Discord bot with moderation and fun commands.',
    slug: 'discord-bot',
    createdAt: '2025-11-20',
    content: `Created a versatile Discord bot for server management and entertainment.

## Features

- Moderation tools
- Music player
- Custom commands
- Auto-moderation
- Server statistics

## Tech Used

Built with Discord.js and Node.js, deployed on a VPS for 24/7 uptime.`
  },
  {
    title: 'Web Scraper',
    description: 'Python-based web scraper for data collection and analysis.',
    slug: 'web-scraper',
    createdAt: '2025-10-10',
    content: `Developed a web scraping tool for automated data collection.

## Capabilities

- Multi-threaded scraping
- Rate limiting
- Data cleaning
- Export to CSV/JSON
- Proxy support

## Technologies

Built with Python using BeautifulSoup, requests, and pandas.`
  },
  {
    title: 'Game Mod',
    description: 'Custom game modification adding new features and gameplay mechanics.',
    slug: 'game-mod',
    createdAt: '2025-09-05',
    content: `Created a popular mod for a video game that enhances gameplay.

## What It Does

- Adds new items
- Custom quests
- UI improvements
- Performance optimizations

## Reception

Downloaded over 10,000 times with positive community feedback.`
  },
  {
    title: 'Chat Application',
    description: 'Real-time chat app with WebSocket support and modern UI.',
    slug: 'chat-application',
    createdAt: '2025-08-01',
    content: `Built a real-time messaging application with modern features.

## Key Features

- WebSocket communication
- User authentication
- Private and group chats
- Message history
- Typing indicators
- Online status

## Built With

Express.js, Socket.io, MongoDB, and React for the frontend.`
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
  background-color: rgba(44, 82, 112, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(173, 216, 230, 0.2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
}

.project-content {
  color: #e8f4f8;
  line-height: 1.75;
  font-size: 1.125rem;
  animation: fadeIn 0.5s ease-out;
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
  font-size: 2rem !important;
  margin-top: 2em !important;
  margin-bottom: 0.8em !important;
  line-height: 1.2 !important;
}

.project-content h2 {
  color: #ffffff !important;
  font-weight: bold !important;
  font-size: 1.6rem !important;
  margin-top: 1.8em !important;
  margin-bottom: 0.7em !important;
  line-height: 1.3 !important;
}

.project-content h3 {
  color: #ffffff !important;
  font-weight: 600 !important;
  font-size: 1.3rem !important;
  margin-top: 1.5em !important;
  margin-bottom: 0.6em !important;
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
  background-color: rgba(26, 58, 82, 0.6) !important;
  border: 1px solid rgba(173, 216, 230, 0.3) !important;
  border-radius: 0.5rem !important;
  padding: 1rem !important;
}

.project-content code {
  color: #add8e6 !important;
  background-color: rgba(26, 58, 82, 0.6) !important;
  padding: 0.25rem !important;
  border-radius: 0.25rem !important;
}

.project-content pre code {
  background-color: transparent !important;
  padding: 0 !important;
}

.project-content p {
  margin-top: 1.25em !important;
  margin-bottom: 1.25em !important;
}

.project-content img {
  margin-top: 2em !important;
  margin-bottom: 2em !important;
  border-radius: 0.5rem !important;
}

.project-content ul {
  margin-top: 1.25em !important;
  margin-bottom: 1.25em !important;
  padding-left: 1.625em !important;
  list-style-type: disc !important;
}

.project-content ol {
  margin-top: 1.25em !important;
  margin-bottom: 1.25em !important;
  padding-left: 1.625em !important;
  list-style-type: decimal !important;
}

.project-content blockquote {
  margin-top: 1.6em !important;
  margin-bottom: 1.6em !important;
  padding-left: 1em !important;
  border-left: 4px solid #87ceeb !important;
  font-style: italic !important;
}
</style>