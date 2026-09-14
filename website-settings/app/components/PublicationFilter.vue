<script setup lang="ts">
defineProps<{
  /** Years available for filtering. Order is preserved as provided. */
  years: readonly number[]
  /** Topic labels available for filtering. Order is preserved as provided. */
  tags: readonly string[]
}>()

const selectedYear = defineModel<number | null>('year', { default: null })
const selectedTag = defineModel<string | null>('tag', { default: null })
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 mb-8">
    <!-- Year filter -->
    <div class="flex flex-wrap gap-2">
      <button
        class="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
        :class="[
          selectedYear === null
            ? 'bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)]'
            : 'border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:border-[var(--color-gold-500)]/50 hover:text-[var(--ui-text-highlighted)]'
        ]"
        @click="selectedYear = null"
      >
        All Years
      </button>
      <button
        v-for="year in years"
        :key="year"
        class="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
        :class="[
          selectedYear === year
            ? 'bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)]'
            : 'border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:border-[var(--color-gold-500)]/50 hover:text-[var(--ui-text-highlighted)]'
        ]"
        @click="selectedYear = year"
      >
        {{ year }}
      </button>
    </div>

    <!-- Tag filter -->
    <div class="flex flex-wrap gap-2">
      <button
        class="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
        :class="[
          selectedTag === null
            ? 'bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)]'
            : 'border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:border-[var(--color-gold-500)]/50 hover:text-[var(--ui-text-highlighted)]'
        ]"
        @click="selectedTag = null"
      >
        All Topics
      </button>
      <button
        v-for="tag in tags"
        :key="tag"
        class="text-xs px-3 py-1.5 rounded-full border transition-colors duration-200"
        :class="[
          selectedTag === tag
            ? 'bg-[var(--color-gold-500)] text-white border-[var(--color-gold-500)]'
            : 'border-[var(--ui-border)] text-[var(--ui-text-muted)] hover:border-[var(--color-gold-500)]/50 hover:text-[var(--ui-text-highlighted)]'
        ]"
        @click="selectedTag = tag"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>
