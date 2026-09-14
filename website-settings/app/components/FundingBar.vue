<script setup lang="ts">
// Sponsor logos live in content/homepage/funding.yml — see README.md.
const { data: fundingDoc } = await useAsyncData('homepage-funding', () =>
  queryCollection('homepageFunding').first(),
)
const logos = computed(() => fundingDoc.value?.items ?? [])

const { target: sectionRef } = useScrollReveal()
</script>

<template>
  <section ref="sectionRef" class="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--ui-bg-elevated)]">
    <div class="max-w-5xl mx-auto text-center">
      <p class="text-xs uppercase tracking-[0.2em] text-[var(--ui-text-muted)] mb-10">
        Supported By
      </p>
      <div class="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        <div
          v-for="logo in logos"
          :key="logo.alt"
          class="flex items-center justify-center"
          :style="{ height: `${logo.maxHeight}px` }"
        >
          <NuxtImg
            :src="logo.src"
            :alt="logo.alt"
            :height="logo.maxHeight"
            loading="lazy"
            class="object-contain w-auto"
            :style="{ maxHeight: `${logo.maxHeight}px` }"
          />
        </div>
      </div>
    </div>
  </section>
</template>
