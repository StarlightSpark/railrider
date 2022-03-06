<template>
  <v-container>
    <v-row>
      <!-- <v-col cols="6">
        <rail-map />
      </v-col> -->
      <v-col cols="6">
        <speedometer :speed="45" />
      </v-col>
      <v-col cols="6">
        <brake-status :pressure="eotTelemetry.brakePipePressure" />
      </v-col>
      <v-col cols="6">
        <crossings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from "vuex";
import RailMap from "@/components/RailMap.vue";
import BrakeStatus from "@/components/BrakeStatus.vue";
import Speedometer from "@/components/Speedometer.vue";
import Crossings from "@/components/Crossings.vue";

export default Vue.extend({
  name: "Dashboard",
  components: {
    RailMap,
    BrakeStatus,
    Speedometer,
    Crossings
  },
  computed: {
    ...mapState(["eotTelemetry"])
  }
})
</script>
