<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SpotifyWebApi from 'spotify-web-api-js'
import { eventDate, profile } from '../composables/usePartyState'

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)

interface AssignmentTask {
  id: number
  title: string
  assignee: string
  done: boolean
}

interface PlaylistSong {
  id: number
  title: string
  artist: string
  addedBy: string
}

const spotifyApi = new SpotifyWebApi()
const spotifyReady = ref(false)
const songTitle = ref('')
const songArtist = ref('')
const songAddedBy = ref('Amanda')

const songs = ref<PlaylistSong[]>([
  { id: 1, title: 'Levitating', artist: 'Dua Lipa', addedBy: 'Riley' },
  { id: 2, title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', addedBy: 'Chris' },
  { id: 3, title: 'About Damn Time', artist: 'Lizzo', addedBy: 'Amanda' },
])

const invitedCount = 48
const confirmedCount = ref(34)
const maybeCount = ref(6)
const declinedCount = computed(() => invitedCount - confirmedCount.value - maybeCount.value)

const attendanceData = computed(() => ({
  labels: ['Confirmed', 'Maybe', 'Declined'],
  datasets: [
    {
      label: 'Guests',
      data: [confirmedCount.value, maybeCount.value, declinedCount.value],
      backgroundColor: ['#4F46E5', '#E5A346', '#C4C4C4'],
      borderRadius: 8,
    },
  ],
}))

const attendanceOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
}

const now = ref(new Date())
let timerId: number | undefined

const countdown = computed(() => {
  const diffMs = Math.max(eventDate.value.getTime() - now.value.getTime(), 0)
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const months = Math.floor(totalDays / 30)
  const weeks = Math.floor((totalDays % 30) / 7)
  const days = (totalDays % 30) % 7

  return { months, weeks, days }
})

const notifications = ref([
  { id: 1, text: 'Maya confirmed attendance and can bring extra chairs.', icon: 'mdi-party-popper' },
  { id: 2, text: 'Alex added 4 songs to the shared playlist.', icon: 'mdi-music-note-plus' },
  { id: 3, text: 'Reminder: DJ deposit is due this Friday.', icon: 'mdi-bell-ring' },
])

const tasks = ref<AssignmentTask[]>([
  { id: 1, title: 'Bring folding table', assignee: 'Riley', done: true },
  { id: 2, title: 'Pick up ice', assignee: 'Nina', done: false },
  { id: 3, title: 'Set up projector', assignee: 'Chris', done: false },
])

const newTaskTitle = ref('')
const newTaskAssignee = ref('')

const bringList = ref([
  { item: 'Soda pack', person: 'Jordan' },
  { item: 'Extension cord', person: 'Priya' },
  { item: 'Board games', person: 'Evan' },
])

const calendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek',
  },
  events: [
    { title: 'Finalize guest list', date: '2026-09-01' },
    { title: 'Costco run', date: '2026-09-20' },
    { title: 'Decor prep night', date: '2026-10-10' },
    { title: 'Party day', date: '2026-10-24' },
  ],
}

function addTask() {
  const title = newTaskTitle.value.trim()
  const assignee = newTaskAssignee.value.trim()
  if (!title || !assignee) {
    return
  }

  tasks.value.unshift({
    id: Date.now(),
    title,
    assignee,
    done: false,
  })

  newTaskTitle.value = ''
  newTaskAssignee.value = ''
}

function addSong() {
  const title = songTitle.value.trim()
  const artist = songArtist.value.trim()
  const addedBy = songAddedBy.value.trim() || 'Guest'

  if (!title || !artist) {
    return
  }

  songs.value.unshift({
    id: Date.now(),
    title,
    artist,
    addedBy,
  })

  songTitle.value = ''
  songArtist.value = ''
}

onMounted(() => {
  const token = import.meta.env.VITE_SPOTIFY_TOKEN as string | undefined
  if (token) {
    spotifyApi.setAccessToken(token)
    spotifyReady.value = true
  }

  timerId = window.setInterval(() => {
    now.value = new Date()
  }, 60000)
})

onUnmounted(() => {
  if (timerId) {
    clearInterval(timerId)
  }
})
</script>

<template>
  <v-container fluid class="dashboard-wrap pa-4 pa-md-6">
    <v-row class="mb-2" align="stretch">
      <v-col cols="12" md="5">
        <v-card elevation="2" rounded="lg" class="h-100 gradient-surface">
          <v-card-title class="d-flex flex-wrap align-center justify-space-between ga-2">
            <span>⏳ Countdown</span>
            <v-chip size="small" color="primary" variant="tonal">Party Night</v-chip>
          </v-card-title>
          <v-card-text>
            <div class="countdown-grid">
              <div>
                <p class="countdown-value">{{ countdown.months }}</p>
                <p class="countdown-label">Months</p>
              </div>
              <div>
                <p class="countdown-value">{{ countdown.weeks }}</p>
                <p class="countdown-label">Weeks</p>
              </div>
              <div>
                <p class="countdown-value">{{ countdown.days }}</p>
                <p class="countdown-label">Days</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="7">
        <v-card elevation="2" class="h-100">
          <v-card-title class="d-flex flex-wrap align-center justify-space-between ga-3">
            <div class="d-flex align-center ga-3">
              <v-avatar color="secondary" size="44">
                <v-icon icon="mdi-account" />
              </v-avatar>
              <div>
                <p class="text-h6 mb-0">Host Profile</p>
                <p class="spotify-muted">Profile and preferences</p>
              </div>
            </div>
            <div class="d-flex flex-wrap align-center ga-3">
              <v-btn to="/profile" variant="tonal" prepend-icon="mdi-account-edit" color="primary">
                Edit Profile
              </v-btn>
              <v-btn to="/settings" variant="tonal" prepend-icon="mdi-cog" color="secondary">
                Settings
              </v-btn>
            </div>
          </v-card-title>
          <v-card-text>
            <div class="profile-summary">
              <v-chip size="small" variant="outlined" prepend-icon="mdi-account">
                {{ profile.displayName }}
              </v-chip>
              <v-chip size="small" variant="outlined" prepend-icon="mdi-phone">
                {{ profile.phone }}
              </v-chip>
              <v-chip
                size="small"
                variant="outlined"
                prepend-icon="mdi-silverware-fork-knife"
              >
                {{ profile.dietaryPreference }}
              </v-chip>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" lg="8">
        <v-card elevation="2" class="mb-4">
          <v-card-title>RSVP Snapshot</v-card-title>
          <v-card-text>
            <p class="mb-3">{{ confirmedCount }} of {{ invitedCount }} guests confirmed</p>
            <div class="chart-shell">
              <Bar :data="attendanceData" :options="attendanceOptions" />
            </div>
          </v-card-text>
        </v-card>

        <v-card elevation="2" class="mb-4">
          <v-card-title>✅ Attendee Assignments</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" sm="5">
                <v-text-field
                  v-model="newTaskTitle"
                  label="Task"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" sm="5">
                <v-text-field
                  v-model="newTaskAssignee"
                  label="Assigned to"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" sm="2" class="d-flex align-center">
                <v-btn color="primary" @click="addTask">Add</v-btn>
              </v-col>
            </v-row>

            <v-list lines="two">
              <v-list-item v-for="task in tasks" :key="task.id">
                <template #prepend>
                  <v-checkbox-btn v-model="task.done" color="primary" />
                </template>
                <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
                  {{ task.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Assigned to {{ task.assignee }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>

        <v-card elevation="2">
          <v-card-title class="d-flex flex-wrap align-center justify-space-between ga-2">
            <span>🎵 Shared Spotify Playlist</span>
            <v-chip size="small" color="secondary" variant="tonal" prepend-icon="mdi-spotify">
              {{ spotifyReady ? 'Connected' : 'Token needed' }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="songTitle"
                  label="Song title"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="songArtist"
                  label="Artist"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="songAddedBy"
                  label="Added by"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12" md="1" class="d-flex align-center">
                <v-btn color="primary" icon="mdi-plus" @click="addSong" />
              </v-col>
            </v-row>

            <div class="spotify-list mt-2">
              <div v-for="song in songs" :key="song.id" class="spotify-row">
                <div>
                  <p class="font-weight-medium">{{ song.title }}</p>
                  <p class="spotify-muted">{{ song.artist }}</p>
                </div>
                <v-chip size="small" variant="outlined">{{ song.addedBy }}</v-chip>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card elevation="2" class="mb-4">
          <v-card-title>🔔 Notifications</v-card-title>
          <v-list>
            <v-list-item v-for="note in notifications" :key="note.id" :prepend-icon="note.icon">
              <v-list-item-title>{{ note.text }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>

        <v-card elevation="2" class="calendar-card mb-4">
          <v-card-title>🗓️ Party Schedule Calendar</v-card-title>
          <v-card-text>
            <FullCalendar :options="calendarOptions" />
          </v-card-text>
        </v-card>

        <v-card elevation="2">
          <v-card-title>🧺 Bring List & Supplies</v-card-title>
          <v-card-text>
            <v-list density="comfortable">
              <v-list-item v-for="(entry, index) in bringList" :key="entry.item + index">
                <v-list-item-title>{{ entry.item }}</v-list-item-title>
                <v-list-item-subtitle>{{ entry.person }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
