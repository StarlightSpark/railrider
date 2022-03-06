<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <rail-map />
      </v-col>
      <v-col cols="6">
        <brake-status />
      </v-col>
      <v-col cols="6">
        <speedometer :speed="45" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import RailMap from "@/components/RailMap.vue";
import BrakeStatus from "@/components/BrakeStatus.vue";
import Speedometer from "@/components/Speedometer.vue";

export default Vue.extend({
  name: "Dashboard",
  components: {
    RailMap,
    BrakeStatus,
    Speedometer
  }
})
</script>

<style scoped>
.v-row {
  justify-content: stretch;
}
</style>
