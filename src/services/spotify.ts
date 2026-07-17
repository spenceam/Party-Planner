import SpotifyWebApi from 'spotify-web-api-js'

export interface SpotifyTrackResult {
  id: string
  uri: string
  name: string
  artists: string
  album: string
}

const spotifyApi = new SpotifyWebApi()

function getToken() {
  return (import.meta.env.VITE_SPOTIFY_TOKEN as string | undefined)?.trim() || ''
}

function getPlaylistId() {
  return (import.meta.env.VITE_SPOTIFY_PLAYLIST_ID as string | undefined)?.trim() || ''
}

function ensureToken() {
  const token = getToken()
  if (!token) {
    throw new Error('Missing VITE_SPOTIFY_TOKEN')
  }

  spotifyApi.setAccessToken(token)
  return token
}

export function isSpotifyConfigured() {
  return Boolean(getToken() && getPlaylistId())
}

export function getSpotifyConfigState() {
  return {
    hasToken: Boolean(getToken()),
    hasPlaylistId: Boolean(getPlaylistId()),
    playlistId: getPlaylistId(),
  }
}

export async function searchSpotifyTracks(query: string, limit = 8): Promise<SpotifyTrackResult[]> {
  ensureToken()
  const response = await spotifyApi.searchTracks(query, { limit, market: 'from_token' })

  const items = response?.tracks?.items ?? []
  return items.map((item) => ({
    id: item.id,
    uri: item.uri,
    name: item.name,
    artists: item.artists.map((artist) => artist.name).join(', '),
    album: item.album.name,
  }))
}

export async function addTrackToSharedPlaylist(trackUri: string) {
  ensureToken()
  const playlistId = getPlaylistId()
  if (!playlistId) {
    throw new Error('Missing VITE_SPOTIFY_PLAYLIST_ID')
  }

  await spotifyApi.addTracksToPlaylist(playlistId, [trackUri])
}

export async function searchAndAddTrack(query: string) {
  const results = await searchSpotifyTracks(query, 1)
  if (!results.length) {
    throw new Error('No matching Spotify tracks found')
  }

  await addTrackToSharedPlaylist(results[0].uri)
  return results[0]
}
