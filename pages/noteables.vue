<template>
  <div class="noteables-page">
    <!-- Header -->
    <div class="header-section">
      <BlurText
        text="Noteables"
        :delay="200"
        class-name="page-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white"
        animate-by="words"
        direction="top"
        :threshold="0.1"
        root-margin="0px"
        :step-duration="0.4"
      />
      <p class="subtitle">Words that resonate</p>
    </div>

    <!-- Main Layout -->
    <div class="main-layout">
      <!-- Filter Sidebar (Left) -->
      <aside class="filter-sidebar">
        <div class="filter-header">Filter</div>
        <ul class="filter-list">
          <li
            v-for="category in categories"
            :key="category.id"
          >
            <button
              :class="['filter-item', { active: activeFilter === category.id }]"
              @click="activeFilter = category.id"
            >
              {{ category.name }}
              <span class="count">{{ getCategoryCount(category.id) }}</span>
            </button>
          </li>
        </ul>
      </aside>
      <!-- Quotes List (Center) -->
      <div class="quotes-section">
        <TransitionGroup name="quote-fade" tag="ul" class="quotes-list">
          <li
            v-for="quote in filteredQuotes"
            :key="quote.id"
            :class="['quote-item', `media-${quote.type}`]"
          >
            <div class="quote-content">
              <blockquote class="quote-text">"{{ quote.text }}"</blockquote>
              <div class="quote-attribution">
                <span class="author">— {{ quote.author }}</span>
                <span v-if="quote.source" class="source">, {{ quote.source }}</span>
                <span class="media-type">[{{ quote.type }}]</span>
              </div>
            </div>
          </li>
        </TransitionGroup>

        <!-- Empty State -->
        <div v-if="filteredQuotes.length === 0" class="empty-state">
          <p>No quotes in this category yet.</p>
        </div>
      </div>
      <!-- Spacer (Right) - balances the filter sidebar -->
      <div class="layout-spacer"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BlurText from '@/components/BlurText.vue'

const activeFilter = ref('all')

const categories = [
  { id: 'all', name: 'All' },
  { id: 'book', name: 'Books' },
  { id: 'article', name: 'Articles' },
  { id: 'music', name: 'Music' },
  { id: 'film', name: 'Film & TV' },
  { id: 'other', name: 'Other' },
]

const quotes = ref([
  {
    id: 1,
    text: "Men are disturbed not by things, but by the view which they take of them.",
    author: "Epictetus",
    source: "The Enchiridion",
    type: "book",
  },
  {
    id: 2,
    text: "If there is any principle of the Constitution that more imperatively calls for attachment than any other it is the principle of free thought, not free thought for those who agree with us but freedom for the thought that we hate.",
    author: "Oliver Wendell Holmes, Jr.",
    source: "A dissenting opinion in United States v. Schwimmer (1929)",
    type: "other",
  },
  {
    id: 3,
    text: "A man cannot directly choose his circumstances, but he can choose his thoughts, and so indirectly, yet surely, shape his circumstances",
    author: "James Allen",
    source: "As a Man Thinketh",
    type: "book",
  },
  {
    id: 4,
    text: "You never know just how you look through other people's eyes",
    author: "Butthole Surfers",
    source: "Pepper",
    type: "music",
  },
  {
    id: 5,
    text: "Three words, large enough to tip the world. I remember you.",
    author: "V.E. Schwab",
    source: "The Invisible Life of Addie LaRue",
    type: "book",
  },
  {
    id: 6,
    text: "You have to know what you stand for, not just what you stand against.",
    author: "Laurie Halse Anderson",
    source: "Speak",
    type: "book",
  },
])

const filteredQuotes = computed(() => {
  if (activeFilter.value === 'all') {
    return quotes.value
  }
  return quotes.value.filter(quote => quote.type === activeFilter.value)
})

const getCategoryCount = (categoryId) => {
  if (categoryId === 'all') {
    return quotes.value.length
  }
  return quotes.value.filter(quote => quote.type === categoryId).length
}
</script>

<style scoped>
.noteables-page {
  width: 100%;
  min-height: 100%;
  padding: 2rem 1.5rem 4rem;
  overflow-y: auto;
}

/* Header Section */
.header-section {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.page-title {
  font-family: 'ttnp-round', sans-serif !important;
  line-height: 1.2;
  text-align: center !important;
  width: 100%;
}

/* Center the inner flex container of BlurText */
.header-section :deep(.blur-text) {
  justify-content: center;
}

.subtitle {
  color: rgba(240, 231, 213, 0.6);
  font-size: 1.1rem;
  font-style: italic;
  letter-spacing: 0.15em;
  margin-top: 0.5rem;
}

/* Main Layout */
.main-layout {
  display: flex;
  justify-content: center;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* Quotes Section */
.quotes-section {
  flex: 1;
  max-width: 700px;
  background: linear-gradient(145deg, rgba(45, 53, 85, 0.6) 0%, rgba(26, 31, 53, 0.7) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(240, 231, 213, 0.15);
  border-radius: 20px;
  padding: 2rem;
}

.quotes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Quote Item */
.quote-item {
  position: relative;
  padding: 1.25rem 0 1.25rem 1rem;
  border-bottom: 1px solid rgba(240, 231, 213, 0.08);
  transition: all 0.3s ease;
}

.quote-item:first-child {
  padding-top: 0;
}

.quote-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.quote-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: transparent;
  transition: background 0.3s ease;
  border-radius: 1px;
}

.quote-item:hover::before {
  background: rgba(240, 231, 213, 0.4);
}

/* Media type accent colors on hover */
.quote-item.media-book:hover::before {
  background: rgba(139, 180, 140, 0.7);
}

.quote-item.media-article:hover::before {
  background: rgba(135, 206, 235, 0.7);
}

.quote-item.media-music:hover::before {
  background: rgba(221, 160, 221, 0.7);
}

.quote-item.media-film:hover::before {
  background: rgba(255, 182, 108, 0.7);
}

.quote-item.media-other:hover::before {
  background: rgba(240, 231, 213, 0.5);
}

.quote-content {
  padding-left: 0.25rem;
}

/* Quote Text */
.quote-text {
  color: #F0E7D5;
  font-size: 1.15rem;
  line-height: 1.75;
  font-weight: 400;
  margin: 0 0 0.75rem 0;
  font-style: italic;
}

/* Quote Attribution */
.quote-attribution {
  color: rgba(240, 231, 213, 0.6);
  font-size: 0.9rem;
}

.author {
  color: rgba(240, 231, 213, 0.85);
  font-weight: 500;
}

.source {
  font-style: italic;
}

.media-type {
  margin-left: 0.5rem;
  color: rgba(240, 231, 213, 0.4);
  font-size: 0.8rem;
  text-transform: lowercase;
}

/* Layout Spacer - balances the filter sidebar */
.layout-spacer {
  width: 180px;
  flex-shrink: 0;
}

/* Filter Sidebar */
.filter-sidebar {
  width: 180px;
  flex-shrink: 0;
  position: sticky;
  top: 6rem;
  height: fit-content;
}

.filter-header {
  color: rgba(240, 231, 213, 0.5);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(240, 231, 213, 0.1);
}

.filter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.6rem 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: rgba(240, 231, 213, 0.7);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.filter-item:hover {
  background: rgba(240, 231, 213, 0.08);
  color: #F0E7D5;
}

.filter-item.active {
  background: rgba(240, 231, 213, 0.12);
  color: #F0E7D5;
}

.filter-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  width: 2px;
  height: 1rem;
  background: #F0E7D5;
  border-radius: 1px;
}

.count {
  font-size: 0.75rem;
  color: rgba(240, 231, 213, 0.4);
  background: rgba(240, 231, 213, 0.08);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
}

.filter-item.active .count {
  background: rgba(240, 231, 213, 0.15);
  color: rgba(240, 231, 213, 0.6);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(240, 231, 213, 0.5);
  font-style: italic;
}

/* Transitions */
.quote-fade-enter-active,
.quote-fade-leave-active {
  transition: all 0.3s ease;
}

.quote-fade-enter-from,
.quote-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.quote-fade-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 900px) {
  .layout-spacer {
    display: none;
  }
}

@media (max-width: 768px) {
  .noteables-page {
    padding: 1.5rem 1rem 3rem;
  }
  
  .main-layout {
    flex-direction: column;
    gap: 2rem;
  }
  
  .filter-sidebar {
    width: 100%;
    position: static;
    padding: 1rem;
    background: rgba(45, 53, 85, 0.3);
    border-radius: 12px;
    border: 1px solid rgba(240, 231, 213, 0.1);
  }
  
  .filter-header {
    margin-bottom: 0.75rem;
  }
  
  .filter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .filter-item {
    padding: 0.5rem 1rem;
    margin-bottom: 0;
    border-radius: 9999px;
    border: 1px solid rgba(240, 231, 213, 0.15);
  }
  
  .filter-item.active {
    border-color: rgba(240, 231, 213, 0.4);
  }
  
  .quotes-section {
    max-width: 100%;
    padding: 1.5rem;
    border-radius: 16px;
  }
  
  .quote-text {
    font-size: 1.05rem;
  }
  
  .header-section {
    margin-bottom: 2rem;
    padding-top: 1rem;
  }
}
</style>
