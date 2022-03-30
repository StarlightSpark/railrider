<template>
  <div>
    <h1>Nearby Trains</h1>
    <v-card>
      <v-data-table
        hide-default-footer
        disable-sort
        no-data-text="No trains found nearby"
        :headers="[
          {
            text: 'Selected',
            value: 'selected',
            align: 'center',
            width: 50
          },
          {
            text: 'Unit ID',
            value: 'unitId'
          },
          {
            text: 'Moving',
            value: 'motion',
            align: 'center'
          },
          {
            text: 'Braking',
            value: 'brakePipePressure',
            align: 'center'
          },
        ]"
        :items="trains"
        @click:row="updateEOTTelemetry"
      >
        <template #[`item.selected`]="{item}">
          <v-icon v-if="item.unitId === eotTelemetry.unitId" color="primary">mdi-crosshairs-gps</v-icon>
        </template>
        <template #[`item.motion`]="{value: motion}">
          <v-icon color="success" v-if="motion">mdi-motion</v-icon>
          <v-icon color="warning" v-else-if="motion === null">mdi-help</v-icon>
          <v-icon v-else>mdi-close</v-icon>
        </template>
        <template #[`item.brakePipePressure`]="{value: pressure}">
          <v-icon color="error" v-if="pressure < 60">mdi-octagon</v-icon>
          <v-icon v-else>mdi-close</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapMutations } from "vuex";

export default Vue.extend({
  name: "TrainFinder",
  data: () => ({
    trains: [
      {
        unitId: 43758,
        motion: null,
        brakePipePressure: 20
      },
      {
        unitId: 34974,
        motion: false,
        brakePipePressure: 80
      },
      {
        unitId: 83785,
        motion: true,
        brakePipePressure: 0
      }
    ]
  }),
  methods: {
    ...mapMutations(["updateEOTTelemetry"]),
  },
  computed: {
    ...mapState(["eotTelemetry"]),
  }
})
</script>
