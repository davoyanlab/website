<script setup lang="ts">
// The homepage title IS the lab name; the titleTemplate in app.vue leaves it
// as-is instead of appending the lab name a second time.
useSeoMeta({
  title: 'Micro-Nano Devices and metamaterial engineering Lab',
  description: 'Micro-Nano Devices and metamaterial engineering Lab at UCLA. Engineering light-driven spacecraft technologies, from nanoscale metamaterial sails to laser propulsion systems, for fast-transit solar system exploration and interstellar missions.',
  ogTitle: 'Micro-Nano Devices and metamaterial engineering Lab | UCLA',
  ogDescription: 'Engineering light-driven spacecraft technologies at UCLA Samueli School of Engineering.',
  ogType: 'website',
})

// All editable text/images below come from content/homepage/ — see README.md.
const { data: hero } = await useAsyncData('homepage-hero', () =>
  queryCollection('homepageHero').first(),
)
const { data: heroCarouselDoc } = await useAsyncData('homepage-hero-carousel', () =>
  queryCollection('homepageHeroCarousel').first(),
)
const heroCarousel = computed(() => heroCarouselDoc.value?.items ?? [])
const { data: piHighlight } = await useAsyncData('homepage-pi-highlight', () =>
  queryCollection('homepagePi').first(),
)

// PI lookup — order 0 is the convention we use to flag the Principal Investigator
// in content/team/members/*.md
const { data: pi } = await useAsyncData('pi', () =>
  queryCollection('team').where('order', '=', 0).first(),
)

// 3 most recent featured papers, shown in the "Recent Work" section
const { data: publicationsDoc } = await useAsyncData('publications-home', () =>
  queryCollection('publications').first(),
)
const recentPublications = computed(() =>
  [...(publicationsDoc.value?.items ?? [])]
    .filter(p => p.featured)
    .sort((a, b) => b.year - a.year)
    .slice(0, 3),
)

const { target: heroRef } = useScrollReveal()
const { target: piRef } = useScrollReveal()
const { target: pubsRef } = useScrollReveal()
</script>

<template>
  <div>
    <!-- HERO SECTION -->
    <section ref="heroRef" class="relative min-h-screen flex items-center overflow-hidden">
      <StarfieldCanvas />

      <div v-if="hero" class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <!-- Left: text content (~55%) -->
          <div class="lg:col-span-7">
            <h1 class="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
              {{ hero.title }}
            </h1>

            <p class="text-base sm:text-lg text-[var(--ui-text-muted)] leading-relaxed mb-8 max-w-xl">
              {{ hero.subtitle }}
            </p>

            <div class="flex flex-wrap gap-3 mb-2">
              <UButton
                :to="hero.primaryButtonLink"
                size="lg"
                color="primary"
                :label="hero.primaryButtonLabel"
              />
              <UButton
                :to="hero.secondaryButtonLink"
                size="lg"
                variant="outline"
                :label="hero.secondaryButtonLabel"
              />
            </div>
          </div>

          <!-- Right: auto-rotating carousel of lab research previews (~45%).
               Border uses the elevated grey-blue surface so it visually
               matches the Partners / "Supported By" section bg below. -->
          <div class="lg:col-span-5 hidden lg:block">
            <div class="rounded-xl overflow-hidden border-2 border-[var(--ui-bg-elevated)] shadow-2xl">
              <TopicCarousel
                :images="heroCarousel ?? []"
                :interval="5000"
                aspect="aspect-[4/3]"
                :rounded="false"
                label="Research highlights"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator. Bounces 3 times (3 s) then stops: WCAG 2.2.2
           requires motion that lasts longer than 5 s to be pausable. -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce [animation-iteration-count:3]" aria-hidden="true">
        <UIcon name="i-heroicons-chevron-down" class="w-5 h-5 text-[var(--ui-text-muted)]" />
      </div>
    </section>

    <!-- Section transition: shooting star -->
    <ShootingStarDivider />

    <!-- RESEARCH PILLARS -->
    <ResearchBentoGrid />

    <!-- Section transition: shooting star -->
    <ShootingStarDivider />

    <!-- PI HIGHLIGHT -->
    <section ref="piRef" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div v-if="pi && piHighlight" class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <NuxtImg
          :src="pi.photo"
          :alt="`Prof. ${pi.name}`"
          width="500"
          height="500"
          class="rounded-lg object-cover aspect-square w-full max-w-md"
          loading="lazy"
        />

        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-400)] mb-2">
            {{ piHighlight.badge }}
          </p>
          <h2 class="font-[family-name:var(--font-display)] font-semibold text-xl sm:text-2xl mb-4">
            Prof. {{ pi.name }}
          </h2>
          <div class="text-[var(--ui-text-muted)] leading-relaxed mb-6">
            <ContentRenderer :value="piHighlight" />
          </div>

          <!-- Stat pills -->
          <div class="flex flex-wrap gap-3 mb-6">
            <span
              v-for="stat in piHighlight.stats"
              :key="stat"
              class="text-xs px-3 py-1.5 rounded-full border border-[var(--color-gold-500)]/30 text-[var(--color-gold-400)]"
            >
              {{ stat }}
            </span>
          </div>

          <a
            v-if="pi.scholar"
            :href="pi.scholar"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-sm text-[var(--color-gold-400)] hover:text-[var(--color-gold-300)] transition-colors"
          >
            View Publications on Google Scholar
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4" aria-hidden="true" />
            <span class="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Section transition: shooting star -->
    <ShootingStarDivider />

    <!-- LATEST PUBLICATIONS -->
    <section ref="pubsRef" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 class="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold mb-12">
        Recent Work
      </h2>

      <div v-if="recentPublications.length" class="space-y-0">
        <PublicationEntry
          v-for="pub in recentPublications"
          :key="pub.title"
          :publication="pub"
        />
      </div>

      <div class="mt-8">
        <NuxtLink
          to="/publications"
          class="inline-flex items-center gap-1.5 text-sm text-[var(--color-gold-400)] hover:text-[var(--color-gold-300)] transition-colors"
        >
          View All Publications
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </section>

    <!-- PARTNERS & FUNDING -->
    <FundingBar />
  </div>
</template>
