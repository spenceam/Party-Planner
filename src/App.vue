<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from 'vuetify'

const theme = useTheme()
const isDarkMode = computed({
  get: () => theme.global.current.value.dark,
  set: (value: boolean) => {
    theme.global.name.value = value ? 'dark' : 'light'
  },
})
</script>

<template>
  <v-app>
    <v-app-bar class="gradient-bar" density="comfortable" flat>
      <v-app-bar-title class="text-white text-truncate">
        <router-link to="/" class="text-white text-decoration-none">
          Amanda's Party Planning App
        </router-link>
      </v-app-bar-title>
      <v-btn
        :icon="isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        variant="text"
        class="text-white"
        :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="isDarkMode = !isDarkMode"
      />
      <v-btn to="/profile" icon="mdi-account" variant="text" class="text-white" aria-label="Profile" />
      <v-btn to="/settings" icon="mdi-cog" variant="text" class="text-white" aria-label="Settings" />
    </v-app-bar>
    <v-main class="gradient-surface">
      <router-view />
    </v-main>
  </v-app>
</template>
