<template>
  <div class="relative w-full min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-4xl">
      <!-- Back Button -->
      <NuxtLink 
        to="/projects"
        class="inline-flex items-center mb-8 text-[#1b1740] hover:text-[#53A275] transition-colors duration-200"
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
          <button 
            @click="fetchProject" 
            class="px-4 py-2 bg-[#53A275] text-white rounded-lg hover:bg-[#1b1740] transition-colors duration-200"
          >
            Try Again
          </button>
        </div>

        <!-- Project Content -->
        <div v-else-if="project" class="prose prose-lg max-w-none">
          <h1 class="text-4xl font-bold text-[#1b1740] mb-4">{{ project.title }}</h1>
          <div class="mb-8 text-gray-600">
            {{ new Date(project.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }) }}
          </div>
          <div 
            class="project-content"
            v-html="renderedContent"
          ></div>
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
import { ref, onMounted } from 'vue'
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
  return marked(project.value.content)
})

// Fetch project data
const fetchProject = async () => {
  isLoading.value = true
  error.value = null
  try {
    const response = await fetch('/api/projects/12c429af-3582-41a8-94a5-c118713d8cc5/content')
    if (!response.ok) throw new Error('Failed to fetch project data')
    
    const data = await response.json()
    const foundProject = data.find(p => p.slug === route.params.slug)
    
    if (foundProject) {
      project.value = foundProject
    } else {
      throw new Error('Project not found')
    }
  } catch (err) {
    console.error('Error fetching project:', err)
    error.value = err.message
    project.value = null
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  // Check if we have a valid slug before fetching
  if (!route.params.slug || typeof route.params.slug !== 'string' || route.params.slug === 'index') {
    navigateTo('/projects')
    return
  }
  fetchProject()
})

// Watch for route changes to refetch data
watch(() => route.params.slug, (newSlug) => {
  if (newSlug) {
    fetchProject()
  }
})
</script>

<style>
.prose {
  color: #1b1740;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  color: #1b1740;
  font-weight: bold;
}

.prose a {
  color: #53A275;
  transition: color 0.2s ease;
}

.prose a:hover {
  color: #1b1740;
}

.prose pre {
  background-color: rgb(249 250 251);
  border: 1px solid rgb(229 231 235);
  border-radius: 0.5rem;
  padding: 1rem;
}

.prose code {
  color: #1b1740;
  background-color: rgb(249 250 251);
  padding: 0.25rem;
  border-radius: 0.25rem;
}

.prose pre code {
  background-color: transparent;
  padding: 0;
}

/* Add smooth fade-in animation for content */
.project-content {
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

/* Additional styles for markdown content */
.prose {
  max-width: 65ch;
  line-height: 1.75;
}

.prose p {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}

.prose img {
  margin-top: 2em;
  margin-bottom: 2em;
  border-radius: 0.5rem;
}

.prose ul {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
  list-style-type: disc;
}

.prose ol {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
  list-style-type: decimal;
}

.prose blockquote {
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-left: 1em;
  border-left: 4px solid #53A275;
  font-style: italic;
}
</style>