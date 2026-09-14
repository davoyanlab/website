<script setup lang="ts">
/**
 * Animated shooting-star section divider.
 *
 * A bright white point streaks across the page with a glowing trail the first
 * time the divider scrolls into view. The streak follows the user's scroll
 * direction at that moment (down → left to right, up → right to left), then
 * never fires again for this page visit.
 *
 * Pure CSS animation; respects `prefers-reduced-motion` (falls back to a
 * static thin line).
 *
 * Usage:  <ShootingStarDivider />
 */

const dividerRef = ref<HTMLElement | null>(null)
const triggered = ref(false)
const direction = ref<'down' | 'up'>('down')

onMounted(() => {
  if (!dividerRef.value) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  // Lightweight scroll-direction tracker. Updated until the divider fires once.
  let lastY = window.scrollY
  const onScroll = () => {
    const y = window.scrollY
    if (y === lastY) return
    direction.value = y > lastY ? 'down' : 'up'
    lastY = y
  }
  window.addEventListener('scroll', onScroll, { passive: true })

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !triggered.value) {
          triggered.value = true
          observer.unobserve(entry.target)
          window.removeEventListener('scroll', onScroll)
        }
      }
    },
    { threshold: 0.5 },
  )
  observer.observe(dividerRef.value)

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener('scroll', onScroll)
  })
})
</script>

<template>
  <div
    ref="dividerRef"
    class="shooting-star-wrap relative w-full h-12 overflow-hidden pointer-events-none"
    aria-hidden="true"
  >
    <span
      v-if="triggered"
      class="shooting-star"
      :class="direction"
    />
  </div>
</template>

<style scoped>
/* Faint baseline divider so the boundary is still visible before the streak fires */
.shooting-star-wrap::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.06);
}

.shooting-star {
  position: absolute;
  top: 50%;
  height: 1px;
  width: 120px;
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.7))
          drop-shadow(0 0 12px rgba(255, 255, 255, 0.4));
  opacity: 0;
}

/* Down (scrolling down → left to right): bright head leading on the right */
.shooting-star.down {
  left: -120px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.85) 75%,
    #ffffff 100%
  );
  animation: shoot-right 1.6s cubic-bezier(0.16, 0.7, 0.3, 1) forwards;
}

/* Up (scrolling up → right to left): bright head leading on the left */
.shooting-star.up {
  right: -120px;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.85) 75%,
    #ffffff 100%
  );
  animation: shoot-left 1.6s cubic-bezier(0.16, 0.7, 0.3, 1) forwards;
}

@keyframes shoot-right {
  0%   { left: -120px; opacity: 0; }
  10%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { left: 100%; opacity: 0; }
}

@keyframes shoot-left {
  0%   { right: -120px; opacity: 0; }
  10%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { right: 100%; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .shooting-star {
    display: none;
  }
}
</style>
