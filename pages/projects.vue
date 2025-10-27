<template>
  <div class="relative w-full min-h-screen overflow-visible">
    <div class="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-24">
    <!-- Foreground Content -->

      <!-- Title -->
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

      <!-- Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl w-full translate-y-5">
        <div
          v-for="(project, index) in projects"
          :key="index"
          ref="projectRefs"
          class="project-card opacity-0 transition-all duration-700 ease-out mx-auto w-full max-w-[20rem] sm:max-w-none"
          :class="{'opacity-100 translate-y-0': visibleCards[index]}"
        >
          <h2 class="text-lg font-mono sm:text-xl font-semibold mb-2">{{ project.title }}</h2>
          <p class="text-sm font-mono sm:text-base leading-relaxed mb-4">
            {{ project.description }}
          </p>
          <RouterLink to="#" class="project-link">Learn More...</RouterLink>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlurText from '@/components/BlurText.vue'

const projects = [
  {
    title: 'Intro GBM CTFs',
    description:
      "Made CTFs for CCSO's Intro General Body Meeting. CTFs covered basic Reverse Engineering concepts!"
  },
  {
    title: 'OSINT Profiles for ARG',
    description:
      'Created fake social media profiles for an ARG called The Conspiracy to generate engagement and immersion.'
  },
  {
    title: 'Arduino Rubber Ducky',
    description:
      'Used Arduino to create a low-cost Rubber Ducky for education. Programmed it to change wallpapers and open websites.'
  }
]

const visibleCards = ref(projects.map(() => false))
const projectRefs = ref([])

onMounted(() => {
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

  projectRefs.value.forEach((el) => observer.observe(el))
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
  transition-property: transform, opacity, background-color;
  max-width: 90vw;
  .project-card {
  transition: transform 0.3s ease, background-color 0.3s ease, opacity 0.7s ease;
}

}

.project-card:hover {
  transform: translateY(-5px);
  background-color: rgba(255, 255, 255, 0.3);
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
