import type { RouterConfig } from '@nuxt/schema'

/**
 * Force every route change to land at the top of the page, unless the URL
 * contains a hash (#anchor), in which case we scroll to that element with a
 * small offset so the fixed navbar doesn't cover it.
 *
 * Without this, returning to a previously-visited page can restore the old
 * scroll position (e.g. landing at the bottom of /publications after clicking
 * "View All Publications" from the home page).
 */
export default <RouterConfig>{
  scrollBehavior(to, _from, savedPosition) {
    // Hash navigation → scroll to the target with offset for the fixed navbar
    if (to.hash) {
      return {
        el: to.hash,
        top: 80,
        behavior: 'smooth',
      }
    }

    // Browser back/forward → restore previous scroll position
    if (savedPosition) {
      return savedPosition
    }

    // Default: always start at the top of the new page
    return { top: 0 }
  },
}
