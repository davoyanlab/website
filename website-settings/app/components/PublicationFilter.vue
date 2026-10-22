<script setup lang="ts">
defineProps<{
  /** Years available for filtering. Order is preserved as provided. */
  years: readonly number[]
  /** Topic labels available for filtering. Order is preserved as provided. */
  tags: readonly string[]
}>()

const selectedYear = defineModel<number | null>('year', { default: null })
const selectedTag = defineModel<string | null>('tag', { default: null })

// Shared chip styles. The selected chip is also exposed to screen readers via
// aria-pressed — color alone isn't enough (WCAG 1.3.1 / 4.1.2).
const chipBase = 'text-xs px-3 py-1.5 rounded-full border transition-colors duration-200'
const chipOn = 'bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)]'
const chipOff = 'border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:border-[var(--color-gold-500)]/50 hover:text-[var(--ui-text-highlighted)]'
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-8">
    <!-- Year filter -->
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by year">
      <button
        type="button"
        :class="[chipBase, selectedYear === null ? chipOn : chipOff]"
        :aria-pressed="selectedYear === null"
        @click="selectedYear = null"
      >
        All Years
      </button>
      <button
        v-for="year in years"
        :key="year"
        type="button"
        :class="[chipBase, selectedYear === year ? chipOn : chipOff]"
        :aria-pressed="selectedYear === year"
        @click="selectedYear = year"
      >
        {{ year }}
      </button>
    </div>

    <!-- Tag filter -->
    <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
      <button
        type="button"
        :class="[chipBase, selectedTag === null ? chipOn : chipOff]"
        :aria-pressed="selectedTag === null"
        @click="selectedTag = null"
      >
        All Topics
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        :class="[chipBase, selectedTag === tag ? chipOn : chipOff]"
        :aria-pressed="selectedTag === tag"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>
