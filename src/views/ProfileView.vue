<script setup lang="ts">
import { profile } from '../composables/usePartyState'
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

        <v-card elevation="2" rounded="lg" class="gradient-surface">
          <v-card-title class="d-flex align-center ga-3">
            <v-avatar color="secondary" size="56">
              <v-icon icon="mdi-account" size="32" />
            </v-avatar>
            <div>
              <p class="text-h5 mb-0">Host Profile</p>
              <p class="spotify-muted">Update how you appear to your guests</p>
            </div>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.displayName"
                  label="Display name"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.phone"
                  label="Phone"
                  prepend-inner-icon="mdi-phone"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.dietaryPreference"
                  label="Food preferences"
                  prepend-inner-icon="mdi-silverware-fork-knife"
                  variant="outlined"
                  density="comfortable"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
