<script setup lang="ts">
const currentYear = new Date().getFullYear()

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Publications', to: '/publications' },
  { label: 'Team', to: '/team' },
  { label: 'Virtual Lab Tour', to: '/virtual-lab-tour' },
  { label: 'Contact', to: '/contact' },
]

</script>

<template>
  <footer class="border-t border-[var(--color-gold-500)]/20 bg-[var(--ui-bg)]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr] gap-12">
        <!-- Col 1: Logo + tagline -->
        <div>
          <SvgLogo />
          <p class="mt-4 text-sm text-[var(--ui-text-muted)] max-w-xs leading-relaxed">
            Advancing humanity's reach into deep space through light-driven spacecraft technologies.
          </p>
        </div>

        <!-- Col 2: Quick links + Scholar -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-muted)] mb-4">
            Navigation
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="text-sm text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
            <li>
              <a
                href="https://scholar.google.com/citations?user=1aLnrhwAAAAJ&sortby=pubdate"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors inline-flex items-center gap-1"
              >
                Google Scholar
                <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-3 h-3" />
              </a>
            </li>
          </ul>
        </div>

        <!-- Col 3: Contact + funding -->
        <div>
          <h3 class="text-xs font-semibold uppercase tracking-wider text-[var(--ui-text-muted)] mb-4">
            Contact
          </h3>
          <address class="not-italic text-sm text-[var(--ui-text-muted)] space-y-1">
            <p>UCLA Samueli School of Engineering</p>
            <p>Mechanical &amp; Aerospace Engineering</p>
            <p>420 Westwood Plaza, Los Angeles, CA 90095</p>
            <p class="pt-2">
              <a href="mailto:davoyan@ucla.edu" class="hover:text-[var(--ui-text-highlighted)] transition-colors">
                davoyan@ucla.edu
              </a>
            </p>
          </address>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-8 pt-6 border-t border-[var(--ui-border)] text-center">
        <p class="text-xs text-[var(--ui-text-dimmed)]">
          &copy; {{ currentYear }} Micro-Nano Devices and metamaterial engineering Lab &middot; UCLA Samueli School of Engineering
        </p>
      </div>
    </div>
  </footer>
</template>
