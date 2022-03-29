<template>
  <div>
    <vue-gauge
      :refid="id"
      :options="options"
    />
    <div class="caption text-caption">{{ unit }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueGauge from "vue-gauge";

export default Vue.extend({
  name: "BrakeStatus",
  props: {
    id: String,
    value: Number,
    unit: String,
    arcDelimiters: Array,
    min: Number,
    max: Number,
    arcColors: Array,
    hasNeedle: {
      type: Boolean,
      default: true
    },
    needleColor: {
      type: String,
      default: "grey"
    }
  },
  computed: {
    options() {
      return {
        arcDelimiters: this.arcDelimiters.map((val: any) => (val * 100 / this.max)),
        rangeLabel: [this.min.toString(), this.max.toString()],
        hasNeedle: this.hasNeedle,
        arcColors: this.arcColors,
        needleColor: this.needleColor,
        centralLabel: this.value.toString(),
        needleValue: this.value * 100 / this.max
      };
    }
  },
  components: {
    VueGauge
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
