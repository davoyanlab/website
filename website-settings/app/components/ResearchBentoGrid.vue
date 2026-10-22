<script setup lang="ts">
// Each card now links to its corresponding section on the /research page.
// Cards have a zoom-on-hover effect to make their clickability obvious.
const researchAreas = [
  {
    title: 'Solar Sails',
    description: 'Ultra-thin reflective membranes harnessing momentum from sunlight, with metasurface coatings for distributed attitude control without mechanical systems.',
    image: '/images/research/solar-sails/sail-1.webp',
    href: '/research#solar-sails',
    span: 'large', // 2x2
  },
  {
    title: 'Laser Ablation',
    description: 'Linking nanoscale light-matter interactions to laser-driven propulsion.',
    image: '/images/research/laser-ablation-propulsion/ablation-plumes-1.webp',
    href: '/research#laser-ablation',
    span: 'small',
  },
  {
    title: 'MEMS Mirrors',
    description: '100 µm micromirrors for dynamic control of reflectivity and emissivity.',
    image: '/images/research/mems-micro-mirror-arrays/mems-ucla-1.webp',
    href: '/research#mems-micro-mirrors',
    span: 'small',
  },
  {
    title: 'Kirigami Actuators',
    description: 'Kirigami-inspired thin-film actuators for electrically controlled shape morphing. Low-mass, deployable surfaces for next-generation spacecraft.',
    // Static .webp (not the .gif — gif is reserved for the /research page)
    image: '/images/research/kirigami-actuators/kirigami-1.webp',
    href: '/research#kirigami-actuators',
    span: 'wide', // 2x1
  },
]

const { target: sectionRef } = useScrollReveal()
</script>

<template>
  <section id="research" ref="sectionRef" class="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <h2 class="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold mb-12">
      Research
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[280px]">
      <NuxtLink
        v-for="area in researchAreas"
        :key="area.title"
        :to="area.href"
        class="group relative overflow-hidden rounded-xl bg-black isolate cursor-pointer block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-400)]"
        :class="{
          'md:col-span-2 lg:col-span-2 lg:row-span-2': area.span === 'large',
          'md:col-span-2 lg:col-span-2': area.span === 'wide',
        }"
        :aria-label="`Read more about ${area.title}`"
      >
        <!-- Background image with zoom on hover -->
        <NuxtImg
          :src="area.image"
          :alt="area.title"
          width="1000"
          height="700"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        <!-- Dark overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 group-hover:from-black/75 transition-colors duration-700" />

        <!-- Content -->
        <div class="relative z-10 h-full flex flex-col justify-end p-6">
          <h3
            class="font-[family-name:var(--font-display)] font-semibold text-white mb-2"
            :class="area.span === 'large' ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'"
          >
            {{ area.title }}
          </h3>
          <p
            class="text-sm text-white/90 leading-relaxed"
            :class="area.span === 'large' ? 'max-w-md' : 'max-w-sm'"
          >
            {{ area.description }}
          </p>

          <!-- Subtle "Read more" affordance on hover -->
          <span class="mt-3 text-xs font-medium text-[var(--color-gold-400)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 inline-flex items-center gap-1">
            Read more
            <UIcon name="i-heroicons-arrow-right" class="w-3 h-3" />
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>
