<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? '_blank' : null"
    :rel="href ? 'noopener noreferrer' : null"
    class="button-fixed"
  >
    <!-- Animated overlay -->
    <span
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"
    ></span>

    <!-- Button content -->
    <span class="relative z-20 flex items-center justify-center">
      <slot />
    </span>
  </component>
</template>

<script setup>
defineProps({
  href: String
});
</script>

<style scoped>
.button-fixed {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  border-radius: 9999px;
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(to top right, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
}

.button-fixed:hover {
  box-shadow: 0 25px 50px -12px rgba(255, 255, 255, 0.2);
  transform: scale(1.1) rotate(3deg);
}

.button-fixed:active {
  transform: scale(0.95) rotate(0deg);
}
</style>
