<template>
  <v-card>
    <v-card-title>Train Speed</v-card-title>
    <gauge
      id="speed"
      :min="0"
      :max="70"
      :value="speed"
      unit="MPH"
      :arcDelimiters="[15]"
      :arcColors="['#4CAF50', '#F44336']"
    />
  </v-card>
</template>

<script lang="ts">
import Gauge from "@/components/Gauge.vue";

export default{
  name: "Speedometer",
  components: {
    Gauge
  },
  props: {
    speed: {
      type: Number
    }
  },
}
</script>
