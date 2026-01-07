<template>
  <div class="relative w-full min-h-screen overflow-y-auto">
    <div class="flex flex-col items-center px-4 sm:px-6 md:px-8 py-24">
      <client-only>
        <BlurText
          text="Projects"
          :delay="200"
          class-name="hero-header text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-white text-center"
          animate-by="words"
          direction="top"
          :threshold="0.1"
          root-margin="0px"
          :step-duration="0.4"
        />
      </client-only>

      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full translate-y-5">
        <div v-for="i in 3" :key="i" class="project-card animate-pulse">
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div class="h-20 bg-gray-200 rounded w-full mb-4"></div>
          <div class="flex justify-between items-center">
            <div class="h-4 bg-gray-200 rounded w-24"></div>
            <div class="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>

      <!-- Cards Grid -->
      <div v-else>
        <div v-if="projects.length === 0" class="text-center text-lg text-gray-500 py-12">
          No projects found.
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full translate-y-5">
          <div
            v-for="(project, index) in projects"
            :key="project.slug || index"
            :ref="el => { if (el) projectRefs[index] = el }"
            class="project-card transition-all duration-700 ease-out mx-auto w-full max-w-[20rem] sm:max-w-none transform hover:-translate-y-2"
            :class="visibleCards[index] !== false ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
          >
            <h2 class="text-lg font-mono sm:text-xl font-semibold mb-2">{{ project.title }}</h2>
            <p class="text-sm font-mono sm:text-base leading-relaxed mb-4">
              {{ project.description }}
            </p>
            <div class="flex justify-between items-center">
              <NuxtLink :to="'/projects/' + project.slug" class="project-link">Read More</NuxtLink>
              <span class="text-sm text-gray-600">{{ project.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import BlurText from '@/components/BlurText.vue'

const visibleCards = ref([])
const projectRefs = ref([])
const isLoading = ref(true)

// Static projects data
const projects = ref([
  {
    title: 'CTFs for CCSO Intro GBM',
    description: 'Created custom Capture The Flag challenges for Penn State\'s Competitive Cyber Security Organization.',
    slug: 'ctfs-for-ccso-intro-gbm',
    createdAt: 'Jan 2026',
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
    createdAt: 'Dec 2025',
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
  
])

// Set up intersection observer after component mounts
const setupObserver = () => {
  if (!projectRefs.value.length) {
    console.log('No project refs found, retrying...')
    // Retry after a short delay if refs aren't ready
    setTimeout(() => {
      if (projectRefs.value.length) {
        setupObserver()
      }
    }, 100)
    return
  }

  console.log('Setting up observer for', projectRefs.value.length, 'cards')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = projectRefs.value.indexOf(entry.target)
        if (entry.isIntersecting && index !== -1) {
          console.log('Card', index, 'is now visible')
          visibleCards.value[index] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '50px' }
  )

  projectRefs.value.forEach((el, index) => {
    if (el) {
      observer.observe(el)
      console.log('Observing card', index)
    }
  })
}

onMounted(() => {
  // Initialize visibility array - cards start hidden for animation
  visibleCards.value = new Array(projects.value.length).fill(false)
  
  // Simulate loading state for smooth transition
  setTimeout(() => {
    isLoading.value = false
    nextTick(() => {
      setupObserver()
    })
  }, 300)
})
</script>

<style scoped>
.project-card {
  background-color: rgba(44, 82, 112, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(173, 216, 230, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  color: #e8f4f8;
  text-align: left;
  max-width: 90vw;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, background-color, opacity;
}

.project-card:hover {
  background-color: rgba(74, 122, 158, 0.5);
  box-shadow: 0 10px 30px -10px rgba(135, 206, 250, 0.3);
  border-color: rgba(173, 216, 230, 0.4);
}

.project-link {
  font-weight: 600;
  color: #87ceeb;
  border-bottom: 2px solid #add8e6;
  text-decoration: none;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.project-link:hover {
  color: #ffffff;
  border-color: #87ceeb;
}
</style>
