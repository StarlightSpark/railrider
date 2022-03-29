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
            :loading="loadingCurrentLocation"
            v-model="from"
            outlined
            label="From"
            auto-select-first
            :items="railCities"
          />
          <v-autocomplete
            ref="to"
            v-model="to"
            outlined
            label="To"
            auto-select-first
            :items="railCities"
            @update:search-input="updateAutocompleteSuggestions"
          />
          <v-btn color="primary">Ride</v-btn>
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
import { getLocality, getAutocompleteDestinationResults } from "../services/GoogleMaps";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  name: "Home",
  data: () => ({
    loadingCurrentLocation: true,
    from: "",
    to: "",
    railCities: [
      "Pueblo, CO",
      "Denver, CO",
      "Grand Junction, CO",
      "Glenwood Springs, CO",
      "Limon, CO",
      "Lonngmont, CO",
      "Broomfield, CO",
      "Fort Collins, CO",
      "Loveland, CO"
    ]
  }),
  computed: {
    ...mapState("position", ["currentPosition"])
  },
  methods: {
    ...mapMutations("position", ["setCurrentPosition"]),
    updateAutocompleteSuggestions(input: string) {
      this.currentPosition && getAutocompleteDestinationResults(input, this.currentPosition.coords)
        .then(console.log);
    }
  },
  created() {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.setCurrentPosition(position);
      getLocality(position.coords).then((locality: string) => {
        this.from = locality;
      }).finally(() => { this.loadingCurrentLocation = false; })
    });
  }
})
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

