<script setup lang="ts">
const scrolled = ref(false)
const mobileMenuOpen = ref(false)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Research', to: '/research' },
  { label: 'Publications', to: '/publications' },
  { label: 'Team', to: '/team' },
  { label: 'Virtual Lab Tour', to: '/virtual-lab-tour' },
  { label: 'Contact', to: '/contact' },
]

const menuButtonRef = ref<HTMLButtonElement | null>(null)

// Close the mobile menu after navigating (e.g. via browser back/forward).
const route = useRoute()
watch(() => route.fullPath, () => { mobileMenuOpen.value = false })

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 50
  }
  // Escape closes the mobile menu and returns focus to its toggle button.
  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && mobileMenuOpen.value) {
      mobileMenuOpen.value = false
      menuButtonRef.value?.focus()
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('keydown', onKeydown)
  })
})
</script>

<template>
  <!--
    The border-b is always present (transparent at rest) so the navbar height
    doesn't change on scroll — that prevents the 1px white-line flash that
    appears when a border is added abruptly.
  -->
  <header
    class="fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-300"
    :class="[
      scrolled
        ? 'bg-[var(--ui-bg)]/90 backdrop-blur-md !border-[var(--ui-border)]'
        : 'bg-transparent'
    ]"
  >
    <!-- Skip to content -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--ui-bg)] focus:text-[var(--ui-text-highlighted)] focus:rounded-md"
    >
      Skip to content
    </a>

    <nav class="max-w-7xl mx-auto px-2 h-[72px] flex items-center justify-between">
      <!-- Logo -->
      <SvgLogo />

      <!-- Desktop nav. Breaks at lg (not the usual md) — the bigger logo
           lockup plus 6 links (including "Virtual Lab Tour") no longer fit
           in the row at md once the sides padding was removed. -->
      <div class="hidden lg:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors duration-200"
          active-class="!text-[var(--ui-text-highlighted)]"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Right side: UCLA link + mobile hamburger -->
      <div class="flex items-center gap-3">
        <a
          href="https://mae.ucla.edu"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden sm:flex items-center gap-1 text-xs text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors"
          aria-label="UCLA MAE Department website (opens in new tab)"
        >
          <UIcon name="i-heroicons-academic-cap" class="w-4 h-4" aria-hidden="true" />
          <span>UCLA</span>
        </a>

        <!-- Mobile hamburger -->
        <button
          ref="menuButtonRef"
          type="button"
          class="lg:hidden p-2 -mr-2 text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)]"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        id="mobile-menu"
        class="lg:hidden bg-[var(--ui-bg)]/95 backdrop-blur-md border-b border-[var(--ui-border)]"
      >
        <div class="px-4 py-4 flex flex-col gap-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm py-2 text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] transition-colors"
            @click="mobileMenuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </header>
</template>
