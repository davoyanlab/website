<script setup lang="ts">
useSeoMeta({
  title: 'Contact',
  description: 'Get in touch with the Micro-Nano Devices and metamaterial engineering Lab at UCLA, for research collaborations, media inquiries, or prospective students and postdocs.',
  ogTitle: 'Contact | Micro-Nano Devices and metamaterial engineering Lab @ UCLA',
  ogDescription: 'Contact the Micro-Nano Devices and metamaterial engineering Lab at UCLA Samueli School of Engineering.',
})

// All text/links below come from content/contact/info.md — see README.md.
const { data: info } = await useAsyncData('contact-info', () =>
  queryCollection('contactInfo').first(),
)

const { target: sectionRef } = useScrollReveal()
</script>

<template>
  <div v-if="info">
    <!-- Hero banner -->
    <section class="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-[var(--ui-bg-elevated)]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-[family-name:var(--font-display)] font-bold text-4xl sm:text-5xl lg:text-6xl mb-4">
          {{ info.title }}
        </h1>
        <p class="text-lg text-[var(--ui-text-muted)] max-w-xl">
          {{ info.subtitle }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section ref="sectionRef" class="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Left column: contact info -->
        <div>
          <h2 class="font-[family-name:var(--font-display)] font-semibold text-lg sm:text-xl mb-6">
            Contact Details
          </h2>

          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-[var(--ui-text-muted)] mt-0.5 shrink-0" />
              <address class="not-italic text-[var(--ui-text-muted)] text-sm leading-relaxed">
                <template v-for="(line, i) in info.address" :key="i">
                  {{ line }}<br v-if="i < info.address.length - 1">
                </template>
              </address>
            </div>

            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-[var(--ui-text-muted)] shrink-0" />
              <a
                :href="`mailto:${info.email}`"
                class="text-sm text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors"
              >
                {{ info.email }}
              </a>
            </div>

            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-[var(--ui-text-muted)] shrink-0" />
              <a
                :href="info.scholarUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors inline-flex items-center gap-1"
              >
                Google Scholar Profile
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
              </a>
            </div>

            <div class="flex items-center gap-3">
              <UIcon name="i-heroicons-building-library" class="w-5 h-5 text-[var(--ui-text-muted)] shrink-0" />
              <a
                :href="info.deptUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors inline-flex items-center gap-1"
              >
                {{ info.deptName }}
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
              </a>
            </div>
          </div>

          <!-- Prospective students callout -->
          <div class="p-6 rounded-lg border border-[var(--color-gold-500)]/20 bg-[var(--color-gold-500)]/5">
            <h3 class="font-[family-name:var(--font-display)] text-lg mb-2">
              {{ info.prospectiveStudentsTitle }}
            </h3>
            <div class="text-sm text-[var(--ui-text-muted)] leading-relaxed">
              <ContentRenderer :value="info" />
            </div>
          </div>
        </div>

        <!-- Right column: Google Maps -->
        <div>
          <div class="rounded-lg overflow-hidden aspect-[4/3]">
            <iframe
              title="UCLA Campus Map"
              :src="info.mapEmbedUrl"
              width="100%"
              height="100%"
              style="border: 0"
              allowfullscreen
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full h-full grayscale contrast-90 dark:invert dark:contrast-80 dark:hue-rotate-180"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
