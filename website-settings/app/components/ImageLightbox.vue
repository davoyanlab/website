<script setup lang="ts">
/**
 * Fullscreen lightbox for viewing a gallery image at full size.
 *
 * Controlled via v-model:open + v-model:index so the parent gallery grid
 * owns the state (which photo was clicked). Supports Esc to close, left/right
 * arrow keys to navigate, click-outside-image to close, and locks page
 * scroll while open.
 */
const props = defineProps<{
  images: { src: string | null; alt: string; caption?: string }[]
  open: boolean
  index: number
}>()

const emit = defineEmits<{
  'update:open': [boolean]
  'update:index': [number]
}>()

const current = computed(() => props.images[props.index])

function close() {
  emit('update:open', false)
}

function next() {
  if (!props.images.length) return
  emit('update:index', (props.index + 1) % props.images.length)
}

function prev() {
  if (!props.images.length) return
  emit('update:index', (props.index - 1 + props.images.length) % props.images.length)
}

function onKeydown(e: KeyboardEvent) {
  if (!props.open) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowRight') next()
  else if (e.key === 'ArrowLeft') prev()
}

watch(
  () => props.open,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open && current"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
        role="dialog"
        aria-modal="true"
        :aria-label="current.alt"
        @click.self="close"
      >
        <!-- Close button -->
        <button
          type="button"
          class="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close"
          @click="close"
        >
          <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
        </button>

        <!-- Prev / Next -->
        <template v-if="images.length > 1">
          <button
            type="button"
            class="absolute top-1/2 left-2 sm:left-6 -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Previous image"
            @click.stop="prev"
          >
            <UIcon name="i-heroicons-chevron-left" class="w-6 h-6" />
          </button>
          <button
            type="button"
            class="absolute top-1/2 right-2 sm:right-6 -translate-y-1/2 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Next image"
            @click.stop="next"
          >
            <UIcon name="i-heroicons-chevron-right" class="w-6 h-6" />
          </button>
        </template>

        <!-- Image + caption -->
        <figure class="max-w-6xl max-h-full flex flex-col items-center gap-3" @click.stop>
          <NuxtImg
            v-if="current.src"
            :src="current.src"
            :alt="current.alt"
            width="1600"
            height="1200"
            loading="eager"
            class="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
          />
          <div
            v-else
            class="w-[min(80vw,700px)] aspect-[4/3] rounded-lg border border-dashed border-white/30 bg-white/5 flex flex-col items-center justify-center gap-3 text-white/50"
          >
            <UIcon name="i-heroicons-photo" class="w-12 h-12" />
            <span class="text-sm">Photo coming soon</span>
          </div>
          <figcaption
            v-if="current.caption"
            class="text-sm text-white/80 text-center max-w-2xl"
          >
            {{ current.caption }}
          </figcaption>
          <p v-if="images.length > 1" class="text-xs text-white/50 tracking-wide">
            {{ index + 1 }} / {{ images.length }}
          </p>
        </figure>
      </div>
    </Transition>
  </Teleport>
</template>
