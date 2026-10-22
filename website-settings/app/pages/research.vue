<script setup lang="ts">
useSeoMeta({
  title: 'Research',
  description: 'Research at the Micro-Nano Devices and metamaterial engineering Lab at UCLA: solar sails, laser ablation propulsion, kirigami actuators, MEMS micro-mirror arrays, and metamaterials.',
  ogTitle: 'Research | Micro-Nano Devices and metamaterial engineering Lab @ UCLA',
  ogDescription: 'Research themes of the Micro-Nano Devices and metamaterial engineering Lab at UCLA.',
})

// All text/images below come from content/research/ — see README.md.
// Each topic file's `topicId` is used for in-page anchor navigation from the
// home page bento cards (e.g. <NuxtLink to="/research#solar-sails" />), and
// `relatedTag` deep-links into the Publications page filter.
const { data: intro } = await useAsyncData('research-intro', () =>
  queryCollection('researchIntro').first(),
)
const { data: topics } = await useAsyncData('research-topics', () =>
  queryCollection('researchTopics').order('order', 'ASC').all(),
)
</script>

<template>
  <div>
    <!-- Hero banner -->
    <section v-if="intro" class="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--ui-bg-elevated)]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl lg:text-6xl mb-4">
          {{ intro.title }}
        </h1>
        <p class="text-lg text-[var(--ui-text-muted)] max-w-2xl">
          {{ intro.subtitle }}
        </p>
      </div>
    </section>

    <!--
      Topic sections — title spans the full width, then carousel on the left
      and description on the right.
    -->
    <article
      v-for="topic in topics"
      :id="topic.topicId"
      :key="topic.id"
      class="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-7xl mx-auto">
        <!-- Heading row (full width) -->
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-400)] mb-3">
          {{ topic.category }}
        </p>
        <h2 class="font-[family-name:var(--font-display)] font-semibold text-3xl sm:text-4xl mb-8">
          {{ topic.title }}
        </h2>

        <!-- Carousel (left, ~40%) + description (right, ~60%) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div class="lg:col-span-5 order-1">
            <TopicCarousel :images="topic.images" :interval="5000" aspect="aspect-[4/3]" :label="`${topic.title} images`" />
          </div>

          <div class="lg:col-span-7 order-2">
            <div class="space-y-4 text-[var(--ui-text-muted)] leading-relaxed">
              <ContentRenderer :value="topic" />
            </div>

            <!-- Deep-link into the publications page with this topic's
                 filter tag preselected. -->
            <NuxtLink
              :to="{ path: '/publications', query: { tag: topic.relatedTag } }"
              class="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-gold-400)] hover:text-[var(--color-gold-300)] transition-colors"
            >
              View related publications
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
