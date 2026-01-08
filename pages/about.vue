<template>
  <div class="relative w-full min-h-screen overflow-y-auto">
    <div class="flex flex-col items-center px-4 sm:px-6 md:px-8 py-24">
      <!-- Grid Wrapper -->
      <div class="about-grid max-w-5xl w-full">

        <!-- Top -->
        <div class="about-card card-top">
          <h2 class="text-lg sm:text-xl font-semibold mb-2">Cyber Interests</h2>
          <p>Interested in Reverse Engineering, SDR Tech, CTF Development, and Defense work.</p>
        </div>

        <!-- Left -->
        <div class="about-card card-left">
          <h2 class="text-lg sm:text-xl font-semibold mb-2">President @ CCSO</h2>
          <p>I lead a team of students through competitions, workshops, and cybersecurity events.</p>
          <a href="https://psuccso.org" target="_blank" rel="noopener noreferrer" class="project-link">Learn more!</a>
        </div>

        <!-- Center -->
        <div class="about-center">
          <BlurText
            text="About Me"
            :delay="200"
            class-name="hero-header text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white"
            animate-by="words"
            direction="top"
            :threshold="0.1"
            root-margin="0px"
            :step-duration="0.4"
          />
        </div>

        <!-- Upper Right -->
        <div class="about-card card-right-top">
          <h2 class="text-lg sm:text-xl font-semibold mb-2">Cyber Associate @ Succession Systems</h2>
          <p>Implementing <strong>ISO27001</strong>, analyzing vulnerabilities, and writing executive reports.</p>
        </div>

        <!-- Lower Right -->
        <div class="about-card card-right-bottom">
          <h2 class="text-lg sm:text-xl font-semibold mb-2">Web Researcher @ HAX</h2>
          <p>Created a Use-Case Dashboard to showcase the applications of HAX technology across projects.</p>
        </div>

        <!-- Bottom -->
        <div class="about-card card-bottom">
          <h2 class="text-lg sm:text-xl font-semibold mb-2">Hobbies</h2>
          <p>I host a radio show on <strong>The LION 90.7FM</strong> and enjoy longboarding around campus.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-areas:
    "top top right-top"
    "left center right-bottom"
    ". bottom bottom";
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 1rem;
  place-items: center;
}

/* Assign each area */
.card-top { grid-area: top; }
.card-left { grid-area: left; }
.card-right-top { grid-area: right-top; }
.card-right-bottom { grid-area: right-bottom; }
.card-bottom { grid-area: bottom; }
.about-center { grid-area: center; display: flex; justify-content: center; align-items: center; }

/* Card styling */
.about-card {
  background-color: rgba(45, 53, 85, 0.4);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(240, 231, 213, 0.2);
  border-radius: 20px;
  padding: 1rem;
  color: #F0E7D5;
  text-align: left;
  transition: transform 0.3s ease, background-color 0.3s ease;
  font-size: 0.9rem;
}

.about-card:hover {
  transform: translateY(-5px);
  background-color: rgba(61, 74, 112, 0.5);
  box-shadow: 0 10px 30px -10px rgba(240, 231, 213, 0.3);
  border-color: rgba(240, 231, 213, 0.4);
  transition-duration: 700ms;
}

.project-link {
  font-weight: 600;
  color: #87ceeb;
  border-bottom: 2px solid #add8e6;
  text-decoration: none;
}

.project-link:hover {
  color: #ffffff;
  border-color: #87ceeb;
}

/* Mobile stacking */
@media (max-width: 768px) {
  .about-grid {
    grid-template-areas:
      "center"
      "top"
      "left"
      "right-top"
      "right-bottom"
      "bottom";
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .about-center {
    margin-bottom: 0.5rem;
  }
}
</style>
