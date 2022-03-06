<template>
  <v-card>
    <v-card-title>Brake Pipe Pressure</v-card-title>
    <gauge
      id="brakes"
      :min="0"
      :max="120"
      :value="pressure"
      unit="PSI"
      :arcDelimiters="[50]"
      :arcColors="['#F44336', '#4CAF50']"
    />
    <div class="caption text-caption">PSI</div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Gauge from "@/components/Gauge.vue";

const range = [0, 120];

export default Vue.extend({
  name: "BrakeStatus",
  props: {
    pressure: {
      type: Number,
    }
  },
  components: {
    Gauge
  }
})
</script>

<style scoped>
.caption {
  width: 100%;
  position: absolute;
  bottom: 35px;
}
</style>
