<script setup lang="ts">
import { computed } from 'vue'
import { eventDate, notificationPreferences } from '../composables/usePartyState'

// Bridges the Date used for the countdown with an <input type="datetime-local"> string.
const eventDateInput = computed({
  get: () => {
    const date = eventDate.value
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
  },
  set: (value: string) => {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      eventDate.value = parsed
    }
  },
})
</script>

<template>
  <v-container fluid class="dashboard-wrap pa-4 pa-md-6">
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-btn
          to="/"
          variant="text"
          prepend-icon="mdi-arrow-left"
          class="mb-4"
        >
          Back to dashboard
        </v-btn>

        <v-card elevation="2" rounded="lg" class="gradient-surface mb-4">
          <v-card-title>Event Date & Time</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="eventDateInput"
              type="datetime-local"
              label="Party start"
              prepend-inner-icon="mdi-calendar-clock"
              variant="outlined"
              density="comfortable"
            />
          </v-card-text>
        </v-card>

        <v-card elevation="2" rounded="lg">
          <v-card-title>Notifications</v-card-title>
          <v-card-text>
            <v-switch
              v-model="notificationPreferences.rsvpUpdates"
              hide-details
              color="primary"
              inset
              label="RSVP updates"
            />
            <v-switch
              v-model="notificationPreferences.playlistUpdates"
              hide-details
              color="primary"
              inset
              label="Playlist updates"
            />
            <v-switch
              v-model="notificationPreferences.reminders"
              hide-details
              color="primary"
              inset
              label="Task & payment reminders"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
