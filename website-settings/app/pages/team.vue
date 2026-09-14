<script setup lang="ts">
useSeoMeta({
  title: 'Our Team',
  description: 'Meet the researchers, engineers, and scientists of the Micro-Nano Devices and metamaterial engineering Lab at UCLA, working at the frontier of space photonics, nanophotonics, and active materials.',
  ogTitle: 'Team | Micro-Nano Devices and metamaterial engineering Lab @ UCLA',
  ogDescription: 'Researchers and scientists at the frontier of space photonics.',
})

// All text/images below come from content/team/ — see README.md.
const { data: intro } = await useAsyncData('team-intro', () =>
  queryCollection('teamIntro').first(),
)
const { data: members } = await useAsyncData('team', () =>
  queryCollection('team')
    .order('order', 'ASC')
    .all(),
)
const { data: groupPhotosDoc } = await useAsyncData('team-group-photos', () =>
  queryCollection('teamGroupPhotos').first(),
)
const groupPhotos = computed(() => groupPhotosDoc.value?.items ?? [])

const pi = computed(() => members.value?.find(m => m.role === 'Principal Investigator'))
const current = computed(() =>
  members.value?.filter(
    m => m.role !== 'Principal Investigator' && m.role !== 'Alumni',
  ) ?? [],
)
const alumni = computed(() =>
  members.value?.filter(m => m.role === 'Alumni') ?? [],
)

const { target: heroRef } = useScrollReveal()
const { target: gridRef } = useScrollReveal()
const { target: alumniRef } = useScrollReveal()
const { target: photosRef } = useScrollReveal()
</script>

<template>
  <div>
    <!-- Hero banner -->
    <section
      v-if="intro"
      ref="heroRef"
      class="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--ui-bg-elevated)]"
    >
      <div class="max-w-7xl mx-auto">
        <h1 class="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl lg:text-6xl mb-4">
          {{ intro.title }}
        </h1>
        <p class="text-lg text-[var(--ui-text-muted)] max-w-xl">
          {{ intro.subtitle }}
        </p>
      </div>
    </section>

    <!-- PI section + current members -->
    <section ref="gridRef" class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <TeamCard
        v-if="pi"
        :member="pi"
        :is-pi="true"
        class="mb-12"
      />

      <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ui-text-muted)] mb-6">
        Current Team
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <TeamCard
          v-for="member in current"
          :key="member.name"
          :member="member"
        />
      </div>
    </section>

    <!-- Alumni -->
    <section
      v-if="alumni.length"
      ref="alumniRef"
      class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--ui-border)]"
    >
      <h2 class="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--ui-text-muted)] mb-6">
        Alumni
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <TeamCard
          v-for="member in alumni"
          :key="member.name"
          :member="member"
        />
      </div>
    </section>

    <!-- Group photos: bento gallery with the first photo featured -->
    <section
      v-if="groupPhotos?.length"
      ref="photosRef"
      class="py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--ui-border)]"
    >
      <div class="max-w-7xl mx-auto">
        <h2 class="font-[family-name:var(--font-display)] font-semibold text-2xl sm:text-3xl mb-2">
          Life in the lab
        </h2>
        <p class="text-[var(--ui-text-muted)] mb-10 max-w-xl">
          Conferences, group outings, and time spent together outside the lab.
        </p>

        <!--
          12-col grid, 3 rows of 220px.
          Photo 1: 7 cols × 2 rows (large, top-left)
          Photos 2 + 3: 5 cols × 1 row each (right column, rows 1 & 2)
          Photos 4 + 5: 6 cols × 1 row each (bottom row, full width split)
        -->
        <div class="grid grid-cols-12 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[240px]">
          <!-- Featured (large) -->
          <figure class="col-span-12 md:col-span-7 md:row-span-2 group relative overflow-hidden rounded-xl bg-black">
            <NuxtImg
              :src="groupPhotos[0]!.src"
              :alt="groupPhotos[0]!.alt"
              width="1400"
              height="900"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <figcaption class="absolute bottom-0 inset-x-0 p-4 text-sm text-white bg-gradient-to-t from-black/85 to-transparent">
              {{ groupPhotos[0]!.caption }}
            </figcaption>
          </figure>

          <!-- Right column (top + middle) -->
          <figure
            v-for="photo in groupPhotos.slice(1, 3)"
            :key="photo.src"
            class="col-span-6 md:col-span-5 group relative overflow-hidden rounded-xl bg-black"
          >
            <NuxtImg
              :src="photo.src"
              :alt="photo.alt"
              width="800"
              height="600"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <figcaption class="absolute bottom-0 inset-x-0 p-3 text-xs text-white bg-gradient-to-t from-black/80 to-transparent">
              {{ photo.caption }}
            </figcaption>
          </figure>

          <!-- Bottom row -->
          <figure
            v-for="photo in groupPhotos.slice(3)"
            :key="photo.src"
            class="col-span-6 md:col-span-6 group relative overflow-hidden rounded-xl bg-black"
          >
            <NuxtImg
              :src="photo.src"
              :alt="photo.alt"
              width="800"
              height="600"
              loading="lazy"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <figcaption class="absolute bottom-0 inset-x-0 p-3 text-xs text-white bg-gradient-to-t from-black/80 to-transparent">
              {{ photo.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>
