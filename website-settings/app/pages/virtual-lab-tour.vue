<script setup lang="ts">
useSeoMeta({
  title: 'Virtual Lab Tour',
  description: 'A photo gallery of experimentation inside the Micro-Nano Devices and metamaterial engineering Lab at UCLA: fabrication, optical setups, and devices under test.',
  ogTitle: 'Virtual Lab Tour | Micro-Nano Devices and metamaterial engineering Lab @ UCLA',
  ogDescription: 'A photo gallery of experimentation inside the Micro-Nano Devices and metamaterial engineering Lab at UCLA.',
})

// All text/images below come from content/virtual-lab-tour/ — see README.md.
const { data: intro } = await useAsyncData('vlt-intro', () =>
  queryCollection('vltIntro').first(),
)
const { data: photosDoc } = await useAsyncData('vlt-photos', () =>
  queryCollection('vltPhotos').first(),
)
const photos = computed(() => photosDoc.value?.items ?? [])

const lightboxOpen = ref(false)
const activeIndex = ref(0)

function openLightbox(i: number) {
  activeIndex.value = i
  lightboxOpen.value = true
}

const { target: heroRef } = useScrollReveal()
const { target: gridRef } = useScrollReveal()
</script>

<template>
  <div>
    <!-- Hero banner -->
    <section v-if="intro" ref="heroRef" class="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-[var(--ui-bg-elevated)]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl lg:text-6xl mb-4">
          {{ intro.title }}
        </h1>
        <p class="text-lg text-[var(--ui-text-muted)] max-w-2xl">
          {{ intro.subtitle }}
        </p>
      </div>
    </section>

    <!-- Gallery grid -->
    <section ref="gridRef" class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          <button
            v-for="(photo, i) in photos"
            :key="i"
            type="button"
            class="group relative aspect-square overflow-hidden rounded-lg border border-[var(--ui-border)] bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-400)]"
            :aria-label="`View full size: ${photo.alt}`"
            @click="openLightbox(i)"
          >
            <NuxtImg
              v-if="photo.src"
              :src="photo.src"
              :alt="photo.alt"
              width="500"
              height="500"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
            <div
              v-else
              class="w-full h-full flex flex-col items-center justify-center gap-2 border border-dashed border-[var(--ui-border)] bg-[var(--ui-bg-elevated)] text-[var(--ui-text-dimmed)] px-2 text-center"
            >
              <UIcon name="i-heroicons-photo" class="w-8 h-8" />
              <span class="text-xs leading-snug">{{ photo.caption }}</span>
            </div>
            <div
              class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center"
            >
              <UIcon
                name="i-heroicons-magnifying-glass-plus"
                class="w-7 h-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              />
            </div>
          </button>
        </div>
      </div>
    </section>

    <ImageLightbox
      v-model:open="lightboxOpen"
      v-model:index="activeIndex"
      :images="photos ?? []"
    />
  </div>
</template>
