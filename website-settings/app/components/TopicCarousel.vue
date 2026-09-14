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
 * - Pauses on hover and when the page tab is hidden
 * - Respects `prefers-reduced-motion` (stays on slide 1, no auto-advance)
 */
const props = withDefaults(
  defineProps<{
    images: { src: string; alt: string }[]
    /** Auto-advance interval in milliseconds. Default 5000 (5 s). */
    interval?: number
    /** Tailwind aspect-ratio utility, e.g. 'aspect-[16/10]'. */
    aspect?: string
    /** Optional border ring + rounded corners */
    rounded?: boolean
  }>(),
  {
    interval: 5000,
    aspect: 'aspect-[16/10]',
    rounded: true,
  },
)

const wrapRef = ref<HTMLElement | null>(null)
const currentIndex = ref(0)
const isPaused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
const reducedMotion = ref(false)

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
  if (timer || props.images.length <= 1 || reducedMotion.value) return
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
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
  >
    <!-- Slides — stacked, crossfaded by opacity -->
    <NuxtImg
      v-for="(img, i) in images"
      :key="img.src"
      :src="img.src"
      :alt="img.alt"
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
        <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
      </button>
      <button
        type="button"
        class="absolute top-1/2 right-3 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Next slide"
        @click="next(); restartTimer()"
      >
        <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
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
        @click="goTo(i)"
      />
    </div>
  </div>
</template>
