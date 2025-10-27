<template>
  <div class="relative w-full min-h-screen overflow-visible">
    <div class="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-24">
    <!-- Foreground Content -->
      <!-- Title -->
      <client-only>
        <BlurText
          text="Projects"
          :delay="200"
          class-name="hero-header text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[#1b1740]"
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

      <!-- Error State -->
      <div v-else-if="error" class="text-center max-w-6xl w-full translate-y-5">
        <p class="text-red-500 mb-4">{{ error }}</p>
        <button 
          @click="fetchProjects" 
          class="px-4 py-2 bg-[#53A275] text-white rounded-lg hover:bg-[#1b1740] transition-colors duration-200"
        >
          Try Again
        </button>
      </div>

      <!-- Cards Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full translate-y-5">
        <div
          v-for="(project, index) in projects"
          :key="project.slug || index"
          :ref="el => { if (el) projectRefs[index] = el }"
          class="project-card opacity-0 transition-all duration-700 ease-out mx-auto w-full max-w-[20rem] sm:max-w-none transform hover:-translate-y-2"
          :class="{'opacity-100 translate-y-0': visibleCards[index]}"
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
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlurText from '@/components/BlurText.vue'

const projects = ref([])
const visibleCards = ref([])
const projectRefs = ref([])
const isLoading = ref(true)
const error = ref(null)

// Fetch projects from the API
const fetchProjects = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await fetch('/api/projects/12c429af-3582-41a8-94a5-c118713d8cc5/content')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    
    // Ensure data is an array
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from API')
    }
    
    // Transform the data for display
    projects.value = data.map(project => ({
      title: project.title,
      description: project.excerpt || (project.content ? project.content.split('\n')[0] : 'No description available'),
      content: project.content,
      slug: project.slug,
      createdAt: new Date(project.createdAt).toLocaleDateString()
    }))

    // Initialize visibility array with the correct length
    visibleCards.value = new Array(projects.value.length).fill(false)
    
  } catch (err) {
    console.error('Error fetching projects:', err)
    error.value = err.message
    // Fallback data in case API fails
    projects.value = [
      {
        title: 'CTFs for CCSO Intro GBM',
        description: 'Created custom Capture The Flag challenges for Penn State\'s Competitive Cyber Security Organization.',
        slug: 'ctfs-for-ccso-intro-gbm',
        createdAt: new Date().toLocaleDateString()
      }
    ]
    visibleCards.value = new Array(projects.value.length).fill(false)
  } finally {
    isLoading.value = false
  }
}

// Set up intersection observer after projects are loaded
const setupObserver = () => {
  if (!projectRefs.value.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = projectRefs.value.indexOf(entry.target)
        if (entry.isIntersecting && index !== -1) {
          visibleCards.value[index] = true
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.2 }
  )

  projectRefs.value.forEach((el) => {
    if (el) observer.observe(el)
  })
}

// Watch for changes in projects and set up observer
watch(() => projects.value, () => {
  nextTick(() => {
    setupObserver()
  })
}, { deep: true })

// Initial fetch
onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.project-card {
  background-color: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem;
  color: #1b1740;
  text-align: left;
  max-width: 90vw;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, background-color, opacity;
}

.project-card:hover {
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 10px 30px -10px rgba(27, 23, 64, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.project-link {
  font-weight: 600;
  color: #1b1740;
  border-bottom: 2px solid #53A275;
  text-decoration: none;
  transition: color 0.3s ease, border-color 0.3s ease;
}

.project-link:hover {
  color: #53A275;
  border-color: #1b1740;
}
</style>
