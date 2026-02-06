<template>
  <div class="relative w-full min-h-screen overflow-y-auto">
    <div class="flex flex-col items-center px-4 sm:px-6 md:px-8 py-24">
      <client-only>
        <BlurText
          text="Projects"
          :delay="200"
          class-name="hero-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 text-white text-center"
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
    createdAt: 'Aug 2025',
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
  {
    title: 'Dish Decoder',
    description: 'Extract only the good parts of a recipe webpage.',
    slug: 'dish-decoder',
    createdAt: 'Nov 2025',
    content: `Fun project that helps to pull only ingredients and instructions while also building a grocery list.

  # Dish Decoder 🍳

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
  background-color: rgba(45, 53, 85, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(240, 231, 213, 0.2);
  border-radius: 20px;
  padding: 1.5rem;
  color: #F0E7D5;
  text-align: left;
  max-width: 90vw;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, background-color, opacity;
}

.project-card:hover {
  background-color: rgba(61, 74, 112, 0.5);
  box-shadow: 0 10px 30px -10px rgba(240, 231, 213, 0.3);
  border-color: rgba(240, 231, 213, 0.4);
}

.project-link {
  font-weight: 600;
  color: #F0E7D5;
  border-bottom: 2px solid rgba(240, 231, 213, 0.6);
  text-decoration: none;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.project-link:hover {
  color: #ffffff;
  border-color: #F0E7D5;
}
</style>
