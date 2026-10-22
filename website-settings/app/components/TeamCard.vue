<script setup lang="ts">
/**
 * Card for a single team member. Used on /team for the PI (large) and for
 * everyone else (small). Only the fields displayed by the template are typed
 * here — anything else on TeamCollectionItem is intentionally ignored.
 */
const props = defineProps<{
  member: {
    name: string
    role: string
    title?: string
    formerRole?: string
    photo: string
    email?: string
    scholar?: string
    github?: string
  }
  isPi?: boolean
}>()

// SVG portraits (e.g. placeholder silhouette) can't go through @nuxt/image,
// so we render them with a plain <img>.
const isSvg = computed(() => props.member.photo.endsWith('.svg'))

// Single source of truth for the subtitle line: alumni show formerRole,
// current members show title, and we fall back to the raw role label.
const subtitle = computed(() =>
  props.member.formerRole || props.member.title || props.member.role,
)
</script>

<template>
  <!--
    Team cards are not clickable. No hover background / ring effects — they're
    purely informational. Only the inline links (email, Scholar, GitHub) below
    the name are interactive.
  -->
  <article class="rounded-lg p-6">
    <div :class="[isPi ? 'flex flex-col sm:flex-row gap-6 items-start' : '']">
      <!-- Photo -->
      <div class="mb-4" :class="[isPi ? 'sm:mb-0 shrink-0' : '']">
        <img
          v-if="isSvg"
          :src="member.photo"
          :alt="`Portrait of ${member.name}`"
          :width="isPi ? 160 : 120"
          :height="isPi ? 160 : 120"
          loading="lazy"
          class="rounded-lg object-cover aspect-square bg-[var(--ui-bg-elevated)]"
          :class="[isPi ? 'w-40 h-40' : 'w-28 h-28']"
        >
        <NuxtImg
          v-else
          :src="member.photo"
          :alt="`Portrait of ${member.name}`"
          :width="isPi ? 160 : 120"
          :height="isPi ? 160 : 120"
          loading="lazy"
          class="rounded-lg object-cover aspect-square"
          :class="[isPi ? 'w-40 h-40' : 'w-28 h-28']"
        />
      </div>

      <div>
        <!-- Role label for PI -->
        <span
          v-if="isPi"
          class="text-xs font-semibold uppercase tracking-wider text-[var(--color-gold-400)] mb-1 block"
        >
          Principal Investigator
        </span>

        <!-- Name -->
        <!-- The PI card sits directly under the page h1, so it is an h2;
             member cards sit under the "Current Team" / "Alumni" h2s. -->
        <component
          :is="isPi ? 'h2' : 'h3'"
          class="font-[family-name:var(--font-display)] font-semibold mb-1"
          :class="[isPi ? 'text-2xl' : 'text-lg']"
        >
          {{ member.name }}
        </component>

        <!-- Title / role / former role -->
        <p class="text-sm text-[var(--ui-text-muted)]" :class="isPi && member.email ? 'mb-1' : 'mb-3'">
          {{ subtitle }}
        </p>

        <!-- Email -->
        <p v-if="member.email" class="text-sm mb-3">
          <a
            :href="`mailto:${member.email}`"
            class="text-[var(--color-gold-400)] hover:underline"
          >
            {{ member.email }}
          </a>
        </p>

        <!-- Social link icons -->
        <div class="flex items-center gap-2">
          <a
            v-if="member.scholar"
            :href="member.scholar"
            target="_blank"
            rel="noopener noreferrer"
            class="p-1.5 rounded-md text-[var(--ui-text-muted)] hover:text-[var(--ui-text-highlighted)] hover:bg-[var(--ui-bg-elevated)] transition-colors"
            :aria-label="`${member.name} on Google Scholar (opens in new tab)`"
            title="Google Scholar"
          >
            <UIcon name="i-heroicons-academic-cap" class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </article>
</template>
