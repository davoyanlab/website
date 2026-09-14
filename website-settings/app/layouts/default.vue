<template>
  <div class="min-h-screen flex flex-col bg-[var(--ui-bg)] text-[var(--ui-text-highlighted)]">
    <TheHeader />
    <main id="main-content" class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>
