# Amanda's Party Planning App

A single-page prototype for hosting a house party: invite tracking, task assignments, a shared Spotify playlist, a schedule calendar, and event countdown — all on one dashboard so a host and their guests can coordinate everything in one place.

## What this is

This is a **front-end prototype**. There is no backend or database — all party data (guests, tasks, songs, notifications) is mock data held in memory via Vue's reactivity system. Refreshing the page resets everything except values wired to Spotify. It's built to demonstrate the UI/UX and interaction patterns a real version of the app would need.

## Features

- **Countdown** — shows months/weeks/days until the party, with an inline editable event date/time.
- **Host profile** — name, phone, and dietary preference, editable from the dashboard summary or the dedicated Profile page.
- **RSVP snapshot** — a bar chart (Chart.js) of confirmed/maybe/declined guests out of the total invited.
- **Attendee assignments** — a checklist of tasks with an assignee, add/remove support.
- **Shared Spotify playlist** — add songs by title/artist; if Spotify credentials are configured, it searches Spotify and appends the track to a real playlist, otherwise it falls back to a local-only list.
- **Notifications** — a feed of recent activity (RSVPs, playlist adds, reminders).
- **Bring list & supplies** — who's bringing what.
- **Party schedule calendar** — a month/week view (FullCalendar) of prep milestones and the event itself.
- **Settings** — edit the event date/time and toggle notification categories.
- **Light/dark mode** — toggle in the top app bar.

## Design decisions

- **Vue 3 + TypeScript + Vite**: fast dev/build tooling with type safety, matching the brief's requested stack.
- **Vuetify 3 (Material Design 3 blueprint)**: gives a complete, accessible component library (cards, grids, forms, navigation) out of the box, so the prototype could focus on party-planning features instead of building UI primitives from scratch. Material Design icons (`@mdi/font`) are used for structural/system icons, while emoji are used for card headers where a friendlier, more casual tone fits a party app better than a formal icon.
- **Card + grid layout**: each feature (countdown, profile, RSVP chart, tasks, playlist, notifications, bring list, calendar) lives in its own `v-card` inside a responsive `v-row`/`v-col` grid. This keeps sections independently scannable and makes it easy to reorder or resize sections later. The layout is mobile-first and full-width (`fluid` container) rather than a fixed max-width, per the brief.
- **Two-hue gradient theme**: a single indigo/amber color pair (`primary`/`secondary`) drives the app bar gradient, card backgrounds, and chart colors in both light and dark themes, so the palette stays consistent when switching modes instead of defining unrelated colors per theme.
- **Shared reactive state via a composable** ([usePartyState.ts](src/composables/usePartyState.ts)): profile info, the event date, and notification preferences are module-level `reactive`/`ref` singletons rather than a full state-management library (Pinia/Vuex). Since the prototype is small and has no persistence layer, this was enough to let the Dashboard, Profile, and Settings views share and edit the same values without prop drilling.
- **Vue Router with three views**: `/` (dashboard), `/profile`, and `/settings` split the "everything at once" dashboard from the focused editing screens, so the dashboard can show a compact summary while deep edits happen on their own page.
- **Optional Spotify integration**: the playlist card works with no configuration (songs are just added to a local list) but upgrades to real Spotify search/add-to-playlist if `VITE_SPOTIFY_TOKEN` and `VITE_SPOTIFY_PLAYLIST_ID` are set (see [.env.example](.env.example)). This was a deliberate choice so the prototype is usable/demoable without requiring every developer to have Spotify API credentials.
- **Chart.js for RSVP data, FullCalendar for scheduling**: both were requested in the brief and are purpose-built for their job rather than hand-rolling charts or calendar grids.
- **No backend/persistence**: guests, tasks, songs, and notifications are all seeded mock data in component state. This keeps the prototype self-contained and easy to run, at the cost of state not surviving a page refresh — a real implementation would need an API and a database.

## Tech stack

- [Vue 3](https://vuejs.org/) + `<script setup>` SFCs, [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Vuetify 3](https://vuetifyjs.com/) (Material Design 3 blueprint) + [Material Design Icons](https://pictogrammers.com/library/mdi/)
- [Chart.js](https://www.chartjs.org/) / [vue-chartjs](https://vue-chartjs.org/) for the RSVP bar chart
- [FullCalendar](https://fullcalendar.io/) (`@fullcalendar/vue3`, day grid / time grid / interaction plugins) for the schedule
- [spotify-web-api-js](https://github.com/JMPerez/spotify-web-api-js) for optional playlist search/add

## Getting started

```sh
npm install
npm run dev
```

Open the printed local URL in your browser. No environment variables are required to run the app.

### Optional: connect Spotify

Copy `.env.example` to `.env` and fill in:

```sh
VITE_SPOTIFY_TOKEN=       # a Spotify Web API access token with playlist-modify scopes
VITE_SPOTIFY_PLAYLIST_ID= # the target playlist's ID
```

Without these, the playlist card still works, but songs are stored locally instead of being added to a real Spotify playlist.

### Build

```sh
npm run build   # type-checks (vue-tsc) then builds for production
npm run preview # preview the production build locally
```

## Project structure

```
src/
  App.vue                 # app shell: top bar, theme toggle, router-view
  main.ts                 # Vuetify theme setup + app bootstrap
  router/index.ts          # dashboard / profile / settings routes
  composables/
    usePartyState.ts        # shared reactive state (profile, event date, notification prefs)
  services/
    spotify.ts               # Spotify search/add-to-playlist wrapper
  views/
    DashboardView.vue        # main grid: countdown, RSVP chart, tasks, playlist, notifications, calendar
    ProfileView.vue          # edit host profile
    SettingsView.vue         # edit event date & notification preferences
```

## Known limitations (prototype scope)

- No authentication — there's a single implicit "host" user.
- No real guest/RSVP data source — attendance numbers are hardcoded.
- State isn't persisted (no backend, no localStorage), so it resets on reload.
- Spotify integration uses a manually configured access token rather than a full OAuth flow.
