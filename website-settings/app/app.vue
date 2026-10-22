<script setup lang="ts">
const SITE_NAME = 'Micro-Nano Devices and metamaterial engineering Lab'

// "<Page> | <lab name>", except on the homepage whose title IS the lab name.
// Defined here (not per page) so the tab title stays correct during
// client-side navigation.
useHead({
  titleTemplate: (title?: string) =>
    !title || title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`,
})
</script>

<template>
  <UApp>
    <!-- Announces the new page title to screen readers after each
         client-side navigation (otherwise page changes are silent). -->
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
