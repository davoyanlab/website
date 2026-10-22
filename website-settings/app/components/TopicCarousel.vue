<script setup lang="ts">
/**
 * Auto-advancing image carousel with prev/next arrows.
 *
 * - Cycles through `images` every `interval` ms (default 5 s)
 * - Crossfades between slides
 * - Left / right arrow controls + clickable dot indicators
 * - Auto-cycling starts only once the carousel SCROLLS INTO VIEW
 *   (not on page load) — so a carousel further down the page still feels
 *   fresh the first time you reach it
 * - Pauses on hover, on keyboard focus, and when the page tab is hidden
 * - Visible Pause / Play button (WCAG 2.2.2 Pause, Stop, Hide). Pausing also
 *   swaps an animated slide (e.g. a .gif) for its `still` image, if given.
 * - Respects `prefers-reduced-motion` (starts paused: no auto-advance and
 *   still images instead of animations)
 * - Exposed to screen readers as a carousel region; the current dot has
 *   aria-current and hidden slides are aria-hidden
 */
const props = withDefaults(
  defineProps<{
    images: { src: string; alt: string; still?: string }[]
    /** Accessible name for the carousel region, e.g. "Solar Sails images". */
    label?: string
    /** Auto-advance interval in milliseconds. Default 5000 (5 s). */
    interval?: number
    /** Tailwind aspect-ratio utility, e.g. 'aspect-[16/10]'. */
    aspect?: string
    /** Optional border ring + rounded corners */
    rounded?: boolean
  }>(),
  {
    interval: 5000,
    label: 'Image carousel',
    aspect: 'aspect-[16/10]',
    rounded: true,
  },
)

const wrapRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const isPaused = ref(false) // temporary: pointer hover or keyboard focus inside
const userPaused = ref(false) // set by the Pause / Play button (or reduced motion)
let timer: ReturnType<typeof setInterval> | null = null
const reducedMotion = ref(false)

const hasAnimatedSlide = computed(() => props.images.some(img => /\.gif$/i.test(img.src)))
const showPauseButton = computed(() => props.images.length > 1 || hasAnimatedSlide.value)

// Paused (by the user or reduced-motion) → show the still version of an animated slide.
function slideSrc(img: { src: string; still?: string }) {
  return userPaused.value && img.still ? img.still : img.src
}

function togglePause() {
  userPaused.value = !userPaused.value
  if (userPaused.value) stopTimer()
  else startTimer()
}

function onFocusOut(e: FocusEvent) {
  if (!wrapRef.value?.contains(e.relatedTarget as Node | null)) isPaused.value = false
}

function next() {
  if (!props.images.length) return
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

function prev() {
  if (!props.images.length) return
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length
}

function goTo(i: number) {
  currentIndex.value = i
  restartTimer()
}

function startTimer() {
  if (timer || props.images.length <= 1 || userPaused.value) return
  timer = setInterval(() => {
    if (!isPaused.value && document.visibilityState === 'visible') {
      next()
    }
  }, props.interval)
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function restartTimer() {
  stopTimer()
  startTimer()
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reducedMotion.value) userPaused.value = true
  if (reducedMotion.value || !wrapRef.value) return

  // Start cycling only when the carousel first becomes visible. After it has
  // fired once we stop observing — re-entering the viewport later doesn't
  // restart the timer (it just keeps running, paused by tab visibility).
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          startTimer()
          observer.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(wrapRef.value)

  onUnmounted(() => {
    observer.disconnect()
    stopTimer()
  })
})
</script>

<template>
  <div
    ref="wrapRef"
    class="relative overflow-hidden bg-black group"
    :class="[aspect, rounded ? 'rounded-xl border border-[var(--ui-border)]' : '']"
    role="region"
    aria-roledescription="carousel"
    :aria-label="label"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @focusin="isPaused = true"
    @focusout="onFocusOut"
  >
    <!-- Slides — stacked, crossfaded by opacity -->
    <NuxtImg
      v-for="(img, i) in images"
      :key="img.src"
      :src="slideSrc(img)"
      :alt="img.alt"
      :aria-hidden="i === currentIndex ? undefined : 'true'"
      width="1400"
      height="900"
      :loading="i === 0 ? 'eager' : 'lazy'"
      class="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
      :class="i === currentIndex ? 'opacity-100' : 'opacity-0'"
    />

    <!-- Prev / Next arrows (only when > 1 slide) -->
    <template v-if="images.length > 1">
      <button
        type="button"
        class="absolute top-1/2 left-3 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Previous slide"
        @click="prev(); restartTimer()"
      >
        <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Next slide"
        @click="next(); restartTimer()"
      >
        <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" aria-hidden="true" />
      </button>
    </template>

    <!-- Dot indicators (only when > 1 slide) -->
    <div
      v-if="images.length > 1"
      class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm"
    >
      <button
        v-for="(img, i) in images"
        :key="img.src"
        type="button"
        class="w-1.5 h-1.5 rounded-full transition-all duration-300"
        :class="
          i === currentIndex
            ? 'bg-white w-4'
            : 'bg-white/40 hover:bg-white/70'
        "
        :aria-label="`Go to slide ${i + 1} of ${images.length}`"
        :aria-current="i === currentIndex ? 'true' : undefined"
        @click="goTo(i)"
      />
    </div>

    <!-- Pause / Play (always visible so keyboard and touch users can find it) -->
    <button
      v-if="showPauseButton"
      type="button"
      class="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      :aria-label="userPaused ? 'Play slideshow' : 'Pause slideshow'"
      @click="togglePause"
    >
      <UIcon :name="userPaused ? 'i-heroicons-play' : 'i-heroicons-pause'" class="w-4 h-4" aria-hidden="true" />
    </button>
  </div>
</template>
