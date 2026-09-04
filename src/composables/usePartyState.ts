import { reactive, ref } from 'vue'

export interface HostProfile {
  displayName: string
  phone: string
  dietaryPreference: string
}

export interface NotificationPreferences {
  rsvpUpdates: boolean
  playlistUpdates: boolean
  reminders: boolean
}

// Module-level singletons so Dashboard/Profile/Settings views share the same state.
export const profile = reactive<HostProfile>({
  displayName: 'Amanda Spence',
  phone: '(555) 014-8821',
  dietaryPreference: 'Vegetarian options first',
})

export const eventDate = ref(new Date('2026-10-24T19:00:00'))

export const notificationPreferences = reactive<NotificationPreferences>({
  rsvpUpdates: true,
  playlistUpdates: true,
  reminders: true,
})
