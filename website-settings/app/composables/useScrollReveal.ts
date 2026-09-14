/**
 * Auto-imported composable that fades a section in when it scrolls into view.
 *
 * Usage:
 *   const { target } = useScrollReveal()
 *   <section ref="target"> … </section>
 *
 * The element gets a `data-reveal` attribute (initial state: hidden) and a
 * `.revealed` class once it crosses the viewport threshold. The fade itself
 * is defined globally in `app/assets/css/main.css`.
 *
 * Respects `prefers-reduced-motion` — those users see the section in its
 * final state immediately, no fade.
 */
export function useScrollReveal(options?: { threshold?: number; once?: boolean }) {
  const target = ref<HTMLElement | null>(null)
  const threshold = options?.threshold ?? 0.15
  const once = options?.once ?? true

  onMounted(() => {
    if (!target.value) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      target.value.classList.add('revealed')
      return
    }

    target.value.setAttribute('data-reveal', '')

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            if (once) observer.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('revealed')
          }
        }
      },
      { threshold },
    )
    observer.observe(target.value)

    onUnmounted(() => observer.disconnect())
  })

  return { target }
}
