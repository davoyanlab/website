<script setup lang="ts">
import { FILTER_CATEGORIES } from '~/utils/publications'

useSeoMeta({
  title: 'Publications',
  description: 'Peer-reviewed research from the Micro-Nano Devices and metamaterial engineering Lab at UCLA in photonics, aerospace engineering, nanomaterials, and light-driven propulsion.',
  ogTitle: 'Publications | Micro-Nano Devices and metamaterial engineering Lab @ UCLA',
  ogDescription: 'Peer-reviewed research in photonics, aerospace, and nanotechnology.',
})

// Publication list lives in content/publications/publications.yml — see README.md.
const { data: publicationsDoc } = await useAsyncData('publications', () =>
  queryCollection('publications').first(),
)

// Sort once (newest first). The content file is the source of truth — we
// never mutate the fetched data in place.
const sortedPublications = computed(() =>
  [...(publicationsDoc.value?.items ?? [])].sort((a, b) => b.year - a.year),
)

// All years present in the data set, descending — drives the year filter row.
const availableYears = computed(() =>
  [...new Set(sortedPublications.value.map(p => p.year))].sort((a, b) => b - a),
)

// Topic filter chips are restricted to the canonical 5 categories defined
// alongside the data. Anything else stays untouched on the publication entry.
const availableTags: readonly string[] = FILTER_CATEGORIES

// Deep-link support: /publications?tag=Solar+Sails preselects that chip.
// Bad / unknown values are silently ignored so a stale URL doesn't render
// an empty list.
const route = useRoute()
const queryTag = (route.query.tag as string | undefined)?.trim()
const initialTag = queryTag && availableTags.includes(queryTag) ? queryTag : null

const selectedYear = ref<number | null>(null)
const selectedTag = ref<string | null>(initialTag)

const filteredPublications = computed(() =>
  sortedPublications.value.filter((pub) => {
    if (selectedYear.value && pub.year !== selectedYear.value) return false
    if (selectedTag.value && !pub.tags.includes(selectedTag.value)) return false
    return true
  }),
)

const { target: heroRef } = useScrollReveal()
</script>

<template>
  <div>
    <!-- Hero banner -->
    <section
      ref="heroRef"
      class="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--ui-bg-elevated)]"
    >
      <div class="max-w-7xl mx-auto">
        <h1 class="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl lg:text-6xl mb-4">
          Publications
        </h1>
        <p class="text-lg text-[var(--ui-text-muted)] max-w-xl">
          Peer-reviewed research in photonics, aerospace engineering, and nanotechnology.
          Sourced from the group's
          <a
            href="https://scholar.google.com/citations?user=1aLnrhwAAAAJ&sortby=pubdate"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[var(--color-gold-400)] underline underline-offset-2 hover:text-[var(--color-gold-300)]"
          >
            Google Scholar profile<span class="sr-only"> (opens in new tab)</span>
          </a>.
        </p>
      </div>
    </section>

    <!-- Filters + list -->
    <section class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <PublicationFilter
        v-model:year="selectedYear"
        v-model:tag="selectedTag"
        :years="availableYears"
        :tags="availableTags"
      />

      <h2 class="sr-only">
        Publication list
      </h2>

      <div v-if="filteredPublications.length" class="space-y-0">
        <PublicationEntry
          v-for="pub in filteredPublications"
          :key="pub.title"
          :publication="pub"
        />
      </div>

      <div v-else class="py-12 text-center text-[var(--ui-text-muted)]">
        No publications match the selected filters.
      </div>

      <!-- role="status" makes screen readers announce the new count whenever
           a filter changes the list (WCAG 4.1.3 Status Messages). -->
      <p class="mt-8 text-sm text-[var(--ui-text-muted)]" role="status">
        {{ filteredPublications.length }} publication{{ filteredPublications.length !== 1 ? 's' : '' }}
        <span v-if="selectedYear || selectedTag"> (filtered)</span>
      </p>
    </section>
  </div>
</template>
