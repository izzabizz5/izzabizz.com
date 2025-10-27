<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? '_blank' : null"
    :rel="href ? 'noopener noreferrer' : null"
    class="relative inline-flex items-center justify-center p-5 rounded-full backdrop-blur-lg border border-white/10 bg-gradient-to-tr from-black/30 to-black/10 shadow-lg 
           hover:shadow-2xl hover:shadow-white/20 hover:scale-110 hover:rotate-3 active:scale-95 active:rotate-0 transition-all duration-300 ease-out cursor-pointer overflow-hidden group"
    v-bind="$attrs"
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
