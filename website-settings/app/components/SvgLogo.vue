<script setup lang="ts"></script>

<template>
  <!--
    The source PNG isn't optically centered in its own square canvas (the
    crescent glyph sits lower/heavier than the canvas midline), so a plain
    `items-center` row leaves it looking misaligned against the wordmark.
    The margin nudges below correct for that — they're asset-specific
    optical corrections, not layout hacks.
  -->
  <NuxtLink to="/" class="flex items-center min-w-0 shrink sm:shrink-0" aria-label="Micro-Nano Devices and metamaterial engineering Lab home">
    <NuxtImg
      src="/images/branding/logo_white.png"
      alt="Micro-Nano Devices and metamaterial engineering Lab logo"
      class="h-10 sm:h-[62px] w-auto mt-1 sm:mt-1.5 shrink-0"
    />
    <!--
      min-w-0 + truncate: without these, the wordmark's natural width never
      shrinks below its content length, so on narrow phones it pushes the
      hamburger button past the right edge of the screen instead of the text
      wrapping or shrinking.
    -->
    <div class="flex flex-col leading-tight ml-3 sm:ml-[15px] mt-1 min-w-0">
      <span class="font-semibold text-xs sm:text-sm tracking-wide truncate">Micro-Nano Devices</span>
      <span class="text-[9px] sm:text-[10px] text-[var(--ui-text-muted)] tracking-wider truncate">and metamaterial engineering Lab @ UCLA</span>
    </div>
  </NuxtLink>
</template>
