<template>
  <v-card height="100%">
    <v-card-text>
      <vue-speedometer
        class="speedometer"
        :minValue="segments[0]"
        :maxValue="segments[segments.length - 1]"
        :segments="segments.length"
        :value="speed"
        :segmentColors="['green', 'red']"
        :customSegmentStops="segments"
        valueTextFontSize="32"
        :paddingVertical="20"
        currentValueText="${value} MPH"
      />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import VueSpeedometer from "vue-speedometer"

export default{
  name: "Speedometer",
  components: {
    VueSpeedometer
  },
  props: {
    speed: {
      type: Number
    }
  },
  data: () => ({
    segments: [0, 15, 70]
  }),
}
</script>

<style scoped>
.speedometer {
  height: 240px;
}
</style>
