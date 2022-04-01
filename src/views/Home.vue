<template>
  <div class="background">
    <div id="odometer" class="white--text">
      <div class="text-subtitle-1">You've hopped</div>
      <div class="text-h3">291 miles</div>
    </div>
    <v-card tile flat id="card" class="text-center">
      <v-card-text>

        <div>
          <v-autocomplete
            no-data-text="No Cities Found"
            clearable
            :loading="isLoadingCurrentLocation"
            v-model="from"
            outlined
            label="From"
            auto-select-first
            :items="autocompleteOptions"
          />
          <v-autocomplete
            no-data-text="No Cities Found"
            clearable
            ref="to"
            v-model="to"
            outlined
            label="To"
            auto-select-first
            :items="autocompleteOptions"
            @update:search-input="updateAutocompleteSuggestions"
          />
          <v-btn color="primary" @click="$router.push('/routes')">Ride</v-btn>
        </div>

        <v-divider class="my-12"/>

        <div>
          <p class="text-body1">Don't have a destination?</p>
          <v-btn outlined to="/app/dashboard">Dashboard</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

import { getLocality, getAutocompleteDestinationResults } from "../services/GoogleMaps";

@Component
export default class Home extends Vue {
  currentCity: string | null = null
  isLoadingCurrentLocation = true
  googlePlaceSuggestions: string[] = []

  get autocompleteOptions(): string[] {
    return this.currentCity
    ? [...this.googlePlaceSuggestions, this.currentCity]
    : this.googlePlaceSuggestions
  }

  get currentPosition(): GeolocationPosition {
    return this.$store.state.position.currentPosition;
  }

  get from() { return this.$store.state.trip.from; }
  set from(name) { this.$store.commit("trip/setFrom", name); }

  get to() { return this.$store.state.trip.to; }
  set to(name) { this.$store.commit("trip/setTo", name); }

  updateAutocompleteSuggestions(input: string): void {
    if (!this.currentPosition) return;

    if (input) {
      getAutocompleteDestinationResults(input, this.currentPosition.coords)
        .then((locations) => {
          this.googlePlaceSuggestions = locations;
        })
        .catch(() => {
          console.debug("no locations found for " + input);
        });
    } else {
      this.googlePlaceSuggestions = [];
    }
  }

  created() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.$store.commit("position/setCurrentPosition", position);
      getLocality(position.coords).then((locality: string) => {
        this.currentCity = locality;
        this.from = locality;
      }).finally(() => { this.isLoadingCurrentLocation = false; })
    });
  }
}
</script>

<style scoped>
.background {
  height: 100vh;
  background-image: url("/freight-train.jpeg");
  background-size: contain;
}

#odometer {
  position: absolute;
  top: 60px;
  left: 80px;
  text-shadow: 2px 2px 4px #444;

  text-align: center;
}

#card {
  height: 100%;
  margin-left: 47%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>

