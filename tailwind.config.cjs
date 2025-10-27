/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#41658A',    // Lapis Lazuli
        secondary: '#F4E285',  // Flax
        accent: '#FFB997',     // Peach
        'accent-dark': '#F67E7D', // Light Coral
        'text-primary': '#4C3957', // English Violet
        'text-secondary': '#414073', // Delft Blue
        'bg-primary': '#70A37F', // Cambridge Blue
      },
    },
  },
  plugins: [],
}
