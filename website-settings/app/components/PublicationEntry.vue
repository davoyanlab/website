<script setup lang="ts">
const props = defineProps<{
  publication: {
    title: string
    authors: string[]
    journal: string
    year: number
    doi?: string
    pdf?: string
    tags: string[]
  }
}>()

/**
 * Each publication row is now a single clickable link.
 * - If the paper has a DOI / explicit URL, we use that.
 * - Otherwise we fall back to a Google Scholar query for the title so the
 *   reader is always able to find the paper.
 */
const href = computed(() => {
  if (props.publication.doi) return props.publication.doi
  const query = encodeURIComponent(props.publication.title)
  return `https://scholar.google.com/scholar?q=${query}`
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="content-auto group block py-5 px-4 -mx-4 rounded-md hover:bg-[var(--ui-bg-elevated)] transition-colors duration-200 border-b border-[var(--ui-border)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-400)]"
    :aria-label="`Open paper: ${publication.title} (opens in new tab)`"
  >
    <div class="flex flex-col sm:flex-row sm:items-start gap-3">
      <!-- Left: year -->
      <div class="sm:w-20 shrink-0">
        <span class="text-sm text-[var(--ui-text-muted)] tabular-nums">
          {{ publication.year }}
        </span>
      </div>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <h3 class="font-[family-name:var(--font-display)] text-lg leading-snug mb-1.5 group-hover:text-[var(--color-gold-400)] transition-colors">
          {{ publication.title }}
        </h3>
        <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed mb-1">
          {{ publication.authors.join(', ') }}
        </p>
        <p class="text-xs text-[var(--ui-text-muted)] italic">
          {{ publication.journal }}
        </p>
      </div>

      <!-- Right: open icon (only a visual affordance — the whole row is clickable) -->
      <div class="flex items-center shrink-0 self-center text-[var(--ui-text-muted)] group-hover:text-[var(--color-gold-400)] transition-colors">
        <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" aria-hidden="true" />
      </div>
    </div>
  </a>
</template>
