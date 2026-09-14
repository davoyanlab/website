<script setup lang="ts">
const canvasRef = ref<HTMLCanvasElement | null>(null)

interface Star {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let animId: number
  let stars: Star[] = []
  let isVisible = true

  const resize = () => {
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }

  const initStars = () => {
    const count = 150
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.2,
    }))
  }

  const drawBeam = () => {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    // Soft diagonal beam in the brand colour (UCLA accent blue, #5BA0D8).
    // Stays low-opacity so it reads as ambient light, not a hard line.
    const gradient = ctx.createLinearGradient(0, h, w, 0)
    gradient.addColorStop(0, 'rgba(91, 160, 216, 0)')
    gradient.addColorStop(0.3, 'rgba(91, 160, 216, 0.06)')
    gradient.addColorStop(0.5, 'rgba(91, 160, 216, 0.1)')
    gradient.addColorStop(0.7, 'rgba(91, 160, 216, 0.06)')
    gradient.addColorStop(1, 'rgba(91, 160, 216, 0)')

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(0, h * 0.8)
    ctx.lineTo(w, h * 0.2)
    ctx.lineTo(w, h * 0.25)
    ctx.lineTo(0, h * 0.85)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()
    ctx.restore()
  }

  const draw = () => {
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    ctx.clearRect(0, 0, w, h)

    drawBeam()

    for (const star of stars) {
      if (!prefersReducedMotion) {
        star.x += star.vx
        star.y += star.vy

        if (star.x < 0) star.x = w
        if (star.x > w) star.x = 0
        if (star.y < 0) star.y = h
        if (star.y > h) star.y = 0
      }

      ctx.beginPath()
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
      ctx.fill()
    }

    if (isVisible && !prefersReducedMotion) {
      animId = requestAnimationFrame(draw)
    }
  }

  resize()
  initStars()

  if (prefersReducedMotion) {
    draw()
  } else {
    animId = requestAnimationFrame(draw)
  }

  // Pause when tab is hidden
  const onVisibility = () => {
    isVisible = document.visibilityState === 'visible'
    if (isVisible && !prefersReducedMotion) {
      animId = requestAnimationFrame(draw)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  const onResize = () => {
    resize()
    initStars()
  }
  window.addEventListener('resize', onResize)

  onUnmounted(() => {
    cancelAnimationFrame(animId)
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('resize', onResize)
  })
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="absolute inset-0 w-full h-full pointer-events-none"
    aria-hidden="true"
  />
</template>
