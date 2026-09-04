import { computed, reactive, ref } from 'vue'

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

// Bridges the Date used for the countdown with an <input type="datetime-local"> string.
export const eventDateInput = computed({
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

export const notificationPreferences = reactive<NotificationPreferences>({
  rsvpUpdates: true,
  playlistUpdates: true,
  reminders: true,
})
