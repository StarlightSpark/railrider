<template>
  <v-card>
    <v-card-title>Upcoming Crossings</v-card-title>
    <v-card-text>
      <v-data-table
        :value="warningCrossings"
        item-key="roadName"
        hide-default-footer
        disable-sort
        dense
        no-data-text="No upcoming crossings"
        :headers="[
          {
            text: 'Distance',
            value: 'distance'
          },
          {
            text: 'Type',
            value: 'type',
            align: 'center'
          },
          {
            text: 'Road Name',
            value: 'roadName'
          }
        ]"
        :items="upcomingCrossings"
      >
        <template #[`item.type`]="{value: type}">
          <v-icon v-if="type === 'level'">mdi-railroad-light</v-icon>
          <v-icon v-else>mdi-bridge</v-icon>
        </template>
        <template #[`item.distance`]="{value: distance}">
          <span :class="distance <= 0.5 ? 'font-weight-bold' : ''">
            {{ distance }} mi
          </span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "Crossings",
  data: () => ({
    upcomingCrossings: [
      {
        roadName: "Foothills Parkway",
        distance: 0.25,
        type: "bridge",
        id: 1
      },
      {
        roadName: "Pearl St",
        distance: 0.5,
        type: "level",
        id: 2
      },
      {
        roadName: "Valmont Rd",
        distance: 0.75,
        type: "level",
        id: 3
      }
    ]
  }),
  computed: {
    warningCrossings() {
      return this.upcomingCrossings.filter((crossing) => crossing.distance <= 0.5);
    }
  }
})
</script>

<style scoped>
::v-deep .v-data-table tbody tr.v-data-table__selected {
  background: #FFECB3 !important;
}
</style>
